'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import './candidatos.css';

interface Candidato {
  id: number;
  nombre: string;
  edad: number;
  sexo: string;
  escolaridad: string;
  estatus_escolaridad: string;
  direccion_casa_campaña: string;
  telefono: string;
  correo_electronico: string;
  pagina_web: string;
  partido_id: number;
  cargo: string;
  nivel: string;
  entidad: string;
  distrito_federal: string;
  circunscripcion: string;
  municipio: string;
  estatus: string;
  activo: boolean;
}

interface Propuesta {
  id: number;
  candidato_id: number;
  titulo: string;
  descripcion: string;
  categoria: string;
}

interface Historia {
  id: number;
  candidato_id: number;
  puesto: string;
  institucion: string;
  periodo: string;
}

export default function CandidatoPage() {
  const { id } = useParams();
  const router = useRouter();

  const [candidato, setCandidato] = useState<Candidato | null>(null);
  const [propuestas, setPropuestas] = useState<Propuesta[]>([]);
  const [historia, setHistoria] = useState<Historia[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: candidatoData } = await supabase
        .from('candidatos')
        .select('*')
        .eq('id', id)
        .single();

      if (candidatoData) setCandidato(candidatoData);

      const { data: propuestasData } = await supabase
        .from('propuestas')
        .select('*')
        .eq('candidato_id', id);
      setPropuestas(propuestasData || []);

      const { data: historiaData } = await supabase
        .from('historia_profesional')
        .select('*')
        .eq('candidato_id', id);
      setHistoria(historiaData || []);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    // delegación: manejar todos los botones .card-toggle dentro de la página
    const handler = (e: Event) => {
      const btn = e.currentTarget as HTMLButtonElement;
      const card = btn.closest('.card');
      if (!card) return;
      const expanded = card.classList.toggle('expanded');
      btn.textContent = expanded ? 'Menos' : 'Más';
    };

    const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('.card-toggle'));
    buttons.forEach(btn => btn.addEventListener('click', handler));

    return () => buttons.forEach(btn => btn.removeEventListener('click', handler));
  }, []);

  if (!candidato) {
    return <p className="loading">Cargando perfil...</p>;
  }

  return (
    <div className="perfil-container">
      <header className="perfil-header">
        <h1>Perfil del candidato</h1>
        <button onClick={() => router.back()} className="back-btn">
          Regresar
        </button>
      </header>

      <main className="perfil-content">
        <section className="perfil-card">
          <div className="perfil-avatar">
            <div className="avatar-circle">{candidato.nombre[0]}</div>
          </div>

          <div className="perfil-info">
            <h2>{candidato.nombre}</h2>
            <p className="cargo">{candidato.cargo}</p>
            <div className="perfil-data">
              <p><strong>Edad:</strong> {candidato.edad}</p>
              <p><strong>Sexo:</strong> {candidato.sexo}</p>
              <p><strong>Escolaridad:</strong> {candidato.escolaridad} ({candidato.estatus_escolaridad})</p>
              <p><strong>Entidad:</strong> {candidato.entidad}</p>
              <p><strong>Municipio:</strong> {candidato.municipio}</p>
              <p><strong>Correo:</strong> {candidato.correo_electronico}</p>
              <p><strong>Teléfono:</strong> {candidato.telefono}</p>
              <p><strong>Web:</strong> <a href={candidato.pagina_web} target="_blank">{candidato.pagina_web}</a></p>
            </div>
          </div>
        </section>

        <section className="perfil-section">
          <h3>🗳️ Propuestas</h3>
          <div className="grid">
            {propuestas.length > 0 ? propuestas.map(p => (
              <div key={p.id} className="card">
                <h4>{p.titulo}</h4>
                <p>{p.descripcion}</p>
                <span>{p.categoria}</span>
              </div>
            )) : <p className="no-data">Sin propuestas registradas.</p>}
          </div>
        </section>

        <section className="perfil-section">
          <h3>📘 Experiencia Profesional</h3>
          <div className="grid">
            {historia.length > 0 ? historia.map(h => (
              <div key={h.id} className="card">
                <h4>{h.puesto}</h4>
                <p>{h.institucion}</p>
                <span>{h.periodo}</span>
              </div>
            )) : <p className="no-data">No hay historial profesional registrado.</p>}
          </div>
        </section>
      </main>

      <footer className="perfil-footer">
        © 2025 CandiGo · Plataforma electoral segura y transparente.
      </footer>
    </div>
  );
}
