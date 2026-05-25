# Aditya AI Agent

Aditya Devmurari mate banavel advanced portfolio assistant. Aa version shallow chatbot nathi; aa profile-aware reasoning assistant che je recruiter, founder, client, ane collaborator questions ne role-fit, proof, ane practical value sathe answer kare che.

## Shu advanced che

- Aditya-specific structured knowledge base based on public portfolio + resume
- query analysis for intent, topics, role-fit, project focus, and unknown-detail handling
- AI key hoy to Responses API sathe deeper reasoning flow
- AI key na hoy to pan controls-respecting profile-grounded fallback answers
- audience, style, depth, and language controls, including `Auto (English first)`
- answer format, psychology mode, objection handling, and optional web research mode
- session memory, clear chat, engine status, and response metadata
- honest guardrails: unknown public details invent nathi karto

## Main files

- [server.py](C:/Users/devmu/Documents/Codex/2026-05-25/mare-ek-pota-no-ai-assistent/server.py): routing, query analysis, AI orchestration, fallback reasoning, memory
- [data/aditya_profile.json](C:/Users/devmu/Documents/Codex/2026-05-25/mare-ek-pota-no-ai-assistent/data/aditya_profile.json): structured profile knowledge, role-fit matrix, objection handling
- [static/index.html](C:/Users/devmu/Documents/Codex/2026-05-25/mare-ek-pota-no-ai-assistent/static/index.html): app shell
- [static/styles.css](C:/Users/devmu/Documents/Codex/2026-05-25/mare-ek-pota-no-ai-assistent/static/styles.css): UI styling
- [static/app.js](C:/Users/devmu/Documents/Codex/2026-05-25/mare-ek-pota-no-ai-assistent/static/app.js): frontend chat flow, settings persistence, clear chat, metadata rendering

## Setup

1. `.env.example` ni copy kari ne `.env` banao.
2. `.env` ma values muko:

```text
GROQ_API_KEY=your_api_key_here
AI_BASE_URL=https://api.groq.com/openai/v1
AI_MODEL=openai/gpt-oss-20b
HOST=127.0.0.1
PORT=8000
```

3. Server run karo:

```powershell
python server.py
```

4. Browser ma open karo:

```text
http://127.0.0.1:8000
```

Groq mate recommended base URL `https://api.groq.com/openai/v1` che, ane aa project provider auto-detect pan kare che: `GROQ_API_KEY` hoy to Groq defaults use thase.

## Important behavior

- Publicly confirmed na hoy evi detail mate assistant guess nathi karto
- Availability, salary, notice period, remote preference jivi details mate honest answer aapse
- Strongest role fit ne grounded proof sathe explain karse

## Future customization

- new facts add karva [data/aditya_profile.json](C:/Users/devmu/Documents/Codex/2026-05-25/mare-ek-pota-no-ai-assistent/data/aditya_profile.json) update karo
- assistant ni top-level behavior badalva [server.py](C:/Users/devmu/Documents/Codex/2026-05-25/mare-ek-pota-no-ai-assistent/server.py) ma `BASE_SYSTEM_PROMPT` edit karo
- different model use karva `AI_MODEL` change karo
