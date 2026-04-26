"use client";

import { useState, useMemo } from "react";
import { useAppContext } from "@/providers/AppProviders";
import DealOfTheDay from "./DealOfTheDay";
import RecipeAssistant from "./RecipeAssistant";
import AuthModal from "./AuthModal";
import MonthlyPlanner from "./MonthlyPlanner";
import PriceAlerts from "./PriceAlerts";
import ImageScannerModal from "./ImageScannerModal";

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
  const { t, theme, toggleTheme, language, toggleLanguage } = useAppContext();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [budget, setBudget] = useState("");
  const [budgetResult, setBudgetResult] = useState<any>(null);
  const [isAILoading, setIsAILoading] = useState(false);
  
  const [user, setUser] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [cart, setCart] = useState<any[]>([]);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * (item.requiredQuantity || 1), 0);

  const handleAddToCart = (items: any[]) => {
    setCart([...cart, ...items]);
    alert(`Added ${items.length} items to your cart!`);
  };

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
      
      const msg = new SpeechSynthesisUtterance(`Found results for ${data.cleanQuery || search}`);
      window.speechSynthesis.speak(msg);

    } catch (e) {
      console.error(e);
    } finally {
      setIsAILoading(false);
    }
  }

  const handleVoiceSearch = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Voice recognition not supported in this browser.");
    
    const recognition = new SpeechRecognition();
    recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.interimResults = false;
    
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setSearch(transcript);
      // Let the user see what was typed, then search
      setTimeout(() => {
        // Trigger search by passing transcript directly since state might not be fully updated
        const dummyEvent = { key: 'Enter', target: { value: transcript } };
        // We will just call a smart search with the transcript
        setSearch(transcript);
      }, 500);
    };
    recognition.start();
  };

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
  const shareProduct = (product: any) => {
    const text = `Check out ${product.name} on GroceryCompare AI!\nBest price: ₹${getPriceStats(product.prices).min}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareBudget = () => {
    if (!budgetResult) return;
    const text = `My Grocery Budget Plan (₹${budgetResult.target}):\nTotal Cost: ₹${budgetResult.total}\nItems: ${budgetResult.basket.length}\nPlanned with GroceryCompare AI!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Top Navbar */}
      <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'flex-end', gap: '16px', background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid var(--border-color)' }}>
        <button onClick={toggleLanguage} style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-color)', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
          {language === 'en' ? 'A / अ' : 'अ / A'}
        </button>
        <button onClick={toggleTheme} style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-color)', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '18px' }}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        {cart.length > 0 && (
          <button onClick={() => {
            const text = `My Grocery Cart:\n${cart.map(c => `- ${c.item.name} (₹${c.price})`).join('\n')}\nTotal: ₹${cartTotal}`;
            window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
          }} style={{ background: '#25D366', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            🛒 Share Cart ({cart.length})
          </button>
        )}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontWeight: 600, color: 'var(--success-color)' }}>{user.email}</span>
            <button onClick={() => setUser(null)} style={{ background: 'var(--danger-color)', color: 'white', border: 'none', padding: '8px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
              {t('logout') || 'Logout'}
            </button>
          </div>
        ) : (
          <button onClick={() => setShowAuth(true)} style={{ background: 'var(--primary-color)', color: 'white', border: 'none', padding: '8px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
            {t('login') || 'Login'}
          </button>
        )}
      </div>

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} onLogin={(u) => { setUser(u); setShowAuth(false); }} />
      <ImageScannerModal isOpen={showScanner} onClose={() => setShowScanner(false)} products={products} onScanComplete={handleAddToCart} />

      {/* Header */}
      <div className="glass-panel hover-lift" style={{ maxWidth: 1100, margin: '32px auto', padding: '40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50%', left: '-20%', width: '100%', height: '200%', background: 'radial-gradient(circle, rgba(108,58,232,0.1) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '56px', filter: 'drop-shadow(0 0 10px rgba(0,212,170,0.5))' }} className="pulse-anim">🛒</div>
          <div>
            <h1 className="gradient-text" style={{ fontSize: '48px', fontWeight: 800, margin: 0, paddingBottom: '8px', letterSpacing: '-1px' }}>{t('app_title')}</h1>
            <p style={{ color: '#94a3b8', fontSize: '18px', margin: 0, fontWeight: 500 }}>{t('app_subtitle')}</p>
          </div>
        </div>

        {/* Search & Filters */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '32px', position: 'relative', zIndex: 1 }}>
          <div style={{ flex: 1, position: 'relative', minWidth: '300px', display: 'flex', alignItems: 'center' }} className="glow-effect">
            <span style={{ position: 'absolute', left: '20px', fontSize: '22px' }}>🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSmartSearch()}
              placeholder={isListening ? 'Listening...' : t('search_placeholder')}
              style={{
                width: '100%', padding: '20px 180px 20px 56px', borderRadius: '20px',
                background: isListening ? 'rgba(239, 68, 68, 0.2)' : 'rgba(15, 23, 42, 0.6)', 
                border: isListening ? '1px solid #fca5a5' : '1px solid var(--border-color)',
                color: 'white', fontSize: '18px', outline: 'none', transition: 'all 0.3s ease',
                fontFamily: 'inherit', backdropFilter: 'blur(10px)'
              }}
            />
            
            {/* Mic and Camera buttons inside search */}
            <div style={{ position: 'absolute', right: '140px', display: 'flex', gap: '8px' }}>
              <button onClick={handleVoiceSearch} style={{ background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer', color: isListening ? '#fca5a5' : 'white' }} title="Voice Search">
                🎤
              </button>
              <button onClick={() => setShowScanner(true)} style={{ background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer' }} title="Scan List">
                📷
              </button>
            </div>

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
              {t('ask_ai')}
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
          <DealOfTheDay products={products} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700 }}>{t('top_products')}</h2>
            <span style={{ color: '#00D4AA', background: 'rgba(0, 212, 170, 0.1)', padding: '6px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 600 }}>{filtered.length} {t('items')}</span>
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
                            {t('save')} ₹{stats.savings}
                          </span>
                        )}
                      </div>
                    </div>
                    <button onClick={() => shareProduct(product)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'rgba(37, 211, 102, 0.2)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', color: '#25D366' }} className="hover-lift" title="Share on WhatsApp">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                    </button>
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
                            {isCheap && <span style={{ fontSize: '10px', background: 'var(--success-color)', color: 'white', padding: '2px 8px', borderRadius: '8px', fontWeight: 800, letterSpacing: '0.5px' }}>{t('best')}</span>}
                            {isExpensive && <span style={{ fontSize: '10px', background: 'rgba(239,68,68,0.8)', color: 'white', padding: '2px 8px', borderRadius: '8px', fontWeight: 800 }}>{t('costly')}</span>}
                          </div>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            {val.available ? (
                              <>
                                <span style={{ fontSize: '18px', fontWeight: 800, color: isCheap ? c.text : (isExpensive ? '#fca5a5' : 'white') }}>₹{val.price}</span>
                                <a href={val.url} target="_blank" rel="noreferrer" className="hover-lift" style={{
                                  fontSize: '13px', background: isCheap ? c.bg : '#334155', color: 'white', padding: '8px 16px',
                                  borderRadius: '10px', textDecoration: 'none', fontWeight: 700, display: 'inline-block'
                                }}>{t('buy')}</a>
                              </>
                            ) : (
                              <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 500 }}>{t('unavailable')}</span>
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

        {/* Sidebar - Assistant & Planner */}
        <div style={{ flex: '1 1 340px', maxWidth: '420px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          <RecipeAssistant products={products} addToCart={handleAddToCart} />
          
          <MonthlyPlanner products={products} addToCart={handleAddToCart} />

          <PriceAlerts products={products} />

          <div className="glass-panel" style={{ padding: '32px', borderTop: '2px solid rgba(108, 58, 232, 0.5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', borderRadius: '16px', padding: '12px', fontSize: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className={isAILoading ? 'pulse-anim' : ''}>🤖</span>
              </div>
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: 'white' }}>{t('budget_assistant')}</h2>
                <span style={{ color: 'var(--secondary-color)', fontSize: '13px', fontWeight: 600 }}>{t('powered_by_ai')}</span>
              </div>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '15px', marginBottom: '24px', lineHeight: 1.6 }}>
              {t('budget_desc')}
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
                {isAILoading ? '...' : t('plan')}
              </button>
            </div>

            {budgetResult && (
              <div style={{ background: 'rgba(10, 14, 26, 0.4)', borderRadius: '20px', padding: '24px', marginTop: '16px', border: '1px solid rgba(255,255,255,0.08)', position: 'relative' }}>
                <button onClick={shareBudget} style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(37, 211, 102, 0.2)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', color: '#25D366' }} className="hover-lift" title="Share Plan on WhatsApp">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                </button>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingRight: '40px' }}>
                  <h4 style={{ margin: 0, fontSize: '16px', color: '#f8fafc', fontWeight: 700 }}>{t('optimized_basket')}</h4>
                  <span style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 700 }}>{budgetResult.basket.length} {t('items')}</span>
                </div>
                
                {/* Visual Chart Breakdown */}
                <div style={{ marginBottom: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px' }}>
                  <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 12px 0', fontWeight: 600, textTransform: 'uppercase' }}>{t('budget_utilization')}</p>
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
                    <span>{t('total')}: ₹{budgetResult.total}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {budgetResult.basket.map((b: any, i: number) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: i !== budgetResult.basket.length - 1 ? '1px dashed rgba(255,255,255,0.1)' : 'none' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '10px', fontSize: '18px' }}>{b.item.image}</div>
                        <div>
                          <div style={{ fontSize: '15px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '130px' }}>{b.item.name}</div>
                          <div style={{ fontSize: '12px', color: (platformColors as any)[b.platform].text, fontWeight: 600 }}>{t('from')} {b.platform}</div>
                        </div>
                      </div>
                      <span style={{ fontSize: '16px', fontWeight: 800, color: 'white' }}>₹{b.price}</span>
                    </div>
                  ))}
                </div>
                
                <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '2px dashed rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#94a3b8', fontSize: '16px', fontWeight: 600 }}>{t('used_budget')}</span>
                    <span style={{ fontWeight: 800, color: 'var(--success-color)', fontSize: '24px' }}>₹{budgetResult.total}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#94a3b8', fontSize: '16px', fontWeight: 600 }}>{t('remaining_budget')}</span>
                    <span style={{ fontWeight: 800, color: '#38bdf8', fontSize: '20px' }}>₹{budgetResult.target - budgetResult.total}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ color: '#64748b', fontSize: '14px', fontWeight: 500 }}>{t('target_budget')}</span>
                    <span style={{ color: '#64748b', fontSize: '14px', fontWeight: 500 }}>₹{budgetResult.target}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Floating Action Button */}
      <button 
        onClick={() => setShowScanner(true)}
        className="hover-lift"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '64px',
          height: '64px',
          borderRadius: '32px',
          background: 'linear-gradient(135deg, #10b981, #3b82f6)',
          color: 'white',
          fontSize: '28px',
          border: 'none',
          boxShadow: '0 8px 16px rgba(0,0,0,0.3), 0 0 20px rgba(16, 185, 129, 0.4)',
          cursor: 'pointer',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        📷
      </button>
    </div>
  );
}
