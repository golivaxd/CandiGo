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
        const marker = new mapboxgl.Marker({ color: 'blue' })
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
    <div style={{ position: 'relative', width: '100%', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Header fijo arriba */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          background: 'rgba(52,58,64,0.9)',
          color: '#fff',
          padding: '1rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(6px)',
          boxSizing: 'border-box',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Mapa de Candidatos</h1>
        <button
          onClick={() => (window.location.href = '/dashboard')}
          style={{
            padding: '0.5rem 1rem',
            background: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
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
          marginTop: '4rem', // dejar espacio al header
        }}
      />

      {/* Panel lateral flotante */}
      {selectedEntidad && (
        <div
          style={{
            position: 'fixed',
            top: '4rem', // debajo del header
            right: 0,
            bottom: 0,
            width: '350px',
            maxWidth: '90%',
            background: '#fff',
            boxShadow: '-3px 0 20px rgba(0,0,0,0.3)',
            borderLeft: '2px solid #0070f3',
            borderRadius: '12px 0 0 12px',
            padding: '1rem',
            overflowY: 'auto',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#0070f3' }}>{selectedEntidad.nombre}</h2>
            <button
              onClick={() => setSelectedEntidad(null)}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '1.4rem',
                cursor: 'pointer',
                color: '#888',
              }}
            >
              ✕
            </button>
          </div>

          {/* Barra de búsqueda */}
          <input
            type="text"
            placeholder="Buscar candidato..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              margin: '1rem 0',
              padding: '0.5rem 0.75rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '1rem',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />

          {filteredCandidatos.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0, flex: 1 }}>
              {filteredCandidatos.map((candidato) => (
                <li
                  key={candidato.id}
                  style={{
                    padding: '0.5rem 0',
                    borderBottom: '1px solid #eee',
                  }}
                >
                  <strong style={{ display: 'block', fontSize: '1.1rem', color: '#333' }}>
                    {candidato.nombre}
                  </strong>
                  <span style={{ color: '#555' }}>{candidato.cargo}</span>
                  <br />
                  <span style={{ color: '#555', fontStyle: 'italic' }}>
                    {candidato.partido?.nombre || candidato.partido_id}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: '#666' }}>No hay candidatos que coincidan.</p>
          )}
        </div>
      )}
    </div>
  );
}


