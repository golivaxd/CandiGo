'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import type { User } from '@supabase/supabase-js';
import Sidebar from '@/components/Sidebar';
import NewsCarousel from '@/components/NewsCarousel';
import '../CSS/d.css';

type Article = {
  title: string;
  description?: string;
  url?: string;
  source?: string;
  urlToImage?: string;
  publishedAt?: string;
};

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [news, setNews] = useState<Article[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);

  // Sesión
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) router.push('/login');
      else setUser(session.user);
      setLoading(false);
    };
    checkSession();
  }, [router]);

  // Cargar noticias
  useEffect(() => {
    let mounted = true;
    setNewsLoading(true);

    fetch('/api/news')
      .then(async res => {
        if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err?.error || 'Error al cargar noticias'); }
        return res.json();
      })
      .then(data => {
        if (!mounted) return;
        const raw = data.articles || [];
        const norm = raw.map((a: any) => ({
          title: a.title || '',
          description: a.description || '',
          url: a.url || '',
          source: (a.source && (a.source.name || a.source)) || a.source || '',
          urlToImage: a.urlToImage || a.image || ''
        }));
        setNews(norm);
      })
      .catch(err => console.error('fetch /api/news error', err))
      .finally(() => { if (mounted) setNewsLoading(false); });

    return () => { mounted = false; };
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (!user) return null;

  return (
    <div className="dashboard-container">
      <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
      <Sidebar user={user} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="main-content">
        <h1>Bienvenido al Dashboard</h1>
        <p>¡Has iniciado sesión correctamente!</p>

        <section className="novedades-section">
          <h2>📰 Novedades Políticas (México)</h2>
          {newsLoading ? <p>Cargando noticias...</p> : news.length > 0 ? <NewsCarousel articles={news} /> : <p>No se encontraron noticias.</p>}
        </section>

        <section className="candidatos-section">
          <h2>👤 Candidatos</h2>
          <div className="candidatos-grid">
            <div className="candidato">
              <img src="https://via.placeholder.com/300x200" alt="Candidato 1" />
              <h3>María López</h3>
              <p>Partido: Progreso Unido</p>
            </div>
            <div className="candidato">
              <img src="https://via.placeholder.com/300x200" alt="Candidato 2" />
              <h3>Carlos Pérez</h3>
              <p>Partido: Fuerza Ciudadana</p>
            </div>
            <div className="candidato">
              <img src="https://via.placeholder.com/300x200" alt="Candidato 3" />
              <h3>Ana Torres</h3>
              <p>Partido: Renovación Nacional</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

