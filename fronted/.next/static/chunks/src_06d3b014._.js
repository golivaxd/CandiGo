(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/lib/supabaseClient.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "supabase": ()=>supabase,
    "useAuth": ()=>useAuth
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/module/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://lmfqhbkliugoauxcaprl.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtZnFoYmtsaXVnb2F1eGNhcHJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzNjcyOTAsImV4cCI6MjA1Njk0MzI5MH0.KHCzarygd02MSMRVZ87_sO_Y2GrXCdT_9lNDJJusAxk");
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
    }
});
function useAuth(onAuth) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAuth.useEffect": ()=>{
            const { data: subscription } = supabase.auth.onAuthStateChange({
                "useAuth.useEffect": async (event, session)=>{
                    if (event === 'SIGNED_IN') {
                        onAuth(session);
                    } else if (event === 'SIGNED_OUT') {
                        onAuth(null);
                    }
                }
            }["useAuth.useEffect"]);
            return ({
                "useAuth.useEffect": ()=>{
                    var _subscription_subscription;
                    return subscription === null || subscription === void 0 ? void 0 : (_subscription_subscription = subscription.subscription) === null || _subscription_subscription === void 0 ? void 0 : _subscription_subscription.unsubscribe();
                }
            })["useAuth.useEffect"];
        }
    }["useAuth.useEffect"], [
        onAuth
    ]);
}
_s(useAuth, "OD7bBpZva5O2jO+Puf00hKivP7c=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/mapa/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>Mapa
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mapbox$2d$gl$2f$dist$2f$mapbox$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mapbox-gl/dist/mapbox-gl.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabaseClient.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mapbox$2d$gl$2f$dist$2f$mapbox$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].accessToken = 'pk.eyJ1IjoicGFyYWxsZWxkdWNrIiwiYSI6ImNseGtwbHphajAzczkyaXB4eG40aHA3eXkifQ.WZedrqvzwybmGa93mi-cdg';
function Mapa() {
    _s();
    const mapContainer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [map, setMap] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedEntidad, setSelectedEntidad] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [entidades, setEntidades] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [candidatosPorEntidad, setCandidatosPorEntidad] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [candidatosEntidad, setCandidatosEntidad] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Mapa.useEffect": ()=>{
            const initializeMap = {
                "Mapa.useEffect.initializeMap": async ()=>{
                    if (!mapContainer.current || map) return;
                    const mapInstance = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mapbox$2d$gl$2f$dist$2f$mapbox$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Map({
                        container: mapContainer.current,
                        style: 'mapbox://styles/mapbox/streets-v12',
                        center: [
                            -99.1332,
                            19.4326
                        ],
                        zoom: 5
                    });
                    setMap(mapInstance);
                    const { data: entidadesData } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('Entidades').select('*');
                    if (!entidadesData) return;
                    setEntidades(entidadesData);
                    const { data: candidatosData } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('candidatos').select('id, nombre, cargo, entidad, partido_id, partidos(nombre)');
                    if (!candidatosData) return;
                    const candidatosMap = {};
                    candidatosData.forEach({
                        "Mapa.useEffect.initializeMap": (c)=>{
                            const key = c.entidad.trim().toLowerCase();
                            if (!candidatosMap[key]) candidatosMap[key] = [];
                            candidatosMap[key].push({
                                ...c,
                                partido: c.partidos ? {
                                    nombre: c.partidos.nombre
                                } : undefined
                            });
                        }
                    }["Mapa.useEffect.initializeMap"]);
                    setCandidatosPorEntidad(candidatosMap);
                    entidadesData.forEach({
                        "Mapa.useEffect.initializeMap": (entidad)=>{
                            const marker = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mapbox$2d$gl$2f$dist$2f$mapbox$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Marker({
                                color: '#0070f3'
                            }).setLngLat([
                                entidad.lng,
                                entidad.lat
                            ]).setPopup(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mapbox$2d$gl$2f$dist$2f$mapbox$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Popup().setText(entidad.nombre)).addTo(mapInstance);
                            marker.getElement().addEventListener('click', {
                                "Mapa.useEffect.initializeMap": ()=>{
                                    setSelectedEntidad(entidad);
                                    const candidatosDeEstaEntidad = candidatosMap[entidad.nombre.trim().toLowerCase()] || [];
                                    setCandidatosEntidad(candidatosDeEstaEntidad);
                                }
                            }["Mapa.useEffect.initializeMap"]);
                        }
                    }["Mapa.useEffect.initializeMap"]);
                }
            }["Mapa.useEffect.initializeMap"];
            initializeMap();
            return ({
                "Mapa.useEffect": ()=>map === null || map === void 0 ? void 0 : map.remove()
            })["Mapa.useEffect"];
        }
    }["Mapa.useEffect"], [
        map
    ]);
    const filteredCandidatos = candidatosEntidad.filter((c)=>c.nombre.toLowerCase().includes(search.toLowerCase()));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'relative',
            width: '100%',
            height: '100vh',
            fontFamily: 'Montserrat, Arial, sans-serif',
            background: 'linear-gradient(135deg, #f5f5f5, #e0e4f1)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    background: 'linear-gradient(90deg, #1e3a8a, #4dd0b0)',
                    color: '#fff',
                    padding: '1rem 2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    zIndex: 1000,
                    backdropFilter: 'blur(6px)',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                    borderBottomLeftRadius: '12px',
                    borderBottomRightRadius: '12px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        style: {
                            margin: 0,
                            fontSize: '1.6rem',
                            fontWeight: 700,
                            letterSpacing: '0.5px'
                        },
                        children: "Mapa de Candidatos"
                    }, void 0, false, {
                        fileName: "[project]/src/app/mapa/page.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>window.location.href = '/dashboard',
                        style: {
                            padding: '0.6rem 1.4rem',
                            background: '#318422ff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: 500,
                            transition: 'all 0.3s ease'
                        },
                        onMouseEnter: (e)=>e.target.style.background = '#1e3a8a',
                        onMouseLeave: (e)=>e.target.style.background = '#318422ff',
                        children: "Regresar"
                    }, void 0, false, {
                        fileName: "[project]/src/app/mapa/page.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/mapa/page.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: mapContainer,
                style: {
                    width: '100%',
                    height: '100%',
                    borderRadius: '8px',
                    marginTop: '4rem'
                }
            }, void 0, false, {
                fileName: "[project]/src/app/mapa/page.tsx",
                lineNumber: 136,
                columnNumber: 7
            }, this),
            selectedEntidad && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'fixed',
                    top: '4rem',
                    right: 0,
                    bottom: 0,
                    width: '350px',
                    maxWidth: '90%',
                    background: '#f9f9f9',
                    boxShadow: '-3px 0 20px rgba(0,0,0,0.15)',
                    borderLeft: '2px solid #4dd0b0',
                    borderRadius: '12px 0 0 12px',
                    padding: '1rem',
                    overflowY: 'auto',
                    zIndex: 1000,
                    display: 'flex',
                    flexDirection: 'column'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '1rem'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    margin: 0,
                                    fontSize: '1.4rem',
                                    color: '#1e3a8a'
                                },
                                children: selectedEntidad.nombre
                            }, void 0, false, {
                                fileName: "[project]/src/app/mapa/page.tsx",
                                lineNumber: 168,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelectedEntidad(null),
                                style: {
                                    background: 'transparent',
                                    border: 'none',
                                    fontSize: '1.4rem',
                                    cursor: 'pointer',
                                    color: '#888'
                                },
                                children: "✕"
                            }, void 0, false, {
                                fileName: "[project]/src/app/mapa/page.tsx",
                                lineNumber: 169,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/mapa/page.tsx",
                        lineNumber: 167,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        placeholder: "Buscar candidato...",
                        value: search,
                        onChange: (e)=>setSearch(e.target.value),
                        style: {
                            margin: '0 0 1rem 0',
                            padding: '0.5rem 0.75rem',
                            borderRadius: '30px',
                            border: '1px solid #ccc',
                            fontSize: '1rem',
                            width: '100%',
                            boxSizing: 'border-box',
                            outline: 'none'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/mapa/page.tsx",
                        lineNumber: 184,
                        columnNumber: 11
                    }, this),
                    filteredCandidatos.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        style: {
                            listStyle: 'none',
                            padding: 0,
                            flex: 1
                        },
                        children: filteredCandidatos.map((candidato)=>{
                            var _candidato_partido;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                style: {
                                    padding: '0.75rem 1rem',
                                    borderBottom: '1px solid #dfe3ee',
                                    transition: 'all 0.2s ease-in-out',
                                    borderRadius: '8px',
                                    marginBottom: '0.5rem',
                                    background: 'white',
                                    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    cursor: 'pointer'
                                },
                                onClick: ()=>window.location.href = "/candidatos/".concat(candidato.id),
                                title: "Ver detalles del candidato",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                style: {
                                                    display: 'block',
                                                    fontSize: '1.1rem',
                                                    color: '#1e3a8a',
                                                    marginBottom: '0.2rem'
                                                },
                                                children: candidato.nombre
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mapa/page.tsx",
                                                lineNumber: 223,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: '#555',
                                                    fontSize: '0.95rem'
                                                },
                                                children: candidato.cargo
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mapa/page.tsx",
                                                lineNumber: 226,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                fileName: "[project]/src/app/mapa/page.tsx",
                                                lineNumber: 227,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: '#4dd0b0',
                                                    fontStyle: 'italic',
                                                    fontSize: '0.9rem'
                                                },
                                                children: ((_candidato_partido = candidato.partido) === null || _candidato_partido === void 0 ? void 0 : _candidato_partido.nombre) || candidato.partido_id
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/mapa/page.tsx",
                                                lineNumber: 228,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/mapa/page.tsx",
                                        lineNumber: 222,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: '1.2rem',
                                            color: '#318422',
                                            fontWeight: 600
                                        },
                                        children: "→"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/mapa/page.tsx",
                                        lineNumber: 232,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, candidato.id, true, {
                                fileName: "[project]/src/app/mapa/page.tsx",
                                lineNumber: 204,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/app/mapa/page.tsx",
                        lineNumber: 202,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            color: '#666',
                            textAlign: 'center',
                            marginTop: '1rem'
                        },
                        children: "No hay candidatos que coincidan."
                    }, void 0, false, {
                        fileName: "[project]/src/app/mapa/page.tsx",
                        lineNumber: 237,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/mapa/page.tsx",
                lineNumber: 148,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/mapa/page.tsx",
        lineNumber: 91,
        columnNumber: 5
    }, this);
}
_s(Mapa, "MzueZvZnJJaOC5F0cZg4PI2TFvs=");
_c = Mapa;
var _c;
__turbopack_context__.k.register(_c, "Mapa");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_06d3b014._.js.map