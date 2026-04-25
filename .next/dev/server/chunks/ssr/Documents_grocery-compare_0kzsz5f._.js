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
        text: "#c4b5fd"
    },
    BigBasket: {
        bg: "#22c55e",
        light: "rgba(34, 197, 94, 0.15)",
        text: "#86efac"
    },
    Blinkit: {
        bg: "#eab308",
        light: "rgba(234, 179, 8, 0.15)",
        text: "#fde047"
    }
};
function getCheapest(prices) {
    let min = Infinity, platform = null;
    for (const [p, v] of Object.entries(prices)){
        const val = v;
        if (val.available && val.price < min) {
            min = val.price;
            platform = p;
        }
    }
    return platform;
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
        // We will keep local fast search for basic queries
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
                const cheapest = getCheapest(p.prices);
                if (cheapest && p.prices[cheapest].price > maxPrice) {
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
                className: "glass hover-lift",
                style: {
                    maxWidth: 1100,
                    margin: '24px auto',
                    padding: '32px',
                    borderRadius: '24px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            marginBottom: '16px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: '48px'
                                },
                                children: "🛒"
                            }, void 0, false, {
                                fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                lineNumber: 105,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "gradient-text",
                                        style: {
                                            fontSize: '36px',
                                            fontWeight: 800,
                                            margin: 0,
                                            paddingBottom: '4px'
                                        },
                                        children: "GroceryCompare AI"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                        lineNumber: 107,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            color: '#94a3b8',
                                            fontSize: '16px',
                                            margin: 0
                                        },
                                        children: "Smart search, budget assistant, and real-time price comparison"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                        lineNumber: 108,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                lineNumber: 106,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            gap: '16px',
                            flexWrap: 'wrap',
                            marginTop: '24px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    position: 'relative',
                                    minWidth: '300px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            position: 'absolute',
                                            left: '16px',
                                            top: '14px',
                                            fontSize: '20px'
                                        },
                                        children: "🔍"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                        lineNumber: 115,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: search,
                                        onChange: (e)=>setSearch(e.target.value),
                                        onKeyDown: (e)=>e.key === 'Enter' && handleSmartSearch(),
                                        placeholder: "Try 'healthy snacks under 50' or 'milk'",
                                        style: {
                                            width: '100%',
                                            padding: '16px 120px 16px 48px',
                                            borderRadius: '16px',
                                            background: 'rgba(15, 23, 42, 0.5)',
                                            border: '1px solid var(--border-color)',
                                            color: 'white',
                                            fontSize: '16px',
                                            outline: 'none',
                                            transition: 'border-color 0.2s',
                                            fontFamily: 'inherit'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                        lineNumber: 116,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleSmartSearch,
                                        disabled: isAILoading,
                                        style: {
                                            position: 'absolute',
                                            right: '8px',
                                            top: '8px',
                                            bottom: '8px',
                                            background: 'var(--secondary-color)',
                                            color: 'white',
                                            border: 'none',
                                            padding: '0 16px',
                                            borderRadius: '12px',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            fontFamily: 'inherit'
                                        },
                                        children: "Ask AI ✨"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                        lineNumber: 128,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                lineNumber: 114,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: category,
                                onChange: (e)=>setCategory(e.target.value),
                                style: {
                                    padding: '16px 24px',
                                    borderRadius: '16px',
                                    background: 'rgba(15, 23, 42, 0.5)',
                                    border: '1px solid var(--border-color)',
                                    color: 'white',
                                    fontSize: '16px',
                                    outline: 'none',
                                    cursor: 'pointer',
                                    fontFamily: 'inherit'
                                },
                                children: categories.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: c,
                                        children: c
                                    }, c, false, {
                                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                        lineNumber: 150,
                                        columnNumber: 36
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                lineNumber: 141,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                lineNumber: 103,
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: '#94a3b8',
                                    marginBottom: '20px',
                                    fontSize: '15px'
                                },
                                children: [
                                    filtered.length,
                                    " products found"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                lineNumber: 159,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                                    gap: '20px'
                                },
                                children: filtered.map((product)=>{
                                    const cheapest = getCheapest(product.prices);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "glass hover-lift",
                                        style: {
                                            overflow: 'hidden'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    padding: '20px',
                                                    borderBottom: '1px solid var(--border-color)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '16px'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            fontSize: '40px'
                                                        },
                                                        children: product.image
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                        lineNumber: 167,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                style: {
                                                                    fontSize: '18px',
                                                                    fontWeight: 600,
                                                                    margin: '0 0 6px 0'
                                                                },
                                                                children: product.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                                lineNumber: 169,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: '12px',
                                                                    background: 'rgba(255,255,255,0.1)',
                                                                    padding: '4px 10px',
                                                                    borderRadius: '12px'
                                                                },
                                                                children: product.category
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                                lineNumber: 170,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                        lineNumber: 168,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                lineNumber: 166,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    padding: '16px 20px'
                                                },
                                                children: Object.entries(product.prices).map(([platform, data])=>{
                                                    const val = data;
                                                    const isCheap = platform === cheapest;
                                                    const c = platformColors[platform];
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            padding: '10px 14px',
                                                            borderRadius: '12px',
                                                            marginBottom: '10px',
                                                            background: isCheap ? c.light : 'rgba(15, 23, 42, 0.4)',
                                                            border: `1px solid ${isCheap ? c.bg : 'transparent'}`
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '8px'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            width: '12px',
                                                                            height: '12px',
                                                                            borderRadius: '50%',
                                                                            background: c.bg
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                                        lineNumber: 188,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            fontSize: '15px',
                                                                            fontWeight: 500
                                                                        },
                                                                        children: platform
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                                        lineNumber: 189,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    isCheap && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            fontSize: '10px',
                                                                            background: c.bg,
                                                                            color: 'white',
                                                                            padding: '2px 6px',
                                                                            borderRadius: '8px',
                                                                            fontWeight: 700
                                                                        },
                                                                        children: "CHEAPEST"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                                        lineNumber: 190,
                                                                        columnNumber: 41
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                                lineNumber: 187,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: '12px'
                                                                },
                                                                children: val.available ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            style: {
                                                                                fontSize: '16px',
                                                                                fontWeight: 700,
                                                                                color: isCheap ? c.text : 'white'
                                                                            },
                                                                            children: [
                                                                                "₹",
                                                                                val.price
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                                            lineNumber: 196,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                            href: val.url,
                                                                            target: "_blank",
                                                                            rel: "noreferrer",
                                                                            style: {
                                                                                fontSize: '12px',
                                                                                background: c.bg,
                                                                                color: 'white',
                                                                                padding: '6px 12px',
                                                                                borderRadius: '8px',
                                                                                textDecoration: 'none',
                                                                                fontWeight: 600
                                                                            },
                                                                            children: "Buy"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                                            lineNumber: 197,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        fontSize: '13px',
                                                                        color: '#64748b',
                                                                        fontStyle: 'italic'
                                                                    },
                                                                    children: "Unavailable"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                                    lineNumber: 203,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                                lineNumber: 193,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, platform, true, {
                                                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                        lineNumber: 181,
                                                        columnNumber: 25
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                lineNumber: 174,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, product.id, true, {
                                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                        lineNumber: 165,
                                        columnNumber: 17
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                lineNumber: 161,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: '1 1 300px',
                            maxWidth: '400px'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "glass",
                            style: {
                                padding: '24px',
                                position: 'sticky',
                                top: '24px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        marginBottom: '20px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: '28px'
                                            },
                                            children: "🤖"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                            lineNumber: 220,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "gradient-text",
                                            style: {
                                                fontSize: '22px',
                                                fontWeight: 700,
                                                margin: 0
                                            },
                                            children: "Budget Assistant"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                            lineNumber: 221,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                    lineNumber: 219,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        color: '#94a3b8',
                                        fontSize: '14px',
                                        marginBottom: '20px',
                                        lineHeight: 1.5
                                    },
                                    children: "Enter your budget and let AI suggest an optimized grocery basket using the lowest prices across platforms."
                                }, void 0, false, {
                                    fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                    lineNumber: 223,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        gap: '12px',
                                        marginBottom: '20px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                position: 'relative',
                                                flex: 1
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        position: 'absolute',
                                                        margin: '14px 16px',
                                                        color: '#94a3b8'
                                                    },
                                                    children: "₹"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                    lineNumber: 229,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    value: budget,
                                                    onChange: (e)=>setBudget(e.target.value),
                                                    placeholder: "e.g. 500",
                                                    style: {
                                                        width: '100%',
                                                        padding: '14px 12px 14px 36px',
                                                        borderRadius: '12px',
                                                        background: 'rgba(15, 23, 42, 0.5)',
                                                        border: '1px solid var(--border-color)',
                                                        color: 'white',
                                                        fontSize: '16px',
                                                        outline: 'none',
                                                        fontFamily: 'inherit'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                    lineNumber: 230,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                            lineNumber: 228,
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
                                                padding: '0 20px',
                                                borderRadius: '12px',
                                                fontWeight: 600,
                                                cursor: 'pointer',
                                                fontFamily: 'inherit',
                                                fontSize: '15px'
                                            },
                                            children: isAILoading ? 'Thinking...' : 'Plan'
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                            lineNumber: 242,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                    lineNumber: 227,
                                    columnNumber: 13
                                }, this),
                                budgetResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        background: 'rgba(15, 23, 42, 0.6)',
                                        borderRadius: '16px',
                                        padding: '16px',
                                        marginTop: '16px',
                                        border: '1px solid var(--border-color)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            style: {
                                                margin: '0 0 16px 0',
                                                fontSize: '15px',
                                                color: '#cbd5e1'
                                            },
                                            children: "Suggested Basket:"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                            lineNumber: 258,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '12px'
                                            },
                                            children: budgetResult.basket.map((b, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '8px'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: b.item.image
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                                    lineNumber: 263,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        fontSize: '14px',
                                                                        whiteSpace: 'nowrap',
                                                                        overflow: 'hidden',
                                                                        textOverflow: 'ellipsis',
                                                                        maxWidth: '140px'
                                                                    },
                                                                    children: b.item.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                                    lineNumber: 264,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                            lineNumber: 262,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: '14px',
                                                                fontWeight: 700,
                                                                color: platformColors[b.platform].text
                                                            },
                                                            children: [
                                                                "₹",
                                                                b.price
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                            lineNumber: 266,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, i, true, {
                                                    fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                    lineNumber: 261,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                            lineNumber: 259,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                marginTop: '20px',
                                                paddingTop: '16px',
                                                borderTop: '1px solid var(--border-color)',
                                                display: 'flex',
                                                justifyContent: 'space-between'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: '#94a3b8'
                                                    },
                                                    children: "Total"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                    lineNumber: 271,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontWeight: 800,
                                                        color: '#4ade80',
                                                        fontSize: '18px'
                                                    },
                                                    children: [
                                                        "₹",
                                                        budgetResult.total
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                                    lineNumber: 272,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                            lineNumber: 270,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                                    lineNumber: 257,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                            lineNumber: 218,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                        lineNumber: 217,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
                lineNumber: 155,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/grocery-compare/src/components/GroceryApp.tsx",
        lineNumber: 101,
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