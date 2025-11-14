module.exports = {

"[project]/src/app/naive/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>Page
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
function Page() {
    // Estados del formulario
    const [formState, setFormState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        genero: '',
        edad: '',
        estadoCivil: '',
        cargo: '',
        educacion: '',
        ocupacion: '',
        entidadUsuario: '',
        frecuenciaVoto: '',
        estadoVotante: '',
        temaInteres: '',
        prioridadCandidato: '',
        fuenteInformacion: '',
        posturaEconomica: '',
        posturaSeguridad: '',
        prioridadPolitica: '',
        experienciaCandidato: '',
        tendenciaIdeologica: '',
        entidadCandidato: ''
    });
    const [currentStep, setCurrentStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [prediccion, setPrediccion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const opciones = {
        genero: [
            "Masculino",
            "Femenino",
            "Otro"
        ],
        edad: [
            "18-25",
            "26-35",
            "36-45",
            "46-60",
            "60+"
        ],
        estadoCivil: [
            "Soltero",
            "Casado",
            "Divorciado",
            "Viudo",
            "Prefiero no decirlo"
        ],
        cargo: [
            "Presidente",
            "Diputado",
            "Senador"
        ],
        educacion: [
            "Básica",
            "Universitaria",
            "Postgrado"
        ],
        ocupacion: [
            "Estudiante",
            "Empleado",
            "Independiente",
            "Desempleado",
            "Jubilado",
            "Ama de casa"
        ],
        entidadUsuario: [
            "CDMX",
            "Jalisco",
            "Nuevo León"
        ],
        frecuenciaVoto: [
            "Casi siempre participo",
            "Algunas veces participo",
            "Todavía no participo"
        ],
        estadoVotante: [
            "Activo",
            "Inactivo",
            "No registrado"
        ],
        temaInteres: [
            "Economía",
            "Educación",
            "Salud",
            "Medio ambiente",
            "Seguridad"
        ],
        prioridadCandidato: [
            "Honestidad",
            "Experiencia",
            "Propuestas",
            "Carisma"
        ],
        fuenteInformacion: [
            "TV",
            "Redes sociales",
            "Periódicos",
            "Amigos/familia"
        ],
        posturaEconomica: [
            "Izquierda",
            "Centro",
            "Derecha"
        ],
        posturaSeguridad: [
            "Más policía",
            "Más prevención",
            "Reforma legal"
        ],
        prioridadPolitica: [
            "Economía",
            "Educación",
            "Salud",
            "Medio ambiente",
            "Seguridad"
        ],
        experienciaCandidato: [
            "Novato",
            "Experto",
            "Veterano"
        ],
        tendenciaIdeologica: [
            "Izquierda",
            "Centro",
            "Derecha"
        ],
        entidadCandidato: [
            "CDMX",
            "Jalisco",
            "Nuevo León"
        ]
    };
    const fields = Object.keys(formState);
    const handleNext = ()=>{
        if (formState[fields[currentStep]]) {
            setCurrentStep(currentStep + 1);
        }
    };
    const handlePrev = ()=>{
        setCurrentStep(currentStep - 1);
    };
    const handlePredict = async ()=>{
        setLoading(true);
        setError(null);
        setPrediccion(null);
        try {
            // Convertir todas las selecciones a números
            const datos = fields.map((key)=>opciones[key][formState[key] ? opciones[key].indexOf(formState[key]) : 0]);
            const res = await fetch("https://votacion-api-7592.onrender.com/predecir", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    datos
                })
            });
            if (!res.ok) throw new Error(`Error al obtener predicción: ${res.statusText}`);
            const data = await res.json();
            setPrediccion(data.prediccion);
        } catch (err) {
            setError(err.message);
        } finally{
            setLoading(false);
        }
    };
    const currentField = fields[currentStep];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "page-container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "Formulario de Votante"
            }, void 0, false, {
                fileName: "[project]/src/app/naive/page.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, this),
            currentStep < fields.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "step-container",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "dropdown-label",
                        children: currentField.replace(/([A-Z])/g, ' $1')
                    }, void 0, false, {
                        fileName: "[project]/src/app/naive/page.tsx",
                        lineNumber: 100,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: formState[currentField],
                        onChange: (e)=>setFormState({
                                ...formState,
                                [currentField]: e.target.value
                            }),
                        className: "dropdown-select",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Selecciona"
                            }, void 0, false, {
                                fileName: "[project]/src/app/naive/page.tsx",
                                lineNumber: 106,
                                columnNumber: 13
                            }, this),
                            opciones[currentField].map((opt, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: opt,
                                    children: opt
                                }, idx, false, {
                                    fileName: "[project]/src/app/naive/page.tsx",
                                    lineNumber: 108,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/naive/page.tsx",
                        lineNumber: 101,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "step-buttons",
                        children: [
                            currentStep > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handlePrev,
                                className: "prev-button",
                                children: "Anterior"
                            }, void 0, false, {
                                fileName: "[project]/src/app/naive/page.tsx",
                                lineNumber: 113,
                                columnNumber: 33
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleNext,
                                disabled: !formState[currentField],
                                className: "next-button",
                                children: currentStep === fields.length - 1 ? 'Finalizar' : 'Siguiente'
                            }, void 0, false, {
                                fileName: "[project]/src/app/naive/page.tsx",
                                lineNumber: 114,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/naive/page.tsx",
                        lineNumber: 112,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/naive/page.tsx",
                lineNumber: 99,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handlePredict,
                disabled: loading,
                className: "predict-button",
                children: loading ? 'Prediciendo...' : 'Predecir partido'
            }, void 0, false, {
                fileName: "[project]/src/app/naive/page.tsx",
                lineNumber: 120,
                columnNumber: 9
            }, this),
            prediccion && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "prediction-text",
                children: [
                    "Predicción: ",
                    prediccion
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/naive/page.tsx",
                lineNumber: 125,
                columnNumber: 22
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "error-text",
                children: [
                    "Error: ",
                    error
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/naive/page.tsx",
                lineNumber: 126,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/naive/page.tsx",
        lineNumber: 95,
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

//# sourceMappingURL=_3aa153c3._.js.map