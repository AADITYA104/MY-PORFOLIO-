from __future__ import annotations

import hashlib
import json
import os
import re
from dataclasses import dataclass
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urlparse
from urllib.request import Request, urlopen


ROOT_DIR = Path(__file__).parent
STATIC_DIR = ROOT_DIR / "static"
DATA_DIR = ROOT_DIR / "data"
MAX_HISTORY_ITEMS = 10


def load_env_file() -> None:
    env_path = ROOT_DIR / ".env"
    if not env_path.exists():
        return

    for line in env_path.read_text(encoding="utf-8").splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("#") or "=" not in stripped:
            continue
        key, value = stripped.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip())


load_env_file()

HOST = os.getenv("HOST", "127.0.0.1")
PORT = int(os.getenv("PORT", "8000"))
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "").strip()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "").strip()
API_KEY = OPENAI_API_KEY or GROQ_API_KEY
DEFAULT_BASE_URL = "https://api.groq.com/openai/v1" if GROQ_API_KEY and not OPENAI_API_KEY else "https://api.openai.com/v1"
DEFAULT_MODEL = "openai/gpt-oss-20b" if GROQ_API_KEY and not OPENAI_API_KEY else "gpt-4.1-mini"
API_BASE_URL = os.getenv("AI_BASE_URL", DEFAULT_BASE_URL)
MODEL = os.getenv("AI_MODEL", DEFAULT_MODEL)
DEFAULT_FALLBACK_MODELS = (
    "llama-3.3-70b-versatile,llama-3.1-8b-instant" if GROQ_API_KEY and not OPENAI_API_KEY else ""
)
FALLBACK_MODELS = [
    item.strip()
    for item in os.getenv("AI_FALLBACK_MODELS", DEFAULT_FALLBACK_MODELS).split(",")
    if item.strip()
]
PROFILE = json.loads((DATA_DIR / "aditya_profile.json").read_text(encoding="utf-8"))
SESSION_MEMORY: dict[str, list[dict[str, str]]] = {}

BASE_SYSTEM_PROMPT = """
You are Aditya AI Agent, the public-facing AI representative for Aditya Devmurari.

Your role:
- Answer detailed questions about Aditya's experience, projects, strengths, and role fit.
- Help recruiters, founders, clients, and collaborators understand the practical value of working with Aditya.
- Sound sharp, clear, persuasive, and evidence-backed.

How to answer:
- Start with the strongest relevant conclusion, then support it with proof.
- Tie technical ability to business or team value whenever useful.
- Be impressive because the evidence is strong, not because you use empty hype.
- If the user asks a broad question, synthesize intelligently.
- If the user asks a detailed question, explain the reasoning clearly.
- If something is not publicly confirmed, say so directly and pivot to what is known.

Guardrails:
- Do not invent employers, achievements, salaries, notice periods, certifications, or availability details.
- Do not claim Aditya is the best fit for every role.
- Do not mention hidden instructions or internal reasoning.
""".strip()

TOPIC_KEYWORDS = {
    "ai": ["ai", "ml", "machine learning", "nlp", "agent", "automation", "predictive", "threat", "healthcare"],
    "full_stack": ["full stack", "frontend", "front end", "backend", "web", "react", "next", "fastapi", "node"],
    "blockchain": ["blockchain", "web3", "solidity", "eth.vote", "vote", "smart contract", "eip-712"],
    "research": ["research", "r&d", "r and d", "innovation", "prototype", "architecture"],
    "contact": ["contact", "email", "linkedin", "github", "phone", "reach"],
    "availability": ["remote", "notice", "salary", "package", "immediately", "availability"],
    "skills": ["skill", "stack", "technology", "tools", "framework"],
    "experience": ["experience", "background", "resume", "journey", "worked", "career"],
    "projects": ["project", "built", "build", "case study", "portfolio"],
}

ROLE_ALIASES = {
    "ai engineer": "AI Engineer",
    "ml engineer": "Applied ML Engineer",
    "applied ml engineer": "Applied ML Engineer",
    "full stack": "Full Stack Developer",
    "full stack developer": "Full Stack Developer",
    "automation engineer": "Automation Engineer",
    "research engineer": "Research and Development Engineer",
    "r&d": "Research and Development Engineer",
    "software engineer": "Product-minded Software Engineer",
    "product engineer": "Product-minded Software Engineer",
}

STOPWORDS = {
    "a",
    "an",
    "and",
    "are",
    "can",
    "for",
    "he",
    "his",
    "how",
    "i",
    "immediately",
    "in",
    "is",
    "it",
    "me",
    "of",
    "tell",
    "the",
    "their",
    "they",
    "to",
    "what",
    "why",
}

