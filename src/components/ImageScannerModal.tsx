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
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px', color: 'var(--primary-color)' }}>
            <svg className="svg-icon" width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 4h3l2-2h6l2 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 8px 0' }}>Scan Grocery List</h2>
          <p style={{ color: '#94a3b8', margin: 0 }}>AI Vision will extract handwritten or typed lists instantly.</p>
        </div>

        {!loading && !result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
            <div className="viewfinder-container">
              <div className="viewfinder-corner vf-tl"></div>
              <div className="viewfinder-corner vf-tr"></div>
              <div className="viewfinder-corner vf-bl"></div>
              <div className="viewfinder-corner vf-br"></div>
              <div className="viewfinder-crosshair"></div>
              
              <button className="shutter-btn" onClick={() => fileInputRef.current?.click()} title="Open Camera / Gallery">
                <div className="shutter-btn-inner"></div>
              </button>
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFile} accept="image/*,application/pdf" capture="environment" style={{ display: 'none' }} />
          </div>
        )}

        {loading && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div className="pulse-anim" style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px', color: 'var(--secondary-color)' }}>
              <svg className="svg-icon" width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a2 2 0 0 1 2 2v2h3a2 2 0 0 1 2 2v2h1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-1v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H3a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h1V8a2 2 0 0 1 2-2h3V4a2 2 0 0 1 2-2zM9 11a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm6 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"></path>
              </svg>
            </div>
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
                    <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#00D4AA' }}>
                        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                      </svg>
                    </div>
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
