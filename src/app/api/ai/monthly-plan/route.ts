import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { requirements, products } = await request.json();
    
    await new Promise(resolve => setTimeout(resolve, 1500));

    // We split a generic 4-week monthly plan
    // We'll just grab a random set of products to simulate an AI organizing a monthly budget.

    const getCheapest = (item: string) => {
      const matches = products.filter((p: any) => p.name.toLowerCase().includes(item.toLowerCase()));
      if (matches.length === 0) return null;
      const best = matches[0]; // Simplified for mock
      let platform = 'Zepto';
      let price = 100;
      for (const [p, v] of Object.entries(best.prices)) {
        if ((v as any).available && (v as any).price < price) {
          price = (v as any).price;
          platform = p;
        }
      }
      return { item: best, platform, price };
    };

    const w1 = [getCheapest('Rice'), getCheapest('Dal'), getCheapest('Oil')].filter(Boolean);
    const w2 = [getCheapest('Milk'), getCheapest('Paneer'), getCheapest('Snacks')].filter(Boolean);
    const w3 = [getCheapest('Tea'), getCheapest('Sugar'), getCheapest('Salt')].filter(Boolean);
    const w4 = [getCheapest('Ghee'), getCheapest('Spices')].filter(Boolean);

    const calcTotal = (arr: any[]) => arr.reduce((sum, i) => sum + i.price, 0);

    const plan = [
      { week: 1, title: 'Bulk Staples', items: w1, total: calcTotal(w1) },
      { week: 2, title: 'Dairy & Snacks', items: w2, total: calcTotal(w2) },
      { week: 3, title: 'Beverages & Essentials', items: w3, total: calcTotal(w3) },
      { week: 4, title: 'Restock', items: w4, total: calcTotal(w4) },
    ];

    const grandTotal = plan.reduce((sum, w) => sum + w.total, 0);

    return NextResponse.json({
      summary: "Based on your requirements, here is your optimized monthly plan.",
      plan,
      grandTotal
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate plan' }, { status: 500 });
  }
}
