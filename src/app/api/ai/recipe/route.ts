import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { recipeName, products } = await request.json();
    
    // We will simulate AI extraction by taking the recipe name and returning some keywords
    // Ideally we would call an LLM here to break "Butter Chicken" into ["Chicken", "Butter", "Tomato", "Cream", "Spices"]
    // For now, since we don't have the API key configured in this environment explicitly, we'll do a simple mock based on the recipe name.
    
    const lower = recipeName.toLowerCase();
    let ingredients: string[] = [];

    if (lower.includes('biryani')) {
      ingredients = ['Basmati Rice', 'Chicken', 'Ghee', 'Onion', 'Tomato', 'Garam Masala', 'Cardamom', 'Cloves'];
    } else if (lower.includes('dal tadka') || lower.includes('dal makhani')) {
      ingredients = ['Toor Dal', 'Tomato', 'Onion', 'Garlic', 'Ghee', 'Cumin Seeds', 'Red Chilli Powder'];
    } else if (lower.includes('butter chicken')) {
      ingredients = ['Chicken', 'Butter', 'Cream', 'Tomato', 'Onion', 'Garlic', 'Garam Masala', 'Red Chilli Powder'];
    } else if (lower.includes('pancake')) {
      ingredients = ['Maida', 'Milk', 'Eggs', 'Butter', 'Sugar'];
    } else {
      // Generic fallback - pick 5 random staples and veggies
      ingredients = ['Normal Rice', 'Onion', 'Tomato', 'Salt', 'Refined Oil'];
    }

    const basket = [];
    let total = 0;

    for (const ingredient of ingredients) {
      // Find the cheapest matching product
      const matches = products.filter((p: any) => p.name.toLowerCase().includes(ingredient.toLowerCase()));
      if (matches.length > 0) {
        // Sort by price
        const sorted = matches.sort((x: any, y: any) => {
          const getMinPrice = (item: any) => {
            let min = Infinity;
            for (const v of Object.values(item.prices) as any[]) {
              if (v.available && v.price < min) min = v.price;
            }
            return min;
          };
          return getMinPrice(x) - getMinPrice(y);
        });

        const bestItem = sorted[0];
        let cheapPlatform = null;
        let minPrice = Infinity;
        for (const [p, v] of Object.entries(bestItem.prices)) {
          if ((v as any).available && (v as any).price < minPrice) {
            minPrice = (v as any).price;
            cheapPlatform = p;
          }
        }

        if (cheapPlatform) {
          basket.push({
            item: bestItem,
            platform: cheapPlatform,
            price: minPrice,
            requiredQuantity: 1 // basic assumption
          });
          total += minPrice;
        }
      }
    }

    return NextResponse.json({ 
      recipeName,
      basket, 
      total 
    });
    
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to process recipe request' }, { status: 500 });
  }
}