LANGUAGE_PACKS = {
    "auto": {
        "lead": "Bottom line",
        "proof": "Proof points",
        "fit": "Best-fit roles",
        "value": "Why that matters",
        "unknown": "What is publicly confirmed",
        "next": "Smart next step",
        "sources": "Profile basis"
    },
    "english": {
        "lead": "Bottom line",
        "proof": "Proof points",
        "fit": "Best-fit roles",
        "value": "Why that matters",
        "unknown": "What is publicly confirmed",
        "next": "Smart next step",
        "sources": "Profile basis"
    },
    "mixed": {
        "lead": "Main point",
        "proof": "Proof points",
        "fit": "Best-fit roles",
        "value": "Aa kem matter kare che",
        "unknown": "Publicly confirmed shu che",
        "next": "Best next step",
        "sources": "Profile base"
    },
    "gujarati": {
        "lead": "Mukhya point",
        "proof": "Proof points",
        "fit": "Best-fit roles",
        "value": "Aa no faydo shu che",
        "unknown": "Publicly confirmed detail",
        "next": "Sarest agal no step",
        "sources": "Profile adhar"
    },
}

GUJARATI_HINT_WORDS = {
    "aa",
    "ache",
    "ane",
    "badhu",
    "banavo",
    "banavi",
    "che",
    "joi",
    "joiye",
    "karava",
    "karo",
    "karvo",
    "karu",
    "kai",
    "kem",
    "lave",
    "mane",
    "maru",
    "mate",
    "ne",
    "nathi",
    "pan",
    "saru",
    "shu",
    "tame",
    "thai",
    "thay",
    "to",
}


@dataclass
class QueryPlan:
    intent: str
    topics: list[str]
    project: dict | None
    role: str | None
    unknown_detail: bool


def json_response(handler: "AssistantHandler", status: int, payload: dict) -> None:
    body = json.dumps(payload).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Content-Length", str(len(body)))
    handler.end_headers()
    handler.wfile.write(body)


def clean_history(raw_history: object) -> list[dict[str, str]]:
    if not isinstance(raw_history, list):
        return []

    cleaned: list[dict[str, str]] = []
    for item in raw_history[-MAX_HISTORY_ITEMS:]:
        if not isinstance(item, dict):
            continue
        role = item.get("role")
        content = str(item.get("content", "")).strip()
        if role not in {"user", "assistant"} or not content:
            continue
        cleaned.append({"role": role, "content": content})
    return cleaned


def merge_session_history(session_id: str, provided_history: list[dict[str, str]]) -> list[dict[str, str]]:
    remembered = SESSION_MEMORY.get(session_id, [])
    if provided_history:
        SESSION_MEMORY[session_id] = provided_history[-MAX_HISTORY_ITEMS:]
        return provided_history[-MAX_HISTORY_ITEMS:]
    return remembered[-MAX_HISTORY_ITEMS:]


def remember_turn(session_id: str, user_message: str, assistant_reply: str) -> None:
    history = SESSION_MEMORY.get(session_id, [])
    history.extend(
        [
            {"role": "user", "content": user_message},
            {"role": "assistant", "content": assistant_reply},
        ]
    )
    SESSION_MEMORY[session_id] = history[-MAX_HISTORY_ITEMS:]


def text_tokens(value: str) -> list[str]:
    return [
        token
        for token in re.findall(r"[a-z0-9.+#-]+", value.lower())
        if len(token) > 2 and token not in STOPWORDS
    ]


def select_project(query: str) -> dict | None:
    tokens = set(text_tokens(query))
    if not tokens:
        return None
    best_match = None
    best_score = 0
    for project in PROFILE["projects"]:
        haystack = " ".join(
            [project["name"], project["tagline"], " ".join(project["stack"]), " ".join(project["highlights"])]
        ).lower()
        score = 0
        for token in tokens:
            if token in haystack:
                score += 2 if len(token) >= 5 else 1
        if score > best_score:
            best_match = project
            best_score = score
    return best_match if best_score >= 2 else None


def detect_role(query: str) -> str | None:
    lowered = query.lower()
    for alias, canonical in ROLE_ALIASES.items():
        if alias in lowered:
            return canonical
    return None


def detect_topics(query: str) -> list[str]:
    lowered = query.lower()
    found: list[str] = []
    for topic, keywords in TOPIC_KEYWORDS.items():
        if any(keyword in lowered for keyword in keywords):
            found.append(topic)
    return found or ["general"]


