import { supabase } from '@/lib/supabaseClient';
import styles from "./candidatos.module.css";

export default async function CargoPage({ params }: { params: { cargo: string } }) {
  const { cargo } = params;

  // 🔹 1. Obtener candidatos filtrados por cargo
  const { data: candidatos, error: errorCandidatos } = await supabase
    .from("candidatos")
    .select("*")
    .eq("cargo", cargo);

  if (errorCandidatos) {
    console.error("Error cargando candidatos:", errorCandidatos.message);
    return <p>Error cargando candidatos</p>;
  }

  // 🔹 2. Obtener todos los partidos (puedes filtrar solo los necesarios con .in)
  const { data: partidos, error: errorPartidos } = await supabase
    .from("partidos")
    .select("*");

  if (errorPartidos) {
    console.error("Error cargando partidos:", errorPartidos.message);
    return <p>Error cargando partidos</p>;
  }

  if (!candidatos || candidatos.length === 0) {
    return <p>No hay candidatos para el cargo "{cargo}"</p>;
  }

  // 🔹 3. Hacer un "join" manual en JS
  const candidatosConPartido = candidatos.map((cand) => {
    const partido = partidos.find((p) => p.id === cand.partido_id);
    return { ...cand, partido };
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Candidatos para {cargo}</h1>
      <ul className={styles.lista}>
        {candidatosConPartido.map((candidato) => (
          <li key={candidato.id} className={styles.card}>
            <h2 className={styles.nombre}>{candidato.nombre}</h2>
            <p><strong>Cargo:</strong> {candidato.cargo}</p>
            <p><strong>Entidad:</strong> {candidato.entidad}</p>
            <p><strong>Partido:</strong> {candidato.partido?.nombre || "Independiente"}</p>
            {candidato.partido?.coalicion && (
              <p><strong>Coalición:</strong> {candidato.partido.coalicion}</p>
            )}
            {candidato.partido?.pagina_web && (
              <p>
                <a
                  href={candidato.partido.pagina_web}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Página del partido
                </a>
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
