'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

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
      const { data: candidatoData, error: candidatoError } = await supabase
        .from('candidatos')
        .select('*')
        .eq('id', id)
        .single();

      if (candidatoError) return console.error(candidatoError);
      setCandidato(candidatoData);

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

  if (!candidato) {
    return <p style={{ textAlign: 'center', marginTop: '6rem' }}>Cargando información del candidato...</p>;
  }

  return (
    <div style={{
      fontFamily: 'Montserrat, Arial',
      background: '#f5f5f5',
      minHeight: '100vh',
      paddingTop: '70px',
      boxSizing: 'border-box'
    }}>
      
      {/* Header fijo */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        background: 'linear-gradient(90deg, #318422ff, #34495e)',
        color: '#fff',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        boxSizing: 'border-box'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 600, letterSpacing: '0.5px', textAlign: 'center' }}>
          Información del Candidato
        </h1>

        {/* Botón regresar a la derecha */}
        <button
          onClick={() => router.back()}
          style={{
            position: 'absolute',
            right: '1.5rem',
            background: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.95rem',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#005bb5')}
          onMouseLeave={e => (e.currentTarget.style.background = '#0070f3')}
        >
          Regresar
        </button>
      </header>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '1rem' }}>
        
        {/* Info general */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ color: '#1e3a8a', marginBottom: '1rem', fontSize: '1.5rem' }}>{candidato.nombre}</h2>
          <p><strong>Edad:</strong> {candidato.edad}</p>
          <p><strong>Sexo:</strong> {candidato.sexo}</p>
          <p><strong>Escolaridad:</strong> {candidato.escolaridad} ({candidato.estatus_escolaridad})</p>
          <p><strong>Dirección campaña:</strong> {candidato.direccion_casa_campaña}</p>
          <p><strong>Teléfono:</strong> {candidato.telefono}</p>
          <p><strong>Correo:</strong> {candidato.correo_electronico}</p>
          <p><strong>Página web:</strong> <a href={candidato.pagina_web} target="_blank" style={{ color: '#4dd0b0', wordBreak: 'break-word' }}>{candidato.pagina_web}</a></p>
          <p><strong>Partido ID:</strong> {candidato.partido_id}</p>
          <p><strong>Cargo:</strong> {candidato.cargo}</p>
          <p><strong>Nivel:</strong> {candidato.nivel}</p>
          <p><strong>Entidad:</strong> {candidato.entidad}</p>
          <p><strong>Distrito:</strong> {candidato.distrito_federal}</p>
          <p><strong>Circunscripción:</strong> {candidato.circunscripcion}</p>
          <p><strong>Municipio:</strong> {candidato.municipio}</p>
          <p><strong>Estatus:</strong> {candidato.estatus} | <strong>Activo:</strong> {candidato.activo ? 'Sí' : 'No'}</p>
        </div>

        {/* Propuestas */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#1e3a8a', marginBottom: '1rem' }}>Propuestas</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem'
          }}>
            {propuestas.length > 0 ? propuestas.map(p => (
              <div key={p.id} style={{
                background: 'white',
                borderRadius: '12px',
                padding: '1rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(-5px)';
                el.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }}
              >
                <strong style={{ color: '#318422ff' }}>{p.titulo}</strong>
                <p style={{ color: '#555', marginTop: '0.3rem' }}>{p.descripcion}</p>
                <span style={{ fontSize: '0.85rem', color: '#888' }}>{p.categoria}</span>
              </div>
            )) : <p style={{ color: '#666' }}>No hay propuestas registradas.</p>}
          </div>
        </div>

        {/* Historia Profesional */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#1e3a8a', marginBottom: '1rem' }}>Historia Profesional</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem'
          }}>
            {historia.length > 0 ? historia.map(h => (
              <div key={h.id} style={{
                background: 'white',
                borderRadius: '12px',
                padding: '1rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(-5px)';
                el.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }}
              >
                <strong style={{ color: '#318422ff' }}>{h.puesto}</strong>
                <p style={{ color: '#555', marginTop: '0.3rem' }}>{h.institucion}</p>
                <span style={{ fontSize: '0.85rem', color: '#888' }}>{h.periodo}</span>
              </div>
            )) : <p style={{ color: '#666' }}>No hay historial profesional registrado.</p>}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        background: '#1e3a8a',
        color: 'white',
        textAlign: 'center',
        padding: '1rem 0',
        fontSize: '0.9rem',
        fontWeight: 500
      }}>
                © 2025 CandiGo. Todos los derechos reservados.
      </footer>
    </div>
  );
}