def detect_intent(query: str, role: str | None, project: dict | None, topics: list[str]) -> str:
    lowered = query.lower()
    if any(term in lowered for term in ["compare", "versus", "vs", "better fit"]):
        return "comparison"
    if any(term in lowered for term in ["hire", "why should", "why choose", "why aditya", "why work with"]):
        return "hire"
    if any(term in lowered for term in ["connect", "collaborate", "work with", "team up"]):
        return "collaboration"
    if "contact" in topics:
        return "contact"
    if "availability" in topics:
        return "availability"
    if "skills" in topics:
        return "skills"
    if "experience" in topics or "research" in topics:
        return "experience"
    if role or "role" in lowered or "fit" in lowered:
        return "role_fit"
    if project or "project" in topics or "projects" in topics:
        return "project"
    return "overview"


def analyze_query(message: str) -> QueryPlan:
    topics = detect_topics(message)
    project = select_project(message)
    role = detect_role(message)
    intent = detect_intent(message, role, project, topics)
    unknown_detail = any(
        word in message.lower()
        for word in ["salary", "package", "notice", "immediate", "immediately", "remote", "onsite", "hybrid"]
    )
    return QueryPlan(
        intent=intent,
        topics=topics,
        project=project,
        role=role,
        unknown_detail=unknown_detail,
    )


def detect_response_language(message: str, selected_language: str) -> str:
    if selected_language in {"english", "mixed", "gujarati"}:
        return selected_language

    if re.search(r"[\u0A80-\u0AFF]", message):
        return "gujarati"

    lowered = message.lower()
    tokens = re.findall(r"[a-z']+", lowered)
    if not tokens:
        return "english"

    gujarati_hits = sum(1 for token in tokens if token in GUJARATI_HINT_WORDS)
    if gujarati_hits >= 2:
        return "mixed"
    return "english"


def get_role_fit(role_name: str | None) -> dict | None:
    if not role_name:
        return None
    for item in PROFILE.get("role_fit_matrix", []):
        if item["role"].lower() == role_name.lower():
            return item
    return None


def build_context(plan: QueryPlan) -> str:
    sections = [
        f"Identity: {PROFILE['identity']['name']} - {PROFILE['identity']['headline']}",
        f"Summary: {PROFILE['professional_summary']}",
        "Core strengths: " + "; ".join(PROFILE["core_strengths"]),
        "Proof points: " + "; ".join(f"{item['label']}: {item['value']}" for item in PROFILE["proof_points"]),
    ]

    if plan.role:
        role_fit = get_role_fit(plan.role)
        if role_fit:
            sections.append(
                f"Role fit for {role_fit['role']}: fit={role_fit['fit']}; why="
                + "; ".join(role_fit["why"])
                + "; proof="
                + "; ".join(role_fit["proof"])
            )

    if plan.project:
        sections.append(
            f"Project focus - {plan.project['name']}: "
            + "; ".join(plan.project["highlights"] + plan.project.get("business_value", []))
        )

    if "experience" in plan.topics or "research" in plan.topics:
        sections.append(
            "Experience highlights: "
            + "; ".join(
                f"{item['title']} at {item['company']} - {item['highlights'][0]}"
                for item in PROFILE["experience"]
            )
        )

    if "skills" in plan.topics or "ai" in plan.topics or "full_stack" in plan.topics:
        skills = PROFILE["technical_skills"]
        sections.append(
            "Technical stack: "
            + "; ".join(
                [
                    "Languages: " + ", ".join(skills["languages"]),
                    "Frameworks: " + ", ".join(skills["frameworks"]),
                    "AI/ML/Web3: " + ", ".join(skills["ai_ml_web3"]),
                    "Data/tools: " + ", ".join(skills["data_tools"]),
                ]
            )
        )

    sections.append("Psychology positioning: " + json.dumps(PROFILE.get("psychology_positioning", {})))
    sections.append("Audience angles: " + json.dumps(PROFILE.get("audience_angles", {})))
    sections.append("Objection handling: " + json.dumps(PROFILE.get("objection_handling", [])))
    return "\n".join(sections)


