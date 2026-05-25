import { NextRequest } from 'next/server';

const ADITYA_FACTS_TEXT = `
ADITYA DEVMURARI — COMPLETE PROFILE
=====================================
CONTACT:
  Phone: +91-7046387404
  Email: devmurariaaditya@gmail.com
  LinkedIn: linkedin.com/in/devmurari-aditya
  GitHub: github.com/AADITYA104
  Portfolio: https://adityadevmurari.vercel.app
  Location: Gujarat, India

PROFESSIONAL SUMMARY:
Results-driven software developer with 2+ years of experience in research and development and full stack engineering. Experienced in architecting scalable web applications, high-accuracy AI and ML models, and intelligent automation systems using Python, Next.js, and AI agents.

CORE PORTFOLIO STATS:
  - Innovation Projects Deployed: 4+
  - R&D Prototype Data Processing Speedup: +30%
  - AI/ML Predictive Modeling Accuracy: 95%
  - Junior Students Mentored: 10+
  - Frontend Optimization Loading Speedup: +15%
  - Cross-Browser Interface Compatibility: 100%

TECHNICAL SKILLS:
  Languages: Python, JavaScript, HTML5, CSS3, Solidity
  Frameworks: React.js, Next.js, Node.js, Tailwind CSS, FastAPI, Scikit-learn
  Databases & Tools: MySQL, PostgreSQL, MongoDB, Firebase, Git, GitHub

WORK EXPERIENCE:
1. Full Stack Developer Intern — Aksharraj Infotech (Feb 2026 – Apr 2026)
   • Built ETH.VOTE blockchain DApp end-to-end, bridging traditional web systems with decentralized blockchain logic.
   • Developed secure blockchain voting features and applied cryptography standards to protect user data.
   • Collaborated in daily agile sprints to fix bugs and improve overall application performance.

2. R&D Engineer — Gyanmanjari Innovative University (GMIU) (Feb 2024 – Jan 2026)
   • Spearheaded R&D for 4+ major innovation projects, focusing on high-level software scalability.
   • Architected a prototype system that improved data processing speeds by 30%.
   • Mentored a team of 10+ junior students, guiding them through the full Software Development Life Cycle (SDLC).

3. Junior AI/ML Developer — Mexgen Technologies Pvt. Ltd. (Jul 2025 – Jan 2026)
   • Engineered automated AI/ML models for business workflows, reducing manual data entry by 20%.
   • Optimized Python data pipelines, achieving a 95% accuracy rate in predictive modeling.
   • Integrated intelligent AI agents into production platforms to improve engagement.

4. Front End Developer — IT Hub (Nov 2024 – Dec 2024)
   • Developed responsive interfaces with 100% cross-browser compatibility.
   • Enhanced front-end performance, reducing page load times by approximately 15%.

EDUCATION:
  • B.Tech in Information Technology — Gyanmanjari Innovative University (GMIU), Gujarat
  • Diploma in Computer Engineering — Gyanmanjari Institute of Technology (GMIT), CGPA: 7.84

KEY PROJECTS (15 total):
1. ETH.VOTE — Solidity/Web3, FastAPI, React, Next.js. Decentralized voting with EIP-712 structured signing and 100% data integrity.
   GitHub: https://github.com/AADITYA104/Voting-System-Using-Block-Chain-Master
2. AI Threat Detection — Python, Scikit-learn, ML. Network traffic anomaly detector, 92% accuracy.
   GitHub: https://github.com/AADITYA104/Threat-Detection-in-Cyber-Security-Using-AI-master
3. Healthcare AI Assistant — Python, NLP, AI Agents. Reduces patient triage time by 40%.
   GitHub: https://github.com/AADITYA104/Health-Care-Chatbot-
4. Fake News Detection — Python/ML, NLP. Statement credibility classifier.
   GitHub: https://github.com/AADITYA104/Fake-News-Detection
5. Dynamic Face Lift — Python, OpenCV. Real-time nodal mesh face landmarker.
   GitHub: https://github.com/AADITYA104/dynamic-face-lift
6. NetGuard — Python, Cybersecurity. Network monitoring packet filter.
   GitHub: https://github.com/AADITYA104/NetGuard
7. Portfolio Kinju — React, Next.js. Modern UI.
   GitHub: https://github.com/AADITYA104/protfolio-kinju
8. InspectFlow Sync — Full Stack, Automation. Synced telemetry pipelines.
   GitHub: https://github.com/AADITYA104/inspectflow-sync
9. CXBulk — Backend, Scale. High-throughput database automation.
   GitHub: https://github.com/AADITYA104/CXBulk
10. Codexservice — Backend, API. Scalable API gateway.
    GitHub: https://github.com/AADITYA104/Codexservice
11. QR Code Page — Frontend. Utility scanner layout.
    GitHub: https://github.com/AADITYA104/QR-CODE-PAGE
12. DigiVault — Web/Security. Encrypted locker system.
    GitHub: https://github.com/YogeshTundiya/Digivualt
13. Gym Pro System — Full Stack. Management platform.
    GitHub: https://github.com/YogeshTundiya/Gym_pro_system
14. Lifeconnect — Web App. Social connector platform.
    GitHub: https://github.com/YogeshTundiya/Lifeconnect
15. Gov Portal — Full Stack. Public administration system.
    GitHub: https://github.com/YogeshTundiya/Gov-porject
`;

