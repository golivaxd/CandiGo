'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import './comp.css';

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

function ComparativaContent() {
  const searchParams = useSearchParams();

  // ✅ Limpieza de IDs (soluciona el error {})
  const idsParam = searchParams.get('ids');
  const ids = idsParam
    ? idsParam
        .split(',')
        .map((v) => Number(v.trim()))
        .filter((n) => !isNaN(n))
    : [];

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
        // 🔹 Obtener candidatos
        const { data: candData, error: candError } = await supabase
          .from('candidatos')
          .select('id, nombre, cargo, entidad')
          .in('id', ids);

        if (candError) throw candError;
        setCandidatos(candData || []);

        // 🔹 Obtener propuestas
        const { data: propData, error: propError } = await supabase
          .from('propuestas')
          .select('*')
          .in('candidato_id', ids);

        if (propError) throw propError;
        setPropuestas(propData || []);

      } catch (err: any) {
        console.error('Error cargando comparativa:', JSON.stringify(err, null, 2));
        setErrorMsg(err?.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchDatos();
  }, [ids]);

  if (errorMsg)
    return (
      <p style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>
        Error: {errorMsg}
      </p>
    );

  if (!loading && candidatos.length === 0)
    return (
      <p style={{ textAlign: 'center', marginTop: '2rem' }}>
        No hay candidatos seleccionados.
      </p>
    );

  return (
    <>
      {/* HEADER FIJO */}
      <header className="comp-header">
        <h2>Comparativa</h2>
        <button className="comp-back-btn" onClick={() => window.history.back()}>
          Regresar
        </button>
      </header>

      <div className="comp-main">
        <h1 className="comp-title">Comparativa de Propuestas</h1>

        <div className="comp-card-container">
          {candidatos.map((c) => {
            const propCandidato = propuestas.filter((p) => p.candidato_id === c.id);

            return (
              <div key={c.id} className="comp-card">
                <h2>{c.nombre}</h2>

                <p>
                  <strong>Cargo:</strong> {c.cargo}
                </p>

                <p>
                  <strong>Entidad:</strong> {c.entidad}
                </p>

                <h3 className="comp-prop-title">Propuestas</h3>

                {propCandidato.length > 0 ? (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {propCandidato.map((p) => (
                      <li key={p.id} className="comp-prop-item">
                        <strong>{p.titulo}</strong>
                        <br />
                        <span>{p.descripcion}</span>
                        <br />
                        <span className="comp-prop-cat">{p.categoria}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p
                    style={{
                      color: '#4a5568',
                      fontStyle: 'italic',
                      marginTop: '0.5rem',
                    }}
                  >
                    No hay propuestas para este candidato.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default function ComparativaPage() {
  return (
    <Suspense fallback={<div>Cargando comparativa...</div>}>
      <ComparativaContent />
    </Suspense>
  );
}
