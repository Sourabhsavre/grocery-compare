"use client";
import { useState } from 'react';
import { useAppContext } from '@/providers/AppProviders';

export default function RecipeAssistant({ products, addToCart }: { products: any[], addToCart: (items: any[]) => void }) {
  const { t } = useAppContext();
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSearch = async () => {
    if (!recipe.trim()) return;
    setLoading(true);
    try {
      const response = await fetch('/api/ai/recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipeName: recipe, products })
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
    <div className="glass-panel" style={{ padding: '32px', marginBottom: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)', borderRadius: '16px', padding: '12px', fontSize: '28px' }}>
          👨‍🍳
        </div>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: 'white' }}>{t('recipe_assistant') || 'Recipe Assistant'}</h2>
          <span style={{ color: '#fca5a5', fontSize: '13px', fontWeight: 600 }}>{t('powered_by_ai')}</span>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <div style={{ position: 'relative', flex: 1 }} className="glow-effect">
          <input
            value={recipe}
            onChange={(e) => setRecipe(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder={t('recipe_placeholder') || 'e.g. Butter Chicken or Dal Tadka'}
            style={{
              width: '100%', padding: '16px', borderRadius: '16px',
              background: 'rgba(10, 14, 26, 0.6)', border: '1px solid var(--border-color)',
              color: 'white', fontSize: '18px', outline: 'none', fontFamily: 'inherit'
            }}
          />
        </div>
        <button 
          onClick={handleSearch}
          disabled={loading}
          className="hover-lift"
          style={{
            background: 'linear-gradient(135deg, #f59e0b, #ef4444)', color: 'white', border: 'none',
            padding: '0 24px', borderRadius: '16px', fontWeight: 700, cursor: 'pointer',
            fontFamily: 'inherit', fontSize: '16px'
          }}
        >
          {loading ? '...' : (t('get_ingredients') || 'Get Ingredients')}
        </button>
      </div>

      {result && (
        <div style={{ background: 'rgba(10, 14, 26, 0.4)', borderRadius: '20px', padding: '24px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>Ingredients for {result.recipeName}</h4>
            <span style={{ background: 'rgba(245,158,11,0.15)', color: '#fcd34d', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 700 }}>{result.basket.length} items</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {result.basket.map((b: any, i: number) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ fontSize: '20px' }}>{b.item.image}</div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 600 }}>{b.item.name}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>Best at {b.platform}</div>
                  </div>
                </div>
                <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--success-color)' }}>₹{b.price}</span>
              </div>
            ))}
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '2px dashed rgba(255,255,255,0.1)' }}>
            <div>
              <div style={{ fontSize: '14px', color: '#94a3b8' }}>Total Recipe Cost</div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: 'white' }}>₹{result.total}</div>
            </div>
            <button onClick={() => addToCart(result.basket)} className="hover-lift" style={{ background: 'var(--success-color)', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🛒</span> Add All to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
