"use client";
import { useState, useEffect } from 'react';
import { useAppContext } from '@/providers/AppProviders';

function getTimeToMidnight() {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  const diff = midnight.getTime() - now.getTime();
  
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / 1000 / 60) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export default function DealOfTheDay({ products }: { products: any[] }) {
  const { t } = useAppContext();
  const [deals, setDeals] = useState<any[]>([]);
  const [timeLeft, setTimeLeft] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Pick 5 random products for deals
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    setDeals(shuffled.slice(0, 5));

    setTimeLeft(getTimeToMidnight());
    const timer = setInterval(() => {
      setTimeLeft(getTimeToMidnight());
    }, 1000);
    return () => clearInterval(timer);
  }, [products]);

  if (!mounted || deals.length === 0) return null;

  return (
    <div className="glass-panel" style={{ padding: '24px', marginBottom: '32px', background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.1), rgba(220, 38, 38, 0.1))', border: '1px solid rgba(234, 179, 8, 0.3)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#fde047', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🔥</span> {t('deal_of_the_day') || 'Deal of the Day'}
        </h2>
        <div style={{ background: 'rgba(0,0,0,0.5)', padding: '6px 16px', borderRadius: '20px', color: '#fca5a5', fontWeight: 700, fontFamily: 'monospace', fontSize: '18px' }}>
          ⏱️ {timeLeft}
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
        {deals.map(d => {
          // Calculate mock deal
          const mockOriginal = Math.round(d.prices.Zepto.price * 1.3);
          return (
            <div key={d.id} style={{ minWidth: '220px', background: 'rgba(10, 14, 26, 0.6)', borderRadius: '16px', padding: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>{d.image}</div>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.name}</h4>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '20px', fontWeight: 800, color: '#4ade80' }}>₹{d.prices.Zepto.price}</span>
                <span style={{ fontSize: '14px', color: '#94a3b8', textDecoration: 'line-through' }}>₹{mockOriginal}</span>
              </div>
              <div style={{ marginTop: '8px', fontSize: '12px', background: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', padding: '4px 8px', borderRadius: '8px', display: 'inline-block', fontWeight: 700 }}>
                SAVE {Math.round((1 - d.prices.Zepto.price / mockOriginal) * 100)}%
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
