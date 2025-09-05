module.exports = {

"[project]/.next-internal/server/app/votos/page/actions.js [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
}}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)": ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/votos/page.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>handler
});
// Cambia la importación
const NaiveBayes = (()=>{
    const e = new Error("Cannot find module 'ml-naivebayes'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
// Luego funciona igual:
const nb = new NaiveBayes();
// Función para generar votos simulados
function generarVotos(n) {
    const opciones = [
        "A",
        "B",
        "Abstención"
    ];
    const votos = [];
    for(let i = 0; i < n; i++){
        const idx = Math.floor(Math.random() * opciones.length);
        votos.push(opciones[idx]);
    }
    return votos;
}
function handler(req, res) {
    // 1. Generar votos simulados
    const votosSimulados = generarVotos(100);
    // 2. Entrenar Naive Bayes
    const X = votosSimulados.map((v)=>[
            v
        ]); // características
    const y = votosSimulados; // etiquetas
    const nb = new NaiveBayes();
    nb.train(X, y); // <-- AQUÍ se usa Naive Bayes para aprender de los votos simulados
    // 3. Predecir probabilidades
    const opciones = [
        "A",
        "B",
        "Abstención"
    ];
    const probabilidades = opciones.map((opcion)=>({
            opcion,
            probabilidad: nb.predictProb([
                opcion
            ])[0] // <-- Naive Bayes calcula probabilidades
        }));
    // 4. Retornar resultados
    res.status(200).json({
        votosSimulados,
        probabilidades
    });
}
}),
"[project]/src/app/votos/page.tsx [app-rsc] (ecmascript, Next.js Server Component)": ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/votos/page.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__f700c5e6._.js.map