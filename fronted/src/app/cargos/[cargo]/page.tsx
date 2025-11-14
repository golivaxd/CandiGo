"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import "./cargo.css";

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
  const [search, setSearch] = useState("");
  const [filtroEntidad, setFiltroEntidad] = useState("");

  const cargoParam = params?.cargo;
  const cargo = Array.isArray(cargoParam)
    ? decodeURIComponent(cargoParam[0])
    : decodeURIComponent(cargoParam || "");

  // ============================
  //    CARGAR CANDIDATOS
  // ============================
  useEffect(() => {
    const fetchCandidatos = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("candidatos")
        .select("id, nombre, cargo, entidad, activo")
        .eq("cargo", cargo)
        .eq("activo", true);

      if (!error && data) setCandidatos(data);
      setLoading(false);
    };

    if (cargo) fetchCandidatos();
  }, [cargo]);

  // ============================
  //   SELECCIONAR CANDIDATOS
  // ============================
  const toggleSeleccion = (id: number) => {
    setSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const irAComparativa = () => {
    if (seleccionados.length < 2) {
      alert("Selecciona al menos 2 candidatos para comparar.");
      return;
    }
    router.push(`/comparativa?ids=${seleccionados.join(",")}`);
  };

  // ============================
  //        FILTRADOS
  // ============================
  const entidadesUnicas = Array.from(
    new Set(candidatos.map((c) => c.entidad))
  );

  const candidatosFiltrados = candidatos.filter((c) => {
    const matchSearch = c.nombre.toLowerCase().includes(search.toLowerCase());
    const matchEntidad = filtroEntidad ? c.entidad === filtroEntidad : true;
    return matchSearch && matchEntidad;
  });

  if (loading) return <p>Cargando candidatos...</p>;

  return (
    <div className="cargo-container">
      {/* ===== HEADER FIJO ===== */}
      <header className="cargo-header">
        <h1 className="titulo-header">Cargo: {cargo}</h1>

        <button className="header-back" onClick={() => router.back()}>
          ⬅ Regresar
        </button>
      </header>

      <div className="contenido-pagina">
        {/* ===== BARRA DE FILTROS ===== */}
        <div className="filtros-barra">
          <input
            type="text"
            className="input-buscar"
            placeholder="Buscar por nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="select-entidad"
            value={filtroEntidad}
            onChange={(e) => setFiltroEntidad(e.target.value)}
          >
            <option value="">Todas las entidades</option>
            {entidadesUnicas.map((ent) => (
              <option key={ent} value={ent}>
                {ent}
              </option>
            ))}
          </select>

          <button className="btn-comparar" onClick={irAComparativa}>
            Comparar Propuestas ({seleccionados.length})
          </button>
        </div>

        {/* ===== LISTA DE CANDIDATOS ===== */}
        <ul className="lista-candidatos">
          {candidatosFiltrados.map((c) => (
            <li
              key={c.id}
              className={`item-candidato ${
                seleccionados.includes(c.id) ? "seleccionado" : ""
              }`}
            >
              <input
                type="checkbox"
                className="checkbox-candidato"
                checked={seleccionados.includes(c.id)}
                onChange={() => toggleSeleccion(c.id)}
              />

              <div>
                <h2>{c.nombre}</h2>
                <p>
                  <strong>Cargo:</strong> {c.cargo}
                </p>
                <p>
                  <strong>Entidad:</strong> {c.entidad}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {candidatosFiltrados.length === 0 && (
          <p>No se encontraron candidatos con esos filtros.</p>
        )}
      </div>
    </div>
  );
}

