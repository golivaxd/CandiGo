'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

type Propuesta = {
  id: number;
  candidato_id: number;
  titulo: string;
  descripcion: string;
  categoria: string;
};

type Candidato = {
  id: number;
  nombre: string;
  cargo: string;
  entidad: string;
};

export default function Comparativa() {
  const searchParams = useSearchParams();
  const idsParam = searchParams.get('ids');
  const ids = idsParam ? idsParam.split(',').map(Number) : [];

  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [propuestas, setPropuestas] = useState<Propuesta[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchDatos = async () => {
      if (ids.length === 0) {
        setCandidatos([]);
        setPropuestas([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setErrorMsg(null);

      try {
        // 🔹 Obtener solo los candidatos seleccionados
        const { data: candData, error: candError } = await supabase
          .from('candidatos')
          .select('id, nombre, cargo, entidad')
          .in('id', ids);

        if (candError) throw candError;
        setCandidatos(candData || []);

        // 🔹 Obtener solo las propuestas de los candidatos seleccionados
        const { data: propData, error: propError } = await supabase
          .from('propuestas')
          .select('*')
          .in('candidato_id', ids);

        if (propError) throw propError;
        setPropuestas(propData || []);
      } catch (err: any) {
        console.error('Error cargando comparativa:', err);
        setErrorMsg(err?.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchDatos();
  }, [ids]);

  if (errorMsg) return <p style={{ color: 'red' }}>Error: {errorMsg}</p>;
  if (!loading && candidatos.length === 0) return <p>No hay candidatos seleccionados.</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Comparativa de Propuestas</h1>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {candidatos.map((c) => {
          const propCandidato = propuestas.filter((p) => p.candidato_id === c.id);

          return (
            <div
              key={c.id}
              style={{
                border: '1px solid #ccc',
                padding: '1rem',
                borderRadius: '6px',
                width: '300px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <h2>{c.nombre}</h2>
              <p><strong>Cargo:</strong> {c.cargo}</p>
              <p><strong>Entidad:</strong> {c.entidad}</p>

              <h3>Propuestas:</h3>
              {propCandidato.length > 0 ? (
                <ul>
                  {propCandidato.map((p) => (
                    <li key={p.id}>
                      <strong>{p.titulo}</strong>: {p.descripcion} ({p.categoria})
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay propuestas para este candidato.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
