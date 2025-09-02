// NoticiasPage.tsx
'use client';

import { useEffect, useState } from 'react';
import NewsCarousel from '@/components/NewsCarousel';

type Article = {
  title: string | { id: string; name: string };
  description?: string;
  url?: string;
  source?: string;
  urlToImage?: string;
  publishedAt?: string;
};

export default function NoticiasPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Asumimos que el endpoint '/api/news' devuelve un objeto { articles: Article[] }
    fetch('/api/news')
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener noticias:', error);
        setLoading(false);
      });
  }, []);

  // Filtrar artículos según el término de búsqueda en el título
  const filteredArticles = articles.filter((article) => {
    const title =
      typeof article.title === 'object' ? article.title.name : article.title;
    return title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (loading) {
    return <div>Cargando noticias...</div>;
  }

  return (
    <main style={{ padding: '16px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '16px' }}>Sección de Noticias</h1>

      {/* Barra de búsqueda */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="Buscar noticias..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '80%',
            maxWidth: '400px',
            padding: '8px 12px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
      </div>

      {filteredArticles.length > 0 ? (
        <NewsCarousel articles={filteredArticles} />
      ) : (
        <p style={{ textAlign: 'center' }}>No se encontraron noticias.</p>
      )}
    </main>
  );
}