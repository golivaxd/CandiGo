'use client';
import { useState } from 'react';
import ResultadosChart from '../../components/ResultadosChart';

export default function VotacionesPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const analizarVotos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/votos/analizar');
      if (!res.ok) throw new Error('Error al analizar votos');

      const data = await res.json();
      console.log('Datos recibidos del endpoint:', data);

      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Votaciones</h1>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <button
          onClick={analizarVotos}
          disabled={loading}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#665780',
            color: 'white',
            border: 'none',
            borderRadius: '0.3rem',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Analizando...' : 'Analizar votos'}
        </button>  
      </div>
    
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {result && (
        <>
          <p style={{ textAlign: 'center' }}>Total votos: {result.totalVotos}</p>

          <h2 style={{ marginTop: '2rem' }}>Tabla de probabilidades</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Candidato</th>
                <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>% Probabilidad</th>
              </tr>
            </thead>
            <tbody>
              {result.probabilidades.map((p: any, idx: number) => (
                <tr key={idx}>
                  <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{p.candidato}</td>
                  <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
                    {(p.probabilidad * 100).toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: '2rem' }}>
            <ResultadosChart
              labels={result.probabilidades.map((p: any) => p.candidato)}
              data={result.probabilidades.map((p: any) => (p.probabilidad * 100).toFixed(2))}
            />
          </div>
        </>
      )}
    </div>
  );
}

