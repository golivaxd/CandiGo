module.exports = {

"[project]/src/app/votaciones/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>HomePage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const preguntas = [
    {
        pregunta: "Estado de residencia",
        opciones: [
            "Aguascalientes",
            "Baja California",
            "Baja California Sur",
            "Campeche",
            "Chiapas",
            "Chihuahua",
            "Ciudad de México",
            "Coahuila",
            "Colima",
            "Durango",
            "Estado de México",
            "Guanajuato",
            "Guerrero",
            "Hidalgo",
            "Jalisco",
            "Michoacán",
            "Morelos",
            "Nayarit",
            "Nuevo León",
            "Oaxaca",
            "Puebla",
            "Querétaro",
            "Quintana Roo",
            "San Luis Potosí",
            "Sinaloa",
            "Sonora",
            "Tabasco",
            "Tamaulipas",
            "Tlaxcala",
            "Veracruz",
            "Yucatán",
            "Zacatecas"
        ]
    },
    {
        pregunta: "Género",
        opciones: [
            "Masculino",
            "Femenino",
            "Otro / Prefiero no decirlo"
        ]
    },
    {
        pregunta: "Edad",
        opciones: [
            "18-25",
            "26-35",
            "36-45",
            "46-60",
            "60+"
        ]
    },
    {
        pregunta: "Tema que más te importa",
        opciones: [
            "Economía",
            "Salud",
            "Educación",
            "Seguridad",
            "Medio ambiente"
        ]
    },
    {
        pregunta: "Valor que esperas en un candidato",
        opciones: [
            "Honestidad",
            "Experiencia",
            "Empatía",
            "Carisma",
            "Capacidad técnica"
        ]
    },
    {
        pregunta: "Frecuencia de votación",
        opciones: [
            "Siempre",
            "Casi siempre",
            "A veces",
            "Rara vez",
            "Nunca"
        ]
    },
    {
        pregunta: "Nivel de gobierno que te interesa",
        opciones: [
            "Presidencia",
            "Gobernador",
            "Diputado federal",
            "Alcalde / Presidente municipal"
        ]
    },
    {
        pregunta: "Postura económica",
        opciones: [
            "Fomento a emprendimiento privado",
            "Mayor gasto social",
            "Reducción de impuestos",
            "Regulación estatal estricta"
        ]
    },
    {
        pregunta: "Postura sobre seguridad",
        opciones: [
            "Mano dura",
            "Prevención y educación",
            "Reformas",
            "Más tecnología"
        ]
    },
    {
        pregunta: "Prioridad en política social",
        opciones: [
            "Salud pública",
            "Educación",
            "Igualdad de género",
            "Medio ambiente"
        ]
    },
    {
        pregunta: "Medio de información confiable",
        opciones: [
            "Televisión",
            "Redes sociales",
            "Periódicos digitales",
            "Amigos y familia"
        ]
    },
    {
        pregunta: "Importancia de la experiencia del candidato",
        opciones: [
            "Muy importante",
            "Algo importante",
            "Poco importante",
            "Nada importante"
        ]
    },
    {
        pregunta: "Tendencia ideológica",
        opciones: [
            "Conservadora",
            "Liberal",
            "Progresista",
            "Neutral / Independiente"
        ]
    }
];
function HomePage() {
    const [respuestas, setRespuestas] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(Array(preguntas.length).fill(0));
    const [resultado, setResultado] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const handleChange = (index, value)=>{
        const newRespuestas = [
            ...respuestas
        ];
        newRespuestas[index] = value;
        setRespuestas(newRespuestas);
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const res = await fetch("http://127.0.0.1:8000/predecir", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    datos: respuestas
                })
            });
            const data = await res.json();
            setResultado(`${data.candidato} - ${data.partido}`);
        } catch (err) {
            console.error(err);
            setResultado("Error al obtener la predicción.");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: "2rem",
            fontFamily: "sans-serif"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "Encuesta Política"
            }, void 0, false, {
                fileName: "[project]/src/app/votaciones/page.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                children: [
                    preguntas.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: "1rem"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    children: p.pregunta
                                }, void 0, false, {
                                    fileName: "[project]/src/app/votaciones/page.tsx",
                                    lineNumber: 59,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: respuestas[i],
                                    onChange: (e)=>handleChange(i, Number(e.target.value)),
                                    children: p.opciones.map((opt, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: idx,
                                            children: opt
                                        }, idx, false, {
                                            fileName: "[project]/src/app/votaciones/page.tsx",
                                            lineNumber: 62,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/votaciones/page.tsx",
                                    lineNumber: 60,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/src/app/votaciones/page.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        children: "Predecir candidato"
                    }, void 0, false, {
                        fileName: "[project]/src/app/votaciones/page.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/votaciones/page.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            resultado && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: [
                    "Predicción: ",
                    resultado
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/votaciones/page.tsx",
                lineNumber: 69,
                columnNumber: 21
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/votaciones/page.tsx",
        lineNumber: 54,
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