"use client";
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ScanLine, Camera, Sparkles, ShoppingCart, Check } from 'lucide-react';
import { getIconForEmoji } from '@/utils/iconMap';

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
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }} 
          animate={{ scale: 1, opacity: 1, y: 0 }} 
          exit={{ scale: 0.9, opacity: 0, y: 20 }} 
          className="glass-panel" 
          style={{ width: '90%', maxWidth: '500px', padding: '32px', position: 'relative' }}
        >
          <button onClick={onClose} className="hover-lift" style={{ position: 'absolute', top: '20px', right: '20px', background: 'var(--surface-color)', border: '1px solid var(--border-color)', color: 'var(--text-color)', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <X size={20} />
          </button>
          
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px', color: 'var(--primary-color)' }}>
              <div style={{ background: 'rgba(255,107,0,0.15)', padding: '16px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,107,0,0.35)' }}>
                <ScanLine size={40} />
              </div>
            </div>
            <h2 className="gradient-text" style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 8px 0' }}>Scan Grocery List</h2>
            <p style={{ color: 'var(--muted-color)', margin: 0 }}>AI Vision will extract handwritten or typed lists instantly.</p>
          </div>

          <AnimatePresence mode="wait">
            {!loading && !result && (
              <motion.div key="camera" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
                <div className="viewfinder-container">
                  <div className="viewfinder-corner vf-tl"></div>
                  <div className="viewfinder-corner vf-tr"></div>
                  <div className="viewfinder-corner vf-bl"></div>
                  <div className="viewfinder-corner vf-br"></div>
                  <div className="viewfinder-crosshair"></div>
                  
                  <button className="shutter-btn" onClick={() => fileInputRef.current?.click()} title="Open Camera / Gallery">
                    <div className="shutter-btn-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>
                      <Camera size={24} />
                    </div>
                  </button>
                </div>
                <input type="file" ref={fileInputRef} onChange={handleFile} accept="image/*,application/pdf" capture="environment" style={{ display: 'none' }} />
              </motion.div>
            )}

            {loading && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px', color: 'var(--secondary-color)' }}>
                  <Sparkles size={48} className="pulse-anim" />
                </div>
                <h3 style={{ margin: 0, color: 'white' }}>Claude Vision is analyzing...</h3>
                <p style={{ color: 'var(--muted-color)', marginTop: '8px' }}>Extracting text and comparing prices</p>
              </motion.div>
            )}

            {result && (
              <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px', marginBottom: '24px', border: '1px solid var(--border-color)' }}>
                  <div style={{ color: 'var(--muted-color)', fontSize: '12px', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Extracted Text:</div>
                  <div style={{ fontStyle: 'italic', color: 'var(--text-color)' }}>"{result.detectedText}"</div>
                </div>

                <h4 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-color)' }}>
                  <Check size={18} color="var(--success-color)" />
                  Matched Products ({result.basket.length})
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '300px', overflowY: 'auto', paddingRight: '8px' }} className="deals-scroll">
                  {result.basket.map((b: any, i: number) => (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'var(--surface-color)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', color: 'var(--text-color)' }}>
                          {getIconForEmoji(b.item.image, 20)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-color)' }}>{b.item.name}</div>
                          <div style={{ fontSize: '12px', color: 'var(--muted-color)' }}>{b.platform}</div>
                        </div>
                      </div>
                      <div style={{ fontWeight: 800, color: 'var(--success-color)' }}>₹{b.price}</div>
                    </motion.div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: 'var(--muted-color)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Total Best Price</div>
                    <div style={{ fontSize: '24px', fontWeight: 800, color: 'white' }}>₹{result.total}</div>
                  </div>
                  <button onClick={handleAddAll} className="pro-btn hover-lift" style={{ background: 'var(--success-color)', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 14px rgba(34,197,94,0.4)' }}>
                    <ShoppingCart size={18} /> Add to Cart
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
