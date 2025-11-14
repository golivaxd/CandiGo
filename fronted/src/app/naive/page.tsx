'use client';

import React, { useState } from 'react';

export default function Page() {
  // Estados de todos los dropdowns
  const [selectedGenero, setSelectedGenero] = useState('');
  const [selectedEdad, setSelectedEdad] = useState('');
  const [selectedEstadoCivil, setSelectedEstadoCivil] = useState('');
  const [selectedCargo, setSelectedCargo] = useState('');
  const [selectedEducacion, setSelectedEducacion] = useState('');
  const [selectedOcupacion, setSelectedOcupacion] = useState('');
  const [selectedEntidadUsuario, setSelectedEntidadUsuario] = useState('');
  const [frecuenciaVoto, setFrecuenciaVoto] = useState('');
  const [selectedEstadoVotante, setSelectedEstadoVotante] = useState('');
  const [temaInteres, setTemaInteres] = useState('');
  const [prioridadCandidato, setPrioridadCandidato] = useState('');
  const [fuenteInformacion, setFuenteInformacion] = useState('');
  const [selectedPosturaEconomica, setSelectedPosturaEconomica] = useState('');
  const [selectedPosturaSeguridad, setSelectedPosturaSeguridad] = useState('');
  const [selectedPrioridadPolitica, setSelectedPrioridadPolitica] = useState('');
  const [selectedExperienciaCandidato, setSelectedExperienciaCandidato] = useState('');
  const [selectedTendenciaIdeologica, setSelectedTendenciaIdeologica] = useState('');
  const [selectedEntidadCandidato, setSelectedEntidadCandidato] = useState('');

  const [prediccion, setPrediccion] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Datos de ejemplo
  const state = {
    cargos: ['Presidente', 'Diputado', 'Senador'],
    entidadesUsuario: ['CDMX', 'Jalisco', 'Nuevo León'],
  };

  // Componente Dropdown
  const Dropdown = ({ title, value, options, onChange }: { title: string; value: string; options: string[]; onChange: (val: string) => void }) => (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', fontWeight: 'bold' }}>{title}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }}>
        <option value="">Selecciona</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );

  // Componente SectionCard
  const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '1rem', marginBottom: '1rem' }}>
      <h3 style={{ marginBottom: '1rem' }}>{title}</h3>
      {children}
    </div>
  );

  // Función para predecir
  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    setPrediccion(null);

    try {
      const datos = [
        selectedGenero,
        selectedEdad,
        selectedEstadoCivil,
        selectedEducacion,
        selectedEntidadUsuario,
        temaInteres,
        prioridadCandidato,
        frecuenciaVoto,
        selectedCargo,
        selectedPosturaEconomica,
        selectedPosturaSeguridad,
        selectedPrioridadPolitica,
        fuenteInformacion,
        selectedExperienciaCandidato,
        selectedTendenciaIdeologica,
        selectedEntidadCandidato,
      ];

      const res = await fetch('/api/prediccion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ datos }),
      });

      if (!res.ok) throw new Error('Error al obtener predicción');

      const data = await res.json();
      setPrediccion(data.prediccion);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Formulario de Votante</h1>

      <SectionCard title="Datos personales">
        <Dropdown title="Género" value={selectedGenero} options={['Masculino', 'Femenino', 'Otro']} onChange={setSelectedGenero} />
        <Dropdown title="Edad" value={selectedEdad} options={['18-25', '26-35', '36-45', '46-60', '60+']} onChange={setSelectedEdad} />
        <Dropdown title="Estado civil" value={selectedEstadoCivil} options={['Soltero', 'Casado', 'Divorciado', 'Viudo', 'Prefiero no decirlo']} onChange={setSelectedEstadoCivil} />
        <Dropdown title="Cargo" value={selectedCargo} options={state.cargos} onChange={setSelectedCargo} />
      </SectionCard>

      <SectionCard title="Formación y ocupación">
        <Dropdown title="Nivel educativo" value={selectedEducacion} options={['Básica', 'Universitaria', 'Postgrado']} onChange={setSelectedEducacion} />
        <Dropdown title="Ocupación" value={selectedOcupacion} options={['Estudiante', 'Empleado', 'Independiente', 'Desempleado', 'Jubilado', 'Ama de casa']} onChange={setSelectedOcupacion} />
      </SectionCard>

      <SectionCard title="Lugar y hábitos de votación">
        <Dropdown title="Estado donde vives" value={selectedEntidadUsuario} options={state.entidadesUsuario} onChange={setSelectedEntidadUsuario} />
        <Dropdown title="Frecuencia de votación" value={frecuenciaVoto} options={['Casi siempre participo', 'Algunas veces participo', 'Todavía no participo']} onChange={setFrecuenciaVoto} />
        <Dropdown title="Estado como votante" value={selectedEstadoVotante} options={['Activo', 'Inactivo', 'No registrado']} onChange={setSelectedEstadoVotante} />
      </SectionCard>

      <SectionCard title="Intereses y valores">
        <Dropdown title="Tema que más te importa" value={temaInteres} options={['Economía', 'Educación', 'Salud', 'Medio ambiente', 'Seguridad']} onChange={setTemaInteres} />
        <Dropdown title="Valor más importante en un candidato" value={prioridadCandidato} options={['Honestidad', 'Experiencia', 'Propuestas', 'Carisma']} onChange={setPrioridadCandidato} />
        <Dropdown title="Dónde te informas" value={fuenteInformacion} options={['TV', 'Redes sociales', 'Periódicos', 'Amigos/familia']} onChange={setFuenteInformacion} />
        <Dropdown title="Postura económica" value={selectedPosturaEconomica} options={['Izquierda', 'Centro', 'Derecha']} onChange={setSelectedPosturaEconomica} />
        <Dropdown title="Postura sobre seguridad" value={selectedPosturaSeguridad} options={['Más policía', 'Más prevención', 'Reforma legal']} onChange={setSelectedPosturaSeguridad} />
        <Dropdown title="Prioridad política" value={selectedPrioridadPolitica} options={['Economía', 'Educación', 'Salud', 'Medio ambiente', 'Seguridad']} onChange={setSelectedPrioridadPolitica} />
        <Dropdown title="Experiencia del candidato" value={selectedExperienciaCandidato} options={['Novato', 'Experto', 'Veterano']} onChange={setSelectedExperienciaCandidato} />
        <Dropdown title="Tendencia ideológica" value={selectedTendenciaIdeologica} options={['Izquierda', 'Centro', 'Derecha']} onChange={setSelectedTendenciaIdeologica} />
        <Dropdown title="Entidad del candidato" value={selectedEntidadCandidato} options={state.entidadesUsuario} onChange={setSelectedEntidadCandidato} />
      </SectionCard>

      <button onClick={handlePredict} disabled={loading} style={{ padding: '0.7rem 1.5rem', marginTop: '1rem', cursor: 'pointer' }}>
        {loading ? 'Prediciendo...' : 'Predecir partido'}
      </button>

      {prediccion && <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>Predicción: {prediccion}</p>}
      {error && <p style={{ marginTop: '1rem', color: 'red' }}>Error: {error}</p>}
    </div>
  );
}
