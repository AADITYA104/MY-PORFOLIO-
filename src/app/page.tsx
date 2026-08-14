'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';

const NodeNetwork3D = dynamic(
  () => import('@/components/NodeNetwork3D').then((m) => m.NodeNetwork3D),
  { ssr: false }
);

// ─── Types ───────────────────────────────────────────────────────────────────
type Message = {
  role: 'user' | 'assistant';
  content: string;
  confidence?: number;   // 0.0–1.0, from verifier
  iterations?: number;   // loop retry count
};

type LoopStep = {
  step: string;
  message: string;
};

// ─── Suggestions ─────────────────────────────────────────────────────────────
const ALL_SUGGESTIONS = [
  'Why should we hire Aditya?',
  'Tell me about ETH.VOTE.',
  "What's his AI/ML experience?",
  'How do I contact him?',
  "What's his tech stack?",
  'Walk me through his work history.',
  'What projects has he shipped?',
  'Is he open to remote work?',
  'What makes him stand out?',
  'Tell me about his blockchain work.',
  "What's his strongest domain?",
  'Is he available right now?',
];

const WELCOME_MSG =
  "Hi — I'm Aditya's AI representative, not Aditya himself. Ask me anything about his background, projects, skills, or how to reach him.";

// ─── Stream Protocol Parser ───────────────────────────────────────────────────
// __STEP__{json} → loop status
// __META__{json} → confidence + iterations
// anything else  → answer text
function parseChunk(chunk: string): {
  type: 'step' | 'meta' | 'text';
  data: string | LoopStep | { confidence: number; iterations: number };
} {
  if (chunk.startsWith('__STEP__')) {
    try {
      const data = JSON.parse(chunk.slice(8)) as LoopStep;
      return { type: 'step', data };
    } catch { /* fallthrough */ }
  }
  if (chunk.startsWith('__META__')) {
    try {
      const data = JSON.parse(chunk.slice(8)) as { confidence: number; iterations: number };
      return { type: 'meta', data };
    } catch { /* fallthrough */ }
  }
  return { type: 'text', data: chunk };
}

// ─── Simple Markdown Renderer ─────────────────────────────────────────────────
function renderMarkdown(text: string): React.ReactNode {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
    const rendered = parts.map((part, j) => {
      if (part.startsWith('**') && part.endsWith('**'))
        return <strong key={j} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
      const lm = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (lm)
        return <a key={j} href={lm[2]} target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline underline-offset-2 hover:text-indigo-300 transition-colors">{lm[1]}</a>;
      return <span key={j}>{part}</span>;
    });
    return (
      <span key={i}>
        {line.startsWith('- ') || line.startsWith('• ')
          ? <span className="flex gap-2 items-start"><span className="text-indigo-500 mt-0.5 shrink-0 text-[10px]">◆</span><span>{rendered}</span></span>
          : rendered}
        {i < lines.length - 1 && '\n'}
      </span>
    );
  });
}

// ─── Agentic Loop Status Bar ──────────────────────────────────────────────────
const STEP_ICONS: Record<string, string> = {
  retrieve: '🔍',
  draft:    '✍️',
  verify:   '🔬',
  retry:    '🔄',
  finalize: '✅',
  fallback: '🛡️',
};
const STEP_COLORS: Record<string, string> = {
  retrieve: 'text-blue-400',
  draft:    'text-indigo-400',
  verify:   'text-violet-400',
  retry:    'text-amber-400',
  finalize: 'text-emerald-400',
  fallback: 'text-amber-500',
};

