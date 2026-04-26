"use client";
import { useState } from 'react';

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
    // mock realtime
    setAlerts(alerts.map(a => {
      if (a.id === alertId) {
        alert(`🔔 PRICE DROP ALERT! ${a.product.name} has dropped below ₹${a.targetPrice}!`);
        return { ...a, active: false };
      }
      return a;
    }));
  };

  return (
    <div className="glass-panel" style={{ padding: '32px', marginBottom: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', borderRadius: '16px', padding: '12px', fontSize: '28px' }}>
          🔔
        </div>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: 'white' }}>Price Alerts</h2>
          <span style={{ color: '#fbcfe8', fontSize: '13px', fontWeight: 600 }}>Powered by Realtime</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <select 
          value={selectedProduct} 
          onChange={(e) => setSelectedProduct(e.target.value)}
          style={{ flex: 2, padding: '12px', borderRadius: '12px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)', color: 'white', outline: 'none' }}
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
          style={{ flex: 1, padding: '12px', borderRadius: '12px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)', color: 'white', outline: 'none' }}
        />
        <button onClick={handleSetAlert} style={{ background: '#ec4899', color: 'white', border: 'none', padding: '0 24px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }} className="hover-lift">
          Set Alert
        </button>
      </div>

      {alerts.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ margin: 0, color: '#94a3b8' }}>Alert History</h4>
          {alerts.map(a => (
            <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px', opacity: a.active ? 1 : 0.6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ fontSize: '24px' }}>{a.product.image}</div>
                <div>
                  <div style={{ fontWeight: 600 }}>{a.product.name}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>Target: ₹{a.targetPrice}</div>
                </div>
              </div>
              {a.active ? (
                <button onClick={() => simulateDrop(a.id)} style={{ background: 'transparent', border: '1px solid #8b5cf6', color: '#c4b5fd', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>Simulate Drop</button>
              ) : (
                <span style={{ color: '#4ade80', fontSize: '12px', fontWeight: 600 }}>Triggered</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
