'use client';

import { useState, useEffect, useRef } from 'react';

type Message = { role: 'user' | 'assistant'; content: string; meta?: string };
type ProfileData = {
  using_ai: boolean;
  profile: {
    identity: { name: string; headline: string; location: string; experience_summary: string };
    contact: { phone: string; email: string; linkedin: string; github: string; portfolio: string };
    professional_summary: string;
    proof_points: { label: string; value: string }[];
    value_points: string[];
    role_fit_matrix: { role: string; fit: string; why: string[] }[];
    suggested_prompts: string[];
  };
};
type HealthData = { apiConfigured: boolean; model: string; provider: string };

const INITIAL_MSG: Message = {
  role: 'assistant',
  content: "Hi, I'm Aditya's AI agent. Ask me why he is strong for a role, how he works, what he has built, or why connecting with him can create real value.",
  meta: 'System intro',
};

export default function AIAgentPage() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MSG]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [health, setHealth] = useState<HealthData | null>(null);
  const [audience, setAudience] = useState('recruiter');
  const [mode, setMode] = useState('balanced');
  const [depth, setDepth] = useState('detailed');
  const [engineStatus, setEngineStatus] = useState('Checking...');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingContent, loading]);

  useEffect(() => {
    async function init() {
      try {
        const [profileRes, healthRes] = await Promise.all([
          fetch('/api/profile'),
          fetch('/api/health'),
        ]);
        const profileData: ProfileData = await profileRes.json();
        const healthData: HealthData = await healthRes.json();
        setProfile(profileData);
        setHealth(healthData);
        setEngineStatus(healthData.apiConfigured ? healthData.model : 'Profile-grounded');
      } catch {
        setEngineStatus('Offline');
      }
    }
    init();
  }, []);

  const handleSend = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: text, meta: 'You' };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setStreamingContent('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          audience,
          mode,
          depth,
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      if (!response.body) throw new Error('No stream');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let acc = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value);
        setStreamingContent(acc);
      }

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: acc, meta: `${audience} / ${mode}` },
      ]);
      setStreamingContent('');
    } catch (err: any) {
      const errMsg = err?.message || 'Connection failed';
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: errMsg.includes('GROQ_API_KEY')
            ? '⚠️ GROQ_API_KEY is missing. Please add it in Vercel → Settings → Environment Variables, then redeploy.'
            : `To get in touch with Aditya directly, reach him at +91-7046387404 or devmurariaaditya@gmail.com`,
          meta: 'System',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  return (
    <div className="ag-root">
      {/* Noise grid */}
      <div className="ag-noise" />

      <main className="ag-layout">
        {/* ── HERO ── */}
        <section className="ag-panel ag-hero">
          <div className="ag-hero-copy">
            <p className="ag-eyebrow">Aditya Devmurari / AI Representative</p>
            <h1 className="ag-h1">Advanced portfolio intelligence with real reasoning depth.</h1>
            <p className="ag-summary">
              {profile?.profile.professional_summary ||
                'This agent is built to explain Aditya\'s strengths with clarity, depth, proof, and role-aware positioning.'}
            </p>
            {/* Proof grid */}
            <div className="ag-proof-grid">
              {(profile?.profile.proof_points || []).map((pt) => (
                <article key={pt.label} className="ag-proof-card">
                  <strong>{pt.label}</strong>
                  <span>{pt.value}</span>
                </article>
              ))}
            </div>
          </div>

          <aside className="ag-hero-aside">
            <div className="ag-status-card">
              <div className="ag-status-row">
                <span className="ag-status-label">Engine</span>
                <span className="ag-badge">{engineStatus}</span>
              </div>
              <p className="ag-status-title">Aditya AI Agent</p>
              <p className="ag-status-copy">
                {health?.apiConfigured
                  ? `Live ${health.provider} AI reasoning is active.`
                  : 'Built to answer recruiters, founders, clients, and collaborators with evidence-backed positioning.'}
              </p>
            </div>

            <div className="ag-contact-card">
              <p className="ag-card-label">Public Links</p>
              <div className="ag-link-list">
                <a href="/portfolio" rel="noreferrer">Portfolio</a>
                <a href={profile?.profile.contact.linkedin || 'https://linkedin.com/in/devmurari-aditya'} target="_blank" rel="noreferrer">LinkedIn</a>
                <a href={profile?.profile.contact.github || 'https://github.com/AADITYA104'} target="_blank" rel="noreferrer">GitHub</a>
                <a href={`mailto:${profile?.profile.contact.email || 'devmurariaaditya@gmail.com'}`}>
                  {profile?.profile.contact.email || 'devmurariaaditya@gmail.com'}
                </a>
              </div>
            </div>
          </aside>
        </section>

        {/* ── WORKSPACE ── */}
        <section className="ag-workspace">
          {/* Sidebar */}
          <aside className="ag-panel ag-sidebar">
            <div className="ag-controls-block">
              <div className="ag-sidebar-head">
                <p className="ag-card-label">Response Controls</p>
                <button
                  type="button"
                  className="ag-ghost-button"
                  onClick={() => {
                    setMessages([INITIAL_MSG]);
                    setStreamingContent('');
                  }}
                >
                  Clear Chat
                </button>
              </div>

              <label htmlFor="ag-audience">Audience</label>
              <select id="ag-audience" value={audience} onChange={(e) => setAudience(e.target.value)}>
                <option value="recruiter">Recruiter</option>
                <option value="founder">Founder</option>
                <option value="client">Client</option>
                <option value="collaborator">Collaborator</option>
                <option value="general">General</option>
              </select>

              <label htmlFor="ag-mode">Style</label>
              <select id="ag-mode" value={mode} onChange={(e) => setMode(e.target.value)}>
                <option value="balanced">Balanced</option>
                <option value="persuasive">Persuasive</option>
                <option value="technical">Technical</option>
                <option value="strategic">Strategic</option>
              </select>

              <label htmlFor="ag-depth">Depth</label>
              <select id="ag-depth" value={depth} onChange={(e) => setDepth(e.target.value)}>
                <option value="detailed">Detailed</option>
                <option value="deep">Deep Dive</option>
                <option value="concise">Concise</option>
              </select>
            </div>

            <div className="ag-value-block">
              <p className="ag-card-label">Why Aditya Stands Out</p>
              <div className="ag-value-points">
                {(profile?.profile.value_points || [
                  'Combines research depth with shipping-focused software execution.',
                  'Moves across AI, automation, and web platforms without losing product focus.',
                  'Comfortable owning both architecture decisions and implementation details.',
                  'Can translate complex technical systems into business-facing outcomes.',
                ]).map((pt, i) => (
                  <div key={i} className="ag-value-point">{pt}</div>
                ))}
              </div>
            </div>

            <div className="ag-matrix-block">
              <p className="ag-card-label">Role Fit Matrix</p>
              <div className="ag-role-fit-grid">
                {(profile?.profile.role_fit_matrix || []).map((item) => (
                  <article key={item.role} className="ag-fit-card">
                    <strong>{item.role}</strong>
                    <span>{item.why[0]}</span>
                    <em>{item.fit} fit</em>
                  </article>
                ))}
              </div>
            </div>
          </aside>

          {/* Chat */}
          <section className="ag-panel ag-chat-panel">
            <div className="ag-chat-head">
              <div>
                <p className="ag-card-label">Ask Anything</p>
                <h2 className="ag-h2">Role fit, project depth, value proposition, collaboration style, technical proof.</h2>
              </div>
              <div className="ag-conversation-meta">
                <span className="ag-meta-pill">{loading ? 'Thinking…' : 'Ready'}</span>
              </div>
            </div>

            <div className="ag-messages">
              {messages.map((msg, idx) => (
                <article key={idx} className={`ag-message ag-message--${msg.role}`}>
                  <div className="ag-message-meta">{msg.meta || (msg.role === 'assistant' ? 'Assistant' : 'You')}</div>
                  <p>{msg.content}</p>
                </article>
              ))}

              {streamingContent && (
                <article className="ag-message ag-message--assistant ag-message--streaming">
                  <div className="ag-message-meta">{audience} / {mode}</div>
                  <p>{streamingContent}<span className="ag-cursor" /></p>
                </article>
              )}

              {loading && !streamingContent && (
                <article className="ag-message ag-message--assistant">
                  <div className="ag-message-meta">Thinking</div>
                  <p className="ag-dots">
                    <span />
                    <span />
                    <span />
                  </p>
                </article>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Prompt chips */}
            <div className="ag-prompt-strip">
              {(profile?.profile.suggested_prompts || [
                'Why should we hire Aditya for a full stack or AI role?',
                'Tell me about ETH.VOTE in a way a hiring manager would care about.',
                'Which roles are the best fit for Aditya right now?',
                'How does Aditya combine research depth with shipping ability?',
              ]).map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  className="ag-prompt-chip"
                  onClick={() => handleSend(prompt)}
                  disabled={loading}
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Composer */}
            <form
              className="ag-composer"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
            >
              <textarea
                id="ag-prompt"
                rows={3}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Example: Why would Aditya be a strong hire for an AI product team?"
                disabled={loading}
              />
              <div className="ag-composer-row">
                <p className="ag-hint">Tip: choose an audience and style, then ask your question.</p>
                <button id="ag-send-button" type="submit" disabled={loading || !input.trim()}>
                  {loading ? 'Thinking…' : 'Send'}
                </button>
              </div>
            </form>

            {/* ── PORTFOLIO BUTTON ── always visible at the bottom */}
            <a href="/portfolio" id="ag-portfolio-cta" className="ag-portfolio-cta">
              ⬡ View Aditya&apos;s Full Portfolio →
            </a>
          </section>
        </section>
      </main>

      <style>{`
        :root {
          --bg: #050505;
          --panel: rgba(9, 14, 20, 0.82);
          --panel-strong: rgba(7, 11, 16, 0.95);
          --line: rgba(87, 255, 196, 0.16);
          --line-strong: rgba(87, 255, 196, 0.35);
          --text: #ecfff8;
          --muted: #8ba6a0;
          --brand: #57ffc4;
          --brand-soft: #18b6a0;
          --assistant-bg: rgba(9, 25, 23, 0.92);
          --user-bg: linear-gradient(135deg, #0a5f52, #18b6a0);
          --danger: #ff7b7b;
          --shadow: 0 24px 60px rgba(0,0,0,0.38);
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; }
        html, body { min-height: 100%; }
        body {
          font-family: 'Segoe UI', Arial, sans-serif;
          font-size: 15px;
          color: var(--text);
          background:
            radial-gradient(circle at top, rgba(24,182,160,0.14), transparent 30%),
            radial-gradient(circle at bottom right, rgba(87,255,196,0.08), transparent 25%),
            var(--bg);
        }

        .ag-noise {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 22px 22px;
          mask-image: radial-gradient(circle at center, black, transparent 92%);
          opacity: 0.35;
        }

        .ag-layout {
          position: relative; z-index: 1;
          width: min(1240px, calc(100% - 28px));
          margin: 0 auto;
          padding: 28px 0 48px;
        }

        /* Panel base */
        .ag-panel {
          border: 1px solid var(--line);
          background: var(--panel);
          box-shadow: var(--shadow);
          backdrop-filter: blur(18px);
        }

        /* HERO */
        .ag-hero {
          display: grid;
          grid-template-columns: minmax(0, 1.6fr) minmax(280px, 0.8fr);
          gap: 22px;
          padding: 28px;
          border-radius: 32px;
        }
        .ag-eyebrow, .ag-card-label {
          margin: 0 0 10px;
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--brand);
          font-weight: 700;
        }
        .ag-h1 {
          font-size: clamp(1.8rem, 4vw, 3.8rem);
          line-height: 0.96;
          max-width: 14ch;
          margin: 0;
        }
        .ag-summary {
          max-width: 70ch;
          font-size: 1rem;
          line-height: 1.7;
          color: var(--muted);
          margin: 14px 0 0;
        }
        .ag-proof-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0,1fr));
          gap: 12px;
          margin-top: 20px;
        }
        .ag-proof-card {
          padding: 14px;
          border-radius: 18px;
          border: 1px solid rgba(87,255,196,0.12);
          background: rgba(255,255,255,0.02);
        }
        .ag-proof-card strong { display: block; font-size: 1rem; margin-bottom: 6px; }
        .ag-proof-card span { color: var(--muted); line-height: 1.5; font-size: 0.88rem; }

        .ag-hero-aside { display: flex; flex-direction: column; gap: 14px; }
        .ag-status-card, .ag-contact-card {
          padding: 16px;
          border-radius: 22px;
          background: var(--panel-strong);
          border: 1px solid rgba(87,255,196,0.1);
        }
        .ag-status-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
        .ag-status-label { color: var(--muted); font-size: 0.84rem; }
        .ag-badge {
          padding: 5px 10px;
          border-radius: 999px;
          border: 1px solid rgba(87,255,196,0.18);
          color: var(--brand);
          font-size: 0.74rem;
          font-weight: 700;
        }
        .ag-status-title { margin: 14px 0 6px; font-size: 1.2rem; font-weight: 800; }
        .ag-status-copy { color: var(--muted); line-height: 1.6; font-size: 0.88rem; }
        .ag-link-list { display: grid; gap: 8px; }
        .ag-link-list a {
          display: block;
          color: var(--text);
          text-decoration: none;
          padding: 10px 12px;
          border-radius: 12px;
          border: 1px solid rgba(87,255,196,0.08);
          background: rgba(255,255,255,0.02);
          font-size: 0.88rem;
          transition: color 0.15s, border-color 0.15s;
        }
        .ag-link-list a:hover { border-color: var(--line-strong); color: var(--brand); }

        /* WORKSPACE */
        .ag-workspace {
          display: grid;
          grid-template-columns: 320px minmax(0,1fr);
          gap: 18px;
          margin-top: 18px;
        }
        .ag-sidebar {
          padding: 18px;
          border-radius: 26px;
          height: fit-content;
        }
        .ag-controls-block, .ag-value-block, .ag-matrix-block { display: grid; gap: 8px; }
        .ag-value-block, .ag-matrix-block { margin-top: 22px; }
        .ag-sidebar-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; }

        label { font-size: 0.88rem; color: var(--muted); }
        select {
          width: 100%;
          border: 1px solid rgba(87,255,196,0.12);
          border-radius: 14px;
          background: rgba(0,0,0,0.24);
          color: var(--text);
          padding: 10px 12px;
          font: inherit;
          cursor: pointer;
        }
        select:focus { outline: 1px solid rgba(87,255,196,0.45); border-color: rgba(87,255,196,0.4); }

        .ag-value-points { display: grid; gap: 10px; }
        .ag-value-point {
          padding: 12px;
          border-radius: 14px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(87,255,196,0.07);
          color: var(--muted);
          line-height: 1.55;
          font-size: 0.88rem;
        }
        .ag-role-fit-grid { display: grid; gap: 10px; }
        .ag-fit-card {
          padding: 14px;
          border-radius: 16px;
          border: 1px solid rgba(87,255,196,0.10);
          background: rgba(255,255,255,0.02);
        }
        .ag-fit-card strong { display: block; font-size: 0.95rem; margin-bottom: 5px; }
        .ag-fit-card span { color: var(--muted); font-size: 0.84rem; line-height: 1.5; }
        .ag-fit-card em { display: inline-block; margin-top: 6px; font-style: normal; color: var(--brand); font-size: 0.8rem; }

        /* CHAT */
        .ag-chat-panel {
          padding: 22px;
          border-radius: 28px;
          display: flex;
          flex-direction: column;
          min-height: 70vh;
        }
        .ag-chat-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 4px;
        }
        .ag-h2 { font-size: 1.15rem; line-height: 1.3; font-weight: 700; margin-top: 4px; }
        .ag-conversation-meta { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 6px; }
        .ag-meta-pill {
          padding: 5px 10px;
          border-radius: 999px;
          border: 1px solid rgba(87,255,196,0.18);
          color: var(--brand);
          font-size: 0.74rem;
          font-weight: 700;
        }

        .ag-messages {
          margin-top: 14px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-height: 240px;
          max-height: 46vh;
          overflow-y: auto;
          padding-right: 4px;
        }
        .ag-message {
          max-width: 90%;
          padding: 14px 16px;
          border-radius: 20px;
          line-height: 1.7;
          border: 1px solid rgba(87,255,196,0.08);
          animation: ag-rise 200ms ease-out;
        }
        .ag-message p { white-space: pre-wrap; font-size: 0.9rem; }
        .ag-message-meta { margin-bottom: 8px; font-size: 0.72rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--brand); }
        .ag-message--assistant { align-self: flex-start; background: var(--assistant-bg); }
        .ag-message--user { align-self: flex-end; background: var(--user-bg); color: #031b16; border-color: transparent; }
        .ag-message--user .ag-message-meta { color: rgba(3,27,22,0.6); }
        .ag-message--streaming { opacity: 0.9; }
        .ag-cursor { display: inline-block; width: 6px; height: 14px; background: var(--brand); margin-left: 2px; animation: ag-blink 0.9s step-end infinite; vertical-align: middle; }

        .ag-dots { display: flex; gap: 5px; align-items: center; }
        .ag-dots span { width: 7px; height: 7px; background: var(--brand); border-radius: 50%; animation: ag-bounce 1s ease-in-out infinite; }
        .ag-dots span:nth-child(2) { animation-delay: 0.15s; }
        .ag-dots span:nth-child(3) { animation-delay: 0.3s; }

        /* Prompt chips */
        .ag-prompt-strip { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
        .ag-prompt-chip {
          border: 1px solid rgba(87,255,196,0.14);
          background: rgba(255,255,255,0.02);
          color: var(--text);
          padding: 8px 13px;
          border-radius: 999px;
          cursor: pointer;
          font-size: 0.8rem;
          font-family: inherit;
          transition: color 0.15s, border-color 0.15s;
        }
        .ag-prompt-chip:hover { color: var(--brand); border-color: rgba(87,255,196,0.34); }
        .ag-prompt-chip:disabled { opacity: 0.4; cursor: not-allowed; }

        /* Composer */
        .ag-composer { margin-top: auto; padding-top: 16px; border-top: 1px solid rgba(87,255,196,0.08); }
        textarea {
          width: 100%;
          min-height: 90px;
          resize: vertical;
          border: 1px solid rgba(87,255,196,0.12);
          border-radius: 16px;
          background: rgba(0,0,0,0.24);
          color: var(--text);
          padding: 12px 14px;
          font: inherit;
          font-size: 0.9rem;
        }
        textarea:focus { outline: 1px solid rgba(87,255,196,0.45); border-color: rgba(87,255,196,0.4); }
        .ag-composer-row { display: flex; align-items: center; justify-content: space-between; gap: 14px; margin-top: 10px; }
        .ag-hint { color: var(--muted); font-size: 0.82rem; line-height: 1.5; }

        button {
          font: inherit;
          border: 0;
          border-radius: 14px;
          padding: 11px 18px;
          background: linear-gradient(135deg, var(--brand), var(--brand-soft));
          color: #041512;
          font-weight: 800;
          cursor: pointer;
          transition: transform 140ms ease, opacity 140ms ease;
        }
        button:hover { transform: translateY(-1px); }
        button:disabled { cursor: wait; opacity: 0.55; transform: none; }
        .ag-ghost-button {
          background: transparent;
          color: var(--muted);
          padding: 6px 10px;
          border: 1px solid rgba(87,255,196,0.14);
          font-size: 0.8rem;
        }
        .ag-ghost-button:hover { color: var(--brand); border-color: rgba(87,255,196,0.34); transform: none; }

        /* ── PORTFOLIO CTA (always at bottom of chat panel) ── */
        .ag-portfolio-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 18px;
          padding: 14px 20px;
          border-radius: 18px;
          border: 1px solid rgba(87,255,196,0.30);
          background: linear-gradient(135deg, rgba(87,255,196,0.06), rgba(24,182,160,0.12));
          color: var(--brand);
          font-weight: 800;
          font-size: 0.92rem;
          letter-spacing: 0.06em;
          text-decoration: none;
          text-transform: uppercase;
          text-align: center;
          transition: background 0.2s, border-color 0.2s, box-shadow 0.2s, transform 0.15s;
          flex-shrink: 0;
        }
        .ag-portfolio-cta:hover {
          background: linear-gradient(135deg, rgba(87,255,196,0.12), rgba(24,182,160,0.22));
          border-color: rgba(87,255,196,0.55);
          box-shadow: 0 0 24px rgba(87,255,196,0.15);
          transform: translateY(-2px);
        }

        /* Animations */
        @keyframes ag-rise {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ag-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes ag-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        /* Responsive */
        @media (max-width: 980px) {
          .ag-hero, .ag-workspace { grid-template-columns: 1fr; }
          .ag-chat-panel { min-height: auto; }
        }
        @media (max-width: 640px) {
          .ag-layout { width: calc(100% - 16px); padding-top: 14px; }
          .ag-hero, .ag-sidebar, .ag-chat-panel { border-radius: 20px; padding: 16px; }
          .ag-proof-grid { grid-template-columns: 1fr; }
          .ag-message { max-width: 100%; }
          .ag-chat-head, .ag-composer-row { flex-direction: column; align-items: stretch; }
          .ag-conversation-meta { justify-content: flex-start; }
        }

        /* Custom scrollbar */
        .ag-messages::-webkit-scrollbar { width: 4px; }
        .ag-messages::-webkit-scrollbar-track { background: transparent; }
        .ag-messages::-webkit-scrollbar-thumb { background: rgba(87,255,196,0.2); border-radius: 4px; }
      `}</style>
    </div>
  );
}
