import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Enviar datos al backend de FastAPI
    const res = await fetch("http://127.0.0.1:8000/predecir", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`Error del servidor FastAPI: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error en predicción:", error);
    return NextResponse.json(
      { error: "Error interno al procesar la predicción" },
      { status: 500 }
    );
  }
}
