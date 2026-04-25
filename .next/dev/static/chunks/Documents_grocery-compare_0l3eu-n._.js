(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/grocery-compare/src/components/GroceryApp.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GroceryApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/grocery-compare/node_modules/@swc/helpers/esm/_async_to_generator.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/grocery-compare/node_modules/@swc/helpers/esm/_sliced_to_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/grocery-compare/node_modules/@swc/helpers/esm/_to_consumable_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/grocery-compare/node_modules/@swc/helpers/esm/_type_of.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__ = __turbopack_context__.i("[project]/Documents/grocery-compare/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript) <export __generator as _>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/grocery-compare/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/grocery-compare/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
;
;
;
;
var _s = __turbopack_context__.k.signature();
"use client";
;
var platformColors = {
    Zepto: {
        bg: "#8b5cf6",
        light: "rgba(139, 92, 246, 0.15)",
        text: "#c4b5fd",
        logo: "🟣 Zepto"
    },
    BigBasket: {
        bg: "#22c55e",
        light: "rgba(34, 197, 94, 0.15)",
        text: "#86efac",
        logo: "🟢 BigBasket"
    },
    Blinkit: {
        bg: "#eab308",
        light: "rgba(234, 179, 8, 0.15)",
        text: "#fde047",
        logo: "🟡 Blinkit"
    }
};
function getPriceStats(prices) {
    var min = Infinity, max = -Infinity, cheapestPlatform = null;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = Object.entries(prices)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var _step_value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(_step.value, 2), p = _step_value[0], v = _step_value[1];
            var val = v;
            if (val.available) {
                if (val.price < min) {
                    min = val.price;
                    cheapestPlatform = p;
                }
                if (val.price > max) {
                    max = val.price;
                }
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    return {
        cheapestPlatform: cheapestPlatform,
        min: min,
        max: max,
        savings: max !== -Infinity && max > min ? max - min : 0
    };
}
function GroceryApp(param) {
    var _this = this;
    var products = param.products;
    _s();
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(""), 2), search = _useState[0], setSearch = _useState[1];
    var _useState1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All"), 2), category = _useState1[0], setCategory = _useState1[1];
    var _useState2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(""), 2), budget = _useState2[0], setBudget = _useState2[1];
    var _useState3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), budgetResult = _useState3[0], setBudgetResult = _useState3[1];
    var _useState4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), isAILoading = _useState4[0], setIsAILoading = _useState4[1];
    var categories = [
        "All"
    ].concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(Array.from(new Set(products.map(function(p) {
        return p.category;
    })))));
    var filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "GroceryApp.useMemo[filtered]": function() {
            var lowerSearch = search.toLowerCase();
            var maxPrice = Infinity;
            var underMatch = lowerSearch.match(/under (\d+)/);
            if (underMatch) {
                maxPrice = parseInt(underMatch[1]);
                lowerSearch = lowerSearch.replace(underMatch[0], "").trim();
            }
            return products.filter({
                "GroceryApp.useMemo[filtered]": function(p) {
                    var matchSearch = p.name.toLowerCase().includes(lowerSearch) || p.category.toLowerCase().includes(lowerSearch);
                    var matchCat = category === "All" || p.category === category;
                    var meetsPrice = true;
                    if (maxPrice !== Infinity) {
                        var stats = getPriceStats(p.prices);
                        if (stats.cheapestPlatform && p.prices[stats.cheapestPlatform].price > maxPrice) {
                            meetsPrice = false;
                        }
                    }
                    return matchSearch && matchCat && meetsPrice;
                }
            }["GroceryApp.useMemo[filtered]"]);
        }
    }["GroceryApp.useMemo[filtered]"], [
        search,
        category,
        products
    ]);
    var handleSmartSearch = function handleSmartSearch() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(function() {
            var response, data, e;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                switch(_state.label){
                    case 0:
                        if (!search.trim()) return [
                            2
                        ];
                        setIsAILoading(true);
                        _state.label = 1;
                    case 1:
                        _state.trys.push([
                            1,
                            4,
                            5,
                            6
                        ]);
                        return [
                            4,
                            fetch("/api/ai/search", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    query: search,
                                    products: products
                                })
                            })
                        ];
                    case 2:
                        response = _state.sent();
                        return [
                            4,
                            response.json()
                        ];
                    case 3:
                        data = _state.sent();
                        if (data.category) {
                            setCategory(data.category);
                        }
                        if (data.cleanQuery) {
                            setSearch(data.cleanQuery);
                        }
                        return [
                            3,
                            6
                        ];
                    case 4:
                        e = _state.sent();
                        console.error(e);
                        return [
                            3,
                            6
                        ];
                    case 5:
                        setIsAILoading(false);
                        return [
                            7
                        ];
                    case 6:
                        return [
                            2
                        ];
                }
            });
        })();
    };
    var handleBudgetAssistant = function handleBudgetAssistant() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(function() {
            var b, response, data, e;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                switch(_state.label){
                    case 0:
                        b = parseInt(budget);
                        if (isNaN(b) || b <= 0) return [
                            2,
                            setBudgetResult(null)
                        ];
                        setIsAILoading(true);
                        _state.label = 1;
                    case 1:
                        _state.trys.push([
                            1,
                            4,
                            5,
                            6
                        ]);
                        return [
                            4,
                            fetch("/api/ai/budget", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    budget: b,
                                    products: products
                                })
                            })
                        ];
                    case 2:
                        response = _state.sent();
                        return [
                            4,
                            response.json()
                        ];
                    case 3:
                        data = _state.sent();
                        setBudgetResult(data);
                        return [
                            3,
                            6
                        ];
                    case 4:
                        e = _state.sent();
                        console.error(e);
                        alert("Failed to get AI budget assistant result.");
                        return [
                            3,
                            6
                        ];
                    case 5:
                        setIsAILoading(false);
                        return [
                            7
                        ];
                    case 6:
                        return [
                            2
                        ];
                }
            });
        })();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: '100vh',
            paddingBottom: '80px'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass-panel hover-lift",
                style: {
                    maxWidth: 1100,
                    margin: '32px auto',
                    padding: '40px',
                    position: 'relative',
                    overflow: 'hidden'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            top: '-50%',
                            left: '-20%',
                            width: '100%',
                            height: '200%',
                            background: 'radial-gradient(circle, rgba(108,58,232,0.1) 0%, transparent 70%)',
                            pointerEvents: 'none'
                        }
                    }, void 0, false, {
                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px',
                            marginBottom: '24px',
                            position: 'relative',
                            zIndex: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: '56px',
                                    filter: 'drop-shadow(0 0 10px rgba(0,212,170,0.5))'
                                },
                                className: "pulse-anim",
                                children: "🛒"
                            }, void 0, false, {
                                fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                lineNumber: 109,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "gradient-text",
                                        style: {
                                            fontSize: '48px',
                                            fontWeight: 800,
                                            margin: 0,
                                            paddingBottom: '8px',
                                            letterSpacing: '-1px'
                                        },
                                        children: "GroceryCompare AI"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                        lineNumber: 111,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            color: '#94a3b8',
                                            fontSize: '18px',
                                            margin: 0,
                                            fontWeight: 500
                                        },
                                        children: "India's Smartest Grocery Price Comparison"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                        lineNumber: 112,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                lineNumber: 110,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: '20px',
                            flexWrap: 'wrap',
                            marginTop: '32px',
                            position: 'relative',
                            zIndex: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    position: 'relative',
                                    minWidth: '300px'
                                },
                                className: "glow-effect",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            position: 'absolute',
                                            left: '20px',
                                            top: '18px',
                                            fontSize: '22px'
                                        },
                                        children: "🔍"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                        lineNumber: 119,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: search,
                                        onChange: function onChange(e) {
                                            return setSearch(e.target.value);
                                        },
                                        onKeyDown: function onKeyDown(e) {
                                            return e.key === 'Enter' && handleSmartSearch();
                                        },
                                        placeholder: "Try 'healthy snacks under 50' or 'milk'",
                                        style: {
                                            width: '100%',
                                            padding: '20px 140px 20px 56px',
                                            borderRadius: '20px',
                                            background: 'rgba(15, 23, 42, 0.6)',
                                            border: '1px solid var(--border-color)',
                                            color: 'white',
                                            fontSize: '18px',
                                            outline: 'none',
                                            transition: 'all 0.3s ease',
                                            fontFamily: 'inherit',
                                            backdropFilter: 'blur(10px)'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                        lineNumber: 120,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleSmartSearch,
                                        disabled: isAILoading,
                                        className: "hover-lift",
                                        style: {
                                            position: 'absolute',
                                            right: '10px',
                                            top: '10px',
                                            bottom: '10px',
                                            background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                                            color: 'white',
                                            border: 'none',
                                            padding: '0 24px',
                                            borderRadius: '14px',
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                            fontFamily: 'inherit',
                                            fontSize: '16px',
                                            textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                                        },
                                        children: "Ask AI ✨"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                        lineNumber: 132,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                lineNumber: 118,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: category,
                                onChange: function onChange(e) {
                                    return setCategory(e.target.value);
                                },
                                style: {
                                    padding: '20px 32px',
                                    borderRadius: '20px',
                                    background: 'rgba(15, 23, 42, 0.6)',
                                    border: '1px solid var(--border-color)',
                                    color: 'white',
                                    fontSize: '18px',
                                    outline: 'none',
                                    cursor: 'pointer',
                                    fontFamily: 'inherit',
                                    backdropFilter: 'blur(10px)',
                                    fontWeight: 500
                                },
                                children: categories.map(function(c) {
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: c,
                                        children: c
                                    }, c, false, {
                                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                        lineNumber: 157,
                                        columnNumber: 36
                                    }, _this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                lineNumber: 147,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: 1100,
                    margin: '0 auto',
                    display: 'flex',
                    gap: '32px',
                    flexWrap: 'wrap',
                    padding: '0 20px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: '1 1 600px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '24px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        style: {
                                            fontSize: '24px',
                                            fontWeight: 700
                                        },
                                        children: "Top Products"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                        lineNumber: 167,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: '#00D4AA',
                                            background: 'rgba(0, 212, 170, 0.1)',
                                            padding: '6px 16px',
                                            borderRadius: '20px',
                                            fontSize: '14px',
                                            fontWeight: 600
                                        },
                                        children: [
                                            filtered.length,
                                            " items"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                        lineNumber: 168,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                lineNumber: 166,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                                    gap: '24px'
                                },
                                children: filtered.map(function(product) {
                                    var stats = getPriceStats(product.prices);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "glass-panel hover-lift",
                                        style: {
                                            overflow: 'hidden',
                                            display: 'flex',
                                            flexDirection: 'column'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    padding: '24px',
                                                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    gap: '20px',
                                                    position: 'relative'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: '50px',
                                                            background: 'rgba(255,255,255,0.05)',
                                                            borderRadius: '20px',
                                                            padding: '12px'
                                                        },
                                                        children: product.image
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                        lineNumber: 177,
                                                        columnNumber: 21
                                                    }, _this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            flex: 1
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                style: {
                                                                    fontSize: '20px',
                                                                    fontWeight: 700,
                                                                    margin: '0 0 8px 0',
                                                                    lineHeight: 1.2
                                                                },
                                                                children: product.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                                lineNumber: 181,
                                                                columnNumber: 23
                                                            }, _this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    gap: '8px',
                                                                    flexWrap: 'wrap'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            fontSize: '12px',
                                                                            background: 'rgba(108,58,232,0.2)',
                                                                            color: '#c4b5fd',
                                                                            padding: '4px 12px',
                                                                            borderRadius: '12px',
                                                                            fontWeight: 600
                                                                        },
                                                                        children: product.category
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                                        lineNumber: 183,
                                                                        columnNumber: 25
                                                                    }, _this),
                                                                    stats.savings > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            fontSize: '12px',
                                                                            background: 'rgba(34,197,94,0.2)',
                                                                            color: '#86efac',
                                                                            padding: '4px 12px',
                                                                            borderRadius: '12px',
                                                                            fontWeight: 600
                                                                        },
                                                                        children: [
                                                                            "Save ₹",
                                                                            stats.savings
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                                        lineNumber: 185,
                                                                        columnNumber: 27
                                                                    }, _this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                                lineNumber: 182,
                                                                columnNumber: 23
                                                            }, _this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                        lineNumber: 180,
                                                        columnNumber: 21
                                                    }, _this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                lineNumber: 176,
                                                columnNumber: 19
                                            }, _this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    padding: '20px',
                                                    flex: 1,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '12px'
                                                },
                                                children: Object.entries(product.prices).map(function(param) {
                                                    var _param = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(param, 2), platform = _param[0], data = _param[1];
                                                    var val = data;
                                                    var isCheap = platform === stats.cheapestPlatform;
                                                    var isExpensive = val.available && val.price === stats.max && stats.max > stats.min;
                                                    var c = platformColors[platform];
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            padding: '12px 16px',
                                                            borderRadius: '16px',
                                                            background: isCheap ? c.light : 'rgba(10, 14, 26, 0.4)',
                                                            border: "1px solid ".concat(isCheap ? c.bg : isExpensive ? 'rgba(239,68,68,0.3)' : 'transparent'),
                                                            transition: 'all 0.2s ease'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '10px'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            fontSize: '16px',
                                                                            fontWeight: 600
                                                                        },
                                                                        children: c.logo
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                                        lineNumber: 209,
                                                                        columnNumber: 29
                                                                    }, _this),
                                                                    isCheap && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            fontSize: '10px',
                                                                            background: 'var(--success-color)',
                                                                            color: 'white',
                                                                            padding: '2px 8px',
                                                                            borderRadius: '8px',
                                                                            fontWeight: 800,
                                                                            letterSpacing: '0.5px'
                                                                        },
                                                                        children: "BEST"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                                        lineNumber: 210,
                                                                        columnNumber: 41
                                                                    }, _this),
                                                                    isExpensive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            fontSize: '10px',
                                                                            background: 'rgba(239,68,68,0.8)',
                                                                            color: 'white',
                                                                            padding: '2px 8px',
                                                                            borderRadius: '8px',
                                                                            fontWeight: 800
                                                                        },
                                                                        children: "COSTLY"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                                        lineNumber: 211,
                                                                        columnNumber: 45
                                                                    }, _this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                                lineNumber: 208,
                                                                columnNumber: 27
                                                            }, _this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '14px'
                                                                },
                                                                children: val.available ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            style: {
                                                                                fontSize: '18px',
                                                                                fontWeight: 800,
                                                                                color: isCheap ? c.text : isExpensive ? '#fca5a5' : 'white'
                                                                            },
                                                                            children: [
                                                                                "₹",
                                                                                val.price
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                                            lineNumber: 217,
                                                                            columnNumber: 33
                                                                        }, _this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                            href: val.url,
                                                                            target: "_blank",
                                                                            rel: "noreferrer",
                                                                            className: "hover-lift",
                                                                            style: {
                                                                                fontSize: '13px',
                                                                                background: isCheap ? c.bg : '#334155',
                                                                                color: 'white',
                                                                                padding: '8px 16px',
                                                                                borderRadius: '10px',
                                                                                textDecoration: 'none',
                                                                                fontWeight: 700,
                                                                                display: 'inline-block'
                                                                            },
                                                                            children: "Buy"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                                            lineNumber: 218,
                                                                            columnNumber: 33
                                                                        }, _this)
                                                                    ]
                                                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        fontSize: '14px',
                                                                        color: '#64748b',
                                                                        fontWeight: 500
                                                                    },
                                                                    children: "Unavailable"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                                    lineNumber: 224,
                                                                    columnNumber: 31
                                                                }, _this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                                lineNumber: 214,
                                                                columnNumber: 27
                                                            }, _this)
                                                        ]
                                                    }, platform, true, {
                                                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                        lineNumber: 201,
                                                        columnNumber: 25
                                                    }, _this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                lineNumber: 193,
                                                columnNumber: 19
                                            }, _this)
                                        ]
                                    }, product.id, true, {
                                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                        lineNumber: 175,
                                        columnNumber: 17
                                    }, _this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                lineNumber: 171,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                        lineNumber: 165,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: '1 1 340px',
                            maxWidth: '420px'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "glass-panel",
                            style: {
                                padding: '32px',
                                position: 'sticky',
                                top: '32px',
                                borderTop: '2px solid rgba(108, 58, 232, 0.5)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '16px',
                                        marginBottom: '24px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                                                borderRadius: '16px',
                                                padding: '12px',
                                                fontSize: '28px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: isAILoading ? 'pulse-anim' : '',
                                                children: "🤖"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                lineNumber: 242,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                            lineNumber: 241,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    style: {
                                                        fontSize: '24px',
                                                        fontWeight: 800,
                                                        margin: 0,
                                                        color: 'white'
                                                    },
                                                    children: "Budget Assistant"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                    lineNumber: 245,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: 'var(--secondary-color)',
                                                        fontSize: '13px',
                                                        fontWeight: 600
                                                    },
                                                    children: "Powered by AI"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                    lineNumber: 246,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                            lineNumber: 244,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                    lineNumber: 240,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        color: '#94a3b8',
                                        fontSize: '15px',
                                        marginBottom: '24px',
                                        lineHeight: 1.6
                                    },
                                    children: "Enter your maximum budget. Our AI will curate the optimal basket using the lowest prices available across all platforms."
                                }, void 0, false, {
                                    fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                    lineNumber: 249,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        gap: '12px',
                                        marginBottom: '24px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: 'relative',
                                                flex: 1
                                            },
                                            className: "glow-effect",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        position: 'absolute',
                                                        margin: '16px 20px',
                                                        color: '#94a3b8',
                                                        fontSize: '18px',
                                                        fontWeight: 700
                                                    },
                                                    children: "₹"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                    lineNumber: 255,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    value: budget,
                                                    onChange: function onChange(e) {
                                                        return setBudget(e.target.value);
                                                    },
                                                    placeholder: "e.g. 500",
                                                    style: {
                                                        width: '100%',
                                                        padding: '16px 16px 16px 44px',
                                                        borderRadius: '16px',
                                                        background: 'rgba(10, 14, 26, 0.6)',
                                                        border: '1px solid var(--border-color)',
                                                        color: 'white',
                                                        fontSize: '18px',
                                                        outline: 'none',
                                                        fontFamily: 'inherit',
                                                        fontWeight: 600
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                    lineNumber: 256,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                            lineNumber: 254,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleBudgetAssistant,
                                            disabled: isAILoading,
                                            className: "hover-lift",
                                            style: {
                                                background: 'var(--primary-color)',
                                                color: 'white',
                                                border: 'none',
                                                padding: '0 24px',
                                                borderRadius: '16px',
                                                fontWeight: 700,
                                                cursor: 'pointer',
                                                fontFamily: 'inherit',
                                                fontSize: '16px',
                                                boxShadow: '0 4px 14px 0 rgba(108, 58, 232, 0.39)'
                                            },
                                            children: isAILoading ? '...' : 'Plan'
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                            lineNumber: 268,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                    lineNumber: 253,
                                    columnNumber: 13
                                }, this),
                                budgetResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: 'rgba(10, 14, 26, 0.4)',
                                        borderRadius: '20px',
                                        padding: '24px',
                                        marginTop: '16px',
                                        border: '1px solid rgba(255,255,255,0.08)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                marginBottom: '20px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    style: {
                                                        margin: 0,
                                                        fontSize: '16px',
                                                        color: '#f8fafc',
                                                        fontWeight: 700
                                                    },
                                                    children: "Optimized Basket"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                    lineNumber: 285,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        background: 'rgba(34,197,94,0.15)',
                                                        color: '#4ade80',
                                                        padding: '4px 10px',
                                                        borderRadius: '12px',
                                                        fontSize: '12px',
                                                        fontWeight: 700
                                                    },
                                                    children: [
                                                        budgetResult.basket.length,
                                                        " items"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                    lineNumber: 286,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                            lineNumber: 284,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                marginBottom: '24px',
                                                background: 'rgba(255,255,255,0.05)',
                                                borderRadius: '12px',
                                                padding: '16px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        fontSize: '12px',
                                                        color: '#94a3b8',
                                                        margin: '0 0 12px 0',
                                                        fontWeight: 600,
                                                        textTransform: 'uppercase'
                                                    },
                                                    children: "Budget Utilization"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                    lineNumber: 291,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        height: '12px',
                                                        background: 'rgba(255,255,255,0.1)',
                                                        borderRadius: '6px',
                                                        display: 'flex',
                                                        overflow: 'hidden',
                                                        marginBottom: '8px'
                                                    },
                                                    children: budgetResult.basket.map(function(b, i) {
                                                        var percentage = b.price / budgetResult.total * 100;
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            title: "".concat(b.item.name, ": ₹").concat(b.price),
                                                            style: {
                                                                width: "".concat(percentage, "%"),
                                                                background: platformColors[b.platform].bg,
                                                                borderRight: '1px solid rgba(0,0,0,0.2)'
                                                            }
                                                        }, i, false, {
                                                            fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                            lineNumber: 296,
                                                            columnNumber: 25
                                                        }, _this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                    lineNumber: 292,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        fontSize: '12px',
                                                        color: '#94a3b8',
                                                        fontWeight: 500
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "0"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                            lineNumber: 305,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                "Total: ₹",
                                                                budgetResult.total
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                            lineNumber: 306,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                    lineNumber: 304,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                            lineNumber: 290,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '16px'
                                            },
                                            children: budgetResult.basket.map(function(b, i) {
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        paddingBottom: '12px',
                                                        borderBottom: i !== budgetResult.basket.length - 1 ? '1px dashed rgba(255,255,255,0.1)' : 'none'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '12px'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        background: 'rgba(255,255,255,0.05)',
                                                                        padding: '8px',
                                                                        borderRadius: '10px',
                                                                        fontSize: '18px'
                                                                    },
                                                                    children: b.item.image
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                                    lineNumber: 314,
                                                                    columnNumber: 25
                                                                }, _this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: {
                                                                                fontSize: '15px',
                                                                                fontWeight: 600,
                                                                                whiteSpace: 'nowrap',
                                                                                overflow: 'hidden',
                                                                                textOverflow: 'ellipsis',
                                                                                maxWidth: '130px'
                                                                            },
                                                                            children: b.item.name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                                            lineNumber: 316,
                                                                            columnNumber: 27
                                                                        }, _this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: {
                                                                                fontSize: '12px',
                                                                                color: platformColors[b.platform].text,
                                                                                fontWeight: 600
                                                                            },
                                                                            children: [
                                                                                "from ",
                                                                                b.platform
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                                            lineNumber: 317,
                                                                            columnNumber: 27
                                                                        }, _this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                                    lineNumber: 315,
                                                                    columnNumber: 25
                                                                }, _this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                            lineNumber: 313,
                                                            columnNumber: 23
                                                        }, _this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: '16px',
                                                                fontWeight: 800,
                                                                color: 'white'
                                                            },
                                                            children: [
                                                                "₹",
                                                                b.price
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                            lineNumber: 320,
                                                            columnNumber: 23
                                                        }, _this)
                                                    ]
                                                }, i, true, {
                                                    fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                    lineNumber: 312,
                                                    columnNumber: 21
                                                }, _this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                            lineNumber: 310,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                marginTop: '24px',
                                                paddingTop: '20px',
                                                borderTop: '2px dashed rgba(255,255,255,0.1)',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: '#94a3b8',
                                                        fontSize: '16px',
                                                        fontWeight: 600
                                                    },
                                                    children: "Total Cost"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                    lineNumber: 326,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        textAlign: 'right'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontWeight: 800,
                                                                color: 'var(--success-color)',
                                                                fontSize: '28px',
                                                                lineHeight: 1
                                                            },
                                                            children: [
                                                                "₹",
                                                                budgetResult.total
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                            lineNumber: 328,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: '12px',
                                                                color: '#94a3b8',
                                                                marginTop: '4px'
                                                            },
                                                            children: [
                                                                "Under ₹",
                                                                budget,
                                                                " budget"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                            lineNumber: 329,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                    lineNumber: 327,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                            lineNumber: 325,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                    lineNumber: 283,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                            lineNumber: 239,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                        lineNumber: 238,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                lineNumber: 162,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
        lineNumber: 103,
        columnNumber: 5
    }, this);
}
_s(GroceryApp, "lVodVqord0IUYFFJuwJVOtsqDJE=");
_c = GroceryApp;
var _c;
__turbopack_context__.k.register(_c, "GroceryApp");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Documents/grocery-compare/node_modules/@swc/helpers/esm/_async_to_generator.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_async_to_generator
]);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) resolve(value);
    else Promise.resolve(value).then(_next, _throw);
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
;
}),
"[project]/Documents/grocery-compare/node_modules/@swc/helpers/esm/_array_with_holes.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_array_with_holes
]);
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
;
}),
"[project]/Documents/grocery-compare/node_modules/@swc/helpers/esm/_iterable_to_array_limit.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_iterable_to_array_limit
]);
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
;
}),
"[project]/Documents/grocery-compare/node_modules/@swc/helpers/esm/_non_iterable_rest.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_non_iterable_rest
]);
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
;
}),
"[project]/Documents/grocery-compare/node_modules/@swc/helpers/esm/_array_like_to_array.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_array_like_to_array
]);
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
;
}),
"[project]/Documents/grocery-compare/node_modules/@swc/helpers/esm/_unsupported_iterable_to_array.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_unsupported_iterable_to_array
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_array_like_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/grocery-compare/node_modules/@swc/helpers/esm/_array_like_to_array.js [app-client] (ecmascript)");
;
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_array_like_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_array_like_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(o, minLen);
}
;
}),
"[project]/Documents/grocery-compare/node_modules/@swc/helpers/esm/_sliced_to_array.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_sliced_to_array
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_array_with_holes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/grocery-compare/node_modules/@swc/helpers/esm/_array_with_holes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_iterable_to_array_limit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/grocery-compare/node_modules/@swc/helpers/esm/_iterable_to_array_limit.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_non_iterable_rest$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/grocery-compare/node_modules/@swc/helpers/esm/_non_iterable_rest.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_unsupported_iterable_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/grocery-compare/node_modules/@swc/helpers/esm/_unsupported_iterable_to_array.js [app-client] (ecmascript)");
;
;
;
;
function _sliced_to_array(arr, i) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_array_with_holes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(arr) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_iterable_to_array_limit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(arr, i) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_unsupported_iterable_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(arr, i) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_non_iterable_rest$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])();
}
;
}),
"[project]/Documents/grocery-compare/node_modules/@swc/helpers/esm/_array_without_holes.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_array_without_holes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_array_like_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/grocery-compare/node_modules/@swc/helpers/esm/_array_like_to_array.js [app-client] (ecmascript)");
;
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_array_like_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(arr);
}
;
}),
"[project]/Documents/grocery-compare/node_modules/@swc/helpers/esm/_iterable_to_array.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_iterable_to_array
]);
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) {
        return Array.from(iter);
    }
}
;
}),
"[project]/Documents/grocery-compare/node_modules/@swc/helpers/esm/_non_iterable_spread.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_non_iterable_spread
]);
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
;
}),
"[project]/Documents/grocery-compare/node_modules/@swc/helpers/esm/_to_consumable_array.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_to_consumable_array
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_array_without_holes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/grocery-compare/node_modules/@swc/helpers/esm/_array_without_holes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_iterable_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/grocery-compare/node_modules/@swc/helpers/esm/_iterable_to_array.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_non_iterable_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/grocery-compare/node_modules/@swc/helpers/esm/_non_iterable_spread.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_unsupported_iterable_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/grocery-compare/node_modules/@swc/helpers/esm/_unsupported_iterable_to_array.js [app-client] (ecmascript)");
;
;
;
;
function _to_consumable_array(arr) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_array_without_holes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(arr) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_iterable_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(arr) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_unsupported_iterable_to_array$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(arr) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_non_iterable_spread$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])();
}
;
}),
"[project]/Documents/grocery-compare/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript) <export __generator as _>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["__generator"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/grocery-compare/node_modules/tslib/tslib.es6.mjs [app-client] (ecmascript)");
}),
"[project]/Documents/grocery-compare/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/grocery-compare/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
var _type_of = __turbopack_context__.r("[project]/Documents/grocery-compare/node_modules/@swc/helpers/cjs/_type_of.cjs [app-client] (ecmascript)");
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === (typeof type === "undefined" ? "undefined" : _type_of._(type))) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === (typeof type === "undefined" ? "undefined" : _type_of._(type)) && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === (typeof node === "undefined" ? "undefined" : _type_of._(node)) && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === (typeof object === "undefined" ? "undefined" : _type_of._(object)) && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/Documents/grocery-compare/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function react_stack_bottom_frame(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/Documents/grocery-compare/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Documents/grocery-compare/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/Documents/grocery-compare/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=Documents_grocery-compare_0l3eu-n._.js.map