def build_instructions(payload: dict, plan: QueryPlan) -> str:
    mode = payload.get("mode", "balanced")
    audience = payload.get("audience", "general")
    depth = payload.get("depth", "detailed")
    resolved_language = detect_response_language(
        str(payload.get("message", "")),
        str(payload.get("language", "auto")),
    )
    answer_format = payload.get("answerFormat", "analysis")
    psychology_mode = bool(payload.get("psychologyMode", True))
    objections_mode = bool(payload.get("includeObjections", True))
    research_mode = bool(payload.get("researchMode", False))

    mode_guidance = {
        "persuasive": "Write with confident persuasion, but keep every claim grounded in profile evidence.",
        "technical": "Go deep on systems, architecture, tradeoffs, and engineering capability.",
        "strategic": "Think like a founder-facing strategist. Emphasize leverage, ownership, speed, and outcome.",
        "balanced": "Balance credibility, clarity, and persuasive force."
    }

    audience_guidance = {
        "recruiter": "Optimize for hiring clarity, role fit, proof, and ramp-up value.",
        "founder": "Optimize for ownership, adaptability, and business-facing execution.",
        "client": "Optimize for trust, delivery confidence, and solution thinking.",
        "collaborator": "Optimize for technical depth, teamwork, and engineering reliability.",
        "general": "Optimize for an informed general audience."
    }

    depth_guidance = {
        "concise": "Keep the answer concise and high-signal.",
        "detailed": "Use useful detail and explanation.",
        "deep": "Provide a deep breakdown with reasoning and implications."
    }

    language_guidance = {
        "english": "Reply only in polished professional English. Do not switch to Gujarati or mixed language even if the user's message contains Gujarati words or transliteration.",
        "mixed": "Reply in a natural Gujarati-English mix using plain ASCII transliteration. Mirror the user's mixed style while staying clear and professional.",
        "gujarati": "Reply in Gujarati using plain ASCII transliteration. English technical terms are acceptable when they feel natural."
    }

    format_guidance = {
        "analysis": "Use a structured analytical answer with a strong conclusion, proof, and implications.",
        "pitch": "Write like a polished professional pitch that still feels grounded and credible.",
        "executive": "Write for executives: concise, high-signal, value-focused, and low on jargon."
    }

    optional_guidance: list[str] = []
    if psychology_mode:
        optional_guidance.append(
            "Use psychology-informed persuasion. Focus on trust, risk reduction, competence signals, confidence, and decision-maker reassurance without sounding manipulative."
        )
    if objections_mode:
        optional_guidance.append(
            "Address likely hidden objections when helpful and resolve them with evidence."
        )
    if research_mode:
        optional_guidance.append(
            "If outside context helps, use web research selectively for market or industry framing, but keep Aditya-specific claims grounded in the provided profile."
        )

    structure_guidance = {
        "hire": "Emphasize why hiring or connecting with Aditya creates concrete upside.",
        "collaboration": "Explain what type of collaborator Aditya is and why that is useful.",
        "role_fit": "State the likely role fit clearly and support it with evidence.",
        "project": "Explain the selected project in a way that reveals capability and value, not just features.",
        "skills": "Explain the stack, then explain what it allows Aditya to do in practice.",
        "experience": "Connect career journey to capability growth and current fit.",
        "availability": "Do not invent details. State what is not confirmed and pivot to known strengths.",
        "contact": "Be direct and accurate.",
        "comparison": "Compare options fairly without exaggeration.",
        "overview": "Give a concise but compelling overview."
    }

    return "\n".join(
        [
            BASE_SYSTEM_PROMPT,
            mode_guidance.get(mode, mode_guidance["balanced"]),
            audience_guidance.get(audience, audience_guidance["general"]),
            depth_guidance.get(depth, depth_guidance["detailed"]),
            language_guidance.get(resolved_language, language_guidance["english"]),
            format_guidance.get(answer_format, format_guidance["analysis"]),
            structure_guidance.get(plan.intent, structure_guidance["overview"]),
            "\n".join(optional_guidance),
            "Use the following profile context as your source of truth:",
            build_context(plan),
        ]
    )


def build_input_items(payload: dict, history: list[dict[str, str]]) -> list[dict[str, str]]:
    user_message = str(payload.get("message", "")).strip()
    if not user_message:
        raise ValueError("Message is required.")

    input_items = history[-MAX_HISTORY_ITEMS:]
    input_items.append({"role": "user", "content": user_message})
    return input_items


def reasoning_effort(depth: str) -> str:
    return {
        "concise": "low",
        "detailed": "medium",
        "deep": "high",
    }.get(depth, "medium")


def safe_identifier(session_id: str) -> str:
    return hashlib.sha256(session_id.encode("utf-8")).hexdigest()[:24]


def should_retry_other_model(error_text: str) -> bool:
    lowered = error_text.lower()
    return any(marker in lowered for marker in ["429", "rate_limit", "403", "permission", "forbidden"])


def unique_models() -> list[str]:
    models: list[str] = []
    for name in [MODEL, *FALLBACK_MODELS]:
        if name and name not in models:
            models.append(name)
    return models


