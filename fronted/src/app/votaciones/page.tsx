'use client';

import { useState } from 'react';

const preguntas = [
  { pregunta: "Estado de residencia", opciones: [
    "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas",
    "Chihuahua", "Ciudad de México", "Coahuila", "Colima", "Durango", "Estado de México",
    "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "Michoacán", "Morelos", "Nayarit",
    "Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí",
    "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"
  ]},
  { pregunta: "Género", opciones: ["Masculino", "Femenino", "Otro / Prefiero no decirlo"] },
  { pregunta: "Edad", opciones: ["18-25", "26-35", "36-45", "46-60", "60+"] },
  { pregunta: "Tema que más te importa", opciones: ["Economía", "Salud", "Educación", "Seguridad", "Medio ambiente"] },
  { pregunta: "Valor que esperas en un candidato", opciones: ["Honestidad","Experiencia","Empatía","Carisma","Capacidad técnica"] },
  { pregunta: "Frecuencia de votación", opciones: ["Siempre","Casi siempre","A veces","Rara vez","Nunca"] },
  { pregunta: "Nivel de gobierno que te interesa", opciones: ["Presidencia","Gobernador","Diputado federal","Alcalde / Presidente municipal"] },
  { pregunta: "Postura económica", opciones: ["Fomento a emprendimiento privado","Mayor gasto social","Reducción de impuestos","Regulación estatal estricta"] },
  { pregunta: "Postura sobre seguridad", opciones: ["Mano dura","Prevención y educación","Reformas","Más tecnología"] },
  { pregunta: "Prioridad en política social", opciones: ["Salud pública","Educación","Igualdad de género","Medio ambiente"] },
  { pregunta: "Medio de información confiable", opciones: ["Televisión","Redes sociales","Periódicos digitales","Amigos y familia"] },
  { pregunta: "Importancia de la experiencia del candidato", opciones: ["Muy importante","Algo importante","Poco importante","Nada importante"] },
  { pregunta: "Tendencia ideológica", opciones: ["Conservadora","Liberal","Progresista","Neutral / Independiente"] },
];

export default function HomePage() {
  const [respuestas, setRespuestas] = useState(Array(preguntas.length).fill(0));
  const [resultado, setResultado] = useState<string>("");

  const handleChange = (index: number, value: number) => {
    const newRespuestas = [...respuestas];
    newRespuestas[index] = value;
    setRespuestas(newRespuestas);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/predecir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ datos: respuestas })
      });
      const data = await res.json();
      setResultado(`${data.candidato} - ${data.partido}`);
    } catch (err) {
      console.error(err);
      setResultado("Error al obtener la predicción.");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Encuesta Política</h1>
      <form onSubmit={handleSubmit}>
        {preguntas.map((p, i) => (
          <div key={i} style={{ marginBottom: "1rem" }}>
            <label>{p.pregunta}</label>
            <select value={respuestas[i]} onChange={e => handleChange(i, Number(e.target.value))}>
              {p.opciones.map((opt, idx) => (
                <option key={idx} value={idx}>{opt}</option>
              ))}
            </select>
          </div>
        ))}
        <button type="submit">Predecir candidato</button>
      </form>
      {resultado && <p>Predicción: {resultado}</p>}
    </div>
  );
}
