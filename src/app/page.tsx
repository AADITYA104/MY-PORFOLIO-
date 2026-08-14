'use client';

import { useState, useEffect, useRef } from 'react';

type Message = { role: 'user' | 'assistant'; content: string };

// Suggestions cover all visitor types: recruiter, collaborator, casual browser
const ALL_SUGGESTIONS = [
  "Why should we hire Aditya?",
  "Tell me about ETH.VOTE, his flagship project.",
  "What's his AI/ML experience?",
  "How do I contact him directly?",
  "What's his full tech stack?",
  "Walk me through his work history.",
  "What projects has he shipped?",
  "Is he open to remote or freelance work?",
  "What makes him different from other developers?",
  "Tell me about his blockchain work.",
  "What's his strongest domain?",
  "Is he available right now?",
];

// Clear persona boundary from the first message
const WELCOME_MSG =
  "Hi — I'm an AI representative for Aditya Devmurari, not Aditya himself. I can tell you about his background, projects, tech stack, work history, and how to reach him. What would you like to know?";

export default function AIAgentPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: WELCOME_MSG },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [usedSuggestions, setUsedSuggestions] = useState<Set<string>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Available suggestions = all minus used ones
  const availableSuggestions = ALL_SUGGESTIONS.filter((s) => !usedSuggestions.has(s));
  // Show first 4 available suggestions
  const visibleSuggestions = availableSuggestions.slice(0, 4);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingContent, loading]);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 160) + 'px';
  }, [input]);

  const handleSend = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    // Mark suggestion as used
    setUsedSuggestions((prev) => new Set([...prev, text]));

    const userMsg: Message = { role: 'user', content: trimmed };
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
        }),
      });

      let acc = '';

      if (response.ok && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            acc += decoder.decode(value);
            setStreamingContent(acc);
          }
        } catch {
          // Stream interrupted — use what we have
        }
      }

      if (!acc) {
        acc = await response.text().catch(() => '');
      }

      if (!acc || acc.startsWith('Error:')) {
        acc =
          "I'm having a small connection issue right now. For direct answers, reach Aditya at +91-7046387404 or devmurariaaditya@gmail.com — he's very responsive.";
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: acc }]);
      setStreamingContent('');
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "Connection issue on my end. You can reach Aditya directly at +91-7046387404 or devmurariaaditya@gmail.com.",
        },
      ]);
    } finally {
      setLoading(false);
      setStreamingContent('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  const isInitialState = messages.length === 1 && !loading;

  return (
    <div className="min-h-[100dvh] bg-[#030712] text-[#f3f4f6] flex flex-col relative overflow-hidden font-sans selection:bg-[#10b981]/25 selection:text-[#10b981]">
      {/* Background — subtle drifting grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.006) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.006) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          animation: 'gridDrift 140s linear infinite',
        }}
      />
      {/* Glow orbs */}
      <div className="absolute top-[-8%] left-[15%] w-[550px] h-[550px] rounded-full bg-[#10b981]/5 blur-[120px] pointer-events-none" style={{ animation: 'orbFloat1 25s ease-in-out infinite alternate' }} />
      <div className="absolute bottom-[-10%] right-[10%] w-[450px] h-[450px] rounded-full bg-[#3b82f6]/5 blur-[100px] pointer-events-none" style={{ animation: 'orbFloat2 30s ease-in-out infinite alternate' }} />

      {/* ── HEADER ── */}
      <header className="w-full max-w-4xl mx-auto px-5 py-4 flex items-center justify-between border-b border-white/[0.04] backdrop-blur-md relative z-10 shrink-0">
        <div className="flex items-center gap-3">
          {/* Logo with pulse rings */}
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#10b981]/20 to-[#3b82f6]/20 border border-[#10b981]/30 flex items-center justify-center relative shadow-[0_8px_30px_rgba(16,185,129,0.08)]">
            <div className="live-ring" />
            <div className="live-ring" style={{ animationDelay: '1.5s' }} />
            <span className="text-[#10b981] font-bold text-sm z-10 relative">AD</span>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#10b981] border-2 border-[#030712] rounded-full z-20 animate-pulse" />
          </div>
          <div>
            <p className="text-sm font-bold tracking-tight text-white">Aditya Devmurari</p>
            <p className="text-[10px] text-gray-400 font-medium mt-0.5 flex items-center gap-1.5">
              <span>AI Representative</span>
              <span className="text-gray-600">•</span>
              <span className="text-[#10b981] font-semibold">Agent Active</span>
            </p>
          </div>
        </div>

        <a
          href="/portfolio"
          className="text-xs text-gray-400 hover:text-white border border-white/[0.06] hover:border-white/25 bg-white/[0.02] hover:bg-white/[0.05] rounded-xl px-4 py-2 transition-all duration-300 backdrop-blur-sm"
        >
          View Portfolio ↗
        </a>
      </header>

      {/* ── MAIN ── */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 flex flex-col relative z-10 overflow-hidden">

        {/* Hero state — shown only when no conversation yet */}
        {isInitialState && (
          <div className="text-center mt-auto pt-12 pb-8" style={{ animation: 'fadeUp 0.5s ease-out' }}>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-400">
                Ask Aditya&apos;s AI anything.
              </span>
            </h1>
            <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
              His experience, projects, tech stack, and contact info — all in one place.
            </p>
          </div>
        )}

        {/* ── CHAT HISTORY ── */}
        <section
          className={`flex-1 overflow-y-auto space-y-5 py-4 scrollbar-thin scrollbar-thumb-white/[0.04] ${isInitialState ? 'hidden' : ''}`}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              style={{ animation: 'springUp 0.45s cubic-bezier(0.175,0.885,0.32,1.275) both' }}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#10b981]/20 to-[#3b82f6]/20 border border-[#10b981]/30 flex items-center justify-center mr-2.5 shrink-0 mt-1">
                  <span className="text-[#10b981] font-bold text-[9px]">AD</span>
                </div>
              )}
              <div
                className={`max-w-[82%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed border ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-[#10b981] to-[#059669] text-white border-transparent rounded-tr-none shadow-[0_6px_24px_rgba(16,185,129,0.15)]'
                    : 'bg-white/[0.025] border-white/[0.05] text-[#d1d5db] rounded-tl-none backdrop-blur-md'
                }`}
              >
                <p className="whitespace-pre-wrap font-[450] leading-[1.65]">{msg.content}</p>
              </div>
            </div>
          ))}

          {/* Streaming */}
          {streamingContent && (
            <div className="flex w-full justify-start" style={{ animation: 'springUp 0.3s ease both' }}>
              <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#10b981]/20 to-[#3b82f6]/20 border border-[#10b981]/30 flex items-center justify-center mr-2.5 shrink-0 mt-1">
                <span className="text-[#10b981] font-bold text-[9px]">AD</span>
              </div>
              <div className="max-w-[82%] rounded-2xl rounded-tl-none px-5 py-3.5 text-sm leading-relaxed bg-white/[0.025] border border-white/[0.05] text-[#d1d5db] backdrop-blur-md">
                <p className="whitespace-pre-wrap font-[450] leading-[1.65]">{streamingContent}</p>
                <span className="inline-block w-[3px] h-4 bg-[#10b981] ml-1 align-middle" style={{ animation: 'blink 1s step-end infinite' }} />
              </div>
            </div>
          )}

          {/* Loading dots */}
          {loading && !streamingContent && (
            <div className="flex w-full justify-start">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#10b981]/20 to-[#3b82f6]/20 border border-[#10b981]/30 flex items-center justify-center mr-2.5 shrink-0">
                <span className="text-[#10b981] font-bold text-[9px]">AD</span>
              </div>
              <div className="rounded-2xl rounded-tl-none px-5 py-4 bg-white/[0.025] border border-white/[0.05] backdrop-blur-md flex items-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[#10b981]"
                    style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </section>

        {/* ── SUGGESTION CHIPS ── */}
        {visibleSuggestions.length > 0 && (
          <div
            className={`shrink-0 flex gap-2 overflow-x-auto py-3 no-scrollbar ${
              isInitialState ? 'justify-center flex-wrap pb-6' : 'pb-3'
            }`}
          >
            {visibleSuggestions.map((sug, idx) => (
              <button
                key={sug}
                onClick={() => handleSend(sug)}
                disabled={loading}
                style={{ animation: `chipIn 0.5s cubic-bezier(0.16,1,0.3,1) ${idx * 0.07}s both` }}
                className="shrink-0 text-xs px-4 py-2.5 rounded-xl border border-white/[0.06] hover:border-[#10b981]/40 bg-white/[0.015] hover:bg-[#10b981]/8 text-gray-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 active:scale-95 cursor-pointer backdrop-blur-sm whitespace-nowrap"
              >
                {sug}
              </button>
            ))}
          </div>
        )}

        {/* ── COMPOSER ── */}
        <section className="shrink-0 pb-4 space-y-3">
          <div className="relative border border-white/[0.07] bg-white/[0.025] backdrop-blur-md rounded-2xl p-2 focus-within:border-[#10b981]/40 focus-within:shadow-[0_0_24px_rgba(16,185,129,0.08)] transition-all duration-300 flex items-end gap-2">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              placeholder="Ask about Aditya's experience, projects, or how to reach him..."
              rows={1}
              className="flex-1 bg-transparent border-0 px-4 py-2.5 text-sm text-white placeholder-gray-500/80 outline-none resize-none font-[450] min-h-[44px] max-h-[160px] leading-relaxed"
            />
            <button
              onClick={() => handleSend(input)}
              disabled={loading || !input.trim()}
              className="p-3.5 rounded-xl bg-gradient-to-r from-[#10b981] to-[#059669] hover:shadow-[0_6px_20px_rgba(16,185,129,0.3)] text-white font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 shrink-0 cursor-pointer active:scale-95"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>

          {/* Portfolio CTA */}
          <a
            href="/portfolio"
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-[#10b981]/5 to-[#3b82f6]/5 hover:from-[#10b981]/12 hover:to-[#3b82f6]/12 border border-[#10b981]/20 hover:border-[#10b981]/50 rounded-2xl text-[#10b981] font-bold text-xs tracking-widest uppercase transition-all duration-300 hover:shadow-[0_0_24px_rgba(16,185,129,0.08)] cursor-pointer hover:scale-[1.005]"
          >
            ⬡ View Aditya&apos;s Full Portfolio →
          </a>
        </section>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        .live-ring {
          position: absolute;
          inset: -3px;
          border-radius: 14px;
          border: 1.5px solid rgba(16, 185, 129, 0.5);
          opacity: 0;
          pointer-events: none;
          animation: ringPulse 3s cubic-bezier(0.16,1,0.3,1) infinite;
        }

        @keyframes ringPulse {
          0%   { transform: scale(1);   opacity: 0.9; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        @keyframes gridDrift {
          from { background-position: 0 0; }
          to   { background-position: 600px 600px; }
        }
        @keyframes orbFloat1 {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(60px,30px) scale(1.12); }
        }
        @keyframes orbFloat2 {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(-50px,-40px) scale(0.88); }
        }
        @keyframes springUp {
          0%   { opacity:0; transform: scale(0.93) translateY(18px); }
          100% { opacity:1; transform: scale(1) translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform: translateY(10px); }
          to   { opacity:1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity:1; }
          50%       { opacity:0; }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40%            { transform: translateY(-5px); }
        }
        @keyframes chipIn {
          from { opacity:0; transform: translateY(10px) scale(0.95); }
          to   { opacity:1; transform: translateY(0) scale(1); }
        }
      `}} />
    </div>
  );
}
