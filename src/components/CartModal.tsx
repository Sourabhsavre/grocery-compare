"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Share2 } from 'lucide-react';
import { getIconForEmoji } from '@/utils/iconMap';

export default function CartModal({ isOpen, onClose, cart, setCart, cartTotal }: { isOpen: boolean, onClose: () => void, cart: any[], setCart: any, cartTotal: number }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
          style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '32px', width: '100%', maxWidth: '500px', maxHeight: '85vh', overflowY: 'auto' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ margin: 0, fontSize: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ShoppingCart color="var(--primary-color)" /> My Cart
            </h2>
            <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-color)', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          </div>

          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--muted-color)' }}>
              Your cart is empty.
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                {cart.map((c, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'var(--surface-color)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '10px' }}>
                        {getIconForEmoji(c.item.image, 24)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '15px' }}>{c.item.name}</div>
                        <div style={{ fontSize: '13px', color: 'var(--primary-color)', fontWeight: 700 }}>₹{c.price}</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setCart((prev: any[]) => prev.filter((_, i) => i !== index))}
                      style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                      title="Remove item"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
              
              <div style={{ borderTop: '2px dashed var(--border-color)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: 'var(--muted-color)', fontSize: '14px' }}>Total Amount</div>
                  <div style={{ fontSize: '24px', fontWeight: 800 }}>₹{cartTotal}</div>
                </div>
                <button 
                  onClick={() => {
                    const text = `My Grocery Cart:\n${cart.map(c => `- ${c.item.name} (₹${c.price})`).join('\n')}\nTotal: ₹${cartTotal}`;
                    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="pro-btn float-anim" style={{ background: '#25D366', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(37,211,102,0.3)' }}
                >
                  <Share2 size={18} /> Share on WhatsApp
                </button>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
