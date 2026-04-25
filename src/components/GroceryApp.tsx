"use client";

import { useState, useMemo } from "react";

const platformColors = {
  Zepto: { bg: "#8b5cf6", light: "rgba(139, 92, 246, 0.15)", text: "#c4b5fd", logo: "🟣 Zepto" },
  BigBasket: { bg: "#22c55e", light: "rgba(34, 197, 94, 0.15)", text: "#86efac", logo: "🟢 BigBasket" },
  Blinkit: { bg: "#eab308", light: "rgba(234, 179, 8, 0.15)", text: "#fde047", logo: "🟡 Blinkit" },
};

function getPriceStats(prices: any) {
  let min = Infinity, max = -Infinity, cheapestPlatform = null;
  for (const [p, v] of Object.entries(prices)) {
    const val = v as any;
    if (val.available) {
      if (val.price < min) { min = val.price; cheapestPlatform = p; }
      if (val.price > max) { max = val.price; }
    }
  }
  return { cheapestPlatform, min, max, savings: max !== -Infinity && max > min ? max - min : 0 };
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
        const stats = getPriceStats(p.prices);
        if (stats.cheapestPlatform && (p.prices as any)[stats.cheapestPlatform].price > maxPrice) {
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
      <div className="glass-panel hover-lift" style={{ maxWidth: 1100, margin: '32px auto', padding: '40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50%', left: '-20%', width: '100%', height: '200%', background: 'radial-gradient(circle, rgba(108,58,232,0.1) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '56px', filter: 'drop-shadow(0 0 10px rgba(0,212,170,0.5))' }} className="pulse-anim">🛒</div>
          <div>
            <h1 className="gradient-text" style={{ fontSize: '48px', fontWeight: 800, margin: 0, paddingBottom: '8px', letterSpacing: '-1px' }}>GroceryCompare AI</h1>
            <p style={{ color: '#94a3b8', fontSize: '18px', margin: 0, fontWeight: 500 }}>India's Smartest Grocery Price Comparison</p>
          </div>
        </div>

        {/* Search & Filters */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '32px', position: 'relative', zIndex: 1 }}>
          <div style={{ flex: 1, position: 'relative', minWidth: '300px' }} className="glow-effect">
            <span style={{ position: 'absolute', left: '20px', top: '18px', fontSize: '22px' }}>🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSmartSearch()}
              placeholder="Try 'healthy snacks under 50' or 'milk'"
              style={{
                width: '100%', padding: '20px 140px 20px 56px', borderRadius: '20px',
                background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--border-color)',
                color: 'white', fontSize: '18px', outline: 'none', transition: 'all 0.3s ease',
                fontFamily: 'inherit', backdropFilter: 'blur(10px)'
              }}
            />
            <button 
              onClick={handleSmartSearch}
              disabled={isAILoading}
              className="hover-lift"
              style={{
                position: 'absolute', right: '10px', top: '10px', bottom: '10px',
                background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', 
                color: 'white', border: 'none',
                padding: '0 24px', borderRadius: '14px', fontWeight: 700, cursor: 'pointer',
                fontFamily: 'inherit', fontSize: '16px', textShadow: '0 1px 2px rgba(0,0,0,0.2)'
              }}
            >
              Ask AI ✨
            </button>
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              padding: '20px 32px', borderRadius: '20px', background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid var(--border-color)', color: 'white', fontSize: '18px',
              outline: 'none', cursor: 'pointer', fontFamily: 'inherit', backdropFilter: 'blur(10px)',
              fontWeight: 500
            }}
          >
            {categories.map((c) => <option key={c as string} value={c as string}>{c as string}</option>)}
          </select>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: '32px', flexWrap: 'wrap', padding: '0 20px' }}>
        
        {/* Main Content */}
        <div style={{ flex: '1 1 600px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700 }}>Top Products</h2>
            <span style={{ color: '#00D4AA', background: 'rgba(0, 212, 170, 0.1)', padding: '6px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 600 }}>{filtered.length} items</span>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {filtered.map((product) => {
              const stats = getPriceStats(product.prices);
              return (
                <div key={product.id} className="glass-panel hover-lift" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'flex-start', gap: '20px', position: 'relative' }}>
                    <div style={{ fontSize: '50px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '12px' }}>
                      {product.image}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 8px 0', lineHeight: 1.2 }}>{product.name}</h3>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '12px', background: 'rgba(108,58,232,0.2)', color: '#c4b5fd', padding: '4px 12px', borderRadius: '12px', fontWeight: 600 }}>{product.category}</span>
                        {stats.savings > 0 && (
                          <span style={{ fontSize: '12px', background: 'rgba(34,197,94,0.2)', color: '#86efac', padding: '4px 12px', borderRadius: '12px', fontWeight: 600 }}>
                            Save ₹{stats.savings}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {Object.entries(product.prices).map(([platform, data]) => {
                      const val = data as any;
                      const isCheap = platform === stats.cheapestPlatform;
                      const isExpensive = val.available && val.price === stats.max && stats.max > stats.min;
                      const c = (platformColors as any)[platform];
                      
                      return (
                        <div key={platform} style={{
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                          padding: '12px 16px', borderRadius: '16px',
                          background: isCheap ? c.light : 'rgba(10, 14, 26, 0.4)',
                          border: `1px solid ${isCheap ? c.bg : (isExpensive ? 'rgba(239,68,68,0.3)' : 'transparent')}`,
                          transition: 'all 0.2s ease'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '16px', fontWeight: 600 }}>{c.logo}</span>
                            {isCheap && <span style={{ fontSize: '10px', background: 'var(--success-color)', color: 'white', padding: '2px 8px', borderRadius: '8px', fontWeight: 800, letterSpacing: '0.5px' }}>BEST</span>}
                            {isExpensive && <span style={{ fontSize: '10px', background: 'rgba(239,68,68,0.8)', color: 'white', padding: '2px 8px', borderRadius: '8px', fontWeight: 800 }}>COSTLY</span>}
                          </div>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            {val.available ? (
                              <>
                                <span style={{ fontSize: '18px', fontWeight: 800, color: isCheap ? c.text : (isExpensive ? '#fca5a5' : 'white') }}>₹{val.price}</span>
                                <a href={val.url} target="_blank" rel="noreferrer" className="hover-lift" style={{
                                  fontSize: '13px', background: isCheap ? c.bg : '#334155', color: 'white', padding: '8px 16px',
                                  borderRadius: '10px', textDecoration: 'none', fontWeight: 700, display: 'inline-block'
                                }}>Buy</a>
                              </>
                            ) : (
                              <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 500 }}>Unavailable</span>
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

        {/* Sidebar - Budget Assistant */}
        <div style={{ flex: '1 1 340px', maxWidth: '420px' }}>
          <div className="glass-panel" style={{ padding: '32px', position: 'sticky', top: '32px', borderTop: '2px solid rgba(108, 58, 232, 0.5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', borderRadius: '16px', padding: '12px', fontSize: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className={isAILoading ? 'pulse-anim' : ''}>🤖</span>
              </div>
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: 'white' }}>Budget Assistant</h2>
                <span style={{ color: 'var(--secondary-color)', fontSize: '13px', fontWeight: 600 }}>Powered by AI</span>
              </div>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '15px', marginBottom: '24px', lineHeight: 1.6 }}>
              Enter your maximum budget. Our AI will curate the optimal basket using the lowest prices available across all platforms.
            </p>
            
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <div style={{ position: 'relative', flex: 1 }} className="glow-effect">
                <span style={{ position: 'absolute', margin: '16px 20px', color: '#94a3b8', fontSize: '18px', fontWeight: 700 }}>₹</span>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g. 500"
                  style={{
                    width: '100%', padding: '16px 16px 16px 44px', borderRadius: '16px',
                    background: 'rgba(10, 14, 26, 0.6)', border: '1px solid var(--border-color)',
                    color: 'white', fontSize: '18px', outline: 'none', fontFamily: 'inherit', fontWeight: 600
                  }}
                />
              </div>
              <button 
                onClick={handleBudgetAssistant}
                disabled={isAILoading}
                className="hover-lift"
                style={{
                  background: 'var(--primary-color)', color: 'white', border: 'none',
                  padding: '0 24px', borderRadius: '16px', fontWeight: 700, cursor: 'pointer',
                  fontFamily: 'inherit', fontSize: '16px', boxShadow: '0 4px 14px 0 rgba(108, 58, 232, 0.39)'
                }}
              >
                {isAILoading ? '...' : 'Plan'}
              </button>
            </div>

            {budgetResult && (
              <div style={{ background: 'rgba(10, 14, 26, 0.4)', borderRadius: '20px', padding: '24px', marginTop: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h4 style={{ margin: 0, fontSize: '16px', color: '#f8fafc', fontWeight: 700 }}>Optimized Basket</h4>
                  <span style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 700 }}>{budgetResult.basket.length} items</span>
                </div>
                
                {/* Visual Chart Breakdown */}
                <div style={{ marginBottom: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px' }}>
                  <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 12px 0', fontWeight: 600, textTransform: 'uppercase' }}>Budget Utilization</p>
                  <div style={{ height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', display: 'flex', overflow: 'hidden', marginBottom: '8px' }}>
                    {budgetResult.basket.map((b: any, i: number) => {
                      const percentage = (b.price / budgetResult.total) * 100;
                      return (
                        <div key={i} title={`${b.item.name}: ₹${b.price}`} style={{
                          width: `${percentage}%`,
                          background: (platformColors as any)[b.platform].bg,
                          borderRight: '1px solid rgba(0,0,0,0.2)'
                        }}></div>
                      );
                    })}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', fontWeight: 500 }}>
                    <span>0</span>
                    <span>Total: ₹{budgetResult.total}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {budgetResult.basket.map((b: any, i: number) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: i !== budgetResult.basket.length - 1 ? '1px dashed rgba(255,255,255,0.1)' : 'none' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '10px', fontSize: '18px' }}>{b.item.image}</div>
                        <div>
                          <div style={{ fontSize: '15px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '130px' }}>{b.item.name}</div>
                          <div style={{ fontSize: '12px', color: (platformColors as any)[b.platform].text, fontWeight: 600 }}>from {b.platform}</div>
                        </div>
                      </div>
                      <span style={{ fontSize: '16px', fontWeight: 800, color: 'white' }}>₹{b.price}</span>
                    </div>
                  ))}
                </div>
                
                <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '2px dashed rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#94a3b8', fontSize: '16px', fontWeight: 600 }}>Total Cost</span>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, color: 'var(--success-color)', fontSize: '28px', lineHeight: 1 }}>₹{budgetResult.total}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Under ₹{budget} budget</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
