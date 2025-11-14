module.exports = {

"[externals]/stream [external] (stream, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}}),
"[project]/src/app/votaciones/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>Page
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$papaparse$2f$papaparse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/papaparse/papaparse.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
async function loadCsvObjects(path) {
    const response = await fetch(path);
    const csvText = await response.text();
    return new Promise((resolve, reject)=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$papaparse$2f$papaparse$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].parse(csvText, {
            header: true,
            skipEmptyLines: true,
            complete: (res)=>{
                resolve(res.data || []);
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
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [headerKeys, setHeaderKeys] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [featureKeys, setFeatureKeys] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [rows, setRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [lookups, setLookups] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [partidoLookup, setPartidoLookup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [partidoReverse, setPartidoReverse] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [summaries, setSummaries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
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
                const keys = Object.keys(data[0]).map((k)=>k.trim());
                setHeaderKeys(keys);
                const exclude = new Set([
                    "id",
                    "created_at",
                    "entidad_candidato",
                    "partido"
                ]);
                const fkeys = keys.filter((k)=>!exclude.has(k));
                setFeatureKeys(fkeys);
                const localLookups = {};
                fkeys.forEach((fk)=>{
                    const vals = data.map((r)=>(r[fk] ?? "").toString().trim());
                    localLookups[fk] = buildLookup(vals);
                });
                const parties = data.map((r)=>(r["partido"] ?? "").toString().trim());
                const partLookup = buildLookup(parties);
                const partReverse = {};
                Object.entries(partLookup).forEach(([k, v])=>{
                    partReverse[v] = k;
                });
                const numericRows = [];
                data.forEach((r)=>{
                    const party = (r["partido"] ?? "").toString().trim();
                    if (!party) return;
                    const labelNum = partLookup[party];
                    const featVals = [];
                    for (const fk of fkeys){
                        const raw = (r[fk] ?? "").toString().trim();
                        const map = localLookups[fk];
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
                const separated = {};
                numericRows.forEach((nr)=>{
                    if (!separated[nr.label]) separated[nr.label] = [];
                    separated[nr.label].push(nr.features);
                });
                const sums = summarizeByClass(separated);
                const initialSelected = {};
                fkeys.forEach((fk)=>{
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
        const inputVector = [];
        for (const fk of featureKeys){
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
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        style: {
            padding: 20
        },
        children: "Cargando datos..."
    }, void 0, false, {
        fileName: "[project]/src/app/votaciones/page.tsx",
        lineNumber: 243,
        columnNumber: 23
    }, this);
    if (!rows || rows.length === 0) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        style: {
            padding: 20
        },
        children: "CSV vacío o no válido."
    }, void 0, false, {
        fileName: "[project]/src/app/votaciones/page.tsx",
        lineNumber: 245,
        columnNumber: 12
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "page-container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "page-header",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        children: "Predicción de Votación"
                    }, void 0, false, {
                        fileName: "[project]/src/app/votaciones/page.tsx",
                        lineNumber: 256,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "btn btn-blue",
                        onClick: ()=>router.push("/d3h7m1p4"),
                        children: "Regresar"
                    }, void 0, false, {
                        fileName: "[project]/src/app/votaciones/page.tsx",
                        lineNumber: 258,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/votaciones/page.tsx",
                lineNumber: 251,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "form-card",
                children: featureKeys.map((fk)=>{
                    const options = Object.keys(lookups[fk] || {});
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "form-item",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: fk.replace(/_/g, " ")
                            }, void 0, false, {
                                fileName: "[project]/src/app/votaciones/page.tsx",
                                lineNumber: 273,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: selectedValues[fk] ?? "",
                                onChange: (e)=>handleSelectChange(fk, e.target.value),
                                children: options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: opt,
                                        children: opt
                                    }, opt, false, {
                                        fileName: "[project]/src/app/votaciones/page.tsx",
                                        lineNumber: 280,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/votaciones/page.tsx",
                                lineNumber: 275,
                                columnNumber: 15
                            }, this)
                        ]
                    }, fk, true, {
                        fileName: "[project]/src/app/votaciones/page.tsx",
                        lineNumber: 272,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/app/votaciones/page.tsx",
                lineNumber: 268,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "btn btn-blue predict-btn",
                onClick: handlePredict,
                children: "Predecir partido"
            }, void 0, false, {
                fileName: "[project]/src/app/votaciones/page.tsx",
                lineNumber: 291,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "result-box",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: "Resultado: "
                    }, void 0, false, {
                        fileName: "[project]/src/app/votaciones/page.tsx",
                        lineNumber: 297,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: prediccion || "—"
                    }, void 0, false, {
                        fileName: "[project]/src/app/votaciones/page.tsx",
                        lineNumber: 298,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/votaciones/page.tsx",
                lineNumber: 296,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/votaciones/page.tsx",
        lineNumber: 248,
        columnNumber: 5
    }, this);
}
}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__477976bc._.js.map