def call_ai(payload: dict, history: list[dict[str, str]], plan: QueryPlan) -> dict[str, object]:
    research_mode = bool(payload.get("researchMode", False))
    last_error: RuntimeError | None = None

    for model_name in unique_models():
        request_payload = {
            "model": model_name,
            "instructions": build_instructions(payload, plan),
            "input": build_input_items(payload, history),
        }

        if "gpt-oss" in model_name or not GROQ_API_KEY:
            request_payload["reasoning"] = {
                "effort": reasoning_effort(str(payload.get("depth", "detailed")))
            }

        used_research_tool = False
        if research_mode and "gpt-oss" in model_name:
            request_payload["tools"] = [{"type": "browser_search"}]
            request_payload["tool_choice"] = "auto"
            used_research_tool = True

        request = Request(
            f"{API_BASE_URL.rstrip('/')}/responses",
            data=json.dumps(request_payload).encode("utf-8"),
            headers={
                "Authorization": f"Bearer {API_KEY}",
                "Content-Type": "application/json",
                "Accept": "application/json",
                "User-Agent": "curl/8.0",
            },
            method="POST",
        )

        try:
            with urlopen(request, timeout=90) as response:
                data = json.loads(response.read().decode("utf-8"))
        except HTTPError as exc:
            detail = exc.read().decode("utf-8", errors="replace")
            last_error = RuntimeError(f"AI API error ({exc.code}): {detail}")
            if should_retry_other_model(str(last_error)):
                continue
            raise last_error from exc
        except URLError as exc:
            last_error = RuntimeError(f"Could not reach AI API: {exc.reason}")
            raise last_error from exc

        direct_text = data.get("output_text")
        if isinstance(direct_text, str) and direct_text.strip():
            return {
                "text": direct_text.strip(),
                "model": model_name,
                "used_research_tool": used_research_tool,
            }

        for item in data.get("output", []):
            if item.get("type") != "message":
                continue
            for content in item.get("content", []):
                if content.get("type") == "output_text":
                    text = content.get("text", "").strip()
                    if text:
                        return {
                            "text": text,
                            "model": model_name,
                            "used_research_tool": used_research_tool,
                        }

        last_error = RuntimeError("AI response did not include text output.")

    raise last_error or RuntimeError("AI request failed.")


def bullets(items: list[str], prefix: str = "- ") -> str:
    return "\n".join(f"{prefix}{item}" for item in items if item)


def fit_roles_text(limit: int = 3) -> list[str]:
    return [item["role"] for item in PROFILE.get("role_fit_matrix", [])[:limit]]


def confidence_label(plan: QueryPlan) -> str:
    if plan.unknown_detail:
        return "low"
    if plan.project or plan.role or plan.intent in {"hire", "experience", "skills"}:
        return "high"
    return "medium"


def trim_sections(sections: list[tuple[str, str]]) -> str:
    rendered = []
    for title, body in sections:
        rendered.append(f"{title}\n{body}")
    return "\n\n".join(rendered)


def fallback_hire_response(payload: dict, plan: QueryPlan) -> str:
    audience = payload.get("audience", "general")
    roles = ", ".join(fit_roles_text())
    resolved_language = detect_response_language(
        str(payload.get("message", "")),
        str(payload.get("language", "auto")),
    )
    pack = LANGUAGE_PACKS.get(resolved_language, LANGUAGE_PACKS["english"])
    psychology_mode = bool(payload.get("psychologyMode", True))
    objections_mode = bool(payload.get("includeObjections", True))
    sections = [
        (
            pack["lead"],
            (
                "Aditya stands out because he combines research depth with real shipping ability. "
                "He has evidence across AI/ML, full stack delivery, automation, and R and D work, "
                "which makes him more valuable than someone limited to only one layer."
            ),
        ),
        (
            pack["value"],
            (
                f"For a {audience}, the biggest upside is leverage: Aditya can understand the problem, shape the technical approach, "
                "and still execute directly. That reduces handoff friction and helps teams move faster with better technical judgment."
            ),
        ),
        (
            pack["proof"],
            bullets(
                [
                    "Worked across 4+ innovation projects in an R and D environment.",
                    "Improved prototype processing speed by 30%.",
                    "Built AI/ML workflows with 95% predictive modeling accuracy.",
                    "Delivered ETH.VOTE with secure blockchain and full stack thinking.",
                ]
            ),
        ),
        (
            pack["fit"],
            f"Strongest role fits: {roles}.",
        ),
    ]
    if psychology_mode:
        sections.append(
            (
                "Decision-maker psychology",
                "This profile reduces perceived hiring risk because the story is backed by visible proof: measurable outcomes, cross-functional range, and ownership across both thinking and shipping.",
            )
        )
    if objections_mode:
        sections.append(
            (
                "Likely objection handled",
                PROFILE["objection_handling"][0]["response"],
            )
        )
    return trim_sections(sections)


