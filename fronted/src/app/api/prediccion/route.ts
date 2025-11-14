import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch((e) => {
      console.error('Invalid JSON in request to /api/prediccion:', e?.message || e);
      return null;
    });

    if (!body || typeof body !== 'object' || !('datos' in body)) {
      console.error('Missing "datos" in request body to /api/prediccion:', body);
      return NextResponse.json({ error: 'Missing "datos" in request body' }, { status: 400 });
    }

    const { datos } = body as { datos: any };

    // Forward to external prediction API
    const res = await fetch('https://votacion-api-7592.onrender.com/predecir', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ datos }),
    }).catch((err) => {
      console.error('Network error when contacting external API:', err?.message || err);
      return null;
    });

    if (!res) {
      return NextResponse.json({ error: 'Network error contacting external prediction service' }, { status: 502 });
    }

    if (!res.ok) {
      const text = await res.text().catch(() => '<no body>');
      console.error(`External API returned ${res.status} ${res.statusText}:`, text);
      // Propagate the external status and message to the client for debugging
      return NextResponse.json({ error: text || res.statusText }, { status: res.status });
    }

    // Try to parse JSON, fall back to text
    let data: any;
    try {
      data = await res.json();
    } catch (err) {
      const text = await res.text().catch(() => '<unavailable>');
      console.warn('External API returned non-JSON response:', text);
      return NextResponse.json({ result: text });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Unexpected error in /api/prediccion:', error);
    return NextResponse.json({ error: error?.message || String(error) }, { status: 500 });
  }
}
