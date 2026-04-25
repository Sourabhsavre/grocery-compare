import { useState } from "react";

const groceryData = [
  {
    id: 1, name: "Amul Full Cream Milk 1L", category: "Dairy",
    image: "🥛",
    prices: {
      Zepto: { price: 68, available: true, url: "https://www.zeptonow.com" },
      BigBasket: { price: 72, available: true, url: "https://www.bigbasket.com" },
      Blinkit: { price: 65, available: true, url: "https://blinkit.com" },
    },
  },
  {
    id: 2, name: "Britannia Brown Bread", category: "Bakery",
    image: "🍞",
    prices: {
      Zepto: { price: 40, available: true, url: "https://www.zeptonow.com" },
      BigBasket: { price: 38, available: true, url: "https://www.bigbasket.com" },
      Blinkit: { price: 42, available: false, url: "https://blinkit.com" },
    },
  },
  {
    id: 3, name: "Fortune Sunflower Oil 1L", category: "Oils",
    image: "🫙",
    prices: {
      Zepto: { price: 155, available: true, url: "https://www.zeptonow.com" },
      BigBasket: { price: 148, available: true, url: "https://www.bigbasket.com" },
      Blinkit: { price: 152, available: true, url: "https://blinkit.com" },
    },
  },
  {
    id: 4, name: "Tata Salt 1kg", category: "Spices",
    image: "🧂",
    prices: {
      Zepto: { price: 24, available: true, url: "https://www.zeptonow.com" },
      BigBasket: { price: 22, available: true, url: "https://www.bigbasket.com" },
      Blinkit: { price: 24, available: true, url: "https://blinkit.com" },
    },
  },
  {
    id: 5, name: "Aashirvaad Atta 5kg", category: "Grains",
    image: "🌾",
    prices: {
      Zepto: { price: 280, available: true, url: "https://www.zeptonow.com" },
      BigBasket: { price: 275, available: true, url: "https://www.bigbasket.com" },
      Blinkit: { price: 285, available: false, url: "https://blinkit.com" },
    },
  },
  {
    id: 6, name: "Nescafe Classic Coffee 50g", category: "Beverages",
    image: "☕",
    prices: {
      Zepto: { price: 199, available: true, url: "https://www.zeptonow.com" },
      BigBasket: { price: 189, available: true, url: "https://www.bigbasket.com" },
      Blinkit: { price: 195, available: true, url: "https://blinkit.com" },
    },
  },
  {
    id: 7, name: "Tropicana Orange Juice 1L", category: "Beverages",
    image: "🍊",
    prices: {
      Zepto: { price: 120, available: false, url: "https://www.zeptonow.com" },
      BigBasket: { price: 115, available: true, url: "https://www.bigbasket.com" },
      Blinkit: { price: 118, available: true, url: "https://blinkit.com" },
    },
  },
  {
    id: 8, name: "Maggi Noodles 12 Pack", category: "Snacks",
    image: "🍜",
    prices: {
      Zepto: { price: 144, available: true, url: "https://www.zeptonow.com" },
      BigBasket: { price: 138, available: true, url: "https://www.bigbasket.com" },
      Blinkit: { price: 144, available: true, url: "https://blinkit.com" },
    },
  },
  {
    id: 9, name: "Haldiram Aloo Bhujia 400g", category: "Snacks",
    image: "🥨",
    prices: {
      Zepto: { price: 110, available: true, url: "https://www.zeptonow.com" },
      BigBasket: { price: 105, available: true, url: "https://www.bigbasket.com" },
      Blinkit: { price: 108, available: true, url: "https://blinkit.com" },
    },
  },
  {
    id: 10, name: "Dettol Handwash 200ml", category: "Personal Care",
    image: "🧴",
    prices: {
      Zepto: { price: 89, available: true, url: "https://www.zeptonow.com" },
      BigBasket: { price: 85, available: true, url: "https://www.bigbasket.com" },
      Blinkit: { price: 92, available: false, url: "https://blinkit.com" },
    },
  },
  {
    id: 11, name: "Amul Butter 500g", category: "Dairy",
    image: "🧈",
    prices: {
      Zepto: { price: 250, available: true, url: "https://www.zeptonow.com" },
      BigBasket: { price: 245, available: true, url: "https://www.bigbasket.com" },
      Blinkit: { price: 252, available: true, url: "https://blinkit.com" },
    },
  },
  {
    id: 12, name: "Basmati Rice 5kg", category: "Grains",
    image: "🍚",
    prices: {
      Zepto: { price: 420, available: true, url: "https://www.zeptonow.com" },
      BigBasket: { price: 399, available: true, url: "https://www.bigbasket.com" },
      Blinkit: { price: 415, available: true, url: "https://blinkit.com" },
    },
  },
];

