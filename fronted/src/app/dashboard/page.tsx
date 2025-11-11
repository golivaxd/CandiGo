'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // 👈 agregado
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
  const [sidebarOpen, setSidebarOpen] = useState(false); // por defecto cerrado
  const [news, setNews] = useState<Article[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [cargos, setCargos] = useState<string[]>([]);
  const [cargosLoading, setCargosLoading] = useState(true);

  // Estado para candidatos con los campos reales de la tabla (incluye id)
  const [candidatos, setCandidatos] = useState<
    Array<{
      id?: number;
      nombre?: string;
      partido_id?: number;
      cargo?: string;
      pagina_web?: string;
      activo?: boolean;
    }>
  >([]);
  const [candidatosLoading, setCandidatosLoading] = useState(true);

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

  // Cargar candidatos: solo los 3 con cargo "PRESIDENCIA DE LA REPÚBLICA"
  useEffect(() => {
    const fetchCandidatos = async () => {
      setCandidatosLoading(true);
      try {
        const { data, error } = await supabase
          .from('candidatos')
          .select('id, nombre, partido_id, cargo, pagina_web, activo') // <-- añadí id
          .eq('cargo', 'PRESIDENCIA DE LA REPÚBLICA')
          .limit(3);

        if (error) {
          console.error('Error al cargar candidatos:', error);
          setCandidatos([]);
        } else {
          setCandidatos(data || []);
        }
      } catch (err) {
        console.error('fetch candidatos error', err);
        setCandidatos([]);
      } finally {
        setCandidatosLoading(false);
      }
    };

    fetchCandidatos();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (!user) return null;

  // Procesar cargos únicos y su cantidad
  const cargosContados = cargos.reduce((acc: Record<string, number>, cargo) => {
    acc[cargo] = (acc[cargo] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const cargosUnicos = Object.entries(cargosContados); // [[cargo, cantidad], ...]

  const getPresidenteImage = (nombre?: string, pagina_web?: string) => {
    if (!nombre) return pagina_web && pagina_web.endsWith('.jpg') ? pagina_web : '/placeholder.jpg';
    const n = nombre.toLowerCase();
    if (n.includes('xochi') || n.includes('xochityh')) return '/images/presidente_xochi.jpg';
    if (n.includes('cl') && n.includes('aud') || n.includes('claudia') || n.includes('claaudia')) return '/images/presidente_claudia.jpg';
    if (n.includes('cl') && !n.includes('claudia')) return '/images/presidente_cl.jpg';
    return pagina_web && pagina_web.endsWith('.jpg') ? pagina_web : '/placeholder.jpg';
  }

  return (
    <div className="dashboard-container">
      {/* Header fijo */}
      <header className="dashboard-header">
        <button
          className="menu-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Abrir menú"
        >
          ☰
        </button>
        <h1 className="header-title">Dashboard</h1>
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

      <Sidebar user={user} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="main-content">
        {/* Sección de noticias */}
        <section className="novedades-section">
          <h2>📰 Novedades Políticas (México)</h2>
          {newsLoading ? <p>Cargando noticias...</p> : news.length > 0 ? <NewsCarousel articles={news} /> : <p>No se encontraron noticias.</p>}
        </section>

        {/* Sección de candidatos */}
        <section className="candidatos-section">
          <h2>👤 Candidatos a la Presidencia</h2>

          {candidatosLoading ? (
            <p>Cargando candidatos...</p>
          ) : candidatos.length > 0 ? (
            <div className="candidatos-grid">
              {candidatos.map((candidato, index) => (
                <Link
                  href={`/candidatos/${candidato.id}`}
                  key={candidato.id ?? index}
                  onClick={() => setSidebarOpen(false)}
                >
                  <div
                    className="candidato"
                    role="button"
                    tabIndex={0}
                    onClick={() => setSidebarOpen(false)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        (e.currentTarget as HTMLElement).click();
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <img
                      src={
                        candidato.cargo === 'PRESIDENCIA DE LA REPÚBLICA'
                          ? '/images/presidente.jpg'
                          : getPresidenteImage(candidato.nombre, candidato.pagina_web)
                      }
                      alt={candidato.nombre || 'Candidato'}
                    />
                    <h3>{candidato.nombre || '—'}</h3>
                    <p>Cargo: {candidato.cargo || '—'}</p>
                    <p>Partido ID: {candidato.partido_id ?? '—'}</p>

                    {/* Botón para abrir sitio externo sin crear <a> anidado */}
                    {candidato.pagina_web ? (
                      <p>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            window.open(candidato.pagina_web, '_blank', 'noopener,noreferrer');
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-azul-elegante)',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                            padding: 0,
                            font: 'inherit'
                          }}
                          aria-label={`Abrir sitio de ${candidato.nombre}`}
                        >
                          Sitio
                        </button>
                      </p>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p>No se encontraron candidatos para la Presidencia de la República.</p>
          )}
        </section>

        {/* Sección de cargos */}
        <section className="votaciones-section">
          <h2>🗳️ Cargos disponibles</h2>
          {cargosLoading ? (
            <p>Cargando cargos...</p>
          ) : cargosUnicos.length > 0 ? (
            <div className="cargos-grid">
              {cargosUnicos.map(([cargo, cantidad], idx) => (
                <Link
                  href={`/cargos/${encodeURIComponent(cargo)}`}
                  key={idx}
                  onClick={() => setSidebarOpen(false)}
                >
                  <div className="cargo-card" role="button" style={{ cursor: 'pointer' }}>
                    <h3>{cargo}</h3>
                    <p>Cantidad: {cantidad}</p>
                  </div>
                </Link>
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
