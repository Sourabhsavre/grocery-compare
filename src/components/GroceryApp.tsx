"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { useAppContext } from "@/providers/AppProviders";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";

const DealOfTheDay = dynamic(() => import("./DealOfTheDay"), { ssr: false });
const RecipeAssistant = dynamic(() => import("./RecipeAssistant"), { ssr: false });
const AuthModal = dynamic(() => import("./AuthModal"), { ssr: false });
const MonthlyPlanner = dynamic(() => import("./MonthlyPlanner"), { ssr: false });
const PriceAlerts = dynamic(() => import("./PriceAlerts"), { ssr: false });
const ImageScannerModal = dynamic(() => import("./ImageScannerModal"), { ssr: false });
const AboutModal = dynamic(() => import("./AboutModal"), { ssr: false });
import CountUp from "react-countup";
import { Search, Mic, Camera, ShoppingCart, Info, LogOut, Sparkles, Share2, Moon, Sun, Languages, ScanLine, Heart } from "lucide-react";
import { getIconForEmoji, getStoreIcon } from "@/utils/iconMap";
import SplashScreen from "./SplashScreen";
import WishlistModal from "./WishlistModal";
import { WishlistItem, getWishlist, addToWishlist, removeFromWishlist } from "@/utils/wishlist";

const platformColors: Record<string, { bg: string; light: string; text: string; name: string }> = {
  Zepto: { bg: "#8b5cf6", light: "rgba(139, 92, 246, 0.15)", text: "#c4b5fd", name: "Zepto" },
  BigBasket: { bg: "#22c55e", light: "rgba(34, 197, 94, 0.15)", text: "#86efac", name: "BigBasket" },
  Blinkit: { bg: "#eab308", light: "rgba(234, 179, 8, 0.15)", text: "#fde047", name: "Blinkit" },
  AmazonFresh: { bg: "#ff9900", light: "rgba(255, 153, 0, 0.15)", text: "#fcd34d", name: "Amazon Fresh" },
  JioMart: { bg: "#0057a8", light: "rgba(0, 87, 168, 0.15)", text: "#93c5fd", name: "JioMart" },
  SwiggyInstamart: { bg: "#fc8019", light: "rgba(252, 128, 25, 0.15)", text: "#fed7aa", name: "Swiggy Instamart" },
  DmartReady: { bg: "#cc0000", light: "rgba(204, 0, 0, 0.15)", text: "#fca5a5", name: "DMart Ready" },
};

const ALL_STORES = ["Zepto", "BigBasket", "Blinkit", "AmazonFresh", "JioMart", "SwiggyInstamart", "DmartReady"];

function getStoreSearchUrl(platform: string, productName: string): string {
  const q = encodeURIComponent(productName);
  switch (platform) {
    case "Zepto":           return `https://www.zepto.com/search?query=${q}`;
    case "BigBasket":       return `https://www.bigbasket.com/ps/?q=${q}`;
    case "Blinkit":         return `https://blinkit.com/s/?q=${q}`;
    case "JioMart":         return `https://www.jiomart.com/search/${q}`;
    case "AmazonFresh":     return `https://www.amazon.in/s?k=${q}`;
    case "SwiggyInstamart": return `https://www.swiggy.com/instamart/search?query=${q}`;
    case "DmartReady":      return `https://www.dmart.in/search?q=${q}`;
    default:                return `https://www.google.com/search?q=${q}+grocery`;
  }
}

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

