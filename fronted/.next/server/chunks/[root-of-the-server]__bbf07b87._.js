module.exports = {

"[project]/.next-internal/server/app/api/news/route/actions.js [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/app/api/news/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// app/api/news/route.ts
__turbopack_context__.s({
    "GET": ()=>GET
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
async function GET() {
    try {
        const provider = process.env.NEWS_PROVIDER || "newsdata"; // Opciones: newsdata | newscatcher | newsapi
        if (provider === "newscatcher") {
            const token = process.env.NEWSCATCHER_API_TOKEN;
            if (!token) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "NEWSCATCHER_API_TOKEN no definido"
            }, {
                status: 500
            });
            const body = {
                lang: "es",
                countries: [
                    "MX"
                ],
                is_opinion: false,
                page_size: 10,
                theme: [
                    "politics"
                ]
            };
            const headers = {
                "Content-Type": "application/json",
                "x-api-token": token
            };
            const r = await fetch("https://v3-api.newscatcherapi.com/api/latest_headlines", {
                method: "POST",
                headers,
                body: JSON.stringify(body)
            });
            if (!r.ok) {
                const text = await r.text();
                console.error(`Error ${provider} API:`, r.status, text);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: `Error ${provider} API: ${r.status} - ${text}`
                }, {
                    status: r.status
                });
            }
            const json = await r.json();
            const articles = json.articles || json.data || [];
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                source: "newscatcher",
                articles
            });
        }
        if (provider === "newsapi") {
            const apiKey = process.env.NEWSAPI_API_KEY || "5b9d0f9ed9e54d38b9c17154b8dced1a";
            const url = `https://newsapi.org/v2/everything?q=elecciones+México+2024&language=es&sortBy=publishedAt&apiKey=${apiKey}`;
            const r = await fetch(url);
            if (!r.ok) {
                const text = await r.text();
                console.error(`Error ${provider} API:`, r.status, text);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: `Error ${provider} API: ${r.status} - ${text}`
                }, {
                    status: r.status
                });
            }
            const json = await r.json();
            const articles = json.articles || [];
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                source: "newsapi",
                articles
            });
        }
        if (provider === "newsapi") {
            const apiKey = process.env.NEWSAPI_API_KEY;
            if (!apiKey) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "NEWSAPI_API_KEY no definido"
            }, {
                status: 500
            });
            const url = `https://newsapi.org/v2/top-headlines?country=mx&category=politics&apiKey=${apiKey}`;
            const r = await fetch(url);
            if (!r.ok) {
                const text = await r.text();
                console.error(`Error ${provider} API:`, r.status, text);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: `Error ${provider} API: ${r.status} - ${text}`
                }, {
                    status: r.status
                });
            }
            const json = await r.json();
            const articles = json.articles || [];
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                source: "newsapi",
                articles
            });
        }
        // Si el provider no es ninguno de los anteriores
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "provider no configurado"
        }, {
            status: 400
        });
    } catch (err) {
        console.error("API /api/news error:", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "internal",
            details: String(err)
        }, {
            status: 500
        });
    }
}
}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__bbf07b87._.js.map