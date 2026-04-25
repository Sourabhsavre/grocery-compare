module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Documents/grocery-compare/src/app/api/ai/search/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/grocery-compare/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$fuse$2e$js$2f$dist$2f$fuse$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/grocery-compare/node_modules/fuse.js/dist/fuse.mjs [app-route] (ecmascript)");
;
;
async function POST(request) {
    try {
        const { query, products } = await request.json();
        // Extract unique categories from products
        const categories = Array.from(new Set(products.map((p)=>p.category)));
        const lowerQuery = query.toLowerCase();
        // 1. Extract Price Constraints (e.g., "under 50")
        let maxPrice = Infinity;
        let cleanQuery = lowerQuery;
        const underMatch = lowerQuery.match(/under (\d+)/);
        if (underMatch) {
            maxPrice = parseInt(underMatch[1]);
            cleanQuery = cleanQuery.replace(underMatch[0], "").trim();
        }
        // Remove common filler words
        cleanQuery = cleanQuery.replace(/healthy|cheap|best|some|any/g, "").trim();
        // 2. Determine Category
        let matchedCategory = "All";
        // Setup Fuse for fuzzy matching categories
        const categoryObjects = categories.map((c)=>({
                name: c
            }));
        const categoryFuse = new __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$fuse$2e$js$2f$dist$2f$fuse$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](categoryObjects, {
            keys: [
                'name'
            ],
            threshold: 0.4 // lower is stricter
        });
        const categoryResults = categoryFuse.search(cleanQuery);
        if (categoryResults.length > 0) {
            // If the query strongly matches a category, set it and remove it from cleanQuery
            matchedCategory = categoryResults[0].item.name;
            cleanQuery = cleanQuery.replace(matchedCategory.toLowerCase(), "").trim();
        } else {
            // Direct substring match as fallback
            for (const c of categories){
                if (lowerQuery.includes(c.toLowerCase())) {
                    matchedCategory = c;
                    cleanQuery = cleanQuery.replace(c.toLowerCase(), "").trim();
                    break;
                }
            }
        }
        // Ensure we keep the price constraint in the clean query for the client to parse if it needs to,
        // actually our client parses "under XX" directly from the user's input, 
        // but the API also sets the category. So if cleanQuery is empty, we just pass back the price constraint
        if (!cleanQuery && underMatch) {
            cleanQuery = underMatch[0];
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            category: matchedCategory,
            cleanQuery: cleanQuery
        });
    } catch (error) {
        console.error(error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to process search request'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0fy8-ft._.js.map