function LoopStatusBar({ steps, active }: { steps: LoopStep[]; active: boolean }) {
  if (steps.length === 0) return null;
  const last = steps[steps.length - 1];
  const icon = STEP_ICONS[last.step] || '⚙️';
  const color = STEP_COLORS[last.step] || 'text-gray-400';

  return (
    <div className="ml-[38px] flex items-center gap-2 mt-1 mb-2">
      <div className={`flex items-center gap-1.5 text-[10px] font-mono ${color}`}>
        <span>{icon}</span>
        <span className={active ? 'animate-pulse' : ''}>{last.message}</span>
      </div>
      {active && (
        <div className="flex gap-0.5 items-center">
          {[0, 1, 2].map(i => (
            <div key={i} className={`w-0.5 rounded-full bg-current ${color}`}
              style={{ height: i === 1 ? '10px' : '6px', animation: `equalizer 1s ease-in-out ${i * 0.2}s infinite alternate` }} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Confidence Badge ─────────────────────────────────────────────────────────
function ConfidenceBadge({ confidence, iterations }: { confidence: number; iterations: number }) {
  const pct = Math.round(confidence * 100);
  const color = pct >= 85 ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5'
              : pct >= 70 ? 'text-amber-400 border-amber-500/20 bg-amber-500/5'
              : 'text-red-400 border-red-500/20 bg-red-500/5';
  return (
    <div className={`inline-flex items-center gap-1.5 mt-2 text-[9px] font-mono border rounded-lg px-2 py-1 ${color}`}>
      <span>Verified</span>
      <span className="opacity-40">·</span>
      <span>{pct}% confidence</span>
      {iterations > 1 && <><span className="opacity-40">·</span><span>{iterations} passes</span></>}
    </div>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
function AvatarAD({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  const s = size === 'md' ? 'w-9 h-9 text-xs' : 'w-7 h-7 text-[9px]';
  return (
    <div className={`${s} rounded-xl bg-gradient-to-tr from-indigo-600/30 to-amber-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0 relative`}>
      <div className="live-ring" />
      <div className="live-ring" style={{ animationDelay: '1.4s' }} />
      <span className="font-display font-bold text-indigo-300 relative z-10">AD</span>
    </div>
  );
}

// ─── Neural Indicator (initial thinking, before first step arrives) ────────────
function NeuralIndicator() {
  return (
    <div className="flex items-center gap-1.5 py-1">
      {[0, 1, 2, 3].map(i => (
        <div key={i} className="w-0.5 rounded-full bg-indigo-400"
          style={{ height: i === 1 || i === 2 ? '14px' : '8px', animation: `equalizer 1s ease-in-out ${i * 0.15}s infinite alternate` }} />
      ))}
      <span className="ml-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest">Thinking</span>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AIAgentPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: WELCOME_MSG },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState('');
  const [loopSteps, setLoopSteps] = useState<LoopStep[]>([]);
  const [usedSuggestions, setUsedSuggestions] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isInitial = messages.length === 1 && !loading;
  const availableSuggestions = ALL_SUGGESTIONS.filter(s => !usedSuggestions.has(s));
  const visibleSuggestions = availableSuggestions.slice(0, 4);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streaming, loading, loopSteps]);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 160) + 'px';
  }, [input]);

  const handleSend = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setUsedSuggestions(prev => new Set([...prev, text]));
    const userMsg: Message = { role: 'user', content: trimmed };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setStreaming('');
    setLoopSteps([]);

    // Pending meta info from stream
    let pendingConfidence = 0;
    let pendingIterations = 0;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      let textAcc = '';
      let lineBuffer = '';

      if (res.ok && res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value);
            lineBuffer += chunk;

            // Parse line by line for protocol events
            const lines = lineBuffer.split('\n');
            lineBuffer = lines.pop() ?? '';

            for (const line of lines) {
              const parsed = parseChunk(line);
              if (parsed.type === 'step') {
                setLoopSteps(prev => [...prev, parsed.data as LoopStep]);
              } else if (parsed.type === 'meta') {
                const meta = parsed.data as { confidence: number; iterations: number };
                pendingConfidence = meta.confidence;
                pendingIterations = meta.iterations;
              } else {
                // Regular text — could be mixed with events on same line
                const clean = line
                  .replace(/__STEP__\{[^}]*\}/g, '')
                  .replace(/__META__\{[^}]*\}/g, '');
                if (clean) {
                  textAcc += clean;
                  setStreaming(textAcc);
                }
              }
            }

            // Handle remaining buffer that's pure text (no newlines yet)
            if (lineBuffer && !lineBuffer.startsWith('__')) {
              setStreaming(textAcc + lineBuffer);
            }
          }
          // Process any remaining buffer
          if (lineBuffer) {
            const parsed = parseChunk(lineBuffer);
            if (parsed.type === 'text') textAcc += lineBuffer;
          }
        } catch { /* stream cut */ }
      }

      if (!textAcc) textAcc = await res.text().catch(() => '');
      if (!textAcc || textAcc.startsWith('Error:')) {
        textAcc = 'Having a connection issue. Reach Aditya at devmurariaaditya@gmail.com or +91-7046387404.';
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: textAcc,
        confidence: pendingConfidence || undefined,
        iterations: pendingIterations || undefined,
      }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Connection issue. Reach Aditya at devmurariaaditya@gmail.com or +91-7046387404.',
      }]);
    } finally {
      setLoading(false);
      setStreaming('');
      setLoopSteps([]);
    }
  }, [loading, messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(input); }
  };

  return (
    <div className={`min-h-[100dvh] bg-[#050812] flex flex-col relative overflow-hidden transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>

      {/* 3D Background */}
      <div className="absolute inset-0 z-0"><NodeNetwork3D /></div>

      {/* Vignette */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, #050812 100%)' }} />

      {/* Noise */}
      <div className="absolute inset-0 z-[2] pointer-events-none opacity-[0.015]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundRepeat: 'repeat', backgroundSize: '128px' }} />

      {/* ── HEADER ── */}
      <header className="relative z-10 w-full max-w-5xl mx-auto px-5 py-4 flex items-center justify-between border-b border-white/[0.04] shrink-0">
        <div className="flex items-center gap-3">
          <AvatarAD size="md" />
          <div>
            <p className="font-display font-semibold text-[15px] tracking-tight text-white">Aditya Devmurari</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Agentic AI</span>
              <span className="text-gray-700">·</span>
              <span className="flex items-center gap-1 font-mono text-[10px] text-indigo-400 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                Loop Active
              </span>
            </div>
          </div>
        </div>
        <a href="/portfolio"
          className="group flex items-center gap-2 text-[11px] font-mono text-gray-400 hover:text-white border border-white/[0.06] hover:border-indigo-500/40 bg-white/[0.02] hover:bg-indigo-500/5 rounded-xl px-4 py-2.5 transition-all duration-300 uppercase tracking-widest cursor-pointer">
          Portfolio
          <svg className="w-3 h-3 fill-current opacity-60 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24">
            <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-7 14l-5-5 1.41-1.41L11 14.17V7h2v7.17l2.59-2.58L17 13l-5 5z" />
          </svg>
        </a>
      </header>

      {/* ── MAIN ── */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 flex flex-col relative z-10 overflow-hidden">

        {/* Hero */}
        {isInitial && (
          <div className="mt-auto pt-10 pb-6 text-center" style={{ animation: 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both' }}>
            <div className="inline-flex items-center gap-2 font-mono text-[10px] text-indigo-400 uppercase tracking-[0.2em] mb-5 px-3 py-1.5 border border-indigo-500/20 rounded-full bg-indigo-500/5">
              <span className="w-1 h-1 rounded-full bg-indigo-400 animate-pulse" />
              Agentic Loop · Retrieve → Draft → Verify
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-white mb-3 leading-[1.1]">
              Ask Aditya&apos;s<br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #6366f1 0%, #a78bfa 40%, #f59e0b 100%)' }}>
                AI anything.
              </span>
            </h1>
            <p className="text-sm text-gray-400 max-w-sm mx-auto font-body leading-relaxed">
              Powered by a self-correcting agentic loop that verifies every answer before showing it to you.
            </p>

            {/* Mini architecture diagram */}
            <div className="mt-6 inline-flex items-center gap-1.5 text-[10px] font-mono text-gray-600">
              {['Retrieve', 'Draft', 'Verify', 'Reflect', 'Answer'].map((s, i) => (
                <span key={s} className="flex items-center gap-1.5">
                  <span className={`px-2 py-0.5 rounded border ${i === 0 ? 'border-blue-500/25 text-blue-400/70' : i === 2 ? 'border-violet-500/25 text-violet-400/70' : i === 4 ? 'border-emerald-500/25 text-emerald-400/70' : 'border-white/[0.06] text-gray-500'}`}>{s}</span>
                  {i < 4 && <span className="text-gray-700">→</span>}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── CHAT HISTORY ── */}
        <section className={`flex-1 overflow-y-auto space-y-4 py-4 pr-1 ${isInitial ? 'hidden' : ''}`}
          style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.04) transparent' }}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              style={{ animation: 'springUp 0.5s cubic-bezier(0.175,0.885,0.32,1.275) both' }}>
              {msg.role === 'assistant' && <AvatarAD />}
              <div className={`max-w-[80%] ml-2.5 ${msg.role === 'user' ? '' : 'flex flex-col'}`}>
                <div className={`rounded-2xl px-4 py-3.5 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-sm shadow-[0_6px_30px_rgba(99,102,241,0.2)]'
                    : 'bg-white/[0.03] border border-white/[0.055] text-[#cbd5e1] rounded-tl-sm backdrop-blur-sm'
                }`}>
                  <div className="font-body leading-[1.7] whitespace-pre-wrap">
                    {renderMarkdown(msg.content)}
                  </div>
                </div>
                {/* Confidence badge for verified AI answers */}
                {msg.role === 'assistant' && msg.confidence !== undefined && msg.confidence > 0 && (
                  <ConfidenceBadge confidence={msg.confidence} iterations={msg.iterations ?? 1} />
                )}
              </div>
            </div>
          ))}

          {/* Active loop status while loading */}
          {loading && loopSteps.length > 0 && (
            <div className="flex w-full justify-start">
              <AvatarAD />
              <div className="ml-2.5 flex flex-col">
                <div className="rounded-2xl rounded-tl-sm px-4 py-3 bg-white/[0.03] border border-white/[0.055] backdrop-blur-sm min-w-[140px]">
                  <LoopStatusBar steps={loopSteps} active={loading} />
                </div>
              </div>
            </div>
          )}

          {/* Initial neural indicator (before first step arrives) */}
          {loading && loopSteps.length === 0 && (
            <div className="flex w-full justify-start">
              <AvatarAD />
              <div className="ml-2.5 rounded-2xl rounded-tl-sm px-4 py-3.5 bg-white/[0.03] border border-white/[0.055] backdrop-blur-sm">
                <NeuralIndicator />
              </div>
            </div>
          )}

          {/* Streaming answer (after loop completes, during text stream) */}
          {streaming && !loading && (
            <div className="flex w-full justify-start" style={{ animation: 'springUp 0.35s ease both' }}>
              <AvatarAD />
              <div className="max-w-[80%] ml-2.5 rounded-2xl rounded-tl-sm px-4 py-3.5 text-sm bg-white/[0.03] border border-white/[0.055] text-[#cbd5e1] backdrop-blur-sm">
                <div className="font-body leading-[1.7] whitespace-pre-wrap">
                  {renderMarkdown(streaming)}
                  <span className="inline-block w-0.5 h-4 bg-indigo-400 ml-0.5 align-middle" style={{ animation: 'blink 0.85s step-end infinite' }} />
                </div>
              </div>
            </div>
          )}

          {streaming && loading && (
            <div className="flex w-full justify-start" style={{ animation: 'springUp 0.35s ease both' }}>
              <AvatarAD />
              <div className="max-w-[80%] ml-2.5 rounded-2xl rounded-tl-sm px-4 py-3.5 text-sm bg-white/[0.03] border border-white/[0.055] text-[#cbd5e1] backdrop-blur-sm">
                <div className="font-body leading-[1.7] whitespace-pre-wrap">
                  {renderMarkdown(streaming)}
                  <span className="inline-block w-0.5 h-4 bg-indigo-400 ml-0.5 align-middle" style={{ animation: 'blink 0.85s step-end infinite' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </section>

        {/* ── SUGGESTIONS ── */}
        {visibleSuggestions.length > 0 && (
          <div className={`shrink-0 flex gap-2 py-3 overflow-x-auto ${isInitial ? 'flex-wrap justify-center pb-5' : 'pb-2'}`}
            style={{ scrollbarWidth: 'none' }}>
            {visibleSuggestions.map((sug, idx) => (
              <button key={sug} onClick={() => handleSend(sug)} disabled={loading}
                style={{ animation: `chipIn 0.5s cubic-bezier(0.16,1,0.3,1) ${idx * 0.08}s both` }}
                className="shrink-0 text-[11px] font-mono px-3.5 py-2 rounded-xl border border-white/[0.06] hover:border-indigo-500/40 bg-white/[0.02] hover:bg-indigo-500/5 text-gray-400 hover:text-indigo-300 disabled:opacity-35 transition-all duration-300 active:scale-95 cursor-pointer whitespace-nowrap uppercase tracking-wide">
                {sug}
              </button>
            ))}
          </div>
        )}

        {/* ── COMPOSER ── */}
        <section className="shrink-0 pb-5 space-y-3">
          <div className="relative rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-sm focus-within:border-indigo-500/40 focus-within:shadow-[0_0_0_3px_rgba(99,102,241,0.06)] transition-all duration-300 flex items-end gap-2 p-2">
            <textarea ref={textareaRef} value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown} disabled={loading}
              placeholder="Ask about Aditya's experience, projects, or how to reach him…"
              rows={1}
              className="flex-1 bg-transparent border-0 px-3 py-2.5 text-sm font-body text-white placeholder-gray-600 outline-none resize-none min-h-[44px] max-h-[160px] leading-relaxed" />
            <button onClick={() => handleSend(input)} disabled={loading || !input.trim()}
              className="p-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white disabled:opacity-25 transition-all duration-200 shrink-0 cursor-pointer shadow-[0_4px_16px_rgba(99,102,241,0.25)]">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
            </button>
          </div>
          <a href="/portfolio"
            className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl border border-amber-500/15 hover:border-amber-500/40 bg-amber-500/3 hover:bg-amber-500/8 text-amber-500/70 hover:text-amber-400 text-[11px] font-mono font-medium uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer">
            <svg className="w-3.5 h-3.5 fill-current opacity-70" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg>
            View Full Portfolio
          </a>
        </section>
      </main>

      {/* ── GLOBAL STYLES ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        .font-display { font-family: var(--font-display), sans-serif; }
        .font-body    { font-family: var(--font-body), sans-serif; }
        .font-mono    { font-family: var(--font-mono), monospace; }
        .live-ring {
          position: absolute; inset: -3px; border-radius: 13px;
          border: 1px solid rgba(99,102,241,0.6); opacity: 0; pointer-events: none;
          animation: ringPulse 3s ease-in-out infinite;
        }
        @keyframes ringPulse   { 0% { transform: scale(1);    opacity: 0.8; } 100% { transform: scale(1.65); opacity: 0; } }
        @keyframes springUp    { 0% { opacity:0; transform: scale(0.92) translateY(16px); } 100% { opacity:1; transform: scale(1) translateY(0); } }
        @keyframes fadeUp      { from { opacity:0; transform: translateY(14px); } to { opacity:1; transform: translateY(0); } }
        @keyframes blink       { 0%, 100% { opacity:1; } 50% { opacity:0; } }
        @keyframes chipIn      { from { opacity:0; transform: translateY(8px) scale(0.94); } to { opacity:1; transform: translateY(0) scale(1); } }
        @keyframes equalizer   { 0% { height: 4px; opacity: 0.4; } 50% { height: 14px; opacity: 1; } 100% { height: 6px; opacity: 0.6; } }
      ` }} />
    </div>
  );
}
