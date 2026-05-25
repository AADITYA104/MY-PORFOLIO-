import { NextRequest } from 'next/server';

const ADITYA_FACTS_TEXT = `
ADITYA DEVMURARI — COMPLETE PORTFOLIO & RESUME FACT SHEET
==========================================================
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

TECHNICAL STILLS:
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

ALL 15 PORTFOLIO DEPLOYMENTS & REPOSITORIES:
1. **ETH.VOTE (Blockchain Voting DApp)** — Tech: Solidity/Web3, FastAPI, React, Next.js. Flagship platform ensuring 100% data integrity with EIP-712 structured signing.
   URL: https://github.com/AADITYA104/Voting-System-Using-Block-Chain-Master
2. **AI Threat Detection (Security Scanner)** — Tech: Python, Scikit-learn, Machine Learning. DESIGNED network traffic anomaly detector with 92% accuracy.
   URL: https://github.com/AADITYA104/Threat-Detection-in-Cyber-Security-Using-AI-master
3. **Healthcare AI Assistant (NLP Chatbot)** — Tech: Python, NLP, AI Agents. Reduces patient triage response times by 40%.
   URL: https://github.com/AADITYA104/Health-Care-Chatbot-
4. **Fake News Detection** — Tech: Python/ML, NLP. Classifies statement credibility with modern text classification analysis.
   URL: https://github.com/AADITYA104/Fake-News-Detection
5. **Dynamic Face Lift** — Tech: Python, OpenCV, Computer Vision. Real-time nodal mesh landmarker for dynamic facial adjustments.
   URL: https://github.com/AADITYA104/dynamic-face-lift
6. **NetGuard** — Tech: Cyber Security, Python. Network monitoring packet filter.
   URL: https://github.com/AADITYA104/NetGuard
7. **Portfolio Kinju** — Tech: React, Next.js. Stunning, high-fidelity landing UI.
   URL: https://github.com/AADITYA104/protfolio-kinju
8. **InspectFlow Sync** — Tech: Full Stack, Automation. Synced telemetry pipelines for automated workflows.
   URL: https://github.com/AADITYA104/inspectflow-sync
9. **CXBulk** — Tech: Backend, Scale. High-throughput database automation utility.
   URL: https://github.com/AADITYA104/CXBulk
10. **Codexservice** — Tech: Backend, API. Highly scalable API gateway.
    URL: https://github.com/AADITYA104/Codexservice
11. **QR Code Page** — Tech: Frontend, HTML/CSS. Utility scanner layout.
    URL: https://github.com/AADITYA104/QR-CODE-PAGE
12. **DigiVault** — Tech: Security, Web. Encrypted locker system.
    URL: https://github.com/YogeshTundiya/Digivualt
13. **Gym Pro System** — Tech: Full Stack. Management platform with concentric progress meters.
    URL: https://github.com/YogeshTundiya/Gym_pro_system
14. **Lifeconnect** — Tech: Web App. Social connector platform.
    URL: https://github.com/YogeshTundiya/Lifeconnect
15. **Gov Portal** — Tech: Full Stack. Public administration system.
    URL: https://github.com/YogeshTundiya/Gov-porject
`;

