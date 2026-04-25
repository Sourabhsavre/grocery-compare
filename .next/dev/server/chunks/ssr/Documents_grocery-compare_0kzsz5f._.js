module.exports = [
"[project]/Documents/grocery-compare/src/components/GroceryApp.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GroceryApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/grocery-compare/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/grocery-compare/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const platformColors = {
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
    let min = Infinity, max = -Infinity, cheapestPlatform = null;
    for (const [p, v] of Object.entries(prices)){
        const val = v;
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
    return {
        cheapestPlatform,
        min,
        max,
        savings: max !== -Infinity && max > min ? max - min : 0
    };
}
function GroceryApp({ products }) {
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [category, setCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("All");
    const [budget, setBudget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [budgetResult, setBudgetResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isAILoading, setIsAILoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const categories = [
        "All",
        ...Array.from(new Set(products.map((p)=>p.category)))
    ];
    const filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        let lowerSearch = search.toLowerCase();
        let maxPrice = Infinity;
        const underMatch = lowerSearch.match(/under (\d+)/);
        if (underMatch) {
            maxPrice = parseInt(underMatch[1]);
            lowerSearch = lowerSearch.replace(underMatch[0], "").trim();
        }
        return products.filter((p)=>{
            const matchSearch = p.name.toLowerCase().includes(lowerSearch) || p.category.toLowerCase().includes(lowerSearch);
            const matchCat = category === "All" || p.category === category;
            let meetsPrice = true;
            if (maxPrice !== Infinity) {
                const stats = getPriceStats(p.prices);
                if (stats.cheapestPlatform && p.prices[stats.cheapestPlatform].price > maxPrice) {
                    meetsPrice = false;
                }
            }
            return matchSearch && matchCat && meetsPrice;
        });
    }, [
        search,
        category,
        products
    ]);
    const handleSmartSearch = async ()=>{
        if (!search.trim()) return;
        setIsAILoading(true);
        try {
            const response = await fetch("/api/ai/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    query: search,
                    products
                })
            });
            const data = await response.json();
            if (data.category) {
                setCategory(data.category);
            }
            if (data.cleanQuery) {
                setSearch(data.cleanQuery);
            }
        } catch (e) {
            console.error(e);
        } finally{
            setIsAILoading(false);
        }
    };
    const handleBudgetAssistant = async ()=>{
        const b = parseInt(budget);
        if (isNaN(b) || b <= 0) return setBudgetResult(null);
        setIsAILoading(true);
        try {
            const response = await fetch("/api/ai/budget", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    budget: b,
                    products
                })
            });
            const data = await response.json();
            setBudgetResult(data);
        } catch (e) {
            console.error(e);
            alert("Failed to get AI budget assistant result.");
        } finally{
            setIsAILoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: '100vh',
            paddingBottom: '80px'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass-panel hover-lift",
                style: {
                    maxWidth: 1100,
                    margin: '32px auto',
                    padding: '40px',
                    position: 'relative',
                    overflow: 'hidden'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px',
                            marginBottom: '24px',
                            position: 'relative',
                            zIndex: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: '20px',
                            flexWrap: 'wrap',
                            marginTop: '32px',
                            position: 'relative',
                            zIndex: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    position: 'relative',
                                    minWidth: '300px'
                                },
                                className: "glow-effect",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: search,
                                        onChange: (e)=>setSearch(e.target.value),
                                        onKeyDown: (e)=>e.key === 'Enter' && handleSmartSearch(),
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: category,
                                onChange: (e)=>setCategory(e.target.value),
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
                                children: categories.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: c,
                                        children: c
                                    }, c, false, {
                                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                        lineNumber: 157,
                                        columnNumber: 36
                                    }, this))
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: 1100,
                    margin: '0 auto',
                    display: 'flex',
                    gap: '32px',
                    flexWrap: 'wrap',
                    padding: '0 20px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: '1 1 600px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '24px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                                    gap: '24px'
                                },
                                children: filtered.map((product)=>{
                                    const stats = getPriceStats(product.prices);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "glass-panel hover-lift",
                                        style: {
                                            overflow: 'hidden',
                                            display: 'flex',
                                            flexDirection: 'column'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    padding: '24px',
                                                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    gap: '20px',
                                                    position: 'relative'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            flex: 1
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
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
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    gap: '8px',
                                                                    flexWrap: 'wrap'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                                                    }, this),
                                                                    stats.savings > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                                lineNumber: 182,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                        lineNumber: 180,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                lineNumber: 176,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    padding: '20px',
                                                    flex: 1,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '12px'
                                                },
                                                children: Object.entries(product.prices).map(([platform, data])=>{
                                                    const val = data;
                                                    const isCheap = platform === stats.cheapestPlatform;
                                                    const isExpensive = val.available && val.price === stats.max && stats.max > stats.min;
                                                    const c = platformColors[platform];
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            padding: '12px 16px',
                                                            borderRadius: '16px',
                                                            background: isCheap ? c.light : 'rgba(10, 14, 26, 0.4)',
                                                            border: `1px solid ${isCheap ? c.bg : isExpensive ? 'rgba(239,68,68,0.3)' : 'transparent'}`,
                                                            transition: 'all 0.2s ease'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '10px'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            fontSize: '16px',
                                                                            fontWeight: 600
                                                                        },
                                                                        children: c.logo
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                                        lineNumber: 209,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    isCheap && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                                                    }, this),
                                                                    isExpensive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                                lineNumber: 208,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '14px'
                                                                },
                                                                children: val.available ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
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
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                                lineNumber: 214,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, platform, true, {
                                                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                        lineNumber: 201,
                                                        columnNumber: 25
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                lineNumber: 193,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, product.id, true, {
                                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                        lineNumber: 175,
                                        columnNumber: 17
                                    }, this);
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: '1 1 340px',
                            maxWidth: '420px'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "glass-panel",
                            style: {
                                padding: '32px',
                                position: 'sticky',
                                top: '32px',
                                borderTop: '2px solid rgba(108, 58, 232, 0.5)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '16px',
                                        marginBottom: '24px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                                                borderRadius: '16px',
                                                padding: '12px',
                                                fontSize: '28px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
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
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        gap: '12px',
                                        marginBottom: '24px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: 'relative',
                                                flex: 1
                                            },
                                            className: "glow-effect",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    value: budget,
                                                    onChange: (e)=>setBudget(e.target.value),
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                budgetResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: 'rgba(10, 14, 26, 0.4)',
                                        borderRadius: '20px',
                                        padding: '24px',
                                        marginTop: '16px',
                                        border: '1px solid rgba(255,255,255,0.08)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                marginBottom: '20px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
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
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                marginBottom: '24px',
                                                background: 'rgba(255,255,255,0.05)',
                                                borderRadius: '12px',
                                                padding: '16px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        height: '12px',
                                                        background: 'rgba(255,255,255,0.1)',
                                                        borderRadius: '6px',
                                                        display: 'flex',
                                                        overflow: 'hidden',
                                                        marginBottom: '8px'
                                                    },
                                                    children: budgetResult.basket.map((b, i)=>{
                                                        const percentage = b.price / budgetResult.total * 100;
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            title: `${b.item.name}: ₹${b.price}`,
                                                            style: {
                                                                width: `${percentage}%`,
                                                                background: platformColors[b.platform].bg,
                                                                borderRight: '1px solid rgba(0,0,0,0.2)'
                                                            }
                                                        }, i, false, {
                                                            fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                            lineNumber: 296,
                                                            columnNumber: 25
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                    lineNumber: 292,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        fontSize: '12px',
                                                        color: '#94a3b8',
                                                        fontWeight: 500
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "0"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                            lineNumber: 305,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '16px'
                                            },
                                            children: budgetResult.basket.map((b, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        paddingBottom: '12px',
                                                        borderBottom: i !== budgetResult.basket.length - 1 ? '1px dashed rgba(255,255,255,0.1)' : 'none'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '12px'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                                    lineNumber: 315,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                            lineNumber: 313,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                                        }, this)
                                                    ]
                                                }, i, true, {
                                                    fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                    lineNumber: 312,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                            lineNumber: 310,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                marginTop: '24px',
                                                paddingTop: '20px',
                                                borderTop: '2px dashed rgba(255,255,255,0.1)',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        textAlign: 'right'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
}),
"[project]/Documents/grocery-compare/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/Documents/grocery-compare/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime;
}),
];

//# sourceMappingURL=Documents_grocery-compare_0kzsz5f._.js.map