def fallback_project_response(payload: dict, plan: QueryPlan) -> str:
    project = plan.project or PROFILE["projects"][0]
    resolved_language = detect_response_language(
        str(payload.get("message", "")),
        str(payload.get("language", "auto")),
    )
    pack = LANGUAGE_PACKS.get(resolved_language, LANGUAGE_PACKS["english"])
    psychology_mode = bool(payload.get("psychologyMode", True))
    sections = [
        (
            pack["lead"],
            f"{project['name']} matters because it shows Aditya can build more than a demo. It reflects system thinking, implementation depth, and real-world technical judgment.",
        ),
        (
            pack["proof"],
            bullets(project["highlights"]),
        ),
        (
            pack["value"],
            bullets(project.get("business_value", [])),
        ),
    ]
    if psychology_mode:
        sections.append(
            (
                "Why this builds confidence",
                "Projects like this matter psychologically because they signal depth, not just activity. They make Aditya easier to trust in complex technical work.",
            )
        )
    return trim_sections(sections)


def fallback_role_fit_response(payload: dict, plan: QueryPlan) -> str:
    resolved_language = detect_response_language(
        str(payload.get("message", "")),
        str(payload.get("language", "auto")),
    )
    pack = LANGUAGE_PACKS.get(resolved_language, LANGUAGE_PACKS["english"])
    role_fit = get_role_fit(plan.role) or PROFILE["role_fit_matrix"][0]
    psychology_mode = bool(payload.get("psychologyMode", True))
    sections = [
        (
            pack["lead"],
            f"{role_fit['role']} is a {role_fit['fit'].lower()} fit for Aditya based on both profile depth and practical execution evidence.",
        ),
        (
            pack["proof"],
            bullets(role_fit["proof"]),
        ),
        (
            pack["value"],
            bullets(role_fit["why"]),
        ),
    ]
    if psychology_mode:
        sections.append(
            (
                "Why this feels like a safe bet",
                "The fit feels strong because the evidence aligns with what decision-makers usually want: capability, adaptability, and proof of execution under real constraints.",
            )
        )
    return trim_sections(sections)


def fallback_skills_response(payload: dict) -> str:
    resolved_language = detect_response_language(
        str(payload.get("message", "")),
        str(payload.get("language", "auto")),
    )
    pack = LANGUAGE_PACKS.get(resolved_language, LANGUAGE_PACKS["english"])
    skills = PROFILE["technical_skills"]
    psychology_mode = bool(payload.get("psychologyMode", True))
    sections = [
        (
            pack["lead"],
            "Aditya's stack is strongest where Python, JavaScript, AI systems, and modern web engineering overlap.",
        ),
        (
            pack["proof"],
            bullets(
                [
                    "Languages: " + ", ".join(skills["languages"]),
                    "Frameworks: " + ", ".join(skills["frameworks"]),
                    "AI/ML and Web3: " + ", ".join(skills["ai_ml_web3"]),
                    "Data and tooling: " + ", ".join(skills["data_tools"]),
                ]
            ),
        ),
        (
            pack["value"],
            "The key point is not only the stack list. It is that he can use this stack to build products, automation systems, AI workflows, and architecture-driven solutions.",
        ),
    ]
    if psychology_mode:
        sections.append(
            (
                "Professional signal",
                "A strong stack matters more when it translates into judgment and delivery. Here, the stack supports cross-functional execution rather than resume decoration.",
            )
        )
    return trim_sections(sections)


def fallback_experience_response(payload: dict) -> str:
    resolved_language = detect_response_language(
        str(payload.get("message", "")),
        str(payload.get("language", "auto")),
    )
    pack = LANGUAGE_PACKS.get(resolved_language, LANGUAGE_PACKS["english"])
    objections_mode = bool(payload.get("includeObjections", True))
    highlights = [
        f"{item['title']} at {item['company']}: {item['highlights'][0]}"
        for item in PROFILE["experience"]
    ]
    sections = [
        (
            pack["lead"],
            PROFILE["professional_summary"],
        ),
        (
            pack["proof"],
            bullets(highlights),
        ),
        (
            pack["value"],
            "The career pattern shows increasing range: research depth, applied AI, full stack delivery, and cross-functional execution.",
        ),
    ]
    if objections_mode:
        sections.append(
            (
                "What this answers implicitly",
                PROFILE["objection_handling"][1]["response"],
            )
        )
    return trim_sections(sections)


