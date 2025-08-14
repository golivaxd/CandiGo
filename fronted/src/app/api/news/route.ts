// app/api/news/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const provider = process.env.NEWS_PROVIDER || "newsdata"; // Opciones: newsdata | newscatcher | newsapi

    if (provider === "newscatcher") {
      const token = process.env.NEWSCATCHER_API_TOKEN;
      if (!token)
        return NextResponse.json({ error: "NEWSCATCHER_API_TOKEN no definido" }, { status: 500 });

      const body = {
        lang: "es",
        countries: ["MX"],
        is_opinion: false,
        page_size: 10,
        theme: ["politics"]
      };

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "x-api-token": token
      };

      const r = await fetch("https://v3-api.newscatcherapi.com/api/latest_headlines", {
        method: "POST",
        headers,
        body: JSON.stringify(body)
      });

      if (!r.ok) {
        const text = await r.text();
        console.error(`Error ${provider} API:`, r.status, text);
        return NextResponse.json({ error: `Error ${provider} API: ${r.status} - ${text}` }, { status: r.status });
      }

      const json = await r.json();
      const articles = json.articles || json.data || [];
      return NextResponse.json({ source: "newscatcher", articles });
    }

    if (provider === "newsapi") {
  const apiKey = process.env.NEWSAPI_API_KEY || "5b9d0f9ed9e54d38b9c17154b8dced1a";

  const url = `https://newsapi.org/v2/everything?q=elecciones+México+2024&language=es&sortBy=publishedAt&apiKey=${apiKey}`;

  const r = await fetch(url);
  if (!r.ok) {
    const text = await r.text();
    console.error(`Error ${provider} API:`, r.status, text);
    return NextResponse.json({ error: `Error ${provider} API: ${r.status} - ${text}` }, { status: r.status });
  }

  const json = await r.json();
  const articles = json.articles || [];
  return NextResponse.json({ source: "newsapi", articles });
}


    if (provider === "newsapi") {
      const apiKey = process.env.NEWSAPI_API_KEY;
      if (!apiKey)
        return NextResponse.json({ error: "NEWSAPI_API_KEY no definido" }, { status: 500 });

      const url = `https://newsapi.org/v2/top-headlines?country=mx&category=politics&apiKey=${apiKey}`;
      const r = await fetch(url);

      if (!r.ok) {
        const text = await r.text();
        console.error(`Error ${provider} API:`, r.status, text);
        return NextResponse.json({ error: `Error ${provider} API: ${r.status} - ${text}` }, { status: r.status });
      }

      const json = await r.json();
      const articles = json.articles || [];
      return NextResponse.json({ source: "newsapi", articles });
    }

    // Si el provider no es ninguno de los anteriores
    return NextResponse.json({ error: "provider no configurado" }, { status: 400 });
  } catch (err: any) {
    console.error("API /api/news error:", err);
    return NextResponse.json({ error: "internal", details: String(err) }, { status: 500 });
  }
}
