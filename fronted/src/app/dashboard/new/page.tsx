// app/dashboard/news/page.tsx
'use client';

import { useEffect, useState } from 'react';
import NewsCarousel from '@/components/NewsCarousel';

type Article = {
  title: string;
  description?: string;
  url?: string;
  source?: string;
  urlToImage?: string;
  publishedAt?: string;
};

export default function DashboardNews() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/news')
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err?.error || 'Error al cargar noticias');
        }
        return res.json();
      })
      .then((data) => {
        const raw = data.articles || [];
        const normalized = raw.map((a: any) => ({
          title: a.title || '',
          description: a.description || '',
          url: a.url || '',
          source: (a.source && (a.source.name || a.source)) || a.source || '',
          urlToImage: a.urlToImage || a.image || '',
          publishedAt: a.publishedAt || ''
        }));
        setArticles(normalized);
      })
      .catch((err) => console.error('fetch /api/news error', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando noticias...</p>;

  return (
    <div style={{ padding: '16px' }}>
      <h1 style={{ textAlign: 'center' }}>Noticias del Dashboard</h1>

      {/* Botones centrados */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '16px' }}>
        <button style={{ padding: '10px 20px', backgroundColor: '#6b5b95', color: 'white', borderRadius: '5px', border: 'none' }}>
          Botón 1
        </button>
        <button style={{ padding: '10px 20px', backgroundColor: '#feb236', color: 'white', borderRadius: '5px', border: 'none' }}>
          Botón 2
        </button>
      </div>

      <NewsCarousel articles={articles} />
    </div>
  );
}
