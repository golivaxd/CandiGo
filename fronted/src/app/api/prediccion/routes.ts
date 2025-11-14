import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { datos } = await req.json();

    const res = await fetch('https://votacion-api-7592.onrender.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ datos }),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: `Error externo: ${text}` }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
