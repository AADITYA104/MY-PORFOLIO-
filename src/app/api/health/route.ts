import { NextResponse } from 'next/server';

export async function GET() {
  const geminiKey = process.env.GEMINI_API_KEY;
  const groqKey   = process.env.GROQ_API_KEY;
  return NextResponse.json({
    status: 'ok',
    apiConfigured: !!(geminiKey || groqKey),
    provider: geminiKey ? 'Gemini' : groqKey ? 'Groq (fallback)' : 'Local (no key)',
    model: geminiKey ? 'gemini-flash-latest' : 'llama-3.3-70b-versatile',
  });
}
