"use client";
import { useState, useEffect } from 'react';
import { useAppContext } from '@/providers/AppProviders';
import { Timer, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { getIconForEmoji } from '@/utils/iconMap';
import CountUp from 'react-countup';

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
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel" style={{ padding: '24px', marginBottom: '32px', background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.12), rgba(255, 140, 0, 0.06))', border: '1px solid rgba(255, 107, 0, 0.35)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tag size={24} color="#FF6B00" />
          {t('deal_of_the_day') || 'Deal of the Day'}
        </h2>
        <div style={{ background: 'rgba(0,0,0,0.5)', padding: '6px 16px', borderRadius: '20px', color: 'var(--secondary-color)', fontWeight: 700, fontFamily: 'monospace', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(255, 107, 0, 0.3)' }}>
          <Timer size={16} className="pulse-anim" />
          {timeLeft}
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px' }} className="deals-scroll">
        {deals.map((d, i) => {
          const mockOriginal = Math.round(d.prices.Zepto.price * 1.3);
          return (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} key={d.id} className="hover-lift" style={{ minWidth: '220px', background: 'var(--card-bg-elevated)', borderRadius: '16px', padding: '16px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px', background: 'rgba(255,255,255,0.05)', width: 'max-content', padding: '12px', borderRadius: '12px', color: 'var(--text-color)' }}>
                {getIconForEmoji(d.image, 32)}
              </div>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.name}</h4>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span className="price-highlight" style={{ fontSize: '20px', fontWeight: 800 }}>₹<CountUp end={d.prices.Zepto.price} duration={1} /></span>
                <span style={{ fontSize: '14px', color: '#94a3b8', textDecoration: 'line-through' }}>₹{mockOriginal}</span>
              </div>
              <div style={{ marginTop: '8px', fontSize: '12px', background: 'rgba(255, 107, 0, 0.2)', color: 'var(--secondary-color)', padding: '4px 8px', borderRadius: '8px', display: 'inline-block', fontWeight: 700, width: 'fit-content' }}>
                SAVE <CountUp end={Math.round((1 - d.prices.Zepto.price / mockOriginal) * 100)} duration={1} />%
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  );
}
