'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

type Candidato = {
  id: number;
  nombre: string;
  cargo: string;
  entidad: string;
  activo: boolean;
};

export default function CargoDetalle() {
  const params = useParams();
  const router = useRouter();
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [loading, setLoading] = useState(true);
  const [seleccionados, setSeleccionados] = useState<number[]>([]);
  const [search, setSearch] = useState('');
  const [filtroEntidad, setFiltroEntidad] = useState('');

  const cargoParam = params?.cargo;
  const cargo = Array.isArray(cargoParam)
    ? decodeURIComponent(cargoParam[0])
    : decodeURIComponent(cargoParam || "");

  useEffect(() => {
    const fetchCandidatos = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('candidatos')
        .select('id, nombre, cargo, entidad, activo')
        .eq('cargo', cargo)
        .eq('activo', true);

      if (error) console.error('Error cargando candidatos:', error.message);
      else setCandidatos(data || []);

      setLoading(false);
    };

    if (cargo) fetchCandidatos();
  }, [cargo]);

  const toggleSeleccion = (id: number) => {
    setSeleccionados(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const irAComparativa = () => {
    if (seleccionados.length < 2) {
      alert('Selecciona al menos 2 candidatos para comparar.');
      return;
    }
    router.push(`/comparativa?ids=${seleccionados.join(',')}`);
  };

  const entidadesUnicas = Array.from(new Set(candidatos.map(c => c.entidad)));

  const candidatosFiltrados = candidatos.filter(c => {
    const matchSearch = c.nombre.toLowerCase().includes(search.toLowerCase());
    const matchEntidad = filtroEntidad ? c.entidad === filtroEntidad : true;
    return matchSearch && matchEntidad;
  });

  if (loading) return <p>Cargando candidatos...</p>;

  return (
    <div style={{ padding: '1rem', position: 'relative' }}>
      <button onClick={() => router.back()} style={{ marginBottom: '1rem' }}>
        ⬅ Volver
      </button>

      <h1>Detalles de {cargo}</h1>

      {candidatos.length === 0 && <p>No hay candidatos para este cargo.</p>}

      {/* Barra fija de herramientas */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          backgroundColor: '#fff',
          padding: '0.75rem',
          marginBottom: '1rem',
          borderBottom: '1px solid #ccc',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 10
        }}
      >
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '0.5rem', flex: '1 1 200px' }}
        />
        <select
          value={filtroEntidad}
          onChange={(e) => setFiltroEntidad(e.target.value)}
          style={{ padding: '0.5rem' }}
        >
          <option value="">Todas las entidades</option>
          {entidadesUnicas.map((ent) => (
            <option key={ent} value={ent}>{ent}</option>
          ))}
        </select>
        <button
          onClick={irAComparativa}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Comparar Propuestas ({seleccionados.length})
        </button>
      </div>

      <ul style={{ padding: 0, listStyle: 'none' }}>
        {candidatosFiltrados.map(c => (
          <li
            key={c.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1rem',
              border: '1px solid #ccc',
              borderRadius: '6px',
              padding: '0.75rem',
              backgroundColor: seleccionados.includes(c.id) ? '#d0f0c0' : '#f9f9f9'
            }}
          >
            <input
              type="checkbox"
              checked={seleccionados.includes(c.id)}
              onChange={() => toggleSeleccion(c.id)}
              style={{ marginRight: '1rem' }}
            />
            <div>
              <h2 style={{ margin: 0 }}>{c.nombre}</h2>
              <p style={{ margin: '0.25rem 0' }}><strong>Cargo:</strong> {c.cargo}</p>
              <p style={{ margin: '0.25rem 0' }}><strong>Entidad:</strong> {c.entidad}</p>
            </div>
          </li>
        ))}
      </ul>

      {candidatosFiltrados.length === 0 && <p>No se encontraron candidatos con esos filtros.</p>}
    </div>
  );
}
