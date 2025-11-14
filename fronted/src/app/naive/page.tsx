"use client";

import { useState, useEffect } from "react";

async function wakeServer() {
  try {
    await fetch("https://votacion-api-7592.onrender.com/predecir", {
      method: "OPTIONS",
      mode: "cors",
    });
    console.log("Servidor inicializado");
  } catch (error) {
    console.log("No se pudo inicializar el servidor", error);
  }
}

export default function Page() {
  const [estado, setEstado] = useState("");
  const [genero, setGenero] = useState("");
  const [edad, setEdad] = useState("");
  const [resultado, setResultado] = useState("");
  const [paso, setPaso] = useState(1);

  // 🔥 Inicializa el backend al abrir la página
  useEffect(() => {
    wakeServer();
  }, []);

  const estados = [
    "Aguascalientes", "Baja California", "Baja California Sur", "Campeche",
    "Chiapas", "Chihuahua", "Ciudad de México", "Coahuila", "Colima",
    "Durango", "Estado de México", "Guanajuato", "Guerrero", "Hidalgo",
    "Jalisco", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca",
    "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa",
    "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán",
    "Zacatecas"
  ];

  const generos = ["Masculino", "Femenino", "Otro / Prefiero no decirlo"];
  const edades = ["18-25", "26-35", "36-45", "46-60", "60+"];

  async function enviarDatos() {
    const data = {
      estado,
      genero,
      edad
    };

    try {
      const response = await fetch("https://votacion-api-7592.onrender.com/predecir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resultadoJson = await response.json();
      setResultado(resultadoJson.prediccion);
    } catch (error) {
      console.log("Error al enviar datos", error);
    }
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Predicción de Votación</h1>

      {/* Paso 1: Estado */}
      {paso === 1 && (
        <div>
          <label>Estado de Residencia:</label>
          <select
            value={estado}
            onChange={(e) => {
              setEstado(e.target.value);
              setPaso(2);
            }}
          >
            <option value="">Selecciona...</option>
            {estados.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </div>
      )}

      {/* Paso 2: Género */}
      {paso === 2 && (
        <div style={{ marginTop: "1rem" }}>
          <label>Género:</label>
          <select
            value={genero}
            onChange={(e) => {
              setGenero(e.target.value);
              setPaso(3);
            }}
          >
            <option value="">Selecciona...</option>
            {generos.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
      )}

      {/* Paso 3: Edad */}
      {paso === 3 && (
        <div style={{ marginTop: "1rem" }}>
          <label>Edad:</label>
          <select
            value={edad}
            onChange={(e) => {
              setEdad(e.target.value);
              enviarDatos();
              setPaso(4);
            }}
          >
            <option value="">Selecciona...</option>
            {edades.map((ed) => (
              <option key={ed} value={ed}>{ed}</option>
            ))}
          </select>
        </div>
      )}

      {/* Resultado */}
      {paso === 4 && resultado && (
        <div style={{ marginTop: "2rem", fontSize: "1.2rem", fontWeight: "bold" }}>
          Resultado: {resultado}
        </div>
      )}
    </div>
  );
}
