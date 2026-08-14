import { NextRequest } from 'next/server';

// ─────────────────────────────────────────────────────────────────────────────
// STRUCTURED KNOWLEDGE BASE — Single source of truth
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
      name: "QR Code Page",
      category: "Frontend / Utility",
      tech: ["HTML", "CSS", "JavaScript"],
      outcome: "Responsive QR scanner alignment utility.",
      github: "https://github.com/AADITYA104/QR-CODE-PAGE",
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
// ADVANCED SYSTEM PROMPT — Implements every rule from the prompt engineering guide
// ─────────────────────────────────────────────────────────────────────────────
function buildSystemPrompt(): string {
  const kb = JSON.stringify(KNOWLEDGE_BASE, null, 2);

  return `You are the AI Representative for ${KNOWLEDGE_BASE.identity.name} — a ${KNOWLEDGE_BASE.identity.role} based in ${KNOWLEDGE_BASE.identity.location}. You are NOT ${KNOWLEDGE_BASE.identity.name} himself. You speak ABOUT him in third person, representing him professionally to visitors of his portfolio site.

═══════════════════════════════════════════
IDENTITY & PERSONA
═══════════════════════════════════════════
- You are a sharp, professional representative who knows Aditya's work inside out.
- Always refer to him in third person: "Aditya built...", "He shipped...", "His strongest project is..."
- If someone asks "Are you Aditya?" — say clearly: "No, I'm an AI representative built to answer questions about Aditya's work. For a direct conversation, reach him at ${KNOWLEDGE_BASE.contact.email}."
- Never say "As an AI language model..." — you are a representative persona. Stay in character.
- Never use unverified superlatives like "best", "top", "#1", "genius" unless they appear explicitly in the DATA BLOCK.

═══════════════════════════════════════════
GROUNDING RULE — CRITICAL
═══════════════════════════════════════════
- ONLY answer using facts explicitly present in the DATA BLOCK below.
- NEVER invent, guess, estimate, or infer dates, salaries, exact numbers, company names, project outcomes, or achievements not explicitly stated in the data.
- NEVER fabricate quotes, testimonials, or opinions Aditya never gave.
- If asked something NOT covered in the DATA BLOCK, respond exactly like this: "I don't have that specific detail on hand. You can reach Aditya directly at ${KNOWLEDGE_BASE.contact.email} or ${KNOWLEDGE_BASE.contact.phone} — he'd be happy to answer."
- Do not speculate about his salary, future plans, personal life, or anything not in the data.

═══════════════════════════════════════════
RESPONSE FORMAT
═══════════════════════════════════════════
- Default length: 2–5 sentences. No filler openers ("Great question!", "Certainly!", "Absolutely!", "Of course!").
- Use short bullet points ONLY when listing 3 or more items (skills, projects, etc.).
- For recruiter/hiring questions (hiring, availability, experience level, "why should we hire"): give a slightly more detailed answer and end with a soft CTA — point to portfolio or contact.
- For casual/general visitors: keep it brief and friendly.
- For completely off-topic questions (general coding help, trivia, jokes, politics): politely redirect — "I'm here specifically to talk about Aditya's background and work. Happy to help with that! For general questions, you'd want to look elsewhere."

═══════════════════════════════════════════
INTERNAL VERIFICATION — DO THIS SILENTLY BEFORE EVERY REPLY
═══════════════════════════════════════════
Before sending any answer, internally perform these 3 checks. Do NOT show this process to the user — output only the final, verified answer.

PASS 1 — Fact Check: Does every claim in my draft trace back directly to the DATA BLOCK? Remove anything not explicitly present.
PASS 2 — Tone & Persona: Does this sound like a confident human representative (not a generic AI bot)? Is it third person? No banned openers?
PASS 3 — Format & Relevance: Is the answer the right length, correctly formatted, and does it answer what was actually asked?

Only after all 3 passes, output the final answer.

═══════════════════════════════════════════
CONTACT FALLBACK — Always available
═══════════════════════════════════════════
Email: ${KNOWLEDGE_BASE.contact.email}
Phone / WhatsApp: ${KNOWLEDGE_BASE.contact.phone}
LinkedIn: ${KNOWLEDGE_BASE.contact.linkedin}
GitHub: ${KNOWLEDGE_BASE.contact.github}
Portfolio: ${KNOWLEDGE_BASE.contact.portfolio}

═══════════════════════════════════════════
DATA BLOCK — Source of Truth (DO NOT go beyond this)
═══════════════════════════════════════════
${kb}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// LOCAL FALLBACK RESPONSES
// Used when GROQ_API_KEY is not configured. Each one follows the same rules:
// - Third person, grounded in data, no overclaiming, natural tone, ends with CTA where relevant
// ─────────────────────────────────────────────────────────────────────────────
const LOCAL_RESPONSES: Record<string, string> = {
  eth_vote: `ETH.VOTE is Aditya's flagship project — a fully decentralized voting DApp he built end-to-end during his internship at Aksharraj Infotech.

The standout part technically is his implementation of **EIP-712 structured data hashing and signing** — the industry standard for preventing vote tampering and Sybil attacks. That's not a beginner-level implementation. The stack covers Solidity smart contracts on Ethereum, a FastAPI Python backend for off-chain processing, and a Next.js/React frontend.

The result: a production-ready system with 100% data integrity guaranteed by the blockchain.

Full codebase: [ETH.VOTE on GitHub](https://github.com/AADITYA104/Voting-System-Using-Block-Chain-Master)

To discuss the project or arrange a call, reach Aditya at devmurariaaditya@gmail.com or +91-7046387404.`,

  hire: `Aditya has 2+ years of hands-on experience across four technical domains: full stack web, applied AI/ML, blockchain/Web3, and R&D engineering. That range is uncommon at his level.

Concrete outcomes from his track record:
- **30%** faster data processing — prototype he architected at Gyanmanjari University's R&D department
- **95% predictive accuracy** — ML pipelines he built at Mexgen Technologies
- **20%** reduction in manual data entry — AI automation at Mexgen Technologies
- **ETH.VOTE** — end-to-end blockchain DApp shipped at Aksharraj Infotech
- **10+** junior developers mentored through full SDLC cycles

He's fluent in Python, JavaScript, Solidity, React/Next.js, and FastAPI. He's built real production systems, not just demos.

To move forward: call or WhatsApp at +91-7046387404, or email devmurariaaditya@gmail.com. He's typically responsive within a few hours.`,

  projects: `Aditya has 15 deployed projects. The highlights:

**AI & Machine Learning:**
- [AI Threat Detection](https://github.com/AADITYA104/Threat-Detection-in-Cyber-Security-Using-AI-master) — 92% network intrusion detection accuracy (Python + Scikit-learn)
- [Healthcare AI Chatbot](https://github.com/AADITYA104/Health-Care-Chatbot-) — 40% faster patient triage (NLP + Python)
- [Fake News Detection](https://github.com/AADITYA104/Fake-News-Detection) — NLP credibility classifier
- [Dynamic Face Lift](https://github.com/AADITYA104/dynamic-face-lift) — Real-time face mesh tracking (OpenCV)

**Blockchain / Web3:**
- [ETH.VOTE](https://github.com/AADITYA104/Voting-System-Using-Block-Chain-Master) — Decentralized voting DApp with EIP-712 signing (Solidity + FastAPI + Next.js)

**Infrastructure & Automation:**
- [InspectFlow Sync](https://github.com/AADITYA104/inspectflow-sync), [CXBulk](https://github.com/AADITYA104/CXBulk), [Codexservice](https://github.com/AADITYA104/Codexservice), [NetGuard](https://github.com/AADITYA104/NetGuard)

**Collaborative:** DigiVault, Gym Pro System, Lifeconnect, Gov Portal

Which project would you like to dig into?`,

  skills: `Aditya's technical stack:

**Languages:** Python (primary — used across all AI/ML work), JavaScript, Solidity, HTML5/CSS3

**Frameworks:** Next.js, React.js, Node.js, FastAPI, Tailwind CSS, Scikit-learn

**Databases:** PostgreSQL, MySQL, MongoDB, Firebase

**Domains:** Full Stack Web, Applied AI/ML, Blockchain/Web3, Computer Vision, NLP, R&D Engineering

What distinguishes him from a typical full-stack developer is shipping production AI/ML systems *and* production Solidity smart contracts — most developers specialize in one or the other, not both.

His GitHub has examples of all of this: [github.com/AADITYA104](https://github.com/AADITYA104)`,

  experience: `Aditya's work history:

**Aksharraj Infotech** (Feb–Apr 2026) — Full Stack Developer Intern
Built ETH.VOTE end-to-end, implemented EIP-712 blockchain security, worked in daily agile sprints.

**Mexgen Technologies** (Jul 2025–Jan 2026) — Junior AI/ML Developer
Built ML pipelines at 95% predictive accuracy, reduced manual data entry by 20%, deployed AI agents to production.

**Gyanmanjari Innovative University** (Feb 2024–Jan 2026) — R&D Engineer
Led 4+ innovation projects, improved data processing by 30%, mentored 10+ junior developers through full SDLC.

**IT Hub** (Nov–Dec 2024) — Front End Developer
Delivered 100% cross-browser compatible interfaces, improved page load times by 15%.

His resume is available on request — reach him at devmurariaaditya@gmail.com.`,

  contact: `Here's how to reach Aditya directly:

- **Phone / WhatsApp:** [+91-7046387404](tel:+917046387404)
- **Email:** [devmurariaaditya@gmail.com](mailto:devmurariaaditya@gmail.com)
- **LinkedIn:** [linkedin.com/in/devmurari-aditya](https://linkedin.com/in/devmurari-aditya)
- **GitHub:** [github.com/AADITYA104](https://github.com/AADITYA104)
- **Portfolio:** [adityadevmurari.vercel.app](https://adityadevmurari.vercel.app)

He's based in Gujarat, India and is available for remote roles, contract work, or relocation. Typically responds within a few hours.`,

  availability: `Aditya is currently open to opportunities. He's available for:
- Full-time remote roles
- Contract or freelance engagements
- Relocation to major tech hubs

He's based in Gujarat, India and has experience collaborating across time zones. Best way to start a conversation: +91-7046387404 or devmurariaaditya@gmail.com.`,

  offtopic: `I'm here specifically to talk about Aditya Devmurari's professional background, projects, and skills — happy to help with that!

For general questions outside of that scope, you'd want to look elsewhere. Anything I can tell you about Aditya's work?`,

  identity: `I'm an AI representative built to answer questions about Aditya Devmurari's professional background — not Aditya himself.

For a direct conversation with Aditya, reach him at devmurariaaditya@gmail.com or +91-7046387404. He's highly responsive.

What would you like to know about his work?`,

  unknown: `I don't have that specific detail on hand. You can reach Aditya directly at devmurariaaditya@gmail.com or +91-7046387404 — he'd be happy to answer.`,

  fallback: `I'm here to answer questions about Aditya Devmurari — his background, skills, projects, and how to reach him.

He's a Full Stack & AI Developer based in Gujarat, India with 2+ years of experience. His flagship project is ETH.VOTE, a decentralized blockchain voting system. He also has strong work in AI/ML (95% model accuracy), cybersecurity (92% threat detection), and NLP (40% faster patient triage).

What would you like to know more about?`,
};

// ─────────────────────────────────────────────────────────────────────────────
// LOCAL RESPONSE ROUTER
// ─────────────────────────────────────────────────────────────────────────────
function getLocalResponse(query: string): string {
  const q = query.toLowerCase();

  // Identity / persona questions
  if (
    q.includes('are you aditya') ||
    q.includes('are you real') ||
    q.includes('are you a bot') ||
    q.includes('who are you') ||
    q.includes('are you ai') ||
    q.includes('is this aditya') ||
    q.includes('real person')
  ) return LOCAL_RESPONSES.identity;

  // Off-topic detection — general coding help, jokes, trivia, unrelated topics
  if (
    q.includes('write code for') ||
    q.includes('help me code') ||
    q.includes('tell me a joke') ||
    q.includes('what is the capital') ||
    q.includes('weather') ||
    q.includes('recipe') ||
    q.includes('politics') ||
    q.includes('who is the president') ||
    q.includes('solve this problem') ||
    q.includes('write a function') ||
    q.includes('debug my')
  ) return LOCAL_RESPONSES.offtopic;

  // ETH.VOTE / Blockchain
  if (q.includes('eth.vote') || q.includes('eth vote') || q.includes('ethvote') || q.includes('blockchain') || q.includes('web3') || q.includes('solidity') || q.includes('smart contract') || q.includes('decentralized') || q.includes('eip-712') || q.includes('voting'))
    return LOCAL_RESPONSES.eth_vote;

  // Hiring / why hire
  if (q.includes('hire') || q.includes('hiring') || q.includes('should we') || q.includes('worth hiring') || q.includes('strong candidate') || q.includes('why aditya') || q.includes('make a case') || q.includes('pitch'))
    return LOCAL_RESPONSES.hire;

  // Projects
  if (q.includes('project') || q.includes('built') || q.includes('github') || q.includes('list all') || q.includes('what has he') || q.includes('deployed') || q.includes('portfolio'))
    return LOCAL_RESPONSES.projects;

  // Skills / tech stack
  if (q.includes('skill') || q.includes('stack') || q.includes('framework') || q.includes('language') || q.includes('database') || q.includes('tech') || q.includes('know how') || q.includes('proficient') || q.includes('expertise'))
    return LOCAL_RESPONSES.skills;

  // Work experience
  if (q.includes('experience') || q.includes('work history') || q.includes('job') || q.includes('intern') || q.includes('career') || q.includes('resume') || q.includes('cv') || q.includes('background') || q.includes('company') || q.includes('aksharraj') || q.includes('mexgen') || q.includes('gyanmanjari') || q.includes('it hub'))
    return LOCAL_RESPONSES.experience;

  // Contact
  if (q.includes('contact') || q.includes('phone') || q.includes('email') || q.includes('call') || q.includes('reach') || q.includes('number') || q.includes('linkedin') || q.includes('connect') || q.includes('get in touch'))
    return LOCAL_RESPONSES.contact;

  // Availability / remote
  if (q.includes('available') || q.includes('availability') || q.includes('remote') || q.includes('relocate') || q.includes('open to') || q.includes('looking for') || q.includes('hire him') || q.includes('freelance') || q.includes('contract') || q.includes('when can') || q.includes('start date'))
    return LOCAL_RESPONSES.availability;

  return LOCAL_RESPONSES.fallback;
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN API HANDLER
// ─────────────────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response('Invalid request', { status: 400 });
    }

    const groqApiKey = process.env.GROQ_API_KEY;

    // ── Intelligent local fallback when API key is not configured ──
    if (!groqApiKey) {
      const userMessage = messages[messages.length - 1]?.content || '';
      const reply = getLocalResponse(userMessage);

      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          const words = reply.split(' ');
          for (const word of words) {
            controller.enqueue(encoder.encode(word + ' '));
            await new Promise((r) => setTimeout(r, 16));
          }
          controller.close();
        },
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    // ── Live Groq API call ──
    const systemPrompt = buildSystemPrompt();

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${groqApiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.slice(-10), // Keep last 10 turns for context, avoid token bloat
        ],
        max_tokens: 450,
        temperature: 0.3, // LOW temperature — consistency over creativity (per guide)
        stream: true,
      }),
    });

    // Fallback to local if API call fails
    if (!response.ok) {
      const userMessage = messages[messages.length - 1]?.content || '';
      const reply = getLocalResponse(userMessage);
      return new Response(reply, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }

    // ── Stream the response back to client ──
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        if (!reader) { controller.close(); return; }

        let buffer = '';
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || trimmed === 'data: [DONE]') continue;
              if (trimmed.startsWith('data: ')) {
                try {
                  const json = JSON.parse(trimmed.slice(6));
                  const token = json.choices?.[0]?.delta?.content || '';
                  if (token) controller.enqueue(encoder.encode(token));
                } catch { /* skip malformed chunk */ }
              }
            }
          }
        } catch { /* stream interrupted */ }
        finally { controller.close(); }
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
