import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { budget, products } = await request.json();
    
    const basket = [];
    let currentTotal = 0;
    
    // Sort items by their cheapest price available
    const sorted = [...products].sort((x: any, y: any) => {
      const getMinPrice = (item: any) => {
        let min = Infinity;
        for (const v of Object.values(item.prices) as any[]) {
          if (v.available && v.price < min) min = v.price;
        }
        return min;
      };
      return getMinPrice(x) - getMinPrice(y);
    });

    // Keep track of added categories to ensure variety
    const addedCategories = new Set();

    // First pass: try to add items from different categories
    for (const item of sorted) {
      if (basket.length >= 6) break; // limit to 6 items

      let cheapPlatform = null;
      let minPrice = Infinity;
      for (const [p, v] of Object.entries(item.prices)) {
        if ((v as any).available && (v as any).price < minPrice) {
          minPrice = (v as any).price;
          cheapPlatform = p;
        }
      }
      
      // If we haven't added this category yet, prioritize it
      if (cheapPlatform && currentTotal + minPrice <= budget && !addedCategories.has(item.category)) {
        basket.push({ item, platform: cheapPlatform, price: minPrice });
        currentTotal += minPrice;
        addedCategories.add(item.category);
      }
    }

    // Second pass: fill remaining budget with other affordable items if we have less than 4 items
    for (const item of sorted) {
      if (basket.length >= 6) break;
      
      // Skip if already in basket
      if (basket.some(b => b.item.id === item.id)) continue;

      let cheapPlatform = null;
      let minPrice = Infinity;
      for (const [p, v] of Object.entries(item.prices)) {
        if ((v as any).available && (v as any).price < minPrice) {
          minPrice = (v as any).price;
          cheapPlatform = p;
        }
      }
      
      if (cheapPlatform && currentTotal + minPrice <= budget) {
        basket.push({ item, platform: cheapPlatform, price: minPrice });
        currentTotal += minPrice;
      }
    }

    return NextResponse.json({ basket, total: currentTotal, target: budget });
    
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to process budget request' }, { status: 500 });
  }
}
