'use client';
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { supabase } from '@/lib/supabaseClient';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Candidato {
  id: number;
  nombre: string;
  entidad: string;
  cargo: string;
  partido_id: number;
  partido?: { nombre: string };
}

interface Entidad {
  id: number;
  nombre: string;
  lat: number;
  lng: number;
}

mapboxgl.accessToken =
  'pk.eyJ1IjoicGFyYWxsZWxkdWNrIiwiYSI6ImNseGtwbHphajAzczkyaXB4eG40aHA3eXkifQ.WZedrqvzwybmGa93mi-cdg';

export default function Mapa() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [selectedEntidad, setSelectedEntidad] = useState<Entidad | null>(null);
  const [entidades, setEntidades] = useState<Entidad[]>([]);
  const [candidatosPorEntidad, setCandidatosPorEntidad] = useState<Record<string, Candidato[]>>({});
  const [candidatosEntidad, setCandidatosEntidad] = useState<Candidato[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapContainer.current || map) return;

      const mapInstance = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-99.1332, 19.4326],
        zoom: 5,
      });
      setMap(mapInstance);

      const { data: entidadesData } = await supabase.from('Entidades').select('*');
      if (!entidadesData) return;
      setEntidades(entidadesData);

      const { data: candidatosData } = await supabase
        .from('candidatos')
        .select('id, nombre, cargo, entidad, partido_id, partidos(nombre)');
      if (!candidatosData) return;

      const candidatosMap: Record<string, Candidato[]> = {};
      candidatosData.forEach((c: any) => {
        const key = c.entidad.trim().toLowerCase();
        if (!candidatosMap[key]) candidatosMap[key] = [];
        candidatosMap[key].push({
          ...c,
          partido: c.partidos ? { nombre: c.partidos.nombre } : undefined,
        });
      });
      setCandidatosPorEntidad(candidatosMap);

      entidadesData.forEach((entidad) => {
        const marker = new mapboxgl.Marker({ color: '#1b263b' })
          .setLngLat([entidad.lng, entidad.lat])
          .setPopup(new mapboxgl.Popup().setText(entidad.nombre))
          .addTo(mapInstance);

        marker.getElement().addEventListener('click', () => {
          setSelectedEntidad(entidad);
          const candidatosDeEstaEntidad =
            candidatosMap[entidad.nombre.trim().toLowerCase()] || [];
          setCandidatosEntidad(candidatosDeEstaEntidad);
        });
      });
    };

    initializeMap();
    return () => map?.remove();
  }, [map]);

  const filteredCandidatos = candidatosEntidad.filter((c) =>
    c.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      fontFamily: "'Poppins', sans-serif",
      background: '#f4f6f9',
    }}>
     <header style={{
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  background: '#0d1b2a',
  color: '#fff',
  padding: '1rem 2rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  zIndex: 1000,
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  borderBottomLeftRadius: '12px',
  borderBottomRightRadius: '12px',
}}>
  <h1 style={{
    margin: 0,
    fontSize: '1.6rem',
    fontWeight: 700,
    fontFamily: "'Montserrat', sans-serif",
  }}>Mapa de Candidatos</h1>
  <button
    onClick={() => (window.location.href = '/d3h7m1p4')}
    style={{
      padding: '0.6rem 1.4rem',
      background: '#415a77',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: 500,
      transition: 'all 0.3s ease',
      marginRight: '5rem', // <-- lo movemos un poco hacia la izquierda
    }}
    onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.background = '#778da9')}
    onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.background = '#415a77')}
  >
    Regresar
  </button>
</header>


      {/* Mapa */}
      <div
        ref={mapContainer}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '8px',
          marginTop: '4rem',
        }}
      />

      {/* Panel lateral flotante */}
      {selectedEntidad && (
        <div style={{
          position: 'fixed',
          top: '4rem',
          right: 0,
          bottom: 0,
          width: '350px',
          maxWidth: '90%',
          background: '#fff',
          boxShadow: '-3px 0 20px rgba(0,0,0,0.1)',
          borderLeft: '2px solid #4dd0b0',
          borderRadius: '12px 0 0 12px',
          padding: '1rem',
          overflowY: 'auto',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#1b263b' }}>{selectedEntidad.nombre}</h2>
            <button
              onClick={() => setSelectedEntidad(null)}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '1.4rem',
                cursor: 'pointer',
                color: '#888',
              }}>✕</button>
          </div>

          {/* Barra de búsqueda */}
          <input
            type="text"
            placeholder="Buscar candidato..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              marginBottom: '1rem',
              padding: '0.5rem 0.75rem',
              borderRadius: '30px',
              border: '1px solid #ccc',
              fontSize: '1rem',
              width: '100%',
              outline: 'none',
            }}
          />

          {filteredCandidatos.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0, flex: 1 }}>
              {filteredCandidatos.map((candidato) => (
                <li
                  key={candidato.id}
                  onClick={() => window.location.href = `/c4v8x1y2/${candidato.id}`}
                  style={{
                    padding: '0.75rem 1rem',
                    borderBottom: '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                    marginBottom: '0.5rem',
                    background: '#f4f6f9',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#e0e4f1')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#f4f6f9')}
                  title="Ver detalles del candidato"
                >
                  <div>
                    <strong style={{ display: 'block', fontSize: '1.1rem', color: '#1b1b1b', marginBottom: '0.2rem' }}>
                      {candidato.nombre}
                    </strong>
                    <span style={{ color: '#4a4a4a', fontSize: '0.95rem' }}>{candidato.cargo}</span>
                    <br />
                    <span style={{ color: '#4dd0b0', fontStyle: 'italic', fontSize: '0.9rem' }}>
                      {candidato.partido?.nombre || candidato.partido_id}
                    </span>
                  </div>
                  <span style={{ fontSize: '1.2rem', color: '#415a77', fontWeight: 600 }}>→</span>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: '#4a4a4a', textAlign: 'center', marginTop: '1rem' }}>No hay candidatos que coincidan.</p>
          )}
        </div>
      )}
    </div>
  );
}
