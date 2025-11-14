"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";
import "./page.css";


/**
 * page.tsx corregido:
 * - Usa "partido" como label (NO entidad_candidato)
 * - Excluye id, created_at, entidad_candidato y partido de features
 * - Usa PapaParse para leer CSV (maneja comas dentro de campos)
 * - Crea lookups por cada feature para mostrar selects en UI
 * - Predice usando Naive Bayes y muestra el NOMBRE del partido
 */

/* ---------- Helpers CSV / encoding ---------- */
type RowObj = Record<string, string>;

async function loadCsvObjects(path: string): Promise<RowObj[]> {
  const response = await fetch(path);
  const csvText = await response.text();
  return new Promise((resolve, reject) => {
    Papa.parse<RowObj>(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        resolve((res.data || []) as RowObj[]);
      },
      error: (err: any) => reject(err),
    });
  });
}

/** Crea lookup (string -> int) para una columna */
function buildLookup(values: string[]): Record<string, number> {
  const unique = Array.from(new Set(values.map((v) => (v ?? "").trim())));
  const lookup: Record<string, number> = {};
  unique.forEach((v, i) => (lookup[v] = i));
  return lookup;
}

/* ---------- Estadística y Naive Bayes ---------- */
const mean = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
function stdev(arr: number[]) {
  if (arr.length <= 1) return 1e-6;
  const avg = mean(arr);
  const variance =
    arr.reduce((a, b) => a + (b - avg) ** 2, 0) / (arr.length - 1);
  return Math.sqrt(variance);
}

function summarizeDataset(dataset: number[][]) {
  // dataset: rows x features
  const columns = dataset[0].map((_, i) => dataset.map((row) => row[i]));
  return columns.map((col) => [mean(col), stdev(col), col.length]);
}

function summarizeByClass(separated: Record<number, number[][]>) {
  const summaries: Record<number, any[]> = {};
  Object.keys(separated).forEach((k) => {
    summaries[Number(k)] = summarizeDataset(separated[Number(k)]);
  });
  return summaries;
}

function calculateProbability(x: number, mean: number, stdevVal: number) {
  const eps = 1e-6;
  const s = Math.max(stdevVal, eps);
  const exponent = Math.exp(-((x - mean) ** 2) / (2 * s * s));
  return (1 / (Math.sqrt(2 * Math.PI) * s)) * exponent;
}

function calculateClassProbabilities(summaries: any, inputVector: number[]) {
  const probabilities: Record<number, number> = {};
  Object.keys(summaries).forEach((classValue) => {
    probabilities[Number(classValue)] = 1;
    const classSummaries = summaries[classValue];
    for (let i = 0; i < classSummaries.length; i++) {
      const [m, s] = classSummaries[i];
      probabilities[Number(classValue)] *= calculateProbability(
        inputVector[i],
        m,
        s
      );
    }
  });
  return probabilities;
}

function predictLabel(summaries: any, inputVector: number[]) {
  const probs = calculateClassProbabilities(summaries, inputVector);
  let best: number | null = null;
  let bestP = -Infinity;
  Object.entries(probs).forEach(([label, p]: any) => {
    if (best === null || p > bestP) {
      best = Number(label);
      bestP = p;
    }
  });
  return best;
}