// ─── Natural-sounding fallback responses (no robotic bullet walls) ───────────

const LOCAL_RESPONSES: Record<string, string> = {
  eth_vote: `Honestly, ETH.VOTE is the project I'd point to first when someone asks what Aditya can do.

He built it end-to-end during his internship at Aksharraj Infotech — a fully decentralized voting DApp that runs on Ethereum. The interesting part isn't just that it uses Solidity smart contracts. It's that he implemented **EIP-712 structured data hashing and signing**, which is the industry standard for preventing vote tampering and Sybil attacks. Most junior devs wouldn't even know what that is, let alone ship it.

The stack: Solidity for the smart contract layer, FastAPI (Python) for the off-chain backend, and Next.js/React for the frontend. The whole thing is production-ready with 100% data integrity guaranteed by the blockchain.

You can see the full codebase here: [ETH.VOTE on GitHub](https://github.com/AADITYA104/Voting-System-Using-Block-Chain-Master)

If you want to discuss the project in more detail or set up a call, Aditya's reachable at +91-7046387404 or devmurariaaditya@gmail.com.`,

  hire: `Here's the honest case for Aditya:

He's got 2+ years of hands-on experience across four different technical domains — full stack web, applied AI/ML, blockchain/Web3, and R&D engineering. That breadth is rare. Most developers specialize early. He didn't.

At Gyanmanjari University's R&D department, he led 4+ innovation projects and improved a data processing prototype by 30%. At Mexgen Technologies, he built ML pipelines that hit 95% predictive accuracy and cut manual data entry by 20%. At Aksharraj Infotech, he shipped ETH.VOTE — a production blockchain DApp — from scratch. And he mentored 10+ junior developers along the way.

He's fluent in Python, JavaScript, Solidity, React/Next.js, FastAPI, and multiple databases. He's built real products, not just tutorials.

If you want to move forward, the fastest way is a direct call: +91-7046387404. Or email him at devmurariaaditya@gmail.com. He's typically responsive within a few hours.`,

  projects: `Aditya has 15 deployed projects across AI, blockchain, and full-stack web. Here's the breakdown:

**Flagship work:**
- [ETH.VOTE](https://github.com/AADITYA104/Voting-System-Using-Block-Chain-Master) — Blockchain voting DApp with EIP-712 cryptography (Solidity + FastAPI + Next.js)
- [AI Threat Detection](https://github.com/AADITYA104/Threat-Detection-in-Cyber-Security-Using-AI-master) — Network intrusion scanner, 92% accuracy (Python + Scikit-learn)
- [Healthcare AI Chatbot](https://github.com/AADITYA104/Health-Care-Chatbot-) — Patient triage assistant, 40% faster response times (NLP + Python)

**Computer Vision & ML:**
- [Dynamic Face Lift](https://github.com/AADITYA104/dynamic-face-lift) — Real-time face mesh tracking (OpenCV)
- [Fake News Detection](https://github.com/AADITYA104/Fake-News-Detection) — NLP statement classifier

**Infrastructure & Automation:**
- [InspectFlow Sync](https://github.com/AADITYA104/inspectflow-sync), [CXBulk](https://github.com/AADITYA104/CXBulk), [Codexservice](https://github.com/AADITYA104/Codexservice), [NetGuard](https://github.com/AADITYA104/NetGuard)

**Collaborative work:** DigiVault, Gym Pro System, Lifeconnect, Gov Portal — all on GitHub under shared repos.

Which ones are you most curious about?`,

  skills: `Aditya's stack covers a pretty wide range:

**Languages:** Python (his strongest — used for all AI/ML work), JavaScript (React/Next.js), Solidity (smart contracts), HTML/CSS.

**Frameworks & Tools:** Next.js, React.js, Node.js, FastAPI, Tailwind CSS, Scikit-learn.

**Databases:** PostgreSQL, MySQL, MongoDB, Firebase.

**Web3:** Solidity, Web3.js, EIP-712 cryptography.

What sets him apart from a typical full-stack developer is the combination of applied AI/ML (he's shipped production ML systems) with blockchain/Web3 (he's written and deployed Solidity smart contracts in production). Most developers do one or the other, not both.

Want links to his GitHub or LinkedIn to see the work directly?`,

  experience: `Here's the quick timeline:

**Aksharraj Infotech** (Feb–Apr 2026) — Full Stack Developer Intern. Built ETH.VOTE end-to-end, implemented EIP-712 blockchain security, worked in daily agile sprints.

**Mexgen Technologies** (Jul 2025–Jan 2026) — Junior AI/ML Developer. Built ML models at 95% predictive accuracy, cut manual data entry by 20%, deployed AI agents to production platforms.

**Gyanmanjari University** (Feb 2024–Jan 2026) — R&D Engineer. Led 4+ innovation projects, improved data processing by 30%, mentored 10+ junior developers through full SDLC cycles.

**IT Hub** (Nov–Dec 2024) — Frontend Developer. Delivered 100% cross-browser compatible interfaces, improved page load times by 15%.

That's roughly 2+ years of concurrent and back-to-back roles across different technical domains. His resume is available directly through Aditya — reach him at devmurariaaditya@gmail.com.`,

  contact: `Here's how to reach Aditya directly:

- **Phone / WhatsApp:** [+91-7046387404](tel:+917046387404)
- **Email:** [devmurariaaditya@gmail.com](mailto:devmurariaaditya@gmail.com)
- **LinkedIn:** [linkedin.com/in/devmurari-aditya](https://linkedin.com/in/devmurari-aditya)
- **GitHub:** [github.com/AADITYA104](https://github.com/AADITYA104)

He's based in Gujarat, India and is highly responsive — usually replies within a few hours. Open to remote positions, contract work, or relocation.`,

  threat: `The AI Threat Detection project is one of Aditya's core ML builds.

He designed a network intrusion detection system using Python and Scikit-learn. The model classifies network traffic as clean or malicious with **92% accuracy**, and was optimized for high-throughput packet feature vectors to handle real-time scanning.

It's a strong signal that he understands applied ML beyond just training models — he thought through the data pipeline, feature engineering, and performance constraints of a security-critical system.

Full codebase: [GitHub](https://github.com/AADITYA104/Threat-Detection-in-Cyber-Security-Using-AI-master)`,

  healthcare: `The Healthcare AI Chatbot is one of Aditya's more impactful projects from an end-user perspective.

It's a conversational NLP agent built to handle preliminary patient symptom assessment — essentially automating the first step of triage. It **reduced response times by 40%**, which in a healthcare setting is actually significant.

Built using Python, custom NLP models, and AI agent loops. It routes natural language queries to medical knowledge bases and gives structured preliminary assessments.

GitHub: [Healthcare Chatbot](https://github.com/AADITYA104/Health-Care-Chatbot-)`,

  location: `Aditya is based in Gujarat, India. He's worked with teams across different time zones and is flexible with working hours.

He's open to:
- Remote roles (immediate availability)
- Contract or freelance engagements
- Relocation to major tech hubs

Best way to discuss: call or WhatsApp at +91-7046387404, or email devmurariaaditya@gmail.com.`,

  fallback: `I'm here specifically to help you learn about Aditya Devmurari — his technical background, work history, and projects.

He's a Full Stack and AI developer based in Gujarat, India with 2+ years of experience. His main areas are Next.js/React, Python/ML, and Web3/Solidity. His flagship project is ETH.VOTE, a decentralized blockchain voting system.

For anything outside of that — or if you'd like to connect directly — you can reach Aditya at **+91-7046387404** or **devmurariaaditya@gmail.com**.

What would you like to know more about?`
};

function getLocalResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes('vote') || q.includes('eth') || q.includes('blockchain') || q.includes('web3') || q.includes('solidity')) {
    return LOCAL_RESPONSES.eth_vote;
  }
  if (q.includes('threat') || q.includes('anomaly') || q.includes('security scanner') || q.includes('intrusion')) {
    return LOCAL_RESPONSES.threat;
  }
  if (q.includes('healthcare') || q.includes('triage') || q.includes('chatbot') || q.includes('patient') || q.includes('medical')) {
    return LOCAL_RESPONSES.healthcare;
  }
  if (q.includes('hire') || q.includes('why') || q.includes('should we') || q.includes('reason') || q.includes('value') || q.includes('strong candidate')) {
    return LOCAL_RESPONSES.hire;
  }
  if (q.includes('project') || q.includes('build') || q.includes('github') || q.includes('list') || q.includes('all') || q.includes('portfolio') || q.includes('deployed')) {
    return LOCAL_RESPONSES.projects;
  }
  if (q.includes('skill') || q.includes('stack') || q.includes('framework') || q.includes('language') || q.includes('database') || q.includes('tech') || q.includes('know')) {
    return LOCAL_RESPONSES.skills;
  }
  if (q.includes('experience') || q.includes('work') || q.includes('job') || q.includes('intern') || q.includes('history') || q.includes('resume') || q.includes('background')) {
    return LOCAL_RESPONSES.experience;
  }
  if (q.includes('contact') || q.includes('phone') || q.includes('email') || q.includes('call') || q.includes('reach') || q.includes('number') || q.includes('linkedin')) {
    return LOCAL_RESPONSES.contact;
  }
  if (q.includes('location') || q.includes('where') || q.includes('remote') || q.includes('relocate') || q.includes('india')) {
    return LOCAL_RESPONSES.location;
  }
  return LOCAL_RESPONSES.fallback;
}