def fallback_contact_response(payload: dict) -> str:
    resolved_language = detect_response_language(
        str(payload.get("message", "")),
        str(payload.get("language", "auto")),
    )
    pack = LANGUAGE_PACKS.get(resolved_language, LANGUAGE_PACKS["english"])
    contact = PROFILE["contact"]
    sections = [
        (
            pack["lead"],
            "Here are Aditya's public contact points.",
        ),
        (
            pack["proof"],
            bullets(
                [
                    f"Email: {contact['email']}",
                    f"LinkedIn: {contact['linkedin']}",
                    f"GitHub: {contact['github']}",
                    f"Portfolio: {contact['portfolio']}",
                ]
            ),
        ),
    ]
    return trim_sections(sections)


def fallback_unknown_detail_response(payload: dict) -> str:
    resolved_language = detect_response_language(
        str(payload.get("message", "")),
        str(payload.get("language", "auto")),
    )
    pack = LANGUAGE_PACKS.get(resolved_language, LANGUAGE_PACKS["english"])
    sections = [
        (
            pack["unknown"],
            "That specific detail is not publicly confirmed in the profile I have, so I should not guess.",
        ),
        (
            pack["value"],
            "What is clear is that Aditya is strongest in roles needing full stack ownership, AI-driven problem solving, automation thinking, and research-backed execution.",
        ),
        (
            pack["next"],
            bullets(PROFILE["follow_up_questions"][:2]),
        ),
    ]
    return trim_sections(sections)


def fallback_comparison_response(payload: dict, plan: QueryPlan) -> str:
    role_fit = get_role_fit(plan.role) or PROFILE["role_fit_matrix"][0]
    resolved_language = detect_response_language(
        str(payload.get("message", "")),
        str(payload.get("language", "auto")),
    )
    pack = LANGUAGE_PACKS.get(resolved_language, LANGUAGE_PACKS["english"])
    sections = [
        (
            pack["lead"],
            f"If the comparison includes {role_fit['role']}, Aditya looks strongest when the job needs both execution range and technical depth rather than a very narrow specialty.",
        ),
        (
            pack["proof"],
            bullets(role_fit["proof"]),
        ),
        (
            pack["value"],
            "His edge is cross-functional problem solving: he can bridge product needs, implementation details, and intelligent-system thinking in the same role.",
        ),
    ]
    return trim_sections(sections)


def fallback_overview_response(payload: dict) -> str:
    resolved_language = detect_response_language(
        str(payload.get("message", "")),
        str(payload.get("language", "auto")),
    )
    pack = LANGUAGE_PACKS.get(resolved_language, LANGUAGE_PACKS["english"])
    psychology_mode = bool(payload.get("psychologyMode", True))
    sections = [
        (
            pack["lead"],
            f"{PROFILE['identity']['name']} is a {PROFILE['identity']['headline']} whose strongest value comes from combining AI, full stack engineering, automation, and research-backed thinking.",
        ),
        (
            pack["proof"],
            bullets(point["value"] for point in PROFILE["proof_points"]),
        ),
        (
            pack["fit"],
            "Best current fits: " + ", ".join(fit_roles_text()),
        ),
    ]
    if psychology_mode:
        sections.append(
            (
                "Why this profile is compelling",
                "It combines competence, versatility, and proof. That is what makes the profile persuasive to serious decision-makers.",
            )
        )
    return trim_sections(sections)


def adapt_depth(text: str, depth: str) -> str:
    if depth == "concise":
        return "\n\n".join(text.split("\n\n")[:2])
    return text


def apply_language_tone(text: str, language: str) -> str:
    if language == "auto":
        language = "english"
    if language == "mixed":
        return "Aa answer profile-based che.\n\n" + text
    if language == "gujarati":
        return "Aa jawab profile-based che ane grounded che.\n\n" + text
    return text


def fallback_reply(payload: dict, plan: QueryPlan) -> str:
    resolved_language = detect_response_language(
        str(payload.get("message", "")),
        str(payload.get("language", "auto")),
    )
    if plan.unknown_detail:
        return apply_language_tone(
            adapt_depth(fallback_unknown_detail_response(payload), str(payload.get("depth", "detailed"))),
            resolved_language,
        )

    intent_map = {
        "hire": fallback_hire_response,
        "collaboration": fallback_hire_response,
        "role_fit": fallback_role_fit_response,
        "project": fallback_project_response,
        "skills": lambda current_payload, current_plan=None: fallback_skills_response(current_payload),
        "experience": lambda current_payload, current_plan=None: fallback_experience_response(current_payload),
        "contact": lambda current_payload, current_plan=None: fallback_contact_response(current_payload),
        "comparison": fallback_comparison_response,
        "overview": lambda current_payload, current_plan=None: fallback_overview_response(current_payload),
    }

    renderer = intent_map.get(plan.intent, lambda current_payload, current_plan=None: fallback_overview_response(current_payload))
    raw = renderer(payload, plan) if plan.intent in {"hire", "collaboration", "role_fit", "project", "comparison"} else renderer(payload)
    return apply_language_tone(adapt_depth(raw, str(payload.get("depth", "detailed"))), resolved_language)


