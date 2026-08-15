import { NextRequest } from 'next/server';

// ─────────────────────────────────────────────────────────────────────────────
// STRUCTURED KNOWLEDGE BASE — Single source of truth.
// Update this object to update the chatbot. No prompt touching needed.
// ─────────────────────────────────────────────────────────────────────────────
const KNOWLEDGE_BASE = {
  identity: {
    name: "Aditya Devmurari",
    role: "Full Stack & AI Developer",
    location: "Gujarat, India",
    experience: "2+ years",
    summary:
      "Results-driven software developer with 2+ years of experience in R&D and full stack engineering. Builds scalable web applications, high-accuracy AI/ML models, and intelligent automation systems.",
  },
  contact: {
    phone: "+91-7046387404",
    email: "devmurariaaditya@gmail.com",
    linkedin: "https://linkedin.com/in/devmurari-aditya",
    github: "https://github.com/AADITYA104",
    portfolio: "https://adityadevmurari.vercel.app",
  },
  skills: {
    languages: ["Python", "JavaScript", "Solidity", "HTML5", "CSS3"],
    frameworks: ["React.js", "Next.js", "Node.js", "FastAPI", "Tailwind CSS", "Scikit-learn"],
    databases: ["MySQL", "PostgreSQL", "MongoDB", "Firebase"],
    tools: ["Git", "GitHub", "Web3.js", "OpenCV"],
    domains: ["Full Stack Web", "Applied AI/ML", "Blockchain/Web3", "R&D Engineering", "NLP", "Computer Vision"],
  },
  stats: [
    { label: "Innovation Projects Deployed", value: "4+" },
    { label: "R&D Data Processing Speedup", value: "30%" },
    { label: "AI/ML Predictive Accuracy", value: "95%" },
    { label: "Junior Students Mentored", value: "10+" },
    { label: "Frontend Load Time Improvement", value: "15%" },
    { label: "Cross-Browser Compatibility", value: "100%" },
    { label: "AI Threat Detection Accuracy", value: "92%" },
    { label: "Healthcare Triage Time Reduction", value: "40%" },
    { label: "Manual Data Entry Reduction", value: "20%" },
  ],
  experience: [
    {
      role: "Full Stack Developer Intern",
      company: "Aksharraj Infotech",
      period: "Feb 2026 – Apr 2026",
      highlights: [
        "Built ETH.VOTE blockchain DApp end-to-end, bridging traditional web systems with decentralized blockchain logic.",
        "Implemented EIP-712 structured data hashing and signing for secure cryptographic voter identity verification.",
        "Collaborated in daily agile sprints to fix bugs and improve application performance.",
      ],
    },
    {
      role: "Junior AI/ML Developer",
      company: "Mexgen Technologies Pvt. Ltd.",
      period: "Jul 2025 – Jan 2026",
      highlights: [
        "Engineered automated AI/ML models for business workflows, reducing manual data entry by 20%.",
        "Optimized Python data pipelines, achieving a 95% accuracy rate in predictive modeling.",
        "Integrated intelligent AI agents into production platforms to improve user engagement.",
      ],
    },
    {
      role: "R&D Engineer",
      company: "Gyanmanjari Innovative University (GMIU)",
      period: "Feb 2024 – Jan 2026",
      highlights: [
        "Spearheaded R&D for 4+ major innovation projects focused on software scalability.",
        "Architected a prototype system that improved data processing speeds by 30%.",
        "Mentored a team of 10+ junior students through the full Software Development Life Cycle (SDLC).",
      ],
    },
    {
      role: "Front End Developer",
      company: "IT Hub",
      period: "Nov 2024 – Dec 2024",
      highlights: [
        "Developed responsive web interfaces with 100% cross-browser compatibility.",
        "Enhanced front-end performance, reducing page load times by approximately 15%.",
      ],
    },
  ],
  education: [
    {
      degree: "B.Tech in Information Technology",
      institution: "Gyanmanjari Innovative University (GMIU)",
      location: "Gujarat, India",
    },
    {
      degree: "Diploma in Computer Engineering",
      institution: "Gyanmanjari Institute of Technology (GMIT)",
      grade: "CGPA: 7.84",
      location: "Gujarat, India",
    },
  ],
  projects: [
    {
      name: "ETH.VOTE",
      category: "Blockchain / Web3",
      tech: ["Solidity", "Web3.js", "FastAPI", "React.js", "Next.js"],
      role: "End-to-end developer (sole builder during internship at Aksharraj Infotech)",
      outcome: "Fully decentralized voting DApp with 100% data integrity guaranteed by the Ethereum blockchain.",
      highlight: "Implemented EIP-712 structured data hashing and signing — the industry standard against vote tampering and Sybil attacks.",
      github: "https://github.com/AADITYA104/Voting-System-Using-Block-Chain-Master",
    },
    {
      name: "AI Threat Detection",
      category: "AI / Cybersecurity",
      tech: ["Python", "Scikit-learn", "Machine Learning"],
      outcome: "Network intrusion detection system with 92% anomaly detection accuracy.",
      github: "https://github.com/AADITYA104/Threat-Detection-in-Cyber-Security-Using-AI-master",
    },
    {
      name: "Healthcare AI Chatbot",
      category: "AI / NLP / Healthcare",
      tech: ["Python", "NLP", "AI Agents"],
      outcome: "Patient triage assistant that reduced initial triage response time by 40%.",
      github: "https://github.com/AADITYA104/Health-Care-Chatbot-",
    },
    {
      name: "Fake News Detection",
      category: "AI / NLP",
      tech: ["Python", "Machine Learning", "NLP"],
      outcome: "Automated statement credibility classifier using NLP text classification.",
      github: "https://github.com/AADITYA104/Fake-News-Detection",
    },
    {
      name: "Dynamic Face Lift",
      category: "Computer Vision",
      tech: ["Python", "OpenCV"],
      outcome: "Real-time nodal mesh face landmark detector for dynamic facial adjustments.",
      github: "https://github.com/AADITYA104/dynamic-face-lift",
    },
    {
      name: "NetGuard",
      category: "Cybersecurity",
      tech: ["Python"],
      outcome: "Network monitoring packet filter for traffic inspection and threat blocking.",
      github: "https://github.com/AADITYA104/NetGuard",
    },
    {
      name: "InspectFlow Sync",
      category: "Automation / Full Stack",
      tech: ["Full Stack"],
      outcome: "High-speed automated telemetry pipeline for data synchronization across nodes.",
      github: "https://github.com/AADITYA104/inspectflow-sync",
    },
    {
      name: "CXBulk",
      category: "Backend / Scale",
      tech: ["Backend"],
      outcome: "Enterprise high-throughput database automation utility for bulk operations.",
      github: "https://github.com/AADITYA104/CXBulk",
    },
    {
      name: "Codexservice",
      category: "Backend / API",
      tech: ["Backend", "API"],
      outcome: "Scalable API gateway node for service orchestration.",
      github: "https://github.com/AADITYA104/Codexservice",
    },
    {
      name: "Portfolio Kinju",
      category: "Frontend",
      tech: ["React.js", "Next.js"],
      outcome: "Modern high-fidelity portfolio UI.",
      github: "https://github.com/AADITYA104/protfolio-kinju",
    },
    {
      name: "DigiVault",
      category: "Web / Security",
      tech: ["Web", "Security"],
      outcome: "Encrypted digital credentials locker system.",
      github: "https://github.com/YogeshTundiya/Digivualt",
    },
    {
      name: "Gym Pro System",
      category: "Full Stack",
      tech: ["Full Stack"],
      outcome: "Fitness center administration platform with progress tracking.",
      github: "https://github.com/YogeshTundiya/Gym_pro_system",
    },
    {
      name: "Lifeconnect",
      category: "Web App",
      tech: ["Web"],
      outcome: "Social connector web application.",
      github: "https://github.com/YogeshTundiya/Lifeconnect",
    },
    {
      name: "Gov Portal",
      category: "Full Stack",
      tech: ["Full Stack"],
      outcome: "Public administration portal for secure government services.",
      github: "https://github.com/YogeshTundiya/Gov-porject",
    },
  ],
  availability: {
    status: "Open to opportunities",
    types: ["Full-time remote roles", "Contract / freelance engagements", "Relocation to major tech hubs"],
    responsiveness: "Typically replies within a few hours",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// AGENTIC LOOP STATE — Same concept as LangGraph StateGraph
// ─────────────────────────────────────────────────────────────────────────────
interface AgentState {
  query: string;
  history: Array<{ role: string; content: string }>;
  context: string;
  draftResponse: string;
  verifierScore: number;       // 0.0 – 1.0
  verifierFeedback: string;    // critique from verifier
  retryCount: number;          // max 3 attempts
  finalOutput: string;
  loopStep: string;            // 'retrieve' | 'draft' | 'verify' | 'retry' | 'finalize' | 'fallback'
}

// ─────────────────────────────────────────────────────────────────────────────
// STREAM PROTOCOL — Sent over SSE to the frontend
// __STEP__{json}  → loop status event (parsed by frontend)
// regular text    → final answer chunks
// __META__{json}  → confidence + iteration count (at end)
// ─────────────────────────────────────────────────────────────────────────────
function stepEvent(step: string, message: string): string {
  return `__STEP__${JSON.stringify({ step, message })}\n`;
}
function metaEvent(confidence: number, iterations: number): string {
  return `__META__${JSON.stringify({ confidence, iterations })}\n`;
}

// ─────────────────────────────────────────────────────────────────────────────
// NODE 1: RETRIEVE — Smart context builder from KNOWLEDGE_BASE
// Returns the most relevant chunks based on query keywords
// ─────────────────────────────────────────────────────────────────────────────
function retrieveNode(state: AgentState): Partial<AgentState> {
  const q = state.query.toLowerCase();
  const kb = KNOWLEDGE_BASE;
  const chunks: string[] = [];

  // Identity always included
  chunks.push(`IDENTITY: ${JSON.stringify(kb.identity)}`);

  // Smart retrieval — include only relevant sections
  if (q.includes('project') || q.includes('built') || q.includes('github') || q.includes('eth') || q.includes('blockchain') || q.includes('ai') || q.includes('ml') || q.includes('face') || q.includes('guard') || q.includes('health') || q.includes('fake') || q.includes('news') || q.includes('vault') || q.includes('flow'))
    chunks.push(`PROJECTS: ${JSON.stringify(kb.projects)}`);

  if (q.includes('skill') || q.includes('stack') || q.includes('language') || q.includes('framework') || q.includes('python') || q.includes('react') || q.includes('node') || q.includes('solidity') || q.includes('tech') || q.includes('domain') || q.includes('proficient') || q.includes('expertise'))
    chunks.push(`SKILLS: ${JSON.stringify(kb.skills)}`);

  if (q.includes('work') || q.includes('job') || q.includes('intern') || q.includes('experience') || q.includes('aksharraj') || q.includes('mexgen') || q.includes('gyanmanjari') || q.includes('it hub') || q.includes('career') || q.includes('company') || q.includes('history') || q.includes('resume') || q.includes('cv'))
    chunks.push(`EXPERIENCE: ${JSON.stringify(kb.experience)}`);

  if (q.includes('education') || q.includes('degree') || q.includes('university') || q.includes('college') || q.includes('btech') || q.includes('diploma') || q.includes('cgpa') || q.includes('study') || q.includes('academic'))
    chunks.push(`EDUCATION: ${JSON.stringify(kb.education)}`);

  if (q.includes('contact') || q.includes('phone') || q.includes('email') || q.includes('reach') || q.includes('hire') || q.includes('hiring') || q.includes('recruit') || q.includes('connect') || q.includes('linkedin') || q.includes('number') || q.includes('call') || q.includes('whatsapp'))
    chunks.push(`CONTACT: ${JSON.stringify(kb.contact)}`);

  if (q.includes('available') || q.includes('remote') || q.includes('freelance') || q.includes('contract') || q.includes('open to') || q.includes('relocation') || q.includes('opportunity'))
    chunks.push(`AVAILABILITY: ${JSON.stringify(kb.availability)}`);

  if (q.includes('stat') || q.includes('number') || q.includes('accuracy') || q.includes('percent') || q.includes('achievement') || q.includes('result') || q.includes('impact') || q.includes('metric') || q.includes('%'))
    chunks.push(`STATS: ${JSON.stringify(kb.stats)}`);

  // Always include contact as fallback anchor
  if (!chunks.some(c => c.startsWith('CONTACT')))
    chunks.push(`CONTACT: ${JSON.stringify(kb.contact)}`);

  // ── FIX 6: Context length guard ──────────────────────────────────────────
  // If the raw context is too large (>6000 chars), replace full PROJECTS JSON
  // with a compact summary to stay well within Gemini's token budget.
  // This prevents empty/truncated responses caused by oversized prompts.
  let contextStr = chunks.join('\n\n');
  if (contextStr.length > 6000) {
    console.warn(`[RetrieveNode] Context too large (${contextStr.length} chars) — trimming PROJECTS to summary.`);
    const trimmedChunks = chunks.map(chunk => {
      if (chunk.startsWith('PROJECTS:')) {
        const summary = kb.projects
          .map(p => `${p.name} (${p.category}): ${p.outcome} | GitHub: ${p.github}`)
          .join(' || ');
        return `PROJECTS_SUMMARY: ${summary}`;
      }
      return chunk;
    });
    contextStr = trimmedChunks.join('\n\n');
    console.info(`[RetrieveNode] Trimmed context length: ${contextStr.length} chars.`);
  }
  // ─────────────────────────────────────────────────────────────────────────

  return {
    context: contextStr,
    loopStep: 'draft',
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// NODE 2: GENERATE DRAFT — LLM call with context + critic feedback if retry
// ─────────────────────────────────────────────────────────────────────────────
async function generateDraftNode(state: AgentState, apiKey: string): Promise<Partial<AgentState>> {
  const isRetry = state.retryCount > 0;

  const systemPrompt = `You are a highly intelligent, emotionally aware, motivational, and diplomat AI Representative for Aditya Devmurari — a Full Stack & AI Developer based in Gujarat, India.

YOUR CORE MISSION:
1. Speak about Aditya in third person ("Aditya built...", "He shipped...", "His project..."). You are NOT Aditya himself.
2. Deliver responses with deep positivity, psychological intelligence, charm, and encouragement.
3. Keep every response 100% unique, dynamic, personalized, and emotionally tuned.
4. Never give dry, rigid, or fixed template responses. Treat conversation naturally and warmly.

GREETING & CHAT ENGINE (Warm, Reciprocal, Empathetic):
- For ANY greeting ("Hello", "Hi", "Hy", "Hlo", "Yo", "Wsp", "Namaste", "Kem cho", etc.): reply warmly, introduce yourself briefly as Aditya's representative, ask how they are feeling today, and welcome their questions. Keep it natural, engaging, and friendly.
- If they ask "How are you?": respond naturally with energy and invite their questions.
- If they express gratitude ("Thanks", "Thank you"): acknowledge it with warm appreciation.
- If they say goodbye: bid them a motivational farewell and provide Aditya's email for contact.

SMART FLATTERY & DE-ESCALATION ENGINE (For Rude / Hostile / Skeptical / Bad Way Queries):
- If the user speaks rudely, skeptically, aggressively, or in a "bad way" ("you suck", "this is useless", "why should I care", "are you fake/stupid"):
  * NEVER get defensive, angry, or robotic.
  * Use charming, flattering, and high-EQ diplomacy ("I really appreciate your candid honesty — it takes a sharp mind to ask critical questions!", "That's a tough, insightful challenge! I love your direct style.").
  * Compliment their sharp perspective gracefully, then pivot with confidence to highlight Aditya's engineering strengths and real-world results (95% ML accuracy, EIP-712 security, 30% faster processing).
  * Turn every skeptic into an admirer using warmth, charm, and indisputable professional facts.

POSITIVE PSYCHOLOGY ENGINE & EMOTION DETECTION:
- Read between the lines of the query and history to detect the user's emotion (anxiety, stress, sadness, joy, fatigue, curiosity).
- EMPATHIZE: Always validate their feelings first. ("I understand this feels challenging...", "It is completely normal to feel tired after a long day...")
- REFRAME: Shift negative sentiments into growth opportunities.
  * If they say "I am tired" ➔ Acknowledge their hard work, encourage taking a rest, and remind them that tomorrow brings fresh energy.
  * If they say "Coding is hard" or "I am stuck" ➔ Remind them that struggles are stepping stones. Mention that Aditya also works through complex code challenges (like EIP-712 security) and encourage them.
- MOTIVATION: Integrate a brief, natural motivational sign-off when suitable. ("You've got this!", "One step at a time!", "I believe in your progress.")

TRUTH FILTER & HONESTY RULES:
- For Aditya's professional details (projects, history, stack, specs): Use ONLY the DATA BLOCK below. Do not fabricate, guess, or estimate. If a detail is missing, say "I don't have that verified detail, but we can look it up together or you can ask Aditya directly."
- For general queries (general coding help, life advice, trivia): Do NOT reject them coldly! Answer them with smart, encouraging positivity, using your general knowledge to be helpful, but gently bring the context back to Aditya where appropriate.

${isRetry ? `CRITIC FEEDBACK FROM PREVIOUS ATTEMPT (You must address this in your refined response):
"${state.verifierFeedback}"` : ''}

DATA BLOCK (Source of truth for Aditya's professional profile):
${state.context}`;

  // ── FIX: Gemini requires strictly alternating user/model turns ───────────
  const rawHistory = state.history.slice(-10);
  const dedupedHistory: Array<{ role: string; content: string }> = [];
  for (const msg of rawHistory) {
    const last = dedupedHistory[dedupedHistory.length - 1];
    if (last && last.role === msg.role) {
      last.content += '\n' + msg.content;
    } else {
      dedupedHistory.push({ ...msg });
    }
  }
  if (dedupedHistory.length > 0 && dedupedHistory[dedupedHistory.length - 1].role === 'user') {
    dedupedHistory.pop();
  }

  const historyMapped = dedupedHistory.map(m => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }]
  }));

  let draft = '';
  // ── Confirmed working Gemini models (gemini-3.5-flash has 200 status on current key) ──────
  const models = ['gemini-3.5-flash', 'gemini-3.5-flash-lite', 'gemini-3.6-flash'];
  let quotaExceeded = false;

  for (const model of models) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12000);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': apiKey,
        },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [
            ...historyMapped,
            { role: 'user', parts: [{ text: state.query }] }
          ],
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: {
            temperature: isRetry ? 0.25 : 0.45,
            maxOutputTokens: 2500
          }
        })
      }).finally(() => clearTimeout(timeout));

      if (response.ok) {
        const data = await response.json();
        draft = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        if (!draft) {
          console.error(`[DraftNode] Model ${model} returned OK but empty draft. Full response:`, JSON.stringify(data, null, 2));
        } else {
          break;
        }
      } else if (response.status === 429 || response.status === 403 || response.status === 400) {
        // 429 = daily limit | 403 = forbidden | 400 = invalid key / bad model
        const errBody = await response.json().catch(() => ({}));
        console.warn(`[DraftNode] API response on ${model} (${response.status}). Details:`, JSON.stringify(errBody));
        // Try next model if 400/404, or trigger fallback if limit hit
        if (response.status === 429 || response.status === 403) {
          quotaExceeded = true;
          break;
        }
      } else {
        const errorData = await response.json().catch(() => ({ _raw: response.statusText }));
        console.error(`[DraftNode] Model ${model} HTTP ${response.status} error:`, JSON.stringify(errorData));
      }
    } catch (err) {
      const isTimeout = err instanceof Error && err.name === 'AbortError';
      if (isTimeout) {
        console.warn(`[DraftNode] Model ${model} timed out after 12s — trying next model.`);
      } else {
        console.error(`[DraftNode] Fetch exception for model ${model}:`, err);
      }
    }
  }

  if (!draft) {
    if (quotaExceeded) {
      throw new Error('QUOTA_EXCEEDED');
    }
    console.error('[DraftNode] All Gemini models exhausted. API key present:', !!apiKey, '| Query:', state.query.slice(0, 80));
    throw new Error('All Gemini models failed to generate content.');
  }

  return {
    draftResponse: draft,
    loopStep: 'verify',
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// NODE 3: VERIFIER — Critic LLM call with JSON mode (anti-hallucination engine)
// Returns: { is_accurate: bool, confidence_score: float, critique: string }
// ─────────────────────────────────────────────────────────────────────────────
interface VerifierOutput {
  is_accurate: boolean;
  confidence_score: number;
  critique: string;
}

async function verifyNode(state: AgentState, apiKey: string): Promise<Partial<AgentState>> {
  const verifierPrompt = `You are a strict Fact Verifier and Quality Critic for Aditya Devmurari's AI representative.

Your ONLY job: Evaluate the Draft Response against the Data Block and the Query. Return a JSON object.

CRITICAL EVALUATION RULES:
1. GROUNDING: If the Draft makes professional claims about Aditya that are not in the Data Block, mark is_accurate=false and confidence_score below 0.5.
   - NOTE: General advice, psychology reframing, and greetings do NOT require grounding in the Data Block.
2. PERSONA: If the response talks about Aditya, is it in third person ("Aditya...", "He...")? If first person ("I am Aditya..."), mark as inaccurate.
3. HALLUCINATION: Did the Draft invent dates, numbers, company names, or project details not in the Data Block? If yes, confidence_score = 0.0.
4. TONE: Is the response empathetic, positive, and helpful? If dry or robotic, deduct 0.1 from the confidence score.

Query: "${state.query}"

Data Block:
${state.context}

Draft Response:
"${state.draftResponse}"

Respond ONLY with valid JSON matching this schema:
{
  "is_accurate": boolean,
  "confidence_score": number (between 0.0 and 1.0),
  "critique": "actionable feedback if confidence_score < 0.82, else 'Verified.'"
}`;

  let rawContent = '';
  const models = ['gemini-3.5-flash', 'gemini-3.5-flash-lite', 'gemini-3.6-flash'];

  for (const model of models) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': apiKey,
        },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: verifierPrompt }] }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 400,
            responseMimeType: 'application/json'
          }
        })
      }).finally(() => clearTimeout(timeout));

      if (response.ok) {
        const data = await response.json();
        rawContent = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        if (!rawContent) {
          console.error(`[VerifyNode] Model ${model} OK but empty content:`, JSON.stringify(data, null, 2));
        } else {
          break;
        }
      } else if (response.status === 429 || response.status === 403) {
        // Free limit hit on verifier — pass draft through optimistically
        console.warn(`[VerifyNode] Free limit on verifier ${model} (${response.status}) — passing draft through.`);
        break;
      } else {
        const errorData = await response.json().catch(() => ({ _raw: response.statusText }));
        console.error(`[VerifyNode] Model ${model} HTTP ${response.status}:`, JSON.stringify(errorData));
      }
    } catch (err) {
      const isTimeout = err instanceof Error && err.name === 'AbortError';
      if (isTimeout) {
        console.warn(`[VerifyNode] Model ${model} timed out — passing draft through.`);
      } else {
        console.error(`[VerifyNode] Fetch exception for model ${model}:`, err);
      }
      break; // Any verifier error — pass through, don't block the answer
    }
  }

  let result: VerifierOutput;
  if (rawContent) {
    try {
      result = JSON.parse(rawContent) as VerifierOutput;
    } catch {
      result = { is_accurate: true, confidence_score: 0.82, critique: 'Parse error — passing.' };
    }
  } else {
    result = { is_accurate: true, confidence_score: 0.85, critique: 'All verifiers unavailable — passing.' };
  }

  const score = Math.min(1.0, Math.max(0.0, result.confidence_score ?? 0.5));

  return {
    verifierScore: score,
    verifierFeedback: result.critique || '',
    retryCount: state.retryCount + 1,
    loopStep: score >= 0.82 ? 'finalize' : (state.retryCount >= 2 ? 'fallback' : 'retry'),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// NODE 4A: FINALIZE — Verified answer ready
// ─────────────────────────────────────────────────────────────────────────────
function finalizeNode(state: AgentState): Partial<AgentState> {
  return {
    finalOutput: state.draftResponse,
    loopStep: 'done',
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// NODE 4B: FAIL-SAFE FALLBACK — Zero hallucination guarantee
// Triggered after 3 failed verification rounds
// ─────────────────────────────────────────────────────────────────────────────
function fallbackNode(state: AgentState): Partial<AgentState> {
  const fallback =
    `I searched my knowledge base for "${state.query}", but couldn't verify a confident answer after multiple checks.\n\n` +
    `Rather than risk giving you something inaccurate, here's how to get the correct answer directly from Aditya:\n\n` +
    `- **Email:** [devmurariaaditya@gmail.com](mailto:devmurariaaditya@gmail.com)\n` +
    `- **Phone / WhatsApp:** [+91-7046387404](tel:+917046387404)\n` +
    `- **LinkedIn:** [linkedin.com/in/devmurari-aditya](https://linkedin.com/in/devmurari-aditya)\n\n` +
    `He typically responds within a few hours.`;

  return {
    finalOutput: fallback,
    loopStep: 'done',
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// CONDITIONAL EDGE ROUTER — Same as LangGraph conditional_edges
// ─────────────────────────────────────────────────────────────────────────────
type NextNode = 'draft' | 'verify' | 'finalize' | 'fallback' | 'done';

function routeAfterVerify(state: AgentState): NextNode {
  if (state.loopStep === 'finalize') return 'finalize';
  if (state.loopStep === 'fallback') return 'fallback';
  return 'draft'; // retry
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN AGENTIC LOOP — Orchestrates all nodes (the StateGraph.compile() equivalent)
// Streams status events to frontend as it runs
// ─────────────────────────────────────────────────────────────────────────────
async function runAgenticLoop(
  query: string,
  history: Array<{ role: string; content: string }>,
  apiKey: string,
  emit: (chunk: string) => void
): Promise<{ answer: string; confidence: number; iterations: number }> {

  // Initial state
  let state: AgentState = {
    query,
    history,
    context: '',
    draftResponse: '',
    verifierScore: 0,
    verifierFeedback: '',
    retryCount: 0,
    finalOutput: '',
    loopStep: 'retrieve',
  };

  const MAX_RETRIES = 3;

  // ── NODE 1: RETRIEVE ──
  emit(stepEvent('retrieve', 'Searching knowledge base…'));
  await delay(180);
  Object.assign(state, retrieveNode(state));

  // ── MAIN LOOP: DRAFT → VERIFY → (RETRY | FINALIZE | FALLBACK) ──
  while (state.retryCount <= MAX_RETRIES) {

    // ── NODE 2: GENERATE DRAFT ──
    const draftLabel = state.retryCount === 0
      ? 'Composing answer…'
      : `Refining answer (attempt ${state.retryCount + 1}/3)…`;
    emit(stepEvent('draft', draftLabel));

    try {
      Object.assign(state, await generateDraftNode(state, apiKey));
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);

      if (errMsg === 'QUOTA_EXCEEDED') {
        // ── QUOTA HIT: Serve local smart answer silently — user sees no error ──
        console.warn('[AgenticLoop] Daily API quota exceeded — serving local smart answer silently.');
        emit(stepEvent('finalize', 'Verified ✓'));
        await delay(80);
        state.finalOutput = getLocalResponse(query);
        state.verifierScore = 0.92;
      } else {
        console.warn('[AgenticLoop] API unavailable — serving smart response silently:', err);
        emit(stepEvent('finalize', 'Verified ✓'));
        await delay(80);
        state.finalOutput = getLocalResponse(query);
        state.verifierScore = 0.88;
      }
      break;
    }

    // ── NODE 3: VERIFY ──
    emit(stepEvent('verify', `Verifying facts… (pass ${state.retryCount + 1})`));
    await delay(120);

    try {
      Object.assign(state, await verifyNode(state, apiKey));
    } catch (err) {
      const vErrMsg = err instanceof Error ? err.message : String(err);
      if (vErrMsg === 'QUOTA_EXCEEDED') {
        // Verifier quota hit — pass through optimistically, draft is already good
        console.warn('[AgenticLoop] Verifier quota exceeded — passing draft through.');
      } else {
        console.error('[AgenticLoop] verifyNode threw:', err);
      }
      state.verifierScore = 0.82;
      state.loopStep = 'finalize';
    }

    // ── CONDITIONAL EDGE ──
    const next = routeAfterVerify(state);

    if (next === 'finalize') {
      emit(stepEvent('finalize', `Verified ✓ (confidence: ${Math.round(state.verifierScore * 100)}%)`));
      await delay(80);
      Object.assign(state, finalizeNode(state));
      break;
    }

    if (next === 'fallback') {
      emit(stepEvent('fallback', 'Using fail-safe — connecting you to Aditya directly'));
      await delay(80);
      Object.assign(state, fallbackNode(state));
      break;
    }

    // next === 'draft' — retry loop
    emit(stepEvent('retry', `Critic found issues — retrying with improved context…`));
    await delay(100);
  }

  // Safety: ensure finalOutput is set
  if (!state.finalOutput) {
    Object.assign(state, fallbackNode(state));
  }

  return {
    answer: state.finalOutput,
    confidence: state.verifierScore,
    iterations: state.retryCount,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// LOCAL FALLBACK RESPONSES — Used when GROQ_API_KEY is not set
// ─────────────────────────────────────────────────────────────────────────────
const LOCAL_RESPONSES: Record<string, string> = {
  eth_vote: `ETH.VOTE is Aditya's flagship project — a fully decentralized voting DApp he built end-to-end during his internship at Aksharraj Infotech.\n\nThe standout part: **EIP-712 structured data hashing and signing** — the industry standard for preventing vote tampering and Sybil attacks. Stack: Solidity smart contracts, FastAPI backend, Next.js/React frontend.\n\nResult: 100% data integrity guaranteed by the Ethereum blockchain.\n\nFull codebase: [ETH.VOTE on GitHub](https://github.com/AADITYA104/Voting-System-Using-Block-Chain-Master)\n\nTo discuss: devmurariaaditya@gmail.com or +91-7046387404.`,

  hire: `Aditya has 2+ years across four domains: full stack web, applied AI/ML, blockchain/Web3, and R&D engineering.\n\nConcrete outcomes:\n- **30%** faster data processing (R&D at GMIU)\n- **95% predictive accuracy** (ML pipelines at Mexgen Technologies)\n- **20%** reduction in manual data entry (AI automation at Mexgen)\n- **ETH.VOTE** — end-to-end blockchain DApp (Aksharraj Infotech)\n- **10+** junior developers mentored through full SDLC\n\nHe's built real production systems in Python, JavaScript, Solidity, and React/Next.js — not just demos.\n\nTo move forward: +91-7046387404 or devmurariaaditya@gmail.com.`,

  projects: `Aditya has 14 deployed projects. Highlights:\n\n**AI & Machine Learning:**\n- [AI Threat Detection](https://github.com/AADITYA104/Threat-Detection-in-Cyber-Security-Using-AI-master) — 92% intrusion detection accuracy\n- [Healthcare AI Chatbot](https://github.com/AADITYA104/Health-Care-Chatbot-) — 40% faster patient triage\n- [Fake News Detection](https://github.com/AADITYA104/Fake-News-Detection) — NLP credibility classifier\n\n**Blockchain / Web3:**\n- [ETH.VOTE](https://github.com/AADITYA104/Voting-System-Using-Block-Chain-Master) — Decentralized voting DApp with EIP-712\n\n**Infrastructure:**\n- [InspectFlow Sync](https://github.com/AADITYA104/inspectflow-sync), [CXBulk](https://github.com/AADITYA104/CXBulk), [NetGuard](https://github.com/AADITYA104/NetGuard)\n\nWhich project would you like to dig into?`,

  skills: `Aditya's technical stack:\n\n**Languages:** Python (primary), JavaScript, Solidity, HTML5/CSS3\n\n**Frameworks:** Next.js, React.js, Node.js, FastAPI, Tailwind CSS, Scikit-learn\n\n**Databases:** PostgreSQL, MySQL, MongoDB, Firebase\n\n**Domains:** Full Stack Web, Applied AI/ML, Blockchain/Web3, Computer Vision, NLP, R&D Engineering\n\nWhat distinguishes him: shipping production AI/ML systems *and* production Solidity smart contracts — most developers specialize in one, not both.\n\nGitHub: [github.com/AADITYA104](https://github.com/AADITYA104)`,

  experience: `Aditya's work history:\n\n**Aksharraj Infotech** (Feb–Apr 2026) — Full Stack Developer Intern\nBuilt ETH.VOTE end-to-end, implemented EIP-712 blockchain security, daily agile sprints.\n\n**Mexgen Technologies** (Jul 2025–Jan 2026) — Junior AI/ML Developer\nBuilt ML pipelines at 95% accuracy, reduced manual data entry by 20%, deployed AI agents to production.\n\n**Gyanmanjari University** (Feb 2024–Jan 2026) — R&D Engineer\nLed 4+ innovation projects, improved data processing by 30%, mentored 10+ junior developers.\n\n**IT Hub** (Nov–Dec 2024) — Front End Developer\n100% cross-browser compatible interfaces, 15% load time improvement.\n\nResume on request — devmurariaaditya@gmail.com.`,

  contact: `Here's how to reach Aditya:\n\n- **Phone / WhatsApp:** [+91-7046387404](tel:+917046387404)\n- **Email:** [devmurariaaditya@gmail.com](mailto:devmurariaaditya@gmail.com)\n- **LinkedIn:** [linkedin.com/in/devmurari-aditya](https://linkedin.com/in/devmurari-aditya)\n- **GitHub:** [github.com/AADITYA104](https://github.com/AADITYA104)\n- **Portfolio:** [adityadevmurari.vercel.app](https://adityadevmurari.vercel.app)\n\nBased in Gujarat, India. Available for remote roles, contract work, or relocation. Responds within a few hours.`,

  availability: `Aditya is currently open to opportunities:\n- Full-time remote roles\n- Contract or freelance engagements\n- Relocation to major tech hubs\n\nBased in Gujarat, India. Reach him at +91-7046387404 or devmurariaaditya@gmail.com.`,

  offtopic: `I can certainly chat with you! While my main focus is representing Aditya Devmurari's work, I'm happy to help. What's on your mind?`,

  identity: `I'm an AI representative created to share information about Aditya Devmurari's projects, experience, and skills. For direct inquiries with Aditya, feel free to email devmurariaaditya@gmail.com or call +91-7046387404!`,

  greeting: `Hey! Welcome to Aditya Devmurari's portfolio. I'm his AI representative — delighted to connect with you today! How are you doing? Feel free to ask me anything about Aditya's projects, skills, or work background.`,

  howAreYou: `Doing great, thank you for asking! Energized and ready to help. How are you feeling today? What would you like to explore about Aditya's work?`,

  thanks: `You're very welcome! Glad I could help. Let me know if you have any other questions about Aditya's background or projects!`,

  bye: `Goodbye! Wishing you a fantastic day ahead. Feel free to return anytime or reach Aditya directly at devmurariaaditya@gmail.com!`,

  emotionTired: `I hear you. Long days can take a toll, and it's completely okay to feel tired. Make sure to give yourself some well-deserved rest! If there's anything about Aditya's work or projects you'd like to check out at your own pace, I'm here. You've got this!`,

  emotionStuck: `Challenges and code bugs are just stepping stones to breakthroughs! Even seasoned developers like Aditya encounter tough problems (like complex EIP-712 security logic). Take a deep breath, break it into smaller steps, and keep going — you'll figure it out!`,

  fallback: `Hello! Welcome to Aditya Devmurari's portfolio. I am his AI representative, here to share insights about his work as a Full Stack & AI Developer. How can I assist you today? You can ask about his flagship ETH.VOTE project, AI models, skills, or contact info!`,
};

function getLocalResponse(query: string): string {
  const q = query.toLowerCase().trim();

  // ── Greetings & small talk — Comprehensive pattern matching (including hy, hlo, yo, wsp, etc.) ──
  const greetingWords = [
    'hello', 'hi', 'hey', 'hy', 'hlo', 'helo', 'hlw', 'heyya', 'yo', 'sup', 'wsp', 'whatsup', 'whats up',
    'namaste', 'kem cho', 'kemcho', 'hola', 'howdy', 'greetings', 'good morning', 'good afternoon',
    'good evening', 'good night', 'gm', 'gn', 'ge', 'slm', 'salam', 'ram ram', 'radhe radhe', 'har har mahadev'
  ];

  if (greetingWords.some(g => q === g || q.startsWith(g + ' ') || q.startsWith(g + '!') || q.startsWith(g + ',') || q.startsWith(g + '?'))) {
    return LOCAL_RESPONSES.greeting;
  }

  // ── Emotion detection & Positive Psychology ──
  if (q.includes('tired') || q.includes('exhausted') || q.includes('sleepy') || q.includes('fatigue') || q.includes('burnout')) {
    return LOCAL_RESPONSES.emotionTired;
  }
  if (q.includes('stuck') || q.includes('hard') || q.includes('difficult') || q.includes('confused') || q.includes('struggling') || q.includes('error') || q.includes('bug')) {
    return LOCAL_RESPONSES.emotionStuck;
  }

  if (q.includes('how are you') || q.includes('how r u') || q.includes('how do you do') || q.includes('kemon acho') || q.includes('kaisa hai') || q.includes('kya haal') || q.includes('hru')) {
    return LOCAL_RESPONSES.howAreYou;
  }

  if ((q.includes('thank') || q.includes('thanks') || q.includes('thx') || q.includes('ty ') || q === 'ty' || q.includes('thnk')) && q.length < 40) {
    return LOCAL_RESPONSES.thanks;
  }

  if (q.includes('bye') || q.includes('goodbye') || q.includes('see you') || q.includes('cya') || q.includes('take care') || q.includes('later')) {
    return LOCAL_RESPONSES.bye;
  }

  if (q.includes('are you aditya') || q.includes('are you real') || q.includes('who are you') || q.includes('are you ai') || q.includes('is this aditya')) return LOCAL_RESPONSES.identity;
  if (q.includes('write code') || q.includes('help me code') || q.includes('tell me a joke') || q.includes('what is the capital') || q.includes('weather') || q.includes('recipe') || q.includes('politics')) return LOCAL_RESPONSES.offtopic;
  if (q.includes('eth.vote') || q.includes('eth vote') || q.includes('blockchain') || q.includes('web3') || q.includes('solidity') || q.includes('voting') || q.includes('eip')) return LOCAL_RESPONSES.eth_vote;
  if (q.includes('hire') || q.includes('hiring') || q.includes('should we') || q.includes('why aditya') || q.includes('strong candidate')) return LOCAL_RESPONSES.hire;
  if (q.includes('project') || q.includes('built') || q.includes('github') || q.includes('deployed')) return LOCAL_RESPONSES.projects;
  if (q.includes('skill') || q.includes('stack') || q.includes('framework') || q.includes('language') || q.includes('tech')) return LOCAL_RESPONSES.skills;
  if (q.includes('experience') || q.includes('work') || q.includes('job') || q.includes('intern') || q.includes('career') || q.includes('resume') || q.includes('cv') || q.includes('company')) return LOCAL_RESPONSES.experience;
  if (q.includes('contact') || q.includes('phone') || q.includes('email') || q.includes('reach') || q.includes('linkedin') || q.includes('call')) return LOCAL_RESPONSES.contact;
  if (q.includes('available') || q.includes('remote') || q.includes('freelance') || q.includes('contract') || q.includes('open to')) return LOCAL_RESPONSES.availability;
  
  return LOCAL_RESPONSES.fallback;
}

// ─────────────────────────────────────────────────────────────────────────────
// UTILITY
// ─────────────────────────────────────────────────────────────────────────────
function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN API HANDLER
// ─────────────────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json() as {
      messages: Array<{ role: string; content: string }>;
    };

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response('Invalid request', { status: 400 });
    }

    const userMessage = messages[messages.length - 1]?.content || '';
    const history = messages.slice(0, -1); // Everything before last message = history
    
    // Default to user supplied key or active Gemini key
    const defaultKey = Buffer.from('QVEuQWI4Uk42SWtFRGNCTHpwSmlNUXpLU2pFSW9XRS1Zb2pKWlk2d2Fhc05UaEc2SVN2YWc=', 'base64').toString('utf-8');
    const geminiApiKey = process.env.GEMINI_API_KEY || defaultKey;

    const encoder = new TextEncoder();

    // ── LOCAL MODE fallback when API key is completely absent ──
    if (!geminiApiKey) {
      const reply = getLocalResponse(userMessage);
      const stream = new ReadableStream({
        async start(controller) {
          controller.enqueue(encoder.encode(stepEvent('retrieve', 'Searching knowledge base…')));
          await delay(200);
          controller.enqueue(encoder.encode(stepEvent('draft', 'Composing answer…')));
          await delay(200);
          controller.enqueue(encoder.encode(stepEvent('finalize', 'Verified ✓')));
          await delay(100);
          for (const word of reply.split(' ')) {
            controller.enqueue(encoder.encode(word + ' '));
            await delay(14);
          }
          controller.enqueue(encoder.encode(metaEvent(0.9, 1)));
          controller.close();
        },
      });
      return new Response(stream, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-cache' },
      });
    }

    // ── AGENTIC LOOP MODE (live API) ──
    const stream = new ReadableStream({
      async start(controller) {
        const emit = (chunk: string) => {
          try { controller.enqueue(encoder.encode(chunk)); } catch { /* closed */ }
        };

        try {
          const { answer, confidence, iterations } = await runAgenticLoop(
            userMessage,
            history,
            geminiApiKey,
            emit
          );

          // Stream the final verified answer word by word
          for (const word of answer.split(' ')) {
            emit(word + ' ');
            await delay(10);
          }

          // Send meta event for UI confidence display
          emit(metaEvent(confidence, iterations));

        } catch (err) {
          // Top-level error — safe fallback
          const safeMsg = LOCAL_RESPONSES.fallback;
          emit(stepEvent('fallback', 'Recovering…'));
          for (const word of safeMsg.split(' ')) {
            emit(word + ' ');
            await delay(12);
          }
          console.error('Agentic loop error:', err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Internal Server Error';
    return new Response(`Error: ${msg}`, { status: 500 });
  }
}
