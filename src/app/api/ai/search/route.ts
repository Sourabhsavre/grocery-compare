import { NextResponse } from 'next/server';
import Fuse from 'fuse.js';

export async function POST(request: Request) {
  try {
    const { query, products } = await request.json();
    
    // Extract unique categories from products
    const categories = Array.from(new Set(products.map((p: any) => p.category)));
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
    const categoryObjects = categories.map(c => ({ name: c }));
    const categoryFuse = new Fuse(categoryObjects, {
      keys: ['name'],
      threshold: 0.4 // lower is stricter
    });
    
    const categoryResults = categoryFuse.search(cleanQuery);
    if (categoryResults.length > 0) {
      // If the query strongly matches a category, set it and remove it from cleanQuery
      matchedCategory = categoryResults[0].item.name as string;
      cleanQuery = cleanQuery.replace(matchedCategory.toLowerCase(), "").trim();
    } else {
      // Direct substring match as fallback
      for (const c of categories) {
        if (lowerQuery.includes((c as string).toLowerCase())) {
          matchedCategory = c as string;
          cleanQuery = cleanQuery.replace((c as string).toLowerCase(), "").trim();
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

    return NextResponse.json({ 
      category: matchedCategory, 
      cleanQuery: cleanQuery 
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to process search request' }, { status: 500 });
  }
}
