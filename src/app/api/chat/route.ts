import { NextRequest } from 'next/server';

const ADITYA_FACTS_TEXT = `
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

// Predefined professional human-like conversational local responses
const LOCAL_RESPONSES: Record<string, string> = {
  eth_vote: `Aditya's flagship project is **ETH.VOTE**, a decentralized blockchain voting DApp. He built this end-to-end during his time at Aksharraj Infotech, using Solidity, Web3, FastAPI, React, and Next.js. To ensure absolute data integrity and prevent Sybil attacks, he implemented Solidity smart contracts combined with EIP-712 structured signing. This project perfectly demonstrates his ability to handle advanced cryptography, blockchain security, and complex full-stack architecture. Would you like to check out the GitHub repository for ETH.VOTE?`,
  
  hire: `Aditya is an exceptionally strong hire for Full Stack and AI roles for three key reasons:
1. **Demonstrated R&D Depth**: As an R&D Engineer at GMIU, he led 4+ innovation projects and boosted data processing speeds by 30%.
2. **Applied AI Execution**: At Mexgen, he built automated ML pipelines with 95% predictive accuracy, directly reducing manual data entry by 20%.
3. **End-to-End Delivery**: Projects like ETH.VOTE show he can write Solidity smart contracts, build FastAPI backends, and design responsive Next.js frontends seamlessly.

He is highly adaptable, proactive, and open to remote opportunities or relocation. Shall I provide his direct contact details so you can schedule a call?`,
  
  projects: `Aditya has built several high-impact projects that showcase his engineering range:
1. **ETH.VOTE**: A decentralized blockchain voting platform using Solidity smart contracts and EIP-712 structured signing for absolute vote integrity.
2. **AI Threat Detection System**: A security-focused ML application (Python & Scikit-learn) that identifies network anomalies with a verified 92% accuracy rate.
3. **Healthcare AI Assistant**: An NLP-powered triage assistant that reduced patient response and triage times by 40%.
4. **InspectFlow Sync & CXBulk**: Scalable full-stack systems designed for enterprise automation.

Which of these would you like to explore in more detail?`,
  
  skills: `Aditya's technical stack is highly modern and well-rounded:
• **Languages**: Python, JavaScript, HTML5, CSS3, Solidity
• **Frameworks & Libraries**: Next.js, React.js, FastAPI, Node.js, Tailwind CSS, Scikit-learn
• **Databases & Infrastructure**: PostgreSQL, MySQL, MongoDB, Firebase, Git, GitHub

His unique advantage is the combination of solid web engineering with applied AI/ML capabilities, allowing him to build intelligent, autonomous features rather than just static UIs. Would you like me to share a link to his GitHub profile?`,
  
  experience: `Aditya has over 2+ years of professional engineering and research experience:
• **Aksharraj Infotech (Full Stack Developer Intern | Feb 2026 - Apr 2026)**: Developed the end-to-end architecture for the ETH.VOTE decentralized app.
• **Gyanmanjari Innovative University (R&D Engineer | Feb 2024 - Jan 2026)**: Led research on 4+ innovation projects, improving data processing speed by 30% and mentoring 10+ juniors.
• **Mexgen Technologies (Junior AI/ML Developer | Jul 2025 - Jan 2026)**: Engineered business-workflow automation models achieving 95% predictive accuracy.
• **IT Hub (Frontend Developer | Nov 2024 - Dec 2024)**: Rebuilt responsive interfaces improving page load speed by 15%.`,
  
  contact: `You can reach Aditya Devmurari directly through the following channels:
• **Phone/WhatsApp**: +91-7046387404
• **Email**: devmurariaaditya@gmail.com
• **LinkedIn**: [linkedin.com/in/devmurari-aditya](https://linkedin.com/in/devmurari-aditya)
• **GitHub**: [github.com/AADITYA104](https://github.com/AADITYA104)

He is highly responsive and open to scheduling a quick call to discuss how he can add value to your team.`,
  
  location: `Aditya is currently based in Gujarat, India. He is fully set up for remote work in international teams, and is highly flexible with timezones. He is also open to relocation for the right opportunity. Would you like me to share his email or phone number?`,

  fallback: `I am Aditya's AI Representative, specifically trained to assist you with his professional profile, skills, experience, and projects. 

Aditya is a **Full Stack & AI Developer** with 2+ years of experience, specializing in **Next.js**, **Python**, **Applied AI/ML**, and **Web3/Blockchain** (like his decentralized voting system ETH.VOTE).

For out-of-scope inquiries or to schedule a direct interview, please feel free to reach him at **+91-7046387404** or email him at **devmurariaaditya@gmail.com**!

What details about his projects, technical skills, or work history can I highlight for you?`
};

function getLocalResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes('vote') || q.includes('eth') || q.includes('blockchain') || q.includes('web3') || q.includes('solidity')) {
    return LOCAL_RESPONSES.eth_vote;
  }
  if (q.includes('hire') || q.includes('why') || q.includes('benefit') || q.includes('strong') || q.includes('reason') || q.includes('value')) {
    return LOCAL_RESPONSES.hire;
  }
  if (q.includes('project') || q.includes('build') || q.includes('create') || q.includes('make') || q.includes('github')) {
    return LOCAL_RESPONSES.projects;
  }
  if (q.includes('skill') || q.includes('stack') || q.includes('framework') || q.includes('language') || q.includes('database') || q.includes('tech')) {
    return LOCAL_RESPONSES.skills;
  }
  if (q.includes('experience') || q.includes('work') || q.includes('job') || q.includes('intern') || q.includes('history') || q.includes('resume')) {
    return LOCAL_RESPONSES.experience;
  }
  if (q.includes('contact') || q.includes('phone') || q.includes('email') || q.includes('call') || q.includes('reach') || q.includes('number') || q.includes('chat') || q.includes('linkedin')) {
    return LOCAL_RESPONSES.contact;
  }
  if (q.includes('location') || q.includes('where') || q.includes('remote') || q.includes('live') || q.includes('relocate')) {
    return LOCAL_RESPONSES.location;
  }
  return LOCAL_RESPONSES.fallback;
}

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
1. Speak on Aditya's behalf: "Aditya built...", "One of Aditya's key achievements is..."
2. Always mention at least one precise metric (e.g. 30% faster processing, 95% ML accuracy, 40% patient triage speedup, 20% manual entry reduction).
3. Keep responses clean, professional, and well-structured.
4. OUT-OF-SCOPE: If asked unrelated questions, guide them to contact Aditya at +91-7046387404 or devmurariaaditya@gmail.com.
5. Answer in English only to maintain a professional global corporate standard.

${ADITYA_FACTS_TEXT}`;
}

export async function POST(req: NextRequest) {
  try {
    const { messages, audience = 'recruiter', mode = 'balanced', depth = 'detailed' } = await req.json();

    const groqApiKey = process.env.GROQ_API_KEY;
    
    // Seamless smart local fallback if the API key is not configured on Vercel yet
    if (!groqApiKey) {
      const userMessage = messages[messages.length - 1]?.content || '';
      const reply = getLocalResponse(userMessage);

      // Simulate a small stream
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          const chunks = reply.split(' ');
          for (const chunk of chunks) {
            controller.enqueue(encoder.encode(chunk + ' '));
            await new Promise((resolve) => setTimeout(resolve, 30));
          }
          controller.close();
        }
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    const systemPrompt = buildSystemPrompt(audience, mode, depth);

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${groqApiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        max_tokens: 450,
        temperature: 0.7,
        stream: true,
      }),
    });

    if (!response.ok) {
      const userMessage = messages[messages.length - 1]?.content || '';
      const reply = getLocalResponse(userMessage);
      return new Response(reply);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        if (!reader) {
          controller.close();
          return;
        }

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
              if (!trimmed) continue;
              if (trimmed === 'data: [DONE]') continue;

              if (trimmed.startsWith('data: ')) {
                try {
                  const dataJson = JSON.parse(trimmed.slice(6));
                  const token = dataJson.choices?.[0]?.delta?.content || '';
                  if (token) {
                    controller.enqueue(encoder.encode(token));
                  }
                } catch (e) {
                  // Ignore parsing errors for partial stream packets
                }
              }
            }
          }
        } catch (err) {
          // fallback inline
        } finally {
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error: any) {
    return new Response(`Error: ${error.message || "Internal Server Error"}`, { status: 500 });
  }
}