function buildSystemPrompt(): string {
  return `You are speaking on behalf of Aditya Devmurari — a software developer based in Gujarat, India. You represent him professionally to recruiters, founders, and potential collaborators.

Your responses must sound like a real person who knows Aditya well, not like a formal AI assistant. Write naturally. Use plain language. Avoid bullet walls unless listing something specific. Don't start sentences with "Certainly!" or "Absolutely!" or "Great question!".

TONE: Confident, direct, conversational. Think: a sharp colleague who knows the candidate inside out and is vouching for them.

RULES:
1. Speak about Aditya in third person: "Aditya built...", "He shipped...", "His strongest project is..."
2. Always include at least one concrete metric when relevant (30% processing boost, 95% ML accuracy, 40% triage speedup, 20% data entry reduction, 92% anomaly detection accuracy).
3. Use markdown lightly — headers only when listing multiple things. Avoid over-formatting.
4. If asked something unrelated to Aditya's professional profile, redirect with his contact info: +91-7046387404 or devmurariaaditya@gmail.com.
5. Reply in English only.
6. When mentioning projects, include the relevant GitHub link from the facts below.
7. Keep answers concise but complete — don't pad with filler sentences.

${ADITYA_FACTS_TEXT}`;
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const groqApiKey = process.env.GROQ_API_KEY;

    // Smart local fallback — fully functional without the API key
    if (!groqApiKey) {
      const userMessage = messages[messages.length - 1]?.content || '';
      const reply = getLocalResponse(userMessage);

      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          // Stream word by word for a natural feel
          const words = reply.split(' ');
          for (const word of words) {
            controller.enqueue(encoder.encode(word + ' '));
            await new Promise((resolve) => setTimeout(resolve, 18));
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

    const systemPrompt = buildSystemPrompt();

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
        max_tokens: 500,
        temperature: 0.65,
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
                } catch {
                  // Ignore partial stream parsing errors
                }
              }
            }
          }
        } catch {
          // Silent stream fallback
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
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Internal Server Error';
    return new Response(`Error: ${errMsg}`, { status: 500 });
  }
}
