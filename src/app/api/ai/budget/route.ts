import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { budget, products } = await request.json();
    
    const basket = [];
    let currentTotal = 0;
    
    // Shuffle the products to ensure randomness across different budgets
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    
    // Calculate min price for each item and filter out unavailable items
    const itemsWithMinPrice = shuffled.map(item => {
      let minPrice = Infinity;
      let cheapPlatform = null;
      for (const [p, v] of Object.entries(item.prices)) {
        if ((v as any).available && (v as any).price < minPrice) {
          minPrice = (v as any).price;
          cheapPlatform = p;
        }
      }
      return { item, minPrice, cheapPlatform };
    }).filter(x => x.cheapPlatform !== null);

    // Keep track of added categories to ensure variety
    const addedCategories = new Set();

    // First pass: try to add items from different categories greedily
    for (const { item, minPrice, cheapPlatform } of itemsWithMinPrice) {
      if (basket.length >= 8) break; // Limit items to prevent massive arrays

      // If we haven't added this category yet, prioritize it
      if (currentTotal + minPrice <= budget && !addedCategories.has(item.category)) {
        basket.push({ item, platform: cheapPlatform, price: minPrice });
        currentTotal += minPrice;
        addedCategories.add(item.category);
      }
    }

    // Second pass: fill remaining budget with other affordable items
    for (const { item, minPrice, cheapPlatform } of itemsWithMinPrice) {
      if (basket.length >= 10) break;
      
      // Skip if already in basket
      if (basket.some(b => b.item.id === item.id)) continue;
      
      if (currentTotal + minPrice <= budget) {
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
