module.exports = {

"[project]/src/app/votaciones/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>Page
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module 'papaparse'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
"use client";
;
;
;
async function loadCsvObjects(path) {
    return new Promise((resolve, reject)=>{
        Papa.parse(path, {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: (res)=>{
                resolve(res.data);
            },
            error: (err)=>reject(err)
        });
    });
}
/** Crea lookup (string -> int) para una columna */ function buildLookup(values) {
    const unique = Array.from(new Set(values.map((v)=>(v ?? "").trim())));
    const lookup = {};
    unique.forEach((v, i)=>lookup[v] = i);
    return lookup;
}
/* ---------- Estadística y Naive Bayes ---------- */ const mean = (arr)=>arr.reduce((a, b)=>a + b, 0) / arr.length;
function stdev(arr) {
    if (arr.length <= 1) return 1e-6;
    const avg = mean(arr);
    const variance = arr.reduce((a, b)=>a + (b - avg) ** 2, 0) / (arr.length - 1);
    return Math.sqrt(variance);
}
function summarizeDataset(dataset) {
    // dataset: rows x features
    const columns = dataset[0].map((_, i)=>dataset.map((row)=>row[i]));
    return columns.map((col)=>[
            mean(col),
            stdev(col),
            col.length
        ]);
}
function summarizeByClass(separated) {
    const summaries = {};
    Object.keys(separated).forEach((k)=>{
        summaries[Number(k)] = summarizeDataset(separated[Number(k)]);
    });
    return summaries;
}
function calculateProbability(x, mean, stdevVal) {
    const eps = 1e-6;
    const s = Math.max(stdevVal, eps);
    const exponent = Math.exp(-((x - mean) ** 2) / (2 * s * s));
    return 1 / (Math.sqrt(2 * Math.PI) * s) * exponent;
}
function calculateClassProbabilities(summaries, inputVector) {
    const probabilities = {};
    Object.keys(summaries).forEach((classValue)=>{
        probabilities[Number(classValue)] = 1;
        const classSummaries = summaries[classValue];
        for(let i = 0; i < classSummaries.length; i++){
            const [m, s] = classSummaries[i];
            probabilities[Number(classValue)] *= calculateProbability(inputVector[i], m, s);
        }
    });
    return probabilities;
}
function predictLabel(summaries, inputVector) {
    const probs = calculateClassProbabilities(summaries, inputVector);
    let best = null;
    let bestP = -Infinity;
    Object.entries(probs).forEach(([label, p])=>{
        if (best === null || p > bestP) {
            best = Number(label);
            bestP = p;
        }
    });
    return best;
}
function Page() {
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [headerKeys, setHeaderKeys] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [featureKeys, setFeatureKeys] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [rows, setRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [lookups, setLookups] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [partidoLookup, setPartidoLookup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [partidoReverse, setPartidoReverse] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [summaries, setSummaries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // UI state: selected value key for each feature (store the original string)
    const [selectedValues, setSelectedValues] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [prediccion, setPrediccion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        (async ()=>{
            try {
                const data = await loadCsvObjects("/dataset_votacion.csv");
                if (!data || data.length === 0) {
                    console.error("CSV vacío o no encontrado");
                    setLoading(false);
                    return;
                }
                // header keys (column names)
                const keys = Object.keys(data[0]).map((k)=>k.trim());
                setHeaderKeys(keys);
                // Columns to exclude from features
                const exclude = new Set([
                    "id",
                    "created_at",
                    "entidad_candidato",
                    "partido"
                ]);
                // Feature keys (en orden)
                const fkeys = keys.filter((k)=>!exclude.has(k));
                setFeatureKeys(fkeys);
                // Build lookups for each feature (string -> int)
                const localLookups = {};
                fkeys.forEach((fk)=>{
                    const vals = data.map((r)=>(r[fk] ?? "").toString().trim());
                    localLookups[fk] = buildLookup(vals);
                });
                // Build partido lookup (label)
                const parties = data.map((r)=>(r["partido"] ?? "").toString().trim());
                const partLookup = buildLookup(parties);
                const partReverse = {};
                Object.entries(partLookup).forEach(([k, v])=>{
                    partReverse[v] = k;
                });
                // Convert rows to numeric features + numeric label
                // We'll create "numericRows": array of { features: number[], label: number }
                const numericRows = [];
                data.forEach((r)=>{
                    // If partido missing, skip
                    const party = (r["partido"] ?? "").toString().trim();
                    if (!party) return;
                    const labelNum = partLookup[party];
                    const featVals = [];
                    for (const fk of fkeys){
                        const raw = (r[fk] ?? "").toString().trim();
                        const map = localLookups[fk];
                        // If raw value not in map (shouldn't happen), add to map dynamically
                        if (!(raw in map)) {
                            const newIdx = Object.keys(map).length;
                            map[raw] = newIdx;
                        }
                        featVals.push(map[raw]);
                    }
                    numericRows.push({
                        features: featVals,
                        label: labelNum
                    });
                });
                // Separate by class (label)
                const separated = {};
                numericRows.forEach((nr)=>{
                    if (!separated[nr.label]) separated[nr.label] = [];
                    separated[nr.label].push(nr.features);
                });
                const sums = summarizeByClass(separated);
                // initialize selectedValues with first option for each feature (for UI)
                const initialSelected = {};
                fkeys.forEach((fk)=>{
                    const options = Object.keys(localLookups[fk]);
                    initialSelected[fk] = options.length > 0 ? options[0] : "";
                });
                // Save state
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
    const handleSelectChange = (key, value)=>{
        setSelectedValues((s)=>({
                ...s,
                [key]: value
            }));
    };
    const handlePredict = ()=>{
        if (!summaries) {
            setPrediccion("Modelo no listo");
            return;
        }
        // Build input vector using lookups (order = featureKeys)
        const inputVector = [];
        for (const fk of featureKeys){
            const raw = (selectedValues[fk] ?? "").toString().trim();
            const map = lookups[fk];
            if (!map) {
                setPrediccion("Error: lookup faltante");
                return;
            }
            // If value not present in map (raro), map to nearest (0)
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
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        style: {
            padding: 20
        },
        children: "Cargando datos..."
    }, void 0, false, {
        fileName: "[project]/src/app/votaciones/page.tsx",
        lineNumber: 252,
        columnNumber: 23
    }, this);
    if (!rows || rows.length === 0) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        style: {
            padding: 20
        },
        children: "CSV vacío o no válido."
    }, void 0, false, {
        fileName: "[project]/src/app/votaciones/page.tsx",
        lineNumber: 253,
        columnNumber: 42
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: 24,
            fontFamily: "sans-serif",
            maxWidth: 900
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "Predicción Naive Bayes - Votaciones (usa 'partido')"
            }, void 0, false, {
                fileName: "[project]/src/app/votaciones/page.tsx",
                lineNumber: 257,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    color: "#444"
                },
                children: [
                    "Se excluye ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: "entidad_candidato"
                    }, void 0, false, {
                        fileName: "[project]/src/app/votaciones/page.tsx",
                        lineNumber: 259,
                        columnNumber: 20
                    }, this),
                    " y se usa ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: "partido"
                    }, void 0, false, {
                        fileName: "[project]/src/app/votaciones/page.tsx",
                        lineNumber: 259,
                        columnNumber: 64
                    }, this),
                    " como etiqueta."
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/votaciones/page.tsx",
                lineNumber: 258,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: 18
                },
                children: featureKeys.map((fk)=>{
                    const options = Object.keys(lookups[fk] || {});
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginBottom: 12
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: {
                                    display: "block",
                                    marginBottom: 6,
                                    fontWeight: 600
                                },
                                children: fk
                            }, void 0, false, {
                                fileName: "[project]/src/app/votaciones/page.tsx",
                                lineNumber: 267,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: selectedValues[fk] ?? "",
                                onChange: (e)=>handleSelectChange(fk, e.target.value),
                                style: {
                                    padding: 8,
                                    width: 360
                                },
                                children: options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: opt,
                                        children: opt
                                    }, opt, false, {
                                        fileName: "[project]/src/app/votaciones/page.tsx",
                                        lineNumber: 276,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/votaciones/page.tsx",
                                lineNumber: 270,
                                columnNumber: 15
                            }, this)
                        ]
                    }, fk, true, {
                        fileName: "[project]/src/app/votaciones/page.tsx",
                        lineNumber: 266,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/app/votaciones/page.tsx",
                lineNumber: 262,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handlePredict,
                style: {
                    marginTop: 12,
                    padding: "10px 18px",
                    background: "#111",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer"
                },
                children: "Predecir partido"
            }, void 0, false, {
                fileName: "[project]/src/app/votaciones/page.tsx",
                lineNumber: 286,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: 18,
                    fontSize: 18
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: "Resultado: "
                    }, void 0, false, {
                        fileName: "[project]/src/app/votaciones/page.tsx",
                        lineNumber: 302,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: prediccion || "—"
                    }, void 0, false, {
                        fileName: "[project]/src/app/votaciones/page.tsx",
                        lineNumber: 303,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/votaciones/page.tsx",
                lineNumber: 301,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: 22
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        children: "Partidos detectados en el CSV"
                    }, void 0, false, {
                        fileName: "[project]/src/app/votaciones/page.tsx",
                        lineNumber: 307,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        children: Object.entries(partidoLookup).map(([name, idx])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    name,
                                    " — código interno: ",
                                    idx
                                ]
                            }, name, true, {
                                fileName: "[project]/src/app/votaciones/page.tsx",
                                lineNumber: 310,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/votaciones/page.tsx",
                        lineNumber: 308,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            color: "#666",
                            marginTop: 8
                        },
                        children: "Nota: si en tu CSV sólo existe un partido, el modelo solo podrá predecir ese."
                    }, void 0, false, {
                        fileName: "[project]/src/app/votaciones/page.tsx",
                        lineNumber: 315,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/votaciones/page.tsx",
                lineNumber: 306,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/votaciones/page.tsx",
        lineNumber: 256,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}}),

};

//# sourceMappingURL=_c56408dc._.js.map