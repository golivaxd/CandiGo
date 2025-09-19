'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './CSS/noticias.css';

type Article = {
  title: string;
  description?: string;
  url?: string;
  source?: string;
  urlToImage?: string;
  publishedAt?: string;
};

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

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

  const filteredArticles = articles.filter((a) =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p>Cargando noticias...</p>;

  return (
    <div className="news-page">
      {/* Header fijo */}
      <header className="news-header">
        <button className="back-btn" onClick={() => router.back()}>
          ← Regresar
        </button>
        <h1>Noticias</h1>
      </header>

      <main className="news-main">
        {/* Barra de búsqueda */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar noticias..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-btn" onClick={() => setSearchQuery('')}>
              ✕
            </button>
          )}
        </div>

        {/* Tarjetas de noticias */}
        <div className="news-grid">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, idx) => (
              <div key={idx} className="news-card">
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="news-image"
                  />
                )}
                <h3>{article.title}</h3>
                {article.description && <p>{article.description}</p>}
                {article.source && <small>Fuente: {article.source}</small>}
                {article.url && (
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    Leer más
                  </a>
                )}
              </div>
            ))
          ) : (
            <p>No se encontraron noticias.</p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="news-footer">
        <p>© 2025 CandiGo. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
