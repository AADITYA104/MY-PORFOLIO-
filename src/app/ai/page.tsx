'use client';

import { useState, useEffect, useRef } from 'react';

type Message = { role: 'user' | 'assistant'; content: string };

const WELCOME_MSG = "Hi! 👋 I'm Aditya's AI assistant. Ask me anything about his skills, experience, or flagship projects like ETH.VOTE — I'm here to show you how he can add value to your team!";

const SUGGESTIONS = [
  "Why should we hire Aditya?",
  "Tell me about ETH.VOTE",
  "What is his strongest skill?",
  "Show me his AI projects",
  "Is he open to remote work?",
  "Can he join immediately?",
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: WELCOME_MSG },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Automatically scroll to the latest message as they stream in
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingContent, loading]);

  const handleSend = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setStreamingContent('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        throw new Error('Streaming failed');
      }

      if (!response.body) {
        throw new Error('No stream body received');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const token = decoder.decode(value);
        accumulatedText += token;
        setStreamingContent(accumulatedText);
      }

      setMessages(prev => [...prev, { role: 'assistant', content: accumulatedText }]);
      setStreamingContent('');
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: "Something went wrong connection. Please try again!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend(input);
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-[#050505] text-[#e2e8f0] font-mono selection:bg-[#00ff90]/30 selection:text-[#00ff90]">
      {/* Dynamic scanlines overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[size:100%_4px,3px_100%] opacity-20" />

      {/* Cyber Grid background */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none -z-10" style={{
        backgroundImage: `linear-gradient(to right, #00ff90 1px, transparent 1px), linear-gradient(to bottom, #00ff90 1px, transparent 1px)`,
        backgroundSize: '30px 30px'
      }} />

      {/* Header Panel */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-[#00ff90]/15 bg-black/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-full bg-[#00ff90]/5 border border-[#00ff90]/40 flex items-center justify-center text-sm font-bold text-[#00ff90] shadow-[0_0_12px_rgba(0,255,144,0.15)] animate-pulse">
            A
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#00ff90] border-2 border-[#050505] rounded-full" />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-wide text-white uppercase">Aditya's AI Agent</h1>
            <p className="text-[9px] text-[#00ff90] tracking-widest uppercase font-bold mt-0.5">Active Representation</p>
          </div>
        </div>
        <a 
          href="https://linkedin.com/in/devmurari-aditya" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[10px] text-gray-500 hover:text-[#00ff90] border border-white/5 hover:border-[#00ff90]/30 rounded-md px-3 py-1.5 transition-all duration-300 hover:bg-[#00ff90]/5 cursor-pointer"
        >
          LinkedIn ↗
        </a>
      </header>

      {/* Chat Messages */}
      <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8 space-y-6 flex flex-col scrollbar-thin scrollbar-track-black scrollbar-thumb-white/10">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-[fadeIn_0.3s_ease-out]`}
          >
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs md:text-sm leading-relaxed border transition-all duration-300 ${
              msg.role === 'user' 
                ? 'bg-[#00ff90]/10 border-[#00ff90]/30 text-[#00ff90] rounded-tr-none shadow-[0_0_15px_rgba(0,255,144,0.05)]' 
                : 'bg-[#0f0f0f] border-white/[0.05] text-[#cbd5e1] rounded-tl-none'
            }`}>
              <p className="whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}

        {/* Live Token Streaming Output */}
        {streamingContent && (
          <div className="flex w-full justify-start">
            <div className="max-w-[85%] rounded-2xl rounded-tl-none px-4 py-3 text-xs md:text-sm leading-relaxed bg-[#0f0f0f] border-white/[0.05] text-[#cbd5e1] border shadow-md animate-pulse">
              <p className="whitespace-pre-wrap">{streamingContent}</p>
              <span className="inline-block w-1.5 h-3.5 bg-[#00ff90] ml-1 animate-pulse" />
            </div>
          </div>
        )}

        {/* Loading status typing */}
        {loading && !streamingContent && (
          <div className="flex w-full justify-start animate-pulse">
            <div className="rounded-2xl rounded-tl-none px-4 py-3 text-xs bg-[#0f0f0f] border border-white/[0.05] text-[#00ff90]/60 flex items-center gap-2">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff90] animate-bounce" style={{ animationDelay: '0s' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff90] animate-bounce" style={{ animationDelay: '0.15s' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff90] animate-bounce" style={{ animationDelay: '0.3s' }} />
              </div>
              Syncing credentials...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Floating Suggestions / Recruiter Chips */}
      <section className="px-4 py-2 border-t border-white/[0.03] bg-black/40 backdrop-blur flex gap-2 overflow-x-auto no-scrollbar scroll-smooth flex-shrink-0 select-none">
        {SUGGESTIONS.map((sug, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(sug)}
            disabled={loading}
            className="shrink-0 text-[10px] md:text-[11px] px-3.5 py-2 rounded-full border border-white/5 bg-[#0f0f0f] hover:border-[#00ff90]/40 hover:text-[#00ff90] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 font-medium active:scale-95 cursor-pointer"
          >
            {sug}
          </button>
        ))}
      </section>

      {/* Input panel */}
      <section className="px-4 py-3 border-t border-white/[0.03] bg-black flex gap-3 flex-shrink-0">
        <input 
          type="text" 
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={loading}
          placeholder={loading ? "AI is replying..." : "Ask about skills, experience, projects..."}
          className="flex-1 bg-[#0f0f0f] border border-white/[0.05] rounded-xl px-4 py-3 text-xs md:text-sm text-white placeholder-gray-600 outline-none focus:border-[#00ff90]/40 transition-colors duration-300 disabled:opacity-50 font-mono"
        />
        <button 
          onClick={() => handleSend(input)}
          disabled={loading || !input.trim()}
          className="px-5 py-3 rounded-xl bg-[#00ff90]/10 border border-[#00ff90]/35 text-[#00ff90] font-black text-xs md:text-sm tracking-wider uppercase disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#00ff90]/25 transition-all duration-300 shrink-0 cursor-pointer"
        >
          {loading ? '...' : 'Send'}
        </button>
      </section>

      {/* Bottom Sticky Portfolio Navigation CTA */}
      <footer className="px-4 pb-6 pt-2 border-t border-white/[0.03] bg-black flex-shrink-0 z-10">
        <a 
          href="/" 
          className="flex items-center justify-center gap-2.5 w-full py-3.5 bg-gradient-to-r from-[#00ff90]/5 to-[#00ff90]/15 hover:from-[#00ff90]/10 hover:to-[#00ff90]/25 border border-[#00ff90]/30 hover:border-[#00ff90]/60 rounded-xl text-[#00ff90] hover:text-[#00ff90] font-bold text-xs md:text-sm tracking-widest uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,144,0.15)] select-none text-center cursor-pointer"
        >
          ⬡ View Aditya's Full Portfolio →
        </a>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Hide scrollbars but keep functionality */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
