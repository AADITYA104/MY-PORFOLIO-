import { NextResponse } from 'next/server';

const profile = {
  "identity": {
    "name": "Aditya Devmurari",
    "headline": "Full Stack and AI Architect",
    "resume_title": "Software Engineer | Full Stack and AI Developer",
    "location": "Gujarat, India",
    "experience_summary": "2+ years in research and development, AI/ML, and full stack engineering."
  },
  "contact": {
    "phone": "+91-7046387404",
    "email": "devmurariaaditya@gmail.com",
    "linkedin": "https://linkedin.com/in/devmurari-aditya",
    "github": "https://github.com/AADITYA104",
    "portfolio": "https://adityadevmurari.vercel.app"
  },
  "professional_summary": "Results-driven software developer with 2+ years of experience in research and development and full stack engineering. Experienced in architecting scalable web applications, high-accuracy AI and ML models, and intelligent automation systems using Python, Next.js, and AI agents.",
  "core_strengths": [
    "Combines research depth with shipping-focused software execution.",
    "Moves across AI, automation, web platforms, and emerging technologies without losing product focus.",
    "Comfortable owning both architecture decisions and implementation details.",
    "Can translate complex technical systems into business-facing outcomes."
  ],
  "proof_points": [
    { "label": "Experience", "value": "2+ years across R&D, AI/ML, and full stack delivery" },
    { "label": "Execution", "value": "4+ innovation projects and end-to-end product work" },
    { "label": "AI Impact", "value": "95% predictive accuracy and production AI agent integration" },
    { "label": "Systems Thinking", "value": "30% faster prototype processing and secure blockchain architecture" }
  ],
  "value_points": [
    "Combines research depth with shipping-focused software execution.",
    "Moves across AI, automation, web platforms, and emerging technologies without losing product focus.",
    "Comfortable owning both architecture decisions and implementation details.",
    "Can translate complex technical systems into business-facing outcomes."
  ],
  "role_fit_matrix": [
    {
      "role": "AI Engineer",
      "fit": "Strong",
      "why": [
        "Has applied AI, ML, NLP, and AI agent experience across multiple projects and roles.",
        "Can connect model performance to workflow improvement and user impact."
      ],
      "proof": [
        "95% predictive modeling accuracy",
        "Healthcare agent reduced initial response time by 40%",
        "Production AI agent integration at Mexgen Technologies"
      ]
    },
    {
      "role": "Full Stack Developer",
      "fit": "Strong",
      "why": [
        "Comfortable across frontend, backend, data flows, and deployment-oriented thinking.",
        "Can build complete products rather than isolated features."
      ],
      "proof": [
        "ETH.VOTE end-to-end work",
        "Next.js, React.js, Node.js, FastAPI experience",
        "Performance improvements in both product and prototype systems"
      ]
    },
    {
      "role": "Automation Engineer",
      "fit": "Strong",
      "why": [
        "Uses Python and AI systems to reduce manual work and streamline business operations.",
        "Works well where intelligent workflows matter more than just model experimentation."
      ],
      "proof": [
        "20% reduction in manual data entry",
        "Production AI agent integration",
        "Workflow-driven ML implementation"
      ]
    },
    {
      "role": "R&D Engineer",
      "fit": "Very Strong",
      "why": [
        "Already worked in R&D ownership mode across multiple innovation projects.",
        "Can investigate, prototype, measure, and mentor in evolving technical environments."
      ],
      "proof": [
        "4+ major innovation projects",
        "30% faster prototype processing",
        "Mentored 10+ juniors through SDLC"
      ]
    }
  ],
  "suggested_prompts": [
    "Why should we hire Aditya for a full stack or AI role?",
    "Explain how Aditya creates value for startups and product teams.",
    "Tell me about ETH.VOTE in a way a hiring manager would care about.",
    "Which roles are the best fit for Aditya right now?",
    "How does Aditya combine research depth with shipping ability?",
    "If I connect with Aditya, what kind of collaborator am I getting?"
  ]
};

export async function GET() {
  const apiKey = process.env.GROQ_API_KEY;
  return NextResponse.json({
    using_ai: !!apiKey,
    profile,
  });
}
