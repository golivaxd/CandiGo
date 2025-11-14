'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) router.push('/login');
      else setUser(session.user);
      setLoading(false);
    };
    checkSession();
  }, [router]);

  useEffect(() => {
    let mounted = true;
    setNewsLoading(true);

    fetch('/api/news')
      .then(async res => {
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err?.error || 'Error al cargar noticias');
        }
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
      .finally(() => {
        if (mounted) setNewsLoading(false);
      });

    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    const fetchCargos = async () => {
      setCargosLoading(true);
      const { data, error } = await supabase
        .from('Votacion')
        .select('CARGO');

      if (error) console.error('Error al cargar cargos:', error.message);
      else setCargos(data.map((item: any) => item.CARGO));

      setCargosLoading(false);
    };
    fetchCargos();
  }, []);

  useEffect(() => {
    const fetchCandidatos = async () => {
      setCandidatosLoading(true);
      try {
        const { data, error } = await supabase
          .from('candidatos')
          .select('id, nombre, partido_id, cargo, pagina_web, activo')
          .eq('cargo', 'PRESIDENCIA DE LA REPÚBLICA')
          .limit(3);

        if (error) setCandidatos([]);
        else setCandidatos(data || []);
      } catch {
        setCandidatos([]);
      } finally {
        setCandidatosLoading(false);
      }
    };
    fetchCandidatos();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (!user) return null;

  const cargosContados = cargos.reduce((acc: Record<string, number>, cargo) => {
    acc[cargo] = (acc[cargo] || 0) + 1;
    return acc;
  }, {});
  const cargosUnicos = Object.entries(cargosContados);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <button
          className="menu-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>

        <h1 className="header-title">Candidaturas Federales</h1>

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
        <section className="novedades-section">
          <h2>📰 Novedades Políticas (México)</h2>
          {newsLoading ? (
            <p>Cargando noticias...</p>
          ) : news.length > 0 ? (
            <NewsCarousel articles={news} />
          ) : (
            <p>No se encontraron noticias.</p>
          )}
        </section>

        <section className="candidatos-section">
          <h2>👤 Candidatos a la Presidencia</h2>
          {candidatosLoading ? (
            <p>Cargando candidatos...</p>
          ) : candidatos.length > 0 ? (
            <div className="candidatos-grid">
              {candidatos.map((candidato, idx) => (
                <Link href={`/candidatos/${candidato.id}`} key={idx}>
                  <div className="candidato" style={{ cursor: "pointer" }}>
                    <img src="/images/presidente.jpg" alt={candidato.nombre} />
                    <h3>{candidato.nombre}</h3>
                    <p>Cargo: {candidato.cargo}</p>
                    <p>Partido ID: {candidato.partido_id}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p>No se encontraron candidatos.</p>
          )}
        </section>

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
                >
                  <div className="cargo-card" style={{ cursor: "pointer" }}>
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