const LOCAL_RESPONSES: Record<string, string> = {
  eth_vote: `### ⬡ ETH.VOTE — Decentralized Blockchain Voting DApp (Flagship Project)

**ETH.VOTE** is Aditya's premier engineering milestone, built end-to-end to bridge traditional web systems with secure, decentralized ledger technology. 

#### 🛠️ Technical Architecture & Implementation:
• **Blockchain & Cryptography Layer**: Built using **Solidity smart contracts** for transparent, immutable vote ledger management. He integrated **EIP-712 structured data hashing and signing**, which eliminates vote tampering and defends against Sybil attacks by enforcing secure cryptographic voter identities.
• **Backend Infrastructure**: Powered by **FastAPI (Python)** to manage off-chain data processing, coordinate API calls, and maintain sub-millisecond database updates.
• **Frontend HUD**: Designed using **Next.js & React.js** to deliver a responsive, latency-free user experience, ensuring 100% cross-browser compatibility and seamless Web3 wallet handshakes.

#### 📈 Business Value & Takeaways:
• **High Security Mindset**: Demonstrates Aditya's expertise in security patterns, cryptography standards, and trust-based systems rather than just standard UI components.
• **Full-Stack Competence**: Proves his ability to design, develop, compile, and deploy systems that run flawlessly across frontend, backend, and protocol levels.

#### 🔗 Project Uplink:
You can check out the complete codebase here: [ETH.VOTE GitHub Repository](https://github.com/AADITYA104/Voting-System-Using-Block-Chain-Master)`,
  
  hire: `### 💼 Why Aditya Devmurari is a High-Leverage Hire

Aditya is a highly specialized Full Stack and AI Engineer who compresses massive product value into 2+ years of execution:

1. **R&D Innovation Depth**: As an R&D Engineer at Gyanmanjari University, he owned the architecture of 4+ major innovation projects, designing a core prototype that boosted data processing speeds by **30%**.
2. **Applied AI & ML Precision**: At Mexgen Technologies, he engineered pipeline architectures that achieved **95% predictive accuracy**, successfully reducing manual business data entry operations by **20%**.
3. **Decentralized Cryptography Skills**: Shipped flagship products like **ETH.VOTE** end-to-end, writing Solidity smart contracts and implementing EIP-712 structured signatures.
4. **Mentorship & Leadership**: Guided a team of **10+ junior developers** through full Software Development Lifecycles (SDLC), proving strong cultural fit and collaboration skills.

He is highly responsive, active, and fully available for remote roles or relocation. Shall I share his direct email and phone number to arrange an interview?`,
  
  projects: `### 🚀 Shipped Flagship Projects & All 15 Deployments

Aditya has deployed **15 software modules** spanning AI, Web3, and Enterprise Automation. Here is his complete project directory:

#### 1. Flagship Productions:
• **ETH.VOTE (Web3/Solidity)**: Decentralized blockchain voting using EIP-712 structured signatures. [GitHub Link](https://github.com/AADITYA104/Voting-System-Using-Block-Chain-Master)
• **AI Threat Detection (Python/ML)**: Security-focused network anomaly detector with **92% accuracy**. [GitHub Link](https://github.com/AADITYA104/Threat-Detection-in-Cyber-Security-Using-AI-master)
• **Healthcare AI Assistant (NLP/AI)**: Patient symptoms conversational assistant reducing triage times by **40%**. [GitHub Link](https://github.com/AADITYA104/Health-Care-Chatbot-)

#### 2. Advanced AI & Computer Vision:
• **Dynamic Face Lift**: Real-time OpenCV nodal facial landmarker. [GitHub Link](https://github.com/AADITYA104/dynamic-face-lift)
• **Fake News Detection**: Automated NLP statement classification tool. [GitHub Link](https://github.com/AADITYA104/Fake-News-Detection)

#### 3. Automation & Scale Systems:
• **InspectFlow Sync**: High-speed automated telemetry pipeline. [GitHub Link](https://github.com/AADITYA104/inspectflow-sync)
• **CXBulk**: Enterprise high-throughput database automation. [GitHub Link](https://github.com/AADITYA104/CXBulk)
• **Codexservice**: Scalable API gateway node. [GitHub Link](https://github.com/AADITYA104/Codexservice)
• **NetGuard**: Secure packet capture packet filter tool. [GitHub Link](https://github.com/AADITYA104/NetGuard)
• **QR Code Page**: Responsive scanner alignment utility. [GitHub Link](https://github.com/AADITYA104/QR-CODE-PAGE)
• **Portfolio Kinju**: High-fidelity modern Next.js UI. [GitHub Link](https://github.com/AADITYA104/protfolio-kinju)

#### 4. Shared Collaboration Deployments:
• **DigiVault**: Encrypted locker vault. [GitHub Link](https://github.com/YogeshTundiya/Digivualt)
• **Gym Pro System**: Fitness administration hub. [GitHub Link](https://github.com/YogeshTundiya/Gym_pro_system)
• **Lifeconnect**: Social web interface DApp. [GitHub Link](https://github.com/YogeshTundiya/Lifeconnect)
• **Gov Portal**: Public administration portal. [GitHub Link](https://github.com/YogeshTundiya/Gov-porject)

Which specific module codebase would you like to review?`,
  
  skills: `### 🛠️ Technical Stack & Domain Expertise

Aditya moves across languages and frameworks without losing product focus:

• **Programming Languages**: Python (applied data science, AI workflows), JavaScript (React/Next.js dynamic rendering), Solidity (blockchain consensus, secure smart contracts), HTML5/CSS3.
• **Web & Backend Frameworks**: Next.js, React.js, Node.js, FastAPI, Tailwind CSS.
• **AI, Machine Learning & Web3**: NLP models, AI Agent pipelines, Scikit-learn, Web3.js, EIP-712 Cryptography.
• **Database & DevOps Tools**: PostgreSQL, MySQL, MongoDB, Firebase, Git, GitHub.

#### 💡 The Aditya Advantage:
Unlike typical frontend-only or backend-only engineers, Aditya combines full-stack web agility with **applied AI and blockchain security**. He builds intelligent automation systems that add measurable efficiency. Would you like me to share a link to his GitHub or LinkedIn profile?`,
  
  experience: `### 📈 Professional Experience & Contributions

Aditya has driven technical outcomes across R&D, corporate AI development, and internships:

1. **Aksharraj Infotech — Full Stack Developer Intern (Feb 2026 – Apr 2026)**
   • Shipped ETH.VOTE end-to-end, integrating decentralized Web3 security with FastAPI/React.
2. **Gyanmanjari Innovative University — R&D Engineer (Feb 2024 – Jan 2026)**
   • Owned R&D for 4+ innovative software platforms, improving processing efficiency by **30%** and mentoring **10+ juniors**.
3. **Mexgen Technologies — Junior AI/ML Developer (Jul 2025 – Jan 2026)**
   • Reached **95% modeling precision** for automated enterprise data pipelines, reducing manual input by **20%**.
4. **IT Hub — Frontend Developer (Nov 2024 – Dec 2024)**
   • Designed responsive JS interfaces with 100% cross-browser compatibility, boosting loading speed by **15%**.`,
  
  contact: `### 📞 Direct Contact Information

You can contact Aditya Devmurari directly to discuss job openings, project collaborations, or consultation work:

• **Phone & WhatsApp**: [+91-7046387404](tel:+917046387404)
• **Email**: [devmurariaaditya@gmail.com](mailto:devmurariaaditya@gmail.com)
• **LinkedIn**: [linkedin.com/in/devmurari-aditya](https://linkedin.com/in/devmurari-aditya)
• **GitHub**: [github.com/AADITYA104](https://github.com/AADITYA104)

He is highly responsive across all channels. Would you like me to draft an email introduction for you?`,

  threat: `### 🛡️ AI-Driven Threat Detection System

Designed as a core cyber-security module, this project is a machine-learning network intrusion scanner built using **Python and Scikit-learn**.

• **Achievement**: Reached a verified **92% anomaly detection accuracy** in classifying clean network traffic vs active server intrusions.
• **Technical implementation**: Optimized data pipelines for high-throughput packet feature vectors, allowing active intrusion prevention.
• **GitHub Node**: [Threat Detection Repository](https://github.com/AADITYA104/Threat-Detection-in-Cyber-Security-Using-AI-master)`,

  healthcare: `### 🩺 Healthcare AI Conversational Agent

An NLP-powered virtual triage assistant built to automate preliminary patient symptom mapping.

• **Achievement**: Successfully reduced patient initial triage and response time by **40%**.
• **Technical implementation**: Built using custom Python NLP models and AI agent loops, bridging natural language queries with medical databases.
• **GitHub Node**: [Healthcare Chatbot Repository](https://github.com/AADITYA104/Health-Care-Chatbot-)`,

  facelift: `### 👁️ Dynamic Face Lift (Computer Vision)

A highly responsive real-time face mesh landmark detection tool built using **Python and OpenCV**.

• **Technical Details**: Maps dynamic nodal mesh tracking points to analyze facial contours and apply visual adjustments instantly.
• **GitHub Node**: [Dynamic Face Lift Repository](https://github.com/AADITYA104/dynamic-face-lift)`,

  fakenews: `### 📰 Fake News Detection System

An advanced natural language processing (NLP) application engineered to classify the validity of news articles.

• **Technical Details**: Uses Python ML classifiers to process semantic vectors and assign credibility scores.
• **GitHub Node**: [Fake News Detection Repository](https://github.com/AADITYA104/Fake-News-Detection)`,

  netguard: `### 🔒 NetGuard Security packet capture

A network-packet capture and security guard tool built to filter active traffic, block malicious nodes, and monitor server uplinks.

• **GitHub Node**: [NetGuard Repository](https://github.com/AADITYA104/NetGuard)`,

  syncs: `### ⚡ InspectFlow Sync & CXBulk

These are scaling and automation systems developed by Aditya:
• **InspectFlow Sync**: High-speed automated telemetry pipelines designed to synchronize data pipelines across nodes. [Repository Link](https://github.com/AADITYA104/inspectflow-sync)
• **CXBulk**: Enterprise high-throughput database automation tool designed to handle bulk updates and high-load transactions. [Repository Link](https://github.com/AADITYA104/CXBulk)
• **Codexservice**: A scalable API gateway backend node. [Repository Link](https://github.com/AADITYA104/Codexservice)`,

  vault: `### 🔑 DigiVault & Shared Deployments

Developed in collaboration, these tools address fit administration:
• **DigiVault**: An encrypted digital credentials locker. [Repository Link](https://github.com/YogeshTundiya/Digivualt)
• **Gym Pro System**: Fitness center administration software with concentric activity progress rings. [Repository Link](https://github.com/YogeshTundiya/Gym_pro_system)
• **Lifeconnect**: A fully connected social interface web app. [Repository Link](https://github.com/YogeshTundiya/Lifeconnect)
• **Gov Portal**: Public administration portal for secure state services. [Repository Link](https://github.com/YogeshTundiya/Gov-porject)`,
  
  location: `### 📍 Location & Availability

• **Current Base**: Gujarat, India.
• **Timezone Flexibility**: Experienced in collaborating with international teams. Highly adaptable with overlap hours.
• **Availability**: Open to immediate remote positions, contract-based consultancies, or relocation to major tech hubs.

Would you like Aditya's phone number or email to coordinate an initial chat?`,

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
  if (q.includes('threat') || q.includes('anomaly') || q.includes('security') || q.includes('intruder') || q.includes('intrusion')) {
    return LOCAL_RESPONSES.threat;
  }
  if (q.includes('healthcare') || q.includes('triage') || q.includes('chatbot') || q.includes('patient')) {
    return LOCAL_RESPONSES.healthcare;
  }
  if (q.includes('face') || q.includes('mesh') || q.includes('contour') || q.includes('opencv') || q.includes('lift')) {
    return LOCAL_RESPONSES.facelift;
  }
  if (q.includes('fake') || q.includes('news') || q.includes('credibility') || q.includes('article')) {
    return LOCAL_RESPONSES.fakenews;
  }
  if (q.includes('netguard') || q.includes('packet') || q.includes('capture')) {
    return LOCAL_RESPONSES.netguard;
  }
  if (q.includes('inspectflow') || q.includes('sync') || q.includes('cxbulk') || q.includes('codex') || q.includes('api')) {
    return LOCAL_RESPONSES.syncs;
  }
  if (q.includes('vault') || q.includes('digivault') || q.includes('gym') || q.includes('fitness') || q.includes('lifeconnect') || q.includes('gov')) {
    return LOCAL_RESPONSES.vault;
  }
  if (q.includes('hire') || q.includes('why') || q.includes('benefit') || q.includes('strong') || q.includes('reason') || q.includes('value')) {
    return LOCAL_RESPONSES.hire;
  }
  if (q.includes('project') || q.includes('build') || q.includes('create') || q.includes('make') || q.includes('github') || q.includes('list') || q.includes('all')) {
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

function buildSystemPrompt(): string {
  return `You are Aditya Devmurari's professional AI representative. You speak exclusively on his behalf using the facts below.

AUDIENCE CONTEXT: Recruiter, founder, or potential collaborator evaluating Aditya.
TONE: Confident, formal, highly persuasive, metric-driven, professional.

RULES:
1. Speak on Aditya's behalf: "Aditya built...", "One of Aditya's key achievements is..."
2. Always mention at least one precise metric from his portfolio facts (e.g. 30% faster processing, 95% ML accuracy, 40% patient triage speedup, 20% manual entry reduction).
3. Keep responses clean, professional, and well-structured using markdown headers and bullet points where helpful.
4. If asked unrelated questions, guide them to contact Aditya at +91-7046387404 or devmurariaaditya@gmail.com.
5. Answer in English only to maintain a professional global corporate standard.
6. Provide links to his specific repositories (like ETH.VOTE, AI Threat Detection, Gym Pro System, etc.) as listed in the fact sheet below.

${ADITYA_FACTS_TEXT}`;
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

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
        max_tokens: 600,
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
                } catch {
                  // Ignore parsing errors for partial stream packets
                }
              }
            }
          }
        } catch {
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
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Internal Server Error";
    return new Response(`Error: ${errMsg}`, { status: 500 });
  }
}
