"use client";
import { useState } from 'react';
import { Bell, BellRing } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getIconForEmoji } from '@/utils/iconMap';

export default function PriceAlerts({ products }: { products: any[] }) {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [targetPrice, setTargetPrice] = useState("");

  const handleSetAlert = () => {
    if (!selectedProduct || !targetPrice) return;
    const p = products.find(x => x.id === selectedProduct);
    if (!p) return;

    const newAlert = {
      id: Date.now().toString(),
      product: p,
      targetPrice: parseInt(targetPrice),
      active: true
    };
    
    setAlerts([...alerts, newAlert]);
    setTargetPrice("");
  };

  const simulateDrop = (alertId: string) => {
    setAlerts(alerts.map(a => {
      if (a.id === alertId) {
        alert(`🔔 PRICE DROP ALERT! ${a.product.name} has dropped below ₹${a.targetPrice}!`);
        return { ...a, active: false };
      }
      return a;
    }));
  };

  return (
    <div className="glass-panel" style={{ padding: '32px', marginBottom: '32px', borderTop: '2px solid rgba(255, 107, 0, 0.5)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <div className="btn-gradient" style={{ borderRadius: '16px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <Bell size={28} />
        </div>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: 'white' }}>Price Alerts</h2>
          <span style={{ color: 'var(--secondary-color)', fontSize: '13px', fontWeight: 600 }}>Powered by Realtime</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <select 
          value={selectedProduct} 
          onChange={(e) => setSelectedProduct(e.target.value)}
          style={{ flex: '1 1 200px', padding: '14px', borderRadius: '14px', background: 'var(--surface-color)', border: '1px solid var(--border-color)', color: 'white', outline: 'none', fontFamily: 'inherit', fontSize: '15px' }}
        >
          <option value="">Select a Product</option>
          {products.slice(0, 100).map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <input 
          type="number"
          placeholder="Target Price (₹)"
          value={targetPrice}
          onChange={(e) => setTargetPrice(e.target.value)}
          style={{ flex: '1 1 120px', padding: '14px', borderRadius: '14px', background: 'var(--surface-color)', border: '1px solid var(--border-color)', color: 'white', outline: 'none', fontFamily: 'inherit', fontSize: '15px' }}
        />
        <button onClick={handleSetAlert} className="pro-btn hover-lift btn-gradient" style={{ color: '#0A0A0A', border: 'none', padding: '0 24px', borderRadius: '14px', fontWeight: 700, cursor: 'pointer', fontSize: '15px', height: '50px' }}>
          Set Alert
        </button>
      </div>

      <AnimatePresence>
        {alerts.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ margin: '0 0 8px 0', color: 'var(--muted-color)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Alert History</h4>
            {alerts.map((a, i) => (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={a.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface-color)', padding: '16px', borderRadius: '16px', border: '1px solid var(--border-color)', opacity: a.active ? 1 : 0.6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '10px', color: 'var(--text-color)' }}>
                    {getIconForEmoji(a.product.image, 24)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text-color)' }}>{a.product.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--muted-color)' }}>Target: ₹{a.targetPrice}</div>
                  </div>
                </div>
                {a.active ? (
                  <button onClick={() => simulateDrop(a.id)} className="pro-btn hover-lift" style={{ background: 'transparent', border: '1px solid var(--primary-color)', color: 'var(--secondary-color)', padding: '8px 16px', borderRadius: '10px', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <BellRing size={14} /> Simulate Drop
                  </button>
                ) : (
                  <span style={{ color: 'var(--primary-color)', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}><Bell size={14} /> Triggered</span>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