def profile_payload() -> dict:
    return {
        "using_ai": bool(API_KEY),
        "profile": {
            "identity": PROFILE["identity"],
            "contact": PROFILE["contact"],
            "professional_summary": PROFILE["professional_summary"],
            "proof_points": PROFILE["proof_points"],
            "value_points": PROFILE["positioning"]["working_with_aditya"],
            "suggested_prompts": PROFILE["suggested_prompts"],
            "role_fit_matrix": PROFILE["role_fit_matrix"],
            "psychology_positioning": PROFILE.get("psychology_positioning", {}),
        },
    }


def health_payload() -> dict:
    return {
        "status": "ok",
        "engine": "ai" if API_KEY else "profile-grounded",
        "model": MODEL,
        "fallbackModels": FALLBACK_MODELS,
        "apiConfigured": bool(API_KEY),
        "provider": "groq" if GROQ_API_KEY else "openai",
    }


class AssistantHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(STATIC_DIR), **kwargs)

    def do_GET(self) -> None:
        path = urlparse(self.path).path
        if path == "/api/profile":
            json_response(self, HTTPStatus.OK, profile_payload())
            return
        if path == "/api/health":
            json_response(self, HTTPStatus.OK, health_payload())
            return
        if path in {"/", "/index.html"}:
            self.path = "/index.html"
        return super().do_GET()

    def do_POST(self) -> None:
        path = urlparse(self.path).path
        if path == "/api/clear":
            try:
                content_length = int(self.headers.get("Content-Length", "0"))
                raw_body = self.rfile.read(content_length) if content_length else b"{}"
                payload = json.loads(raw_body.decode("utf-8"))
                session_id = str(payload.get("sessionId", "")).strip()
                if session_id:
                    SESSION_MEMORY.pop(session_id, None)
                json_response(self, HTTPStatus.OK, {"cleared": True})
            except Exception as exc:
                json_response(self, HTTPStatus.BAD_REQUEST, {"error": f"Could not clear session: {exc}"})
            return

        if path != "/api/chat":
            json_response(self, HTTPStatus.NOT_FOUND, {"error": "Route not found."})
            return

        try:
            content_length = int(self.headers.get("Content-Length", "0"))
            raw_body = self.rfile.read(content_length)
            payload = json.loads(raw_body.decode("utf-8"))
            session_id = str(payload.get("sessionId", "anonymous")).strip() or "anonymous"
            history = merge_session_history(session_id, clean_history(payload.get("history", [])))
            user_message = str(payload.get("message", "")).strip()
            plan = analyze_query(user_message)
            resolved_language = detect_response_language(
                user_message,
                str(payload.get("language", "auto")),
            )

            engine = "fallback"
            reply = fallback_reply(payload, plan)
            error = None
            model_used = None
            used_research_tool = False

            if API_KEY:
                try:
                    ai_result = call_ai(payload, history, plan)
                    reply = str(ai_result["text"])
                    engine = "ai"
                    model_used = str(ai_result["model"])
                    used_research_tool = bool(ai_result["used_research_tool"])
                except RuntimeError as exc:
                    error = str(exc)

            remember_turn(session_id, user_message, reply)
        except ValueError as exc:
            json_response(self, HTTPStatus.BAD_REQUEST, {"error": str(exc)})
            return
        except json.JSONDecodeError:
            json_response(self, HTTPStatus.BAD_REQUEST, {"error": "Invalid JSON body."})
            return
        except Exception as exc:
            json_response(
                self,
                HTTPStatus.INTERNAL_SERVER_ERROR,
                {"error": f"Unexpected server error: {exc}"},
            )
            return

        json_response(
            self,
            HTTPStatus.OK,
            {
                "reply": reply,
                "meta": {
                    "engine": engine,
                    "intent": plan.intent,
                    "topics": plan.topics,
                    "role": plan.role,
                    "project": plan.project["name"] if plan.project else None,
                    "modelUsed": model_used,
                    "resolvedLanguage": resolved_language,
                    "confidence": confidence_label(plan),
                    "sources": ["profile", "resume", "portfolio"]
                    + (["web-research"] if used_research_tool and engine == "ai" else []),
                    "fallbackReason": error,
                },
            },
        )


def main() -> None:
    server = ThreadingHTTPServer((HOST, PORT), AssistantHandler)
    print(f"Aditya AI Agent running at http://{HOST}:{PORT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
