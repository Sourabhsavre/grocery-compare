import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { imageBase64, products } = await request.json();
    
    // Simulate Claude AI Vision processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate reading handwritten list containing rice, dal, oil, salt
    const detectedItems = ['Basmati Rice', 'Moong Dal', 'Mustard Oil', 'Salt', 'Tea'];

    const basket = [];
    let total = 0;

    for (const item of detectedItems) {
      const matches = products.filter((p: any) => p.name.toLowerCase().includes(item.toLowerCase()));
      if (matches.length > 0) {
        // Find cheapest
        const sorted = matches.sort((x: any, y: any) => {
          const getMinPrice = (p: any) => {
            let min = Infinity;
            for (const v of Object.values(p.prices) as any[]) {
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
            requiredQuantity: 1
          });
          total += minPrice;
        }
      }
    }

    return NextResponse.json({
      detectedText: "Rice 1kg, Moong Dal 500g, Oil 1L, Salt, Tea",
      basket,
      total
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to process image' }, { status: 500 });
  }
}
