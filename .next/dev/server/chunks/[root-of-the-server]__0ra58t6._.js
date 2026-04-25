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
"[project]/Documents/grocery-compare/src/app/api/ai/budget/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/grocery-compare/node_modules/next/server.js [app-route] (ecmascript)");
;
async function POST(request) {
    try {
        const { budget, products } = await request.json();
        const basket = [];
        let currentTotal = 0;
        // Sort items by their cheapest price available
        const sorted = [
            ...products
        ].sort((x, y)=>{
            const getMinPrice = (item)=>{
                let min = Infinity;
                for (const v of Object.values(item.prices)){
                    if (v.available && v.price < min) min = v.price;
                }
                return min;
            };
            return getMinPrice(x) - getMinPrice(y);
        });
        // Keep track of added categories to ensure variety
        const addedCategories = new Set();
        // First pass: try to add items from different categories
        for (const item of sorted){
            if (basket.length >= 6) break; // limit to 6 items
            let cheapPlatform = null;
            let minPrice = Infinity;
            for (const [p, v] of Object.entries(item.prices)){
                if (v.available && v.price < minPrice) {
                    minPrice = v.price;
                    cheapPlatform = p;
                }
            }
            // If we haven't added this category yet, prioritize it
            if (cheapPlatform && currentTotal + minPrice <= budget && !addedCategories.has(item.category)) {
                basket.push({
                    item,
                    platform: cheapPlatform,
                    price: minPrice
                });
                currentTotal += minPrice;
                addedCategories.add(item.category);
            }
        }
        // Second pass: fill remaining budget with other affordable items if we have less than 4 items
        for (const item of sorted){
            if (basket.length >= 6) break;
            // Skip if already in basket
            if (basket.some((b)=>b.item.id === item.id)) continue;
            let cheapPlatform = null;
            let minPrice = Infinity;
            for (const [p, v] of Object.entries(item.prices)){
                if (v.available && v.price < minPrice) {
                    minPrice = v.price;
                    cheapPlatform = p;
                }
            }
            if (cheapPlatform && currentTotal + minPrice <= budget) {
                basket.push({
                    item,
                    platform: cheapPlatform,
                    price: minPrice
                });
                currentTotal += minPrice;
            }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            basket,
            total: currentTotal,
            target: budget
        });
    } catch (error) {
        console.error(error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$grocery$2d$compare$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to process budget request'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0ra58t6._.js.map