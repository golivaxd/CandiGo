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
const supabaseKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtZnFoYmtsaXVnb2F1eGNhcHJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzNjcyOTAsImV4cCI6MjA1Njk0MzI5MH0.KHCzarygd02MSMRVZ87_sO_Y2GrXCdT_9lNDJJusAxk");
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseKey, {
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
"[project]/src/app/foro/foro.module.css [app-client] (css module)": ((__turbopack_context__) => {

__turbopack_context__.v({
  "backButton": "foro-module__h9DDxW__backButton",
  "buttonComentario": "foro-module__h9DDxW__buttonComentario",
  "comentario": "foro-module__h9DDxW__comentario",
  "comentariosList": "foro-module__h9DDxW__comentariosList",
  "container": "foro-module__h9DDxW__container",
  "debateAuthor": "foro-module__h9DDxW__debateAuthor",
  "debateDescription": "foro-module__h9DDxW__debateDescription",
  "debateDetail": "foro-module__h9DDxW__debateDetail",
  "debateItem": "foro-module__h9DDxW__debateItem",
  "debateList": "foro-module__h9DDxW__debateList",
  "debateTitle": "foro-module__h9DDxW__debateTitle",
  "footer": "foro-module__h9DDxW__footer",
  "header": "foro-module__h9DDxW__header",
  "newDebateButton": "foro-module__h9DDxW__newDebateButton",
  "textareaComentario": "foro-module__h9DDxW__textareaComentario",
});
}),
"[project]/src/app/foro/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>Foro
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabaseClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$foro$2f$foro$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/foro/foro.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function Foro() {
    _s();
    const [debates, setDebates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedDebate, setSelectedDebate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [comentarios, setComentarios] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [newComentario, setNewComentario] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [newDebateTitle, setNewDebateTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [newDebateDescription, setNewDebateDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [showNewDebateForm, setShowNewDebateForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Foro.useEffect": ()=>{
            fetchDebates();
            // Obtener usuario autenticado
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getSession().then({
                "Foro.useEffect": (param)=>{
                    let { data } = param;
                    if (data.session) setUser(data.session.user);
                }
            }["Foro.useEffect"]);
            // Escuchar cambios de auth
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.onAuthStateChange({
                "Foro.useEffect": (_event, session)=>{
                    setUser((session === null || session === void 0 ? void 0 : session.user) || null);
                }
            }["Foro.useEffect"]);
        }
    }["Foro.useEffect"], []);
    const fetchDebates = async ()=>{
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('debates').select('*').order('created_at', {
            ascending: false
        });
        if (data) setDebates(data);
    };
    const fetchComentarios = async (debateId)=>{
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('comentarios').select('*').eq('debate_id', debateId).order('created_at', {
            ascending: true
        });
        if (data) setComentarios(data);
    };
    const handleDebateClick = (debate)=>{
        setSelectedDebate(debate);
        fetchComentarios(debate.id);
    };
    const handleAddComentario = async ()=>{
        var _user_user_metadata, _user_user_metadata1;
        if (!newComentario.trim() || !selectedDebate || !user) return;
        const displayName = ((_user_user_metadata = user.user_metadata) === null || _user_user_metadata === void 0 ? void 0 : _user_user_metadata.full_name) || ((_user_user_metadata1 = user.user_metadata) === null || _user_user_metadata1 === void 0 ? void 0 : _user_user_metadata1.display_name) || 'Usuario';
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('comentarios').insert({
            debate_id: selectedDebate.id,
            autor: displayName,
            contenido: newComentario,
            created_at: new Date().toISOString(),
            user_id: user.id
        }).select().single();
        if (data) {
            setComentarios([
                ...comentarios,
                data
            ]);
            setNewComentario(''); // Limpiar textarea
        }
    };
    const handleAddDebate = async ()=>{
        var _user_user_metadata, _user_user_metadata1;
        if (!newDebateTitle.trim() || !newDebateDescription.trim() || !user) return;
        const displayName = ((_user_user_metadata = user.user_metadata) === null || _user_user_metadata === void 0 ? void 0 : _user_user_metadata.full_name) || ((_user_user_metadata1 = user.user_metadata) === null || _user_user_metadata1 === void 0 ? void 0 : _user_user_metadata1.display_name) || 'Usuario';
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('debates').insert({
            title: newDebateTitle,
            description: newDebateDescription,
            author: displayName,
            created_at: new Date().toISOString()
        }).select().single();
        if (data) {
            setDebates([
                data,
                ...debates
            ]); // Mostrar nuevo debate de inmediato
            setShowNewDebateForm(false);
            setNewDebateTitle(''); // Limpiar campo
            setNewDebateDescription(''); // Limpiar campo
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$foro$2f$foro$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$foro$2f$foro$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        children: "Foro de Debates"
                    }, void 0, false, {
                        fileName: "[project]/src/app/foro/page.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>window.location.href = '/dashboard',
                        children: "← Regresar"
                    }, void 0, false, {
                        fileName: "[project]/src/app/foro/page.tsx",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/foro/page.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this),
            !selectedDebate && !showNewDebateForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$foro$2f$foro$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].newDebateButton,
                        onClick: ()=>setShowNewDebateForm(true),
                        children: "+ Nuevo Debate"
                    }, void 0, false, {
                        fileName: "[project]/src/app/foro/page.tsx",
                        lineNumber: 127,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$foro$2f$foro$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].debateList,
                        children: debates.map((debate)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$foro$2f$foro$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].debateItem,
                                onClick: ()=>handleDebateClick(debate),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$foro$2f$foro$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].debateTitle,
                                        children: debate.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/foro/page.tsx",
                                        lineNumber: 133,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$foro$2f$foro$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].debateDescription,
                                        children: debate.description
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/foro/page.tsx",
                                        lineNumber: 134,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$foro$2f$foro$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].debateAuthor,
                                        children: [
                                            "Por ",
                                            debate.author,
                                            " - ",
                                            new Date(debate.created_at).toLocaleString()
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/foro/page.tsx",
                                        lineNumber: 135,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, debate.id, true, {
                                fileName: "[project]/src/app/foro/page.tsx",
                                lineNumber: 132,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/foro/page.tsx",
                        lineNumber: 130,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true),
            showNewDebateForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$foro$2f$foro$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].backButton,
                        onClick: ()=>setShowNewDebateForm(false),
                        children: "← Volver"
                    }, void 0, false, {
                        fileName: "[project]/src/app/foro/page.tsx",
                        lineNumber: 147,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "Crear nuevo debate"
                    }, void 0, false, {
                        fileName: "[project]/src/app/foro/page.tsx",
                        lineNumber: 148,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        placeholder: "Título del debate",
                        value: newDebateTitle,
                        onChange: (e)=>setNewDebateTitle(e.target.value),
                        style: {
                            width: '100%',
                            marginBottom: '0.5rem',
                            padding: '0.5rem',
                            borderRadius: '6px',
                            border: '1px solid #ccc'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/foro/page.tsx",
                        lineNumber: 149,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        placeholder: "Descripción",
                        value: newDebateDescription,
                        onChange: (e)=>setNewDebateDescription(e.target.value),
                        style: {
                            width: '100%',
                            padding: '0.5rem',
                            borderRadius: '6px',
                            border: '1px solid #ccc',
                            minHeight: '80px',
                            marginBottom: '0.5rem'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/foro/page.tsx",
                        lineNumber: 155,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$foro$2f$foro$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].newDebateButton,
                        onClick: handleAddDebate,
                        children: "Crear Debate"
                    }, void 0, false, {
                        fileName: "[project]/src/app/foro/page.tsx",
                        lineNumber: 161,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/foro/page.tsx",
                lineNumber: 146,
                columnNumber: 9
            }, this),
            selectedDebate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$foro$2f$foro$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].backButton,
                        onClick: ()=>setSelectedDebate(null),
                        children: "← Volver a debates"
                    }, void 0, false, {
                        fileName: "[project]/src/app/foro/page.tsx",
                        lineNumber: 168,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$foro$2f$foro$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].debateTitle,
                        children: selectedDebate.title
                    }, void 0, false, {
                        fileName: "[project]/src/app/foro/page.tsx",
                        lineNumber: 169,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$foro$2f$foro$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].debateDescription,
                        children: selectedDebate.description
                    }, void 0, false, {
                        fileName: "[project]/src/app/foro/page.tsx",
                        lineNumber: 170,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$foro$2f$foro$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].debateAuthor,
                        children: [
                            "Por ",
                            selectedDebate.author,
                            " - ",
                            new Date(selectedDebate.created_at).toLocaleString()
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/foro/page.tsx",
                        lineNumber: 171,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        children: "Comentarios"
                    }, void 0, false, {
                        fileName: "[project]/src/app/foro/page.tsx",
                        lineNumber: 175,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$foro$2f$foro$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].comentariosList,
                        children: comentarios.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$foro$2f$foro$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].comentario,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: c.autor
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/foro/page.tsx",
                                        lineNumber: 179,
                                        columnNumber: 17
                                    }, this),
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                        children: new Date(c.created_at).toLocaleString()
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/foro/page.tsx",
                                        lineNumber: 179,
                                        columnNumber: 44
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: c.contenido
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/foro/page.tsx",
                                        lineNumber: 180,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, c.id, true, {
                                fileName: "[project]/src/app/foro/page.tsx",
                                lineNumber: 178,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/foro/page.tsx",
                        lineNumber: 176,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$foro$2f$foro$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].textareaComentario,
                        placeholder: "Escribe tu comentario...",
                        value: newComentario,
                        onChange: (e)=>setNewComentario(e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/src/app/foro/page.tsx",
                        lineNumber: 185,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$foro$2f$foro$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].buttonComentario,
                        onClick: handleAddComentario,
                        children: "Enviar comentario"
                    }, void 0, false, {
                        fileName: "[project]/src/app/foro/page.tsx",
                        lineNumber: 191,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/foro/page.tsx",
                lineNumber: 167,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$foro$2f$foro$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].footer,
                children: "Foro de Debates © 2025"
            }, void 0, false, {
                fileName: "[project]/src/app/foro/page.tsx",
                lineNumber: 195,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/foro/page.tsx",
        lineNumber: 117,
        columnNumber: 5
    }, this);
}
_s(Foro, "uTAeAmKEmhCFKCag18s1PAOCpuw=");
_c = Foro;
var _c;
__turbopack_context__.k.register(_c, "Foro");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_cb216ebe._.js.map