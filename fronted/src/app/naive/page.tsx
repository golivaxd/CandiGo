'use client';

import React, { useState } from 'react';
import './page.css';

export default function Page() {
  // Estados del formulario
  const [formState, setFormState] = useState({
    genero: '',
    edad: '',
    estadoCivil: '',
    cargo: '',
    educacion: '',
    ocupacion: '',
    entidadUsuario: '',
    frecuenciaVoto: '',
    estadoVotante: '',
    temaInteres: '',
    prioridadCandidato: '',
    fuenteInformacion: '',
    posturaEconomica: '',
    posturaSeguridad: '',
    prioridadPolitica: '',
    experienciaCandidato: '',
    tendenciaIdeologica: '',
    entidadCandidato: ''
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [prediccion, setPrediccion] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const opciones: Record<string, string[]> = {
    genero: ["Masculino", "Femenino", "Otro"],
    edad: ["18-25", "26-35", "36-45", "46-60", "60+"],
    estadoCivil: ["Soltero", "Casado", "Divorciado", "Viudo", "Prefiero no decirlo"],
    cargo: ["Presidente", "Diputado", "Senador"],
    educacion: ["Básica", "Universitaria", "Postgrado"],
    ocupacion: ["Estudiante", "Empleado", "Independiente", "Desempleado", "Jubilado", "Ama de casa"],
    entidadUsuario: ["CDMX", "Jalisco", "Nuevo León"],
    frecuenciaVoto: ["Casi siempre participo", "Algunas veces participo", "Todavía no participo"],
    estadoVotante: ["Activo", "Inactivo", "No registrado"],
    temaInteres: ["Economía", "Educación", "Salud", "Medio ambiente", "Seguridad"],
    prioridadCandidato: ["Honestidad", "Experiencia", "Propuestas", "Carisma"],
    fuenteInformacion: ["TV", "Redes sociales", "Periódicos", "Amigos/familia"],
    posturaEconomica: ["Izquierda", "Centro", "Derecha"],
    posturaSeguridad: ["Más policía", "Más prevención", "Reforma legal"],
    prioridadPolitica: ["Economía", "Educación", "Salud", "Medio ambiente", "Seguridad"],
    experienciaCandidato: ["Novato", "Experto", "Veterano"],
    tendenciaIdeologica: ["Izquierda", "Centro", "Derecha"],
    entidadCandidato: ["CDMX", "Jalisco", "Nuevo León"],
  };

  const fields = Object.keys(formState);

  const handleNext = () => {
    if (formState[fields[currentStep] as keyof typeof formState]) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    setPrediccion(null);

    try {
      // Convertir todas las selecciones a números
      const datos = fields.map(key => opciones[key][formState[key as keyof typeof formState] ? opciones[key].indexOf(formState[key as keyof typeof formState]) : 0]);

      const res = await fetch("https://votacion-api-7592.onrender.com/predecir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ datos }),
      });

      if (!res.ok) throw new Error(`Error al obtener predicción: ${res.statusText}`);
      const data = await res.json();
      setPrediccion(data.prediccion);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const currentField = fields[currentStep];

  return (
    <div className="page-container">
      <h1>Formulario de Votante</h1>

      {currentStep < fields.length ? (
        <div className="step-container">
          <label className="dropdown-label">{currentField.replace(/([A-Z])/g, ' $1')}</label>
          <select
            value={formState[currentField as keyof typeof formState]}
            onChange={(e) => setFormState({ ...formState, [currentField]: e.target.value })}
            className="dropdown-select"
          >
            <option value="">Selecciona</option>
            {opciones[currentField].map((opt, idx) => (
              <option key={idx} value={opt}>{opt}</option>
            ))}
          </select>

          <div className="step-buttons">
            {currentStep > 0 && <button onClick={handlePrev} className="prev-button">Anterior</button>}
            <button onClick={handleNext} disabled={!formState[currentField as keyof typeof formState]} className="next-button">
              {currentStep === fields.length - 1 ? 'Finalizar' : 'Siguiente'}
            </button>
          </div>
        </div>
      ) : (
        <button onClick={handlePredict} disabled={loading} className="predict-button">
          {loading ? 'Prediciendo...' : 'Predecir partido'}
        </button>
      )}

      {prediccion && <p className="prediction-text">Predicción: {prediccion}</p>}
      {error && <p className="error-text">Error: {error}</p>}
    </div>
  );
}