const platformColors = {
  Zepto: { bg: "#8b5cf6", light: "#ede9fe", text: "#5b21b6" },
  BigBasket: { bg: "#22c55e", light: "#dcfce7", text: "#15803d" },
  Blinkit: { bg: "#eab308", light: "#fef9c3", text: "#854d0e" },
};

const categories = ["All", ...new Set(groceryData.map((p) => p.category))];

function getCheapest(prices) {
  let min = Infinity, platform = null;
  for (const [p, v] of Object.entries(prices)) {
    if (v.available && v.price < min) { min = v.price; platform = p; }
  }
  return platform;
}

export default function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered = groceryData.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || p.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)", color: "white", padding: "24px 0", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <span style={{ fontSize: 36 }}>🛒</span>
            <div>
              <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, letterSpacing: -0.5 }}>GroceryCompare</h1>
              <p style={{ margin: 0, fontSize: 13, opacity: 0.7 }}>Compare prices across Zepto, BigBasket & Blinkit</p>
            </div>
          </div>
          {/* Platform badges */}
          <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
            {Object.entries(platformColors).map(([name, c]) => (
              <span key={name} style={{ background: c.bg, color: "white", padding: "4px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600 }}>{name}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 20px 0" }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍  Search grocery products..."
            style={{ flex: 1, minWidth: 220, padding: "12px 18px", borderRadius: 12, border: "2px solid #e2e8f0", fontSize: 15, outline: "none", background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ padding: "12px 18px", borderRadius: 12, border: "2px solid #e2e8f0", fontSize: 15, background: "white", cursor: "pointer", outline: "none" }}
          >
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <p style={{ color: "#64748b", fontSize: 14, marginBottom: 16 }}>{filtered.length} products found</p>

        {/* Product Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20, paddingBottom: 40 }}>
          {filtered.map((product) => {
            const cheapest = getCheapest(product.prices);
            return (
              <div key={product.id} style={{ background: "white", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", overflow: "hidden", border: "1px solid #f1f5f9", transition: "transform 0.15s, box-shadow 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.07)"; }}
              >
                {/* Product Header */}
                <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 36 }}>{product.image}</span>
                    <div>
                      <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#1e293b", lineHeight: 1.3 }}>{product.name}</h3>
                      <span style={{ fontSize: 12, color: "#94a3b8", background: "#f1f5f9", padding: "2px 8px", borderRadius: 6, marginTop: 4, display: "inline-block" }}>{product.category}</span>
                    </div>
                  </div>
                </div>

                {/* Price Table */}
                <div style={{ padding: "14px 20px" }}>
                  {Object.entries(product.prices).map(([platform, data]) => {
                    const isCheap = platform === cheapest;
                    const c = platformColors[platform];
                    return (
                      <div key={platform} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: 10, marginBottom: 8, background: isCheap ? c.light : "#f8fafc", border: isCheap ? `2px solid ${c.bg}` : "2px solid transparent", transition: "all 0.2s" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ width: 10, height: 10, borderRadius: "50%", background: c.bg, display: "inline-block" }}></span>
                          <span style={{ fontWeight: 600, fontSize: 14, color: "#334155" }}>{platform}</span>
                          {isCheap && <span style={{ fontSize: 11, background: c.bg, color: "white", padding: "1px 7px", borderRadius: 10, fontWeight: 700 }}>CHEAPEST</span>}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          {data.available ? (
                            <>
                              <span style={{ fontWeight: 800, fontSize: 16, color: isCheap ? c.text : "#1e293b" }}>₹{data.price}</span>
                              <a href={data.url} target="_blank" rel="noreferrer" style={{ fontSize: 12, background: c.bg, color: "white", padding: "4px 10px", borderRadius: 8, textDecoration: "none", fontWeight: 600 }}>Buy</a>
                            </>
                          ) : (
                            <span style={{ fontSize: 12, color: "#94a3b8", fontStyle: "italic" }}>Unavailable</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Savings */}
                {cheapest && (() => {
                  const prices = Object.values(product.prices).filter(v => v.available).map(v => v.price);
                  const max = Math.max(...prices);
                  const min = Math.min(...prices);
                  const saving = max - min;
                  return saving > 0 ? (
                    <div style={{ margin: "0 20px 16px", padding: "8px 12px", background: "#f0fdf4", borderRadius: 8, textAlign: "center" }}>
                      <span style={{ fontSize: 13, color: "#15803d", fontWeight: 600 }}>💰 Save up to ₹{saving} by choosing {cheapest}</span>
                    </div>
                  ) : null;
                })()}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#94a3b8" }}>
            <div style={{ fontSize: 48 }}>🔍</div>
            <p style={{ fontSize: 18, marginTop: 12 }}>No products found for "{search}"</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ background: "#1e293b", color: "#94a3b8", textAlign: "center", padding: "20px", fontSize: 13 }}>
        <p style={{ margin: 0 }}>🛒 GroceryCompare — IIST Minor Project | Sourabh, Tanisha, Sachin, Sonali</p>
      </div>
    </div>
  );
}
