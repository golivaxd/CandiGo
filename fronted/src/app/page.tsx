'use client';

import { useState } from 'react';

export default function HomePage() {
  const [datos, setDatos] = useState<number[]>(Array(12).fill(0));
  const [resultado, setResultado] = useState<{ candidato: string; partido: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const preguntas = [
    "Pregunta 1", "Pregunta 2", "Pregunta 3", "Pregunta 4",
    "Pregunta 5", "Pregunta 6", "Pregunta 7", "Pregunta 8",
    "Pregunta 9", "Pregunta 10", "Pregunta 11", "Pregunta 12"
  ];

  const handleChange = (index: number, value: number) => {
    const newDatos = [...datos];
    newDatos[index] = value;
    setDatos(newDatos);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResultado(null);

    try {
      const res = await fetch('http://localhost:8000/predecir', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ datos })
      });

      if (!res.ok) throw new Error(`Error del servidor: ${res.status}`);

      const data = await res.json();
      setResultado(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-center mb-6">Descubre tu Candidato Ideal</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {preguntas.map((pregunta, idx) => (
            <div key={idx}>
              <label className="block mb-1 font-medium">{pregunta}</label>
              <input
                type="number"
                min={0}
                max={10}
                value={datos[idx]}
                onChange={(e) => handleChange(idx, Number(e.target.value))}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Calculando..." : "Predecir Candidato"}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-100 text-red-800 rounded">{error}</div>
        )}

        {resultado && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
            <h2 className="text-xl font-bold mb-2">Tu candidato ideal es:</h2>
            <p className="text-lg">Candidato: <span className="font-semibold">{resultado.candidato}</span></p>
            <p className="text-lg">Partido: <span className="font-semibold">{resultado.partido}</span></p>
          </div>
        )}
      </div>
    </div>
  );
}

