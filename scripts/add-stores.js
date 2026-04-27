const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/groceryData.ts');
let content = fs.readFileSync(dataPath, 'utf8');

// Parse the existing data
// We'll use a regex approach to add store entries after each "Blinkit" block

// For each product, we add Amazon Fresh, JioMart, Swiggy Instamart, and DMart Ready
// Prices are generated based on the existing prices with realistic variation

// Store URLs
const storeUrls = {
  AmazonFresh: 'https://www.amazon.in/alm/storefront',
  JioMart: 'https://www.jiomart.com',
  SwiggyInstamart: 'https://www.swiggy.com/instamart',
  DmartReady: 'https://www.dmart.in',
};

// We need to add the new stores to every product.
// Strategy: find each Blinkit block ending and insert the 4 new stores after it.

// Pattern to match the end of a Blinkit block within prices
// We'll insert new store data after the last store (Blinkit) in each product

const blinkitPattern = /("Blinkit":\s*\{[^}]+\}\s*\n\s*\})/g;

let matchCount = 0;

content = content.replace(blinkitPattern, (match) => {
  matchCount++;
  
  // Extract Blinkit price from the match to derive new prices
  const priceMatch = match.match(/"price":\s*(\d+)/);
  const availableMatch = match.match(/"available":\s*(true|false)/);
  
  const basePrice = priceMatch ? parseInt(priceMatch[1]) : 100;
  
  // Generate realistic price variations for each store
  // Amazon Fresh tends to be slightly higher (premium + delivery)
  // JioMart is competitive with slight discounts
  // Swiggy Instamart is higher (convenience premium)
  // DMart Ready is typically the lowest (value retailer)
  
  const variations = [
    { store: 'AmazonFresh', mult: [0.97, 1.08], availChance: 0.85 },
    { store: 'JioMart', mult: [0.94, 1.03], availChance: 0.88 },
    { store: 'SwiggyInstamart', mult: [1.03, 1.12], availChance: 0.80 },
    { store: 'DmartReady', mult: [0.90, 0.98], availChance: 0.82 },
  ];
  
  // Use product id (matchCount) as seed for pseudo-random but deterministic prices
  const seed = matchCount;
  const pseudoRand = (idx) => {
    const x = Math.sin(seed * 9301 + idx * 49297 + 233720) * 10000;
    return x - Math.floor(x);
  };
  
  let newStores = '';
  
  variations.forEach(({ store, mult, availChance }, idx) => {
    const randMult = mult[0] + pseudoRand(idx) * (mult[1] - mult[0]);
    const price = Math.round(basePrice * randMult);
    const available = pseudoRand(idx + 10) < availChance;
    
    newStores += `,
      "${store}": {
        "price": ${price},
        "available": ${available},
        "url": "${storeUrls[store]}"
      }`;
  });
  
  // Replace the closing brace of prices with the new stores + closing brace
  return match.replace(/\n(\s*)\}$/, `${newStores}\n$1}`);
});

console.log(`Processed ${matchCount} products`);
fs.writeFileSync(dataPath, content, 'utf8');
console.log('Done! groceryData.ts updated with 4 new stores.');
