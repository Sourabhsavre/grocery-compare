"use client";
import { useState } from 'react';
import { useAppContext } from '@/providers/AppProviders';
import { ChefHat, ShoppingCart, Sparkles } from 'lucide-react';
import { getIconForEmoji } from '@/utils/iconMap';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';

export default function RecipeAssistant({ products, addToCart }: { products: any[], addToCart: (items: any[]) => void }) {
  const { t } = useAppContext();
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSearch = async () => {
    if (!recipe.trim()) return;
    setLoading(true);
    try {
      const prompt = `Find products from this list that are ingredients for: ${recipe}. Return only relevant matching products.`;
      const response = await fetch('/api/ai/recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipeName: recipe, prompt, products })
      });
      const data = await response.json();
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '32px', marginBottom: '32px', borderTop: '2px solid rgba(255, 107, 0, 0.5)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <div className="btn-gradient" style={{ borderRadius: '16px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          {loading ? <Sparkles className="pulse-anim" size={28} /> : <ChefHat size={28} />}
        </div>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: 'white' }}>{t('recipe_assistant')}</h2>
          <span style={{ color: 'var(--secondary-color)', fontSize: '13px', fontWeight: 600 }}>{t('powered_by_ai')}</span>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <div style={{ position: 'relative', flex: 1 }} className="glow-effect">
          <input
            value={recipe}
            onChange={(e) => setRecipe(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder={t('recipe_placeholder')}
            style={{
              width: '100%', padding: '16px', borderRadius: '16px',
              background: 'var(--surface-color)', border: '1px solid var(--border-color)',
              color: 'white', fontSize: '18px', outline: 'none', fontFamily: 'inherit'
            }}
          />
        </div>
        <button 
          onClick={handleSearch}
          disabled={loading}
          className="pro-btn hover-lift btn-gradient"
          style={{
            color: 'white', border: 'none',
            padding: '0 24px', borderRadius: '16px', fontWeight: 700, cursor: 'pointer',
            fontFamily: 'inherit', fontSize: '16px'
          }}
        >
          {loading ? '...' : t('get_ingredients')}
        </button>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ background: 'var(--card-bg-elevated)', borderRadius: '20px', padding: '24px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>Ingredients for {result.recipeName}</h4>
              <span style={{ background: 'rgba(255,107,0,0.15)', color: 'var(--secondary-color)', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 700 }}>{result.basket.length} items</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {result.basket.map((b: any, i: number) => (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ color: 'var(--text-color)', background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '8px' }}>
                      {getIconForEmoji(b.item.image, 20)}
                    </div>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 600 }}>{b.item.name}</div>
                      <div style={{ fontSize: '12px', color: '#94a3b8' }}>Best at {b.platform}</div>
                    </div>
                  </div>
                  <span className="price-highlight" style={{ fontSize: '16px', fontWeight: 800 }}>₹{b.price}</span>
                </motion.div>
              ))}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '2px dashed rgba(255,255,255,0.1)' }}>
              <div>
                <div style={{ fontSize: '14px', color: '#94a3b8' }}>Total Recipe Cost</div>
                <div className="price-highlight" style={{ fontSize: '28px', fontWeight: 800 }}>₹<CountUp end={result.total} duration={1} /></div>
              </div>
              <button onClick={() => addToCart(result.basket)} className="pro-btn hover-lift btn-gradient" style={{ color: '#0A0A0A', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShoppingCart size={20} /> Add All to Cart
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
