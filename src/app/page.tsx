'use client';

import { useState, useEffect, useRef } from 'react';

type Message = { role: 'user' | 'assistant'; content: string; meta?: string };

const SUGGESTIONS = [
  "Why should we hire Aditya?",
  "Tell me about his flagship project ETH.VOTE.",
  "What is his experience in AI and machine learning?",
  "How can I contact Aditya directly?",
];

const WELCOME_MSG = "Hello! I am Aditya Devmurari's AI Representative. I am built to answer your questions about his software engineering background, technical expertise, and shipped projects with full, evidence-backed clarity. How can I help you evaluate him today?";

export default function AIAgentPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: WELCOME_MSG }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [isKeyConfigured, setIsKeyConfigured] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingContent, loading]);

  useEffect(() => {
    // Silently check if the server is in live API mode or intelligent fallback mode
    async function checkHealth() {
      try {
        const res = await fetch('/api/health');
        if (res.ok) {
          const data = await res.json();
          setIsKeyConfigured(data.apiConfigured);
        }
      } catch {
        setIsKeyConfigured(false);
      }
    }
    checkHealth();
  }, []);

  const handleSend = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: text };
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
          audience: 'recruiter',
          mode: 'persuasive',
          depth: 'detailed'
        }),
      });

      if (!response.ok) {
        throw new Error('Connection failed');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let acc = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value);
          setStreamingContent(acc);
        }
      }

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: acc }
      ]);
      setStreamingContent('');
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "You can reach Aditya directly via call/WhatsApp at +91-7046387404 or email devmurariaaditya@gmail.com. He is highly responsive and ready to connect!"
        }
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
    <div className="min-h-[100vh] bg-[#030712] text-[#f3f4f6] flex flex-col relative overflow-hidden font-sans selection:bg-[#10b981]/25 selection:text-[#10b981]">
      {/* Premium Glassmorphic Backdrop Grid & Glow */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.007)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.007)_1px,transparent_1px)] bg-[size:30px_30px]" />
      <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-[#10b981]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] rounded-full bg-[#3b82f6]/5 blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-4xl mx-auto px-6 py-5 flex items-center justify-between border-b border-white/[0.04] backdrop-blur-md relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#10b981]/20 to-[#3b82f6]/20 border border-[#10b981]/30 flex items-center justify-center relative shadow-[0_8px_30px_rgb(16,185,129,0.08)]">
            <span className="text-[#10b981] font-bold text-sm">AD</span>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#10b981] border-2 border-[#030712] rounded-full animate-pulse" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white">Aditya Devmurari</h1>
            <p className="text-[10px] text-gray-400 font-medium mt-0.5 flex items-center gap-1.5">
              <span>AI Representative</span>
              <span className="text-gray-600">•</span>
              <span className="text-[#10b981] font-semibold">{isKeyConfigured ? 'Agent Active' : 'Intelligent Core'}</span>
            </p>
          </div>
        </div>

        <a
          href="/portfolio"
          className="text-xs text-gray-400 hover:text-white border border-white/5 hover:border-white/20 bg-white/[0.02] rounded-xl px-4 py-2 transition-all duration-300 backdrop-blur-sm cursor-pointer"
        >
          Portfolio ↗
        </a>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-8 flex flex-col justify-between relative z-10">
        
        {/* Sleek Greeting Header */}
        {messages.length === 1 && (
          <div className="text-center my-auto py-12 animate-[fadeIn_0.5s_ease-out]">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-400">
              Ask Aditya&apos;s AI anything.
            </h2>
            <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
              Explore his experience in Full Stack development, AI pipelines, and Solidity smart contracts.
            </p>
          </div>
        )}

        {/* Chat History Panel */}
        <section className={`flex-1 overflow-y-auto space-y-6 ${messages.length > 1 ? 'py-4' : 'hidden'} scrollbar-thin scrollbar-thumb-white/[0.04]`}>
          <div className="space-y-6">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-[messageSlide_0.3s_ease-out]`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed border transition-all duration-300 ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-[#10b981] to-[#059669] text-white border-transparent rounded-tr-none shadow-[0_8px_30px_rgba(16,185,129,0.12)]'
                      : 'bg-white/[0.02] border-white/[0.04] text-[#d1d5db] rounded-tl-none backdrop-blur-md'
                  }`}
                >
                  <p className="whitespace-pre-wrap font-medium">{msg.content}</p>
                </div>
              </div>
            ))}

            {/* Live Token Streaming Output */}
            {streamingContent && (
              <div className="flex w-full justify-start animate-pulse">
                <div className="max-w-[85%] rounded-2xl rounded-tl-none px-5 py-3.5 text-sm leading-relaxed bg-white/[0.02] border border-white/[0.04] text-[#d1d5db] backdrop-blur-md relative">
                  <p className="whitespace-pre-wrap font-medium">{streamingContent}</p>
                  <span className="inline-block w-1.5 h-4 bg-[#10b981] ml-1 animate-ping" />
                </div>
              </div>
            )}

            {/* Loading Indicator */}
            {loading && !streamingContent && (
              <div className="flex w-full justify-start">
                <div className="rounded-2xl rounded-tl-none px-5 py-3.5 bg-white/[0.02] border border-white/[0.04] text-[#10b981]/80 flex items-center gap-2 text-xs font-semibold">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-bounce" style={{ animationDelay: '0s' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-bounce" style={{ animationDelay: '0.15s' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-bounce" style={{ animationDelay: '0.3s' }} />
                  </div>
                  Analyzing profile...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </section>

        {/* Suggestion Chips */}
        <section className={`flex-shrink-0 pt-4 flex gap-2 overflow-x-auto no-scrollbar scroll-smooth select-none ${messages.length > 1 ? 'pb-3' : 'pb-6 justify-center flex-wrap'}`}>
          {SUGGESTIONS.map((sug, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(sug)}
              disabled={loading}
              className="shrink-0 text-xs px-4 py-2.5 rounded-xl border border-white/[0.04] hover:border-[#10b981]/30 bg-white/[0.01] hover:bg-[#10b981]/5 text-gray-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 active:scale-95 cursor-pointer backdrop-blur-sm"
            >
              {sug}
            </button>
          ))}
        </section>

        {/* Composer */}
        <section className="flex-shrink-0 space-y-4">
          <div className="relative border border-white/[0.06] bg-white/[0.02] backdrop-blur-md rounded-2xl p-2 focus-within:border-[#10b981]/40 transition-colors duration-300 flex items-end">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              placeholder="Ask about Aditya's skills, ETH.VOTE, or how to contact him..."
              rows={2}
              className="flex-1 bg-transparent border-0 px-4 py-2 text-sm text-white placeholder-gray-500 outline-none resize-none font-medium h-[60px]"
            />
            <button
              onClick={() => handleSend(input)}
              disabled={loading || !input.trim()}
              className="p-3.5 rounded-xl bg-gradient-to-r from-[#10b981] to-[#059669] hover:shadow-[0_8px_20px_rgba(16,185,129,0.25)] text-white font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 shrink-0 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>

          {/* Sticky elegant Portfolio conversion button */}
          <footer className="w-full flex justify-center pt-2">
            <a
              href="/portfolio"
              className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-[#10b981]/5 to-[#3b82f6]/5 hover:from-[#10b981]/10 hover:to-[#3b82f6]/10 border border-[#10b981]/20 hover:border-[#10b981]/50 rounded-2xl text-[#10b981] font-bold text-xs tracking-widest uppercase transition-all duration-300 hover:shadow-[0_0_24px_rgba(16,185,129,0.08)] text-center cursor-pointer"
            >
              ⬡ View Aditya&apos;s Full Portfolio →
            </a>
          </footer>
        </section>

      </main>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes messageSlide {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
