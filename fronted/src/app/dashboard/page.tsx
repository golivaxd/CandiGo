'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import type { User } from '@supabase/supabase-js';
import Sidebar from '@/components/Sidebar';
import NewsCarousel from '@/components/NewsCarousel';
import './CSS/d.css';

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
  const [cargos, setCargos] = useState<string[]>([]);
  const [cargosLoading, setCargosLoading] = useState(true);

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

  // Cargar cargos desde Supabase
  useEffect(() => {
    const fetchCargos = async () => {
      setCargosLoading(true);
      const { data, error } = await supabase
        .from('Votacion')
        .select('CARGO'); // solo el campo CARGO

      if (error) {
        console.error('Error al cargar cargos:', error.message);
      } else {
        setCargos(data.map((item: any) => item.CARGO));
      }
      setCargosLoading(false);
    };

    fetchCargos();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (!user) return null;

  // Procesar cargos únicos y su cantidad
  const cargosContados = cargos.reduce((acc: Record<string, number>, cargo) => {
    acc[cargo] = (acc[cargo] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const cargosUnicos = Object.entries(cargosContados); // [[cargo, cantidad], ...]

  return (
    <div className="dashboard-container">
      {/* Header fijo */}
      <header className="dashboard-header">
        <h1>Cargos y Candidaturas</h1>
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            router.push("https://candigo.vercel.app/");
          }}
          className="logout-btn"
        >
          Cerrar sesión
        </button>
      </header>

      <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
      <Sidebar user={user} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="main-content">
        

        {/* Sección de noticias */}
        <section className="novedades-section">
          <h2>📰 Novedades Políticas (México)</h2>
          {newsLoading ? <p>Cargando noticias...</p> : news.length > 0 ? <NewsCarousel articles={news} /> : <p>No se encontraron noticias.</p>}
        </section>

        {/* Sección de candidatos */}
        <section className="candidatos-section">
          <h2>👤 Candidatos</h2>
          <div className="candidatos-grid">
            <div className="candidato">
              <img src="/h.jpg" alt="Candidato 1" />
              <h3>María López</h3>
              <p>Partido: Progreso Unido</p>
            </div>
            <div className="candidato">
              <img src="/homer.gif" alt="Candidato 2" />
              <h3>Carlos Pérez</h3>
              <p>Partido: Fuerza Ciudadana</p>
            </div>
            <div className="candidato">
              <img src="/h.jpg" alt="Candidato 3" />
              <h3>Ana Torres</h3>
              <p>Partido: Renovación Nacional</p>
            </div>
          </div>
        </section>

        {/* Sección de cargos */}
        <section className="votaciones-section">
          <h2>🗳️ Cargos disponibles</h2>
          {cargosLoading ? (
            <p>Cargando cargos...</p>
          ) : cargosUnicos.length > 0 ? (
            <div className="cargos-grid">
              {cargosUnicos.map(([cargo, cantidad], idx) => (
                <div className="cargo-card" key={idx}>
                  <h3>{cargo}</h3>
                  <p>Cantidad: {cantidad}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No hay cargos disponibles.</p>
          )}
        </section>
      </main>
    </div>
  );
}