/* ---------- Componente ---------- */
export default function Page() {
  const [loading, setLoading] = useState(true);
  const [headerKeys, setHeaderKeys] = useState<string[]>([]);
  const [featureKeys, setFeatureKeys] = useState<string[]>([]);
  const [rows, setRows] = useState<RowObj[]>([]);
  const [lookups, setLookups] = useState<Record<string, Record<string, number>>>(
    {}
  );
  const [partidoLookup, setPartidoLookup] = useState<Record<string, number>>({});
  const [partidoReverse, setPartidoReverse] = useState<Record<number, string>>(
    {}
  );
  const [summaries, setSummaries] = useState<any>(null);

  const [selectedValues, setSelectedValues] = useState<Record<string, string>>(
    {}
  );
  const [prediccion, setPrediccion] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const data = await loadCsvObjects("/dataset_votacion.csv");
        if (!data || data.length === 0) {
          console.error("CSV vacío o no encontrado");
          setLoading(false);
          return;
        }

        const keys = Object.keys(data[0]).map((k) => k.trim());
        setHeaderKeys(keys);

        const exclude = new Set([
          "id",
          "created_at",
          "entidad_candidato",
          "partido",
        ]);

        const fkeys = keys.filter((k) => !exclude.has(k));
        setFeatureKeys(fkeys);

        const localLookups: Record<string, Record<string, number>> = {};
        fkeys.forEach((fk) => {
          const vals = data.map((r) => (r[fk] ?? "").toString().trim());
          localLookups[fk] = buildLookup(vals);
        });

        const parties = data.map((r) => (r["partido"] ?? "").toString().trim());
        const partLookup = buildLookup(parties);
        const partReverse: Record<number, string> = {};
        Object.entries(partLookup).forEach(([k, v]) => {
          partReverse[v] = k;
        });

        const numericRows: { features: number[]; label: number }[] = [];
        data.forEach((r) => {
          const party = (r["partido"] ?? "").toString().trim();
          if (!party) return;
          const labelNum = partLookup[party];

          const featVals: number[] = [];
          for (const fk of fkeys) {
            const raw = (r[fk] ?? "").toString().trim();
            const map = localLookups[fk];

            if (!(raw in map)) {
              const newIdx = Object.keys(map).length;
              map[raw] = newIdx;
            }
            featVals.push(map[raw]);
          }

          numericRows.push({ features: featVals, label: labelNum });
        });

        const separated: Record<number, number[][]> = {};
        numericRows.forEach((nr) => {
          if (!separated[nr.label]) separated[nr.label] = [];
          separated[nr.label].push(nr.features);
        });

        const sums = summarizeByClass(separated);

        const initialSelected: Record<string, string> = {};
        fkeys.forEach((fk) => {
          const options = Object.keys(localLookups[fk]);
          initialSelected[fk] = options.length > 0 ? options[0] : "";
        });

        setRows(data);
        setLookups(localLookups);
        setPartidoLookup(partLookup);
        setPartidoReverse(partReverse);
        setSummaries(sums);
        setSelectedValues(initialSelected);
        setLoading(false);
      } catch (err) {
        console.error("Error cargando CSV:", err);
        setLoading(false);
      }
    })();
  }, []);

  const handleSelectChange = (key: string, value: string) => {
    setSelectedValues((s) => ({ ...s, [key]: value }));
  };

  const handlePredict = () => {
    if (!summaries) {
      setPrediccion("Modelo no listo");
      return;
    }

    const inputVector: number[] = [];
    for (const fk of featureKeys) {
      const raw = (selectedValues[fk] ?? "").toString().trim();
      const map = lookups[fk];
      if (!map) {
        setPrediccion("Error: lookup faltante");
        return;
      }
      const valNum = raw in map ? map[raw] : 0;
      inputVector.push(valNum);
    }

    const labelNum = predictLabel(summaries, inputVector);
    if (labelNum === null || labelNum === undefined) {
      setPrediccion("Desconocido");
      return;
    }

    const partidoNombre = partidoReverse[labelNum];
    setPrediccion(partidoNombre ?? "Partido no identificado");
  };

  if (loading) return <p style={{ padding: 20 }}>Cargando datos...</p>;
  if (!rows || rows.length === 0) return <p style={{ padding: 20 }}>CSV vacío o no válido.</p>;

  return (
    <div className="page-container">

  {/* HEADER */}
  <header className="page-header">
    <h1>Predicción de Votación</h1>

   <button
  className="btn btn-blue"
  onClick={() => (window.location.href = "/d3h7m1p4")}
>
  Regresar
</button>

  </header>

  <p style={{ color: "#444" }}>
    Se excluye <strong>entidad_candidato</strong> y se usa{" "}
    <strong>partido</strong> como etiqueta.
  </p>

  {/* FORMULARIO */}
  <div className="form-card">
    {featureKeys.map((fk) => {
      const options = Object.keys(lookups[fk] || {});
      return (
        <div key={fk} className="form-item">
          <label>{fk.replace(/_/g, " ")}</label>

          <select
            value={selectedValues[fk] ?? ""}
            onChange={(e) => handleSelectChange(fk, e.target.value)}
          >
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      );
    })}
  </div>

  {/* BOTÓN DE PREDICCIÓN */}
<button className="btn btn-blue predict-btn">
  Predecir
</button>


  {/* RESULTADO */}
  <div className="result-box">
    <strong>Resultado: </strong>
    <span>{prediccion || "—"}</span>
  </div>

</div>


  );
}
