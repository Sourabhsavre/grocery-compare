"use client";
import { useState, useRef } from 'react';

export default function ImageScannerModal({ isOpen, onClose, products, onScanComplete }: { isOpen: boolean, onClose: () => void, products: any[], onScanComplete: (items: any[]) => void }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      // Create a fake base64 or just send file name
      const reader = new FileReader();
      reader.onload = async () => {
        const res = await fetch('/api/ai/vision', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: reader.result, products })
        });
        const data = await res.json();
        setResult(data);
        setLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleAddAll = () => {
    onScanComplete(result.basket);
    setResult(null);
    onClose();
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-panel" style={{ width: '90%', maxWidth: '500px', padding: '32px', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer' }}>×</button>
        
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📷</div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 8px 0' }}>Scan Grocery List</h2>
          <p style={{ color: '#94a3b8', margin: 0 }}>AI Vision will extract handwritten or typed lists instantly.</p>
        </div>

        {!loading && !result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button onClick={() => fileInputRef.current?.click()} style={{ background: 'var(--primary-color)', color: 'white', padding: '16px', borderRadius: '16px', border: 'none', fontSize: '18px', fontWeight: 700, cursor: 'pointer' }}>
              Open Camera / Gallery
            </button>
            <input type="file" ref={fileInputRef} onChange={handleFile} accept="image/*,application/pdf" capture="environment" style={{ display: 'none' }} />
          </div>
        )}

        {loading && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div className="pulse-anim" style={{ fontSize: '48px', marginBottom: '16px' }}>🤖</div>
            <h3 style={{ margin: 0, color: 'white' }}>Claude Vision is analyzing...</h3>
            <p style={{ color: '#94a3b8', marginTop: '8px' }}>Extracting text and comparing prices</p>
          </div>
        )}

        {result && (
          <div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px', marginBottom: '24px' }}>
              <div style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>Extracted Text:</div>
              <div style={{ fontStyle: 'italic' }}>"{result.detectedText}"</div>
            </div>

            <h4 style={{ margin: '0 0 16px 0' }}>Matched Products ({result.basket.length})</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '300px', overflowY: 'auto', paddingRight: '8px' }}>
              {result.basket.map((b: any, i: number) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ fontSize: '20px' }}>{b.item.image}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '14px' }}>{b.item.name}</div>
                      <div style={{ fontSize: '12px', color: '#94a3b8' }}>{b.platform}</div>
                    </div>
                  </div>
                  <div style={{ fontWeight: 800, color: '#4ade80' }}>₹{b.price}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>Total Best Price</div>
                <div style={{ fontSize: '24px', fontWeight: 800 }}>₹{result.total}</div>
              </div>
              <button onClick={handleAddAll} style={{ background: 'var(--success-color)', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }}>
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