export default function GroceryApp({ products }: { products: any[] }) {
  const { t, theme, toggleTheme, language, toggleLanguage } = useAppContext();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [budget, setBudget] = useState("");
  const [budgetResult, setBudgetResult] = useState<any>(null);
  const [isAILoading, setIsAILoading] = useState(false);
  const [selectedStores, setSelectedStores] = useState<string[]>(ALL_STORES);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [autocompleteResults, setAutocompleteResults] = useState<any[]>([]);
  
  const [user, setUser] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [cart, setCart] = useState<any[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [visibleCount, setVisibleCount] = useState(20);
  const [showSplash, setShowSplash] = useState(true);
  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    if (user) {
      getWishlist(user.id).then(setWishlistItems).catch(console.error);
    } else {
      setWishlistItems([]);
    }
  }, [user]);

  const handleToggleWishlist = useCallback(async (product: any, stats: any) => {
    if (!user) return;
    const isWishlisted = wishlistItems.some(item => item.product_id === product.id);
    
    try {
      if (isWishlisted) {
        setWishlistItems(prev => prev.filter(item => item.product_id !== product.id));
        await removeFromWishlist(user.id, product.id);
      } else {
        const newItem = await addToWishlist(user.id, product, stats);
        setWishlistItems(prev => [newItem, ...prev]);
      }
    } catch (error: any) {
      console.error("Error toggling wishlist:", error);
      alert("Failed to update wishlist: " + (error.message || error.toString()));
      // Revert optimistic update on failure by re-fetching
      getWishlist(user.id).then(setWishlistItems).catch(console.error);
    }
  }, [user, wishlistItems]);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (isLoadingProducts) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setVisibleCount(prev => prev + 20);
      }
    });
    if (node) observerRef.current.observe(node);
  }, [isLoadingProducts]);

  useEffect(() => {
    // Simulate initial loading for skeleton demo
    const timer = setTimeout(() => setIsLoadingProducts(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setVisibleCount(20);
  }, [search, category, selectedStores]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * (item.requiredQuantity || 1), 0);

  const handleStoreToggle = useCallback((store: string) => {
    setSelectedStores(prev =>
      prev.includes(store) ? prev.filter(s => s !== store) : [...prev, store]
    );
  }, []);

  const handleSearchChange = useCallback((val: string) => {
    setSearch(val);
    if (val.trim().length > 1) {
      const lower = val.toLowerCase();
      const matches = products
        .filter(p => p.name.toLowerCase().includes(lower))
        .slice(0, 8);
      setAutocompleteResults(matches);
      setShowAutocomplete(matches.length > 0);
    } else {
      setShowAutocomplete(false);
      setAutocompleteResults([]);
    }
  }, [products]);

  const handleAutocompleteSelect = useCallback((product: any) => {
    setSearch(product.name);
    setShowAutocomplete(false);
    setAutocompleteResults([]);
  }, []);

  const handleAddToCart = useCallback((items: any[]) => {
    setCart(prev => [...prev, ...items]);
    // Optional: Add toast notification instead of alert
    alert(`Added ${items.length} items to your cart!`);
  }, []);

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  const filtered = useMemo(() => {
    let lowerSearch = search.toLowerCase();
    
    let maxPrice = Infinity;
    const underMatch = lowerSearch.match(/under (\d+)/);
    if (underMatch) {
      maxPrice = parseInt(underMatch[1]);
      lowerSearch = lowerSearch.replace(underMatch[0], "").trim();
    }

    return products
      .filter((p) => {
        const matchSearch = p.name.toLowerCase().includes(lowerSearch) || p.category.toLowerCase().includes(lowerSearch);
        const matchCat = category === "All" || p.category === category;
        
        let meetsPrice = true;
        if (maxPrice !== Infinity) {
          const filteredPrices = Object.fromEntries(
            Object.entries(p.prices).filter(([k]) => selectedStores.includes(k))
          );
          const stats = getPriceStats(filteredPrices);
          if (stats.cheapestPlatform && (filteredPrices as any)[stats.cheapestPlatform].price > maxPrice) {
            meetsPrice = false;
          }
        }

        return matchSearch && matchCat && meetsPrice;
      })
      .map((p) => ({
        ...p,
        prices: Object.fromEntries(
          Object.entries(p.prices).filter(([k]) => selectedStores.includes(k))
        ),
      }));
  }, [search, category, products, selectedStores]);

  const handleSmartSearch = useCallback(async () => {
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
  }, [search, products]);

  const handleVoiceSearch = useCallback(() => {
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
      setTimeout(() => {
        setSearch(transcript);
      }, 500);
    };
    recognition.start();
  }, [language]);

  const handleBudgetAssistant = useCallback(async () => {
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
  }, [budget, products]);

  const shareProduct = useCallback((product: any) => {
    const text = `Check out ${product.name} on GroceryCompare AI!\nBest price: ₹${getPriceStats(product.prices).min}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  }, []);

  const shareBudget = useCallback(() => {
    if (!budgetResult) return;
    const text = `My Grocery Budget Plan (₹${budgetResult.target}):\nTotal Cost: ₹${budgetResult.total}\nItems: ${budgetResult.basket.length}\nPlanned with GroceryCompare AI!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  }, [budgetResult]);

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} style={{ minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Top Navbar */}
      <div style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #111111 100%)', borderBottom: '1px solid var(--border-color)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 4px 24px rgba(255, 107, 0, 0.08)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 20px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
        <button onClick={() => setShowAbout(true)} className="pro-btn" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', color: 'var(--text-color)', padding: '8px 16px', borderRadius: '10px', fontSize: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <Info size={16} />
          About
        </button>
        <button onClick={toggleLanguage} className="pro-btn" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', color: 'var(--text-color)', padding: '8px 16px', borderRadius: '10px', fontSize: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <Languages size={16} />
          {language === 'en' ? 'A / अ' : 'अ / A'}
        </button>
        <button onClick={toggleTheme} className="pro-btn" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', color: 'var(--text-color)', padding: '8px 12px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} title={theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}>
          {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
        {cart.length > 0 && (
          <button onClick={() => {
            const text = `My Grocery Cart:\n${cart.map(c => `- ${c.item.name} (₹${c.price})`).join('\n')}\nTotal: ₹${cartTotal}`;
            window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
          }} className="pro-btn float-anim" style={{ background: '#25D366', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '10px', boxShadow: '0 2px 12px rgba(37,211,102,0.35)' }}>
            <ShoppingCart size={18} />
            Cart ({cart.length})
          </button>
        )}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontWeight: 600, color: 'var(--success-color)', fontSize: '14px' }}>{user.email}</span>
            <button onClick={() => setShowWishlistModal(true)} className="pro-btn hover-lift" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', color: 'var(--text-color)', padding: '8px 16px', borderRadius: '10px', fontSize: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Heart size={16} fill={wishlistItems.length > 0 ? 'var(--primary-color)' : 'none'} color={wishlistItems.length > 0 ? 'var(--primary-color)' : 'var(--text-color)'} />
              Wishlist {wishlistItems.length > 0 && `(${wishlistItems.length})`}
            </button>
            <button onClick={() => setUser(null)} className="pro-btn" style={{ background: 'var(--danger-color)', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(239,68,68,0.3)' }}>
              <LogOut size={16} />
              {t('logout') || 'Logout'}
            </button>
          </div>
        ) : (
          <button onClick={() => setShowAuth(true)} className="pro-btn btn-gradient" style={{ color: 'white', border: 'none', padding: '8px 24px', borderRadius: '10px' }}>
            <Sparkles size={16} />
            {t('login') || 'Login'}
          </button>
        )}
        </div>
      </div>

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} onLogin={(u) => { setUser(u); setShowAuth(false); }} />
      <ImageScannerModal isOpen={showScanner} onClose={() => setShowScanner(false)} products={products} onScanComplete={handleAddToCart} />
      <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} />
      <WishlistModal isOpen={showWishlistModal} onClose={() => setShowWishlistModal(false)} wishlist={wishlistItems} onRemove={(pid) => handleToggleWishlist({ id: pid }, null)} />

      {/* Header */}
      <div className="glass-panel header-gradient" style={{ maxWidth: 1200, margin: '32px auto', padding: '40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50%', left: '-20%', width: '100%', height: '200%', background: 'radial-gradient(circle, rgba(255,107,0,0.15) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px', position: 'relative', zIndex: 1 }}>
          <div style={{ filter: 'drop-shadow(0 0 12px rgba(255,107,0,0.6))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)' }} className="pulse-anim">
            <ShoppingCart size={48} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="gradient-text" style={{ fontSize: '52px', fontWeight: 800, margin: 0, paddingBottom: '8px', letterSpacing: '-1.5px' }}>{t('app_title')}</h1>
            <p style={{ color: 'var(--muted-color)', fontSize: '18px', margin: 0, fontWeight: 500 }}>{t('app_subtitle')}</p>
          </div>
        </div>

        {/* Search & Filters */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '32px', position: 'relative', zIndex: 1 }}>
          <div style={{ flex: 1, position: 'relative', minWidth: '300px', display: 'flex', alignItems: 'center' }} className="glow-effect">
            <span style={{ position: 'absolute', left: '20px', display: 'flex', alignItems: 'center', color: 'var(--muted-color)', zIndex: 2 }}>
              <Search size={22} />
            </span>
            <input
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { setShowAutocomplete(false); handleSmartSearch(); } if (e.key === 'Escape') setShowAutocomplete(false); }}
              onBlur={() => setTimeout(() => setShowAutocomplete(false), 200)}
              placeholder={isListening ? 'Listening...' : t('search_placeholder')}
              style={{
                width: '100%', padding: '20px 180px 20px 56px', borderRadius: '20px',
                background: isListening ? 'rgba(239, 68, 68, 0.1)' : 'var(--surface-color)',
                border: isListening ? '1px solid #fca5a5' : '1px solid var(--border-color)',
                color: 'var(--text-color)', fontSize: '18px', outline: 'none', transition: 'all 0.3s ease',
                fontFamily: 'inherit', backdropFilter: 'blur(10px)'
              }}
            />
            {showAutocomplete && autocompleteResults.length > 0 && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{
                position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0,
                background: 'var(--surface-color)', border: '1px solid var(--border-color)',
                borderRadius: '16px', zIndex: 1000, overflow: 'hidden',
                boxShadow: '0 16px 40px rgba(0,0,0,0.4)', backdropFilter: 'blur(20px)'
              }}>
                {autocompleteResults.map((prod, idx) => {
                  const stats = getPriceStats(Object.fromEntries(Object.entries(prod.prices).filter(([k]) => selectedStores.includes(k))));
                  return (
                    <div
                      key={prod.id}
                      onMouseDown={() => handleAutocompleteSelect(prod)}
                      style={{
                        padding: '12px 20px', cursor: 'pointer', display: 'flex',
                        justifyContent: 'space-between', alignItems: 'center',
                        borderBottom: idx < autocompleteResults.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                        transition: 'background 0.15s'
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '22px', color: 'var(--muted-color)' }}>{getIconForEmoji(prod.image, 24)}</span>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text-color)' }}>{prod.name}</div>
                          <div style={{ fontSize: '12px', color: 'var(--muted-color)' }}>{prod.category}</div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div className="price-highlight" style={{ fontWeight: 700, fontSize: '15px' }}>from ₹{stats.min}</div>
                        {stats.savings > 0 && <div style={{ fontSize: '11px', color: '#94a3b8' }}>save ₹{stats.savings}</div>}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}

            {/* Mic and Camera buttons inside search */}
            <div style={{ position: 'absolute', right: '140px', display: 'flex', gap: '8px' }}>
              <button className="custom-btn-hover" onClick={handleVoiceSearch} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: isListening ? '#fca5a5' : 'var(--text-color)', display: 'flex', alignItems: 'center', position: 'relative' }} title="Voice Search">
                {isListening ? (
                  <div style={{ display: 'flex', alignItems: 'center', height: '24px' }}>
                    <div className="mic-wave"></div><div className="mic-wave"></div><div className="mic-wave"></div><div className="mic-wave"></div>
                  </div>
                ) : (
                  <Mic className="svg-icon" size={24} />
                )}
              </button>
              <button className="custom-btn-hover" onClick={() => setShowScanner(true)} style={{ background: 'transparent', border: 'none', color: 'var(--text-color)', cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Scan List">
                <Camera className="svg-icon" size={24} />
              </button>
            </div>

            <button 
              onClick={handleSmartSearch}
              disabled={isAILoading}
              className="pro-btn btn-gradient"
              style={{
                position: 'absolute', right: '10px', top: '10px', bottom: '10px',
                color: '#0A0A0A', border: 'none',
                padding: '0 24px', borderRadius: '14px', fontWeight: 700, cursor: 'pointer',
                fontFamily: 'inherit', fontSize: '16px', textShadow: 'none'
              }}
            >
              {isAILoading ? <Sparkles size={18} className="pulse-anim" /> : <Sparkles size={18} />}
              {t('ask_ai')}
            </button>
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              padding: '20px 32px', borderRadius: '20px', background: 'var(--surface-color)',
              border: '1px solid var(--border-color)', color: 'var(--text-color)', fontSize: '18px',
              outline: 'none', cursor: 'pointer', fontFamily: 'inherit', backdropFilter: 'blur(10px)',
              fontWeight: 500
            }}
          >
            {categories.map((c) => <option key={c as string} value={c as string}>{c as string}</option>)}
          </select>
        </div>

        {/* Store Filter */}
        <div style={{ marginTop: '20px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--muted-color)', textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>Filter Stores:</span>
            <button
              onClick={() => setSelectedStores([...ALL_STORES])}
              style={{ fontSize: '12px', padding: '6px 16px', borderRadius: '20px', border: '1px solid var(--border-color)', background: selectedStores.length === ALL_STORES.length ? 'var(--primary-color)' : 'transparent', color: 'white', cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s' }}
            >All</button>
            <button
              onClick={() => setSelectedStores([])}
              style={{ fontSize: '12px', padding: '6px 16px', borderRadius: '20px', border: '1px solid var(--border-color)', background: 'transparent', color: 'var(--muted-color)', cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s' }}
            >None</button>
            {ALL_STORES.map(store => {
              const c = platformColors[store];
              const active = selectedStores.includes(store);
              return (
                <button
                  key={store}
                  onClick={() => handleStoreToggle(store)}
                  style={{
                    fontSize: '12px', padding: '6px 16px', borderRadius: '20px', cursor: 'pointer',
                    border: `1px solid ${active ? c.bg : 'var(--border-color)'}`,
                    background: active ? c.light : 'transparent',
                    color: active ? c.text : 'var(--muted-color)',
                    fontWeight: 600, transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '6px'
                  }}
                >
                  <span style={{ color: active ? c.bg : '#64748b' }}>{getStoreIcon(store, 14)}</span>
                  {c.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: '32px', flexWrap: 'wrap', padding: '0 20px' }}>
        
        {/* Main Content */}
        <div style={{ flex: '2 1 700px' }}>
          <DealOfTheDay products={products} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700 }}>{t('top_products')}</h2>
            <span style={{ color: 'var(--primary-color)', background: 'rgba(255, 107, 0, 0.12)', padding: '6px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 600, border: '1px solid rgba(255, 107, 0, 0.25)' }}>{filtered.length} {t('items')}</span>
          </div>
          
          {isLoadingProducts ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="glass-panel" style={{ height: '300px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ padding: '24px', display: 'flex', gap: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="skeleton-box" style={{ width: '60px', height: '60px', borderRadius: '16px' }}></div>
                    <div style={{ flex: 1 }}>
                      <div className="skeleton-box" style={{ width: '80%', height: '20px', marginBottom: '12px' }}></div>
                      <div className="skeleton-box" style={{ width: '40%', height: '16px' }}></div>
                    </div>
                  </div>
                  <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div className="skeleton-box" style={{ width: '100%', height: '40px', borderRadius: '12px' }}></div>
                    <div className="skeleton-box" style={{ width: '100%', height: '40px', borderRadius: '12px' }}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                {filtered.slice(0, visibleCount).map((product, index) => {
                  const stats = getPriceStats(product.prices);
                  const isLastElement = index === filtered.slice(0, visibleCount).length - 1;
                  return (
                    <div key={product.id} ref={isLastElement ? lastElementRef : null}>
                      <ProductCard 
                        product={product} 
                        stats={stats} 
                        platformColors={platformColors} 
                        t={t} 
                        shareProduct={shareProduct} 
                        getStoreSearchUrl={getStoreSearchUrl} 
                        user={user}
                        isWishlisted={wishlistItems.some(item => item.product_id === product.id)}
                        onToggleWishlist={handleToggleWishlist}
                      />
                    </div>
                  );
                })}
              </motion.div>
              {filtered.length > visibleCount && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px', marginTop: '24px' }}>
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="glass-panel" style={{ height: '300px', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ padding: '24px', display: 'flex', gap: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <div className="skeleton-box" style={{ width: '60px', height: '60px', borderRadius: '16px' }}></div>
                        <div style={{ flex: 1 }}>
                          <div className="skeleton-box" style={{ width: '80%', height: '20px', marginBottom: '12px' }}></div>
                          <div className="skeleton-box" style={{ width: '40%', height: '16px' }}></div>
                        </div>
                      </div>
                      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div className="skeleton-box" style={{ width: '100%', height: '40px', borderRadius: '12px' }}></div>
                        <div className="skeleton-box" style={{ width: '100%', height: '40px', borderRadius: '12px' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Sidebar - Assistant & Planner */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} style={{ flex: '1 1 320px', maxWidth: '380px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          <RecipeAssistant products={products} addToCart={handleAddToCart} />
          
          <MonthlyPlanner products={products} addToCart={handleAddToCart} />

          <PriceAlerts products={products} />

          <div className="glass-panel" style={{ padding: '32px', borderTop: '2px solid rgba(255, 107, 0, 0.5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div className="btn-gradient" style={{ borderRadius: '16px', padding: '12px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className={isAILoading ? 'pulse-anim' : ''} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={28} />
                </div>
              </div>
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: 'white' }}>{t('budget_assistant')}</h2>
                <span style={{ color: 'var(--secondary-color)', fontSize: '13px', fontWeight: 600 }}>{t('powered_by_ai')}</span>
              </div>
            </div>
            <p style={{ color: 'var(--muted-color)', fontSize: '15px', marginBottom: '24px', lineHeight: 1.6 }}>
              {t('budget_desc')}
            </p>
            
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <div style={{ position: 'relative', flex: 1 }} className="glow-effect">
                <span style={{ position: 'absolute', margin: '16px 20px', color: 'var(--muted-color)', fontSize: '18px', fontWeight: 700 }}>₹</span>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g. 500"
                  style={{
                    width: '100%', padding: '16px 16px 16px 44px', borderRadius: '16px',
                    background: 'var(--surface-color)', border: '1px solid var(--border-color)',
                    color: 'white', fontSize: '18px', outline: 'none', fontFamily: 'inherit', fontWeight: 600
                  }}
                />
              </div>
              <button 
                onClick={handleBudgetAssistant}
                disabled={isAILoading}
                className="pro-btn hover-lift btn-gradient"
                style={{
                  color: '#0A0A0A', border: 'none',
                  padding: '0 24px', borderRadius: '16px', fontWeight: 700, cursor: 'pointer',
                  fontFamily: 'inherit', fontSize: '16px'
                }}
              >
                {isAILoading ? '...' : t('plan')}
              </button>
            </div>

            <AnimatePresence>
              {budgetResult && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ background: 'var(--card-bg-elevated)', borderRadius: '20px', padding: '24px', marginTop: '16px', border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}
                >
                  <button onClick={shareBudget} style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(37, 211, 102, 0.2)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', color: '#25D366' }} className="hover-lift" title="Share Plan on WhatsApp">
                    <Share2 size={14} />
                  </button>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingRight: '40px' }}>
                    <h4 style={{ margin: 0, fontSize: '16px', color: 'var(--text-color)', fontWeight: 700 }}>{t('optimized_basket')}</h4>
                    <span style={{ background: 'rgba(255,107,0,0.15)', color: 'var(--primary-color)', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 700 }}>{budgetResult.basket.length} {t('items')}</span>
                  </div>
                  
                  {/* Visual Chart Breakdown */}
                  <div style={{ marginBottom: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px' }}>
                    <p style={{ fontSize: '12px', color: 'var(--muted-color)', margin: '0 0 12px 0', fontWeight: 600, textTransform: 'uppercase' }}>{t('budget_utilization')}</p>
                    <div style={{ height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', display: 'flex', overflow: 'hidden', marginBottom: '8px' }}>
                      {budgetResult.basket.map((b: any, i: number) => {
                        const percentage = (b.price / budgetResult.total) * 100;
                        return (
                          <motion.div initial={{ width: 0 }} animate={{ width: `${percentage}%` }} transition={{ duration: 1, delay: i * 0.1 }} key={i} title={`${b.item.name}: ₹${b.price}`} style={{
                            background: (platformColors as any)[b.platform].bg,
                            borderRight: '1px solid rgba(0,0,0,0.2)'
                          }}></motion.div>
                        );
                      })}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--muted-color)', fontWeight: 500 }}>
                      <span>0</span>
                      <span>{t('total')}: ₹<CountUp end={budgetResult.total} duration={1} /></span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {budgetResult.basket.map((b: any, i: number) => (
                      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }} key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: i !== budgetResult.basket.length - 1 ? '1px dashed rgba(255,255,255,0.1)' : 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '12px', color: 'var(--text-color)', border: '1px solid var(--border-color)' }}>
                            {getIconForEmoji(b.item.image, 20)}
                          </div>
                          <div>
                            <div style={{ fontSize: '15px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '130px' }}>{b.item.name}</div>
                            <div style={{ fontSize: '12px', color: (platformColors as any)[b.platform].text, fontWeight: 600 }}>{t('from')} {(platformColors as any)[b.platform].name}</div>
                          </div>
                        </div>
                        <span style={{ fontSize: '16px', fontWeight: 800, color: 'white' }}>₹{b.price}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '2px dashed rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'var(--muted-color)', fontSize: '16px', fontWeight: 600 }}>{t('used_budget')}</span>
                      <span style={{ fontWeight: 800, color: 'var(--success-color)', fontSize: '24px' }}>₹<CountUp end={budgetResult.total} duration={1} /></span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'var(--muted-color)', fontSize: '16px', fontWeight: 600 }}>{t('remaining_budget')}</span>
                      <span style={{ fontWeight: 800, color: 'var(--secondary-color)', fontSize: '20px' }}>₹<CountUp end={budgetResult.target - budgetResult.total} duration={1} /></span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ color: '#64748b', fontSize: '14px', fontWeight: 500 }}>{t('target_budget')}</span>
                      <span style={{ color: '#64748b', fontSize: '14px', fontWeight: 500 }}>₹{budgetResult.target}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
      
      {/* Mobile Floating Action Button */}
      <button 
        onClick={() => setShowScanner(true)}
        className="hover-lift float-anim btn-gradient"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '64px',
          height: '64px',
          borderRadius: '32px',
          color: '#0A0A0A',
          border: 'none',
          cursor: 'pointer',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ScanLine size={28} />
      </button>

      {/* Footer */}
      <footer style={{
        padding: '24px',
        textAlign: 'center',
        borderTop: '1px solid var(--border-color)',
        background: 'rgba(0,0,0,0.2)',
        marginTop: '60px',
        backdropFilter: 'blur(10px)'
      }}>
        <p style={{ fontSize: '14px', color: 'var(--muted-color)', margin: '0 0 8px' }}>
          Built with{' '}
          <span style={{ color: '#ef4444' }}>♥</span>
          {' '}by{' '}
          <button
            onClick={() => setShowAbout(true)}
            style={{
              border: 'none', cursor: 'pointer', padding: 0,
              fontWeight: 700, fontSize: '14px', fontFamily: 'inherit',
              background: 'linear-gradient(135deg, var(--secondary-color), var(--primary-color))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
            } as any}
          >
            Sourabh Savre
          </button>
        </p>
        <p style={{ fontSize: '12px', color: 'var(--muted-color)', margin: 0, opacity: 0.7 }}>
          GroceryCompare AI &nbsp;·&nbsp; © 2026 &nbsp;·&nbsp; Made in India
        </p>
      </footer>
    </motion.div>
    </>
  );
}
