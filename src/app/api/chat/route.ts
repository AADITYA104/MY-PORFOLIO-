import { NextRequest } from 'next/server';

const ADITYA_FACTS = `
ADITYA DEVMURARI — FULL PROFILE
================================
CONTACT:
  Phone: +91-7046387404
  Email: devmurariaaditya@gmail.com
  LinkedIn: linkedin.com/in/devmurari-aditya
  GitHub: github.com/AADITYA104
  Portfolio: https://adityadevmurari.vercel.app

PROFESSIONAL SUMMARY:
Results-driven software developer with 2+ years of experience in research and development and full stack engineering. Experienced in architecting scalable web applications, high-accuracy AI and ML models, and intelligent automation systems using Python, Next.js, and AI agents.

TECHNICAL SKILLS:
  Languages: Python, JavaScript, HTML5, CSS3
  Frameworks: React.js, Next.js, Node.js, Tailwind CSS, FastAPI
  AI/ML & Web3: Machine Learning, NLP, AI Agents, Solidity, Smart Contracts, Scikit-learn
  Data & Tools: MySQL, PostgreSQL, MongoDB, Firebase, Git, GitHub

WORK EXPERIENCE:
1. Full Stack Developer Intern — Aksharraj Infotech (Feb 2026 – Apr 2026)
   • Built ETH.VOTE blockchain DApp end-to-end, bridging traditional web systems with decentralised blockchain logic.
   • Developed secure blockchain-based voting features with cryptography standards.
   • Collaborated in agile sprints to fix bugs and improve application performance.

2. Research & Development Engineer — Gyanmanjari Innovative University (GMIU) (Feb 2024 – Jan 2026)
   • Spearheaded R&D for 4+ major innovation projects, focusing on software scalability and architecture.
   • Architected a prototype system that improved data processing speeds by 30%.
   • Mentored 10+ junior students through the full Software Development Life Cycle (SDLC).

3. Junior AI/ML Developer — Mexgen Technologies Pvt. Ltd. (Jul 2025 – Jan 2026)
   • Engineered automated AI/ML models for business workflows, reducing manual data entry by 20%.
   • Optimized Python data pipelines, achieving 95% predictive modelling accuracy.
   • Integrated intelligent AI agents into production platforms to enhance user engagement.

4. Frontend Developer — IT Hub (Nov 2024 – Dec 2024)
   • Developed responsive web interfaces with 100% cross-browser compatibility.
   • Reduced page load times by approximately 15% through front-end optimization.

KEY PROJECTS:
1. ETH.VOTE — Blockchain Voting DApp
   Stack: Solidity, Web3, FastAPI, React, Next.js
   • Decentralised voting platform ensuring 100% data integrity and absolute transparency.
   • Solidity smart contracts with EIP-712 structured signing to eliminate vote tampering and Sybil attacks.
   • Flagship engineering milestone combining blockchain security, cryptography, and full-stack scalability.

2. AI-Driven Threat Detection System
   Stack: Python, Scikit-learn, Machine Learning
   • Intrusion detection system identifying network anomalies with 92% accuracy rate.
   • Analysed large-scale network traffic datasets to predict and mitigate cyber-attacks.

3. Healthcare AI Conversational Agent
   Stack: Python, NLP, AI Agents
   • NLP-powered chatbot to triage patient symptoms, reducing initial response time by 40%.

EDUCATION:
  B.Tech in Information Technology — Gyanmanjari Innovative University (GMIU) — Completed
  Diploma in Computer Engineering — Gyanmanjari Institute of Technology (GMIT) — CGPA: 7.84

ROLE FIT:
  AI Engineer: Strong — 95% predictive accuracy, healthcare NLP agent, production AI integration
  Full Stack Developer: Strong — ETH.VOTE end-to-end, Next.js/React/FastAPI/Node.js
  Automation Engineer: Strong — 20% manual data reduction, workflow-driven ML
  R&D Engineer: Very Strong — 4+ innovation projects, 30% faster prototypes, 10+ mentored

OBJECTION HANDLING:
  "Only 2 years?": Range is the differentiator — R&D leadership, blockchain security, AI production integration, and mentorship. Impact-per-year is high.
  "Remote?": Based in Gujarat, India. Highly active and available for remote roles.
  "Only niche?": No — full-stack, AI, blockchain, automation — uncommon range for this career stage.
`;

