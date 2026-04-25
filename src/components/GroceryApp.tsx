"use client";

import { useState, useMemo } from "react";

const platformColors = {
  Zepto: { bg: "#8b5cf6", light: "rgba(139, 92, 246, 0.15)", text: "#c4b5fd" },
  BigBasket: { bg: "#22c55e", light: "rgba(34, 197, 94, 0.15)", text: "#86efac" },
  Blinkit: { bg: "#eab308", light: "rgba(234, 179, 8, 0.15)", text: "#fde047" },
};

function getCheapest(prices: any) {
  let min = Infinity, platform = null;
  for (const [p, v] of Object.entries(prices)) {
    const val = v as any;
    if (val.available && val.price < min) { min = val.price; platform = p; }
  }
  return platform;
}

export default function GroceryApp({ products }: { products: any[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [budget, setBudget] = useState("");
  const [budgetResult, setBudgetResult] = useState<any>(null);
  const [isAILoading, setIsAILoading] = useState(false);

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  const filtered = useMemo(() => {
    let lowerSearch = search.toLowerCase();
    
    // We will keep local fast search for basic queries
    let maxPrice = Infinity;
    const underMatch = lowerSearch.match(/under (\d+)/);
    if (underMatch) {
      maxPrice = parseInt(underMatch[1]);
      lowerSearch = lowerSearch.replace(underMatch[0], "").trim();
    }

    return products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(lowerSearch) || p.category.toLowerCase().includes(lowerSearch);
      const matchCat = category === "All" || p.category === category;
      
      let meetsPrice = true;
      if (maxPrice !== Infinity) {
        const cheapest = getCheapest(p.prices);
        if (cheapest && (p.prices as any)[cheapest].price > maxPrice) {
          meetsPrice = false;
        }
      }

      return matchSearch && matchCat && meetsPrice;
    });
  }, [search, category, products]);

  const handleSmartSearch = async () => {
    if (!search.trim()) return;
    setIsAILoading(true);
    try {
      const response = await fetch("/api/ai/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: search, products })
      });
      const data = await response.json();
      if (data.category) {
        setCategory(data.category);
      }
      if (data.cleanQuery) {
        setSearch(data.cleanQuery);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAILoading(false);
    }
  }

  const handleBudgetAssistant = async () => {
    const b = parseInt(budget);
    if (isNaN(b) || b <= 0) return setBudgetResult(null);

    setIsAILoading(true);
    try {
      const response = await fetch("/api/ai/budget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ budget: b, products })
      });
      const data = await response.json();
      setBudgetResult(data);
    } catch (e) {
      console.error(e);
      alert("Failed to get AI budget assistant result.");
    } finally {
      setIsAILoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Header */}
      <div className="glass hover-lift" style={{ maxWidth: 1100, margin: '24px auto', padding: '32px', borderRadius: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <span style={{ fontSize: '48px' }}>🛒</span>
          <div>
            <h1 className="gradient-text" style={{ fontSize: '36px', fontWeight: 800, margin: 0, paddingBottom: '4px' }}>GroceryCompare AI</h1>
            <p style={{ color: '#94a3b8', fontSize: '16px', margin: 0 }}>Smart search, budget assistant, and real-time price comparison</p>
          </div>
        </div>

        {/* Search & Filters */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '24px' }}>
          <div style={{ flex: 1, position: 'relative', minWidth: '300px' }}>
            <span style={{ position: 'absolute', left: '16px', top: '14px', fontSize: '20px' }}>🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSmartSearch()}
              placeholder="Try 'healthy snacks under 50' or 'milk'"
              style={{
                width: '100%', padding: '16px 120px 16px 48px', borderRadius: '16px',
                background: 'rgba(15, 23, 42, 0.5)', border: '1px solid var(--border-color)',
                color: 'white', fontSize: '16px', outline: 'none', transition: 'border-color 0.2s',
                fontFamily: 'inherit'
              }}
            />
            <button 
              onClick={handleSmartSearch}
              disabled={isAILoading}
              style={{
                position: 'absolute', right: '8px', top: '8px', bottom: '8px',
                background: 'var(--secondary-color)', color: 'white', border: 'none',
                padding: '0 16px', borderRadius: '12px', fontWeight: 600, cursor: 'pointer',
                fontFamily: 'inherit'
              }}
            >
              Ask AI ✨
            </button>
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              padding: '16px 24px', borderRadius: '16px', background: 'rgba(15, 23, 42, 0.5)',
              border: '1px solid var(--border-color)', color: 'white', fontSize: '16px',
              outline: 'none', cursor: 'pointer', fontFamily: 'inherit'
            }}
          >
            {categories.map((c) => <option key={c as string} value={c as string}>{c as string}</option>)}
          </select>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: '32px', flexWrap: 'wrap', padding: '0 20px' }}>
        
        {/* Main Content */}
        <div style={{ flex: '1 1 600px' }}>
          <p style={{ color: '#94a3b8', marginBottom: '20px', fontSize: '15px' }}>{filtered.length} products found</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {filtered.map((product) => {
              const cheapest = getCheapest(product.prices);
              return (
                <div key={product.id} className="glass hover-lift" style={{ overflow: 'hidden' }}>
                  <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '40px' }}>{product.image}</span>
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 6px 0' }}>{product.name}</h3>
                      <span style={{ fontSize: '12px', background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '12px' }}>{product.category}</span>
                    </div>
                  </div>
                  
                  <div style={{ padding: '16px 20px' }}>
                    {Object.entries(product.prices).map(([platform, data]) => {
                      const val = data as any;
                      const isCheap = platform === cheapest;
                      const c = (platformColors as any)[platform];
                      
                      return (
                        <div key={platform} style={{
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                          padding: '10px 14px', borderRadius: '12px', marginBottom: '10px',
                          background: isCheap ? c.light : 'rgba(15, 23, 42, 0.4)',
                          border: `1px solid ${isCheap ? c.bg : 'transparent'}`
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: c.bg }}></div>
                            <span style={{ fontSize: '15px', fontWeight: 500 }}>{platform}</span>
                            {isCheap && <span style={{ fontSize: '10px', background: c.bg, color: 'white', padding: '2px 6px', borderRadius: '8px', fontWeight: 700 }}>CHEAPEST</span>}
                          </div>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {val.available ? (
                              <>
                                <span style={{ fontSize: '16px', fontWeight: 700, color: isCheap ? c.text : 'white' }}>₹{val.price}</span>
                                <a href={val.url} target="_blank" rel="noreferrer" style={{
                                  fontSize: '12px', background: c.bg, color: 'white', padding: '6px 12px',
                                  borderRadius: '8px', textDecoration: 'none', fontWeight: 600
                                }}>Buy</a>
                              </>
                            ) : (
                              <span style={{ fontSize: '13px', color: '#64748b', fontStyle: 'italic' }}>Unavailable</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ flex: '1 1 300px', maxWidth: '400px' }}>
          <div className="glass" style={{ padding: '24px', position: 'sticky', top: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <span style={{ fontSize: '28px' }}>🤖</span>
              <h2 className="gradient-text" style={{ fontSize: '22px', fontWeight: 700, margin: 0 }}>Budget Assistant</h2>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '20px', lineHeight: 1.5 }}>
              Enter your budget and let AI suggest an optimized grocery basket using the lowest prices across platforms.
            </p>
            
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <span style={{ position: 'absolute', margin: '14px 16px', color: '#94a3b8' }}>₹</span>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g. 500"
                  style={{
                    width: '100%', padding: '14px 12px 14px 36px', borderRadius: '12px',
                    background: 'rgba(15, 23, 42, 0.5)', border: '1px solid var(--border-color)',
                    color: 'white', fontSize: '16px', outline: 'none', fontFamily: 'inherit'
                  }}
                />
              </div>
              <button 
                onClick={handleBudgetAssistant}
                disabled={isAILoading}
                className="hover-lift"
                style={{
                  background: 'var(--primary-color)', color: 'white', border: 'none',
                  padding: '0 20px', borderRadius: '12px', fontWeight: 600, cursor: 'pointer',
                  fontFamily: 'inherit', fontSize: '15px'
                }}
              >
                {isAILoading ? 'Thinking...' : 'Plan'}
              </button>
            </div>

            {budgetResult && (
              <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '16px', padding: '16px', marginTop: '16px', border: '1px solid var(--border-color)' }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#cbd5e1' }}>Suggested Basket:</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {budgetResult.basket.map((b: any, i: number) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>{b.item.image}</span>
                        <span style={{ fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '140px' }}>{b.item.name}</span>
                      </div>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: (platformColors as any)[b.platform].text }}>₹{b.price}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94a3b8' }}>Total</span>
                  <span style={{ fontWeight: 800, color: '#4ade80', fontSize: '18px' }}>₹{budgetResult.total}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
