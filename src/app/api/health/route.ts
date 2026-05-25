import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.GROQ_API_KEY;
  return NextResponse.json({
    status: 'ok',
    apiConfigured: !!apiKey,
    provider: 'Groq',
    model: 'llama-3.3-70b-versatile',
  });
}