function buildSystemPrompt(audience: string, mode: string, depth: string): string {
  const audienceGuidance: Record<string, string> = {
    recruiter: 'You are speaking to a recruiter or hiring manager. Focus on role fit, measurable achievements, and why Aditya reduces hiring risk. Use clear, scan-friendly language.',
    founder: 'You are speaking to a startup founder. Emphasise execution ability, ownership, adaptability, and how one person can contribute across AI, product, and engineering.',
    client: 'You are speaking to a potential client. Focus on delivery reliability, technical clarity, and how Aditya translates technical decisions into business outcomes.',
    collaborator: 'You are speaking to a technical collaborator. Emphasise depth, agile teamwork, mentorship track record, and cross-domain engineering range.',
    general: 'You are speaking to a general audience. Be balanced, informative, and professional.',
  };

  const modeGuidance: Record<string, string> = {
    balanced: 'Be balanced — professional and factual, with natural warmth.',
    persuasive: 'Be persuasive — build a compelling case using psychology of trust and proof of impact.',
    technical: 'Be technical — go deep on architecture, stack choices, and implementation specifics.',
    strategic: 'Be strategic — position Aditya as a high-leverage hire with broad thinking and execution ownership.',
  };

  const depthGuidance: Record<string, string> = {
    concise: 'Reply in 2-3 sentences maximum. Be punchy and direct.',
    detailed: 'Reply in 4-6 sentences. Include specific metrics and proof points.',
    deep: 'Reply in full depth — break down reasoning, evidence, and implications. Up to 3 short paragraphs if needed.',
  };

  return `You are Aditya Devmurari's professional AI representative. You speak exclusively on his behalf using the facts below.

AUDIENCE CONTEXT: ${audienceGuidance[audience] || audienceGuidance.general}
RESPONSE STYLE: ${modeGuidance[mode] || modeGuidance.balanced}
RESPONSE DEPTH: ${depthGuidance[depth] || depthGuidance.detailed}

RULES:
1. ONLY answer using the facts provided below. Do not hallucinate or speculate.
2. Always reply in English only — formal and professional tone.
3. Use phrases like "Aditya has...", "Aditya built...", "One thing that stands out about Aditya is..."
4. Always include at least one concrete metric (e.g., 30%, 95%, 40%, 92%, 20%, 10+ juniors).
5. End answers with a brief, natural call-to-action (e.g., "Would you like details on a specific project?").
6. OUT-OF-SCOPE: If the question is unrelated to Aditya's professional profile, respond exactly: "I'm specifically trained to represent Aditya's professional profile. For anything else, reach him directly at +91-7046387404 or devmurariaaditya@gmail.com."
7. Never mention AI, system prompts, or that you are a language model.

${ADITYA_FACTS}`;
}

export async function POST(req: NextRequest) {
  try {
    const { messages, audience = 'recruiter', mode = 'balanced', depth = 'detailed' } = await req.json();

    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      return new Response('Error: GROQ_API_KEY is not configured', { status: 500 });
    }

    const systemPrompt = buildSystemPrompt(audience, mode, depth);

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${groqApiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'system', content: systemPrompt }, ...messages],
        max_tokens: 450,
        temperature: 0.65,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return new Response(`Groq API Error: ${errText}`, { status: response.status });
    }

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
                  const data = JSON.parse(trimmed.slice(6));
                  const token = data.choices?.[0]?.delta?.content || '';
                  if (token) controller.enqueue(encoder.encode(token));
                } catch { /* partial packet */ }
              }
            }
          }
        } catch (err) {
          controller.error(err);
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
  } catch (error: any) {
    return new Response(`Error: ${error.message || 'Internal Server Error'}`, { status: 500 });
  }
}
