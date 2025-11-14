// app/api/prediccion/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Recibimos los datos del frontend
    const { datos } = await req.json();

    // Llamamos a la API externa
    const res = await fetch('https://votacion-api-7592.onrender.com/predecir', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ datos }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Error al obtener predicción: ${res.statusText}` },
        { status: res.status }
      );
    }

    const data = await res.json();

    // Retornamos la predicción al frontend
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
