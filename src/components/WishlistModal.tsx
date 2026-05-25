"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, HeartCrack } from 'lucide-react';
import { getIconForEmoji } from '@/utils/iconMap';
import { WishlistItem } from '@/utils/wishlist';
import CountUp from 'react-countup';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: WishlistItem[];
  onRemove: (productId: number) => void;
}

export default function WishlistModal({ isOpen, onClose, wishlist, onRemove }: WishlistModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          exit={{ scale: 0.9, opacity: 0 }} 
          className="glass-panel" 
          style={{ width: '90%', maxWidth: '600px', maxHeight: '80vh', display: 'flex', flexDirection: 'column', position: 'relative' }}
        >
          <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: 'var(--text-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              My Wishlist <span style={{ fontSize: '14px', background: 'rgba(255,107,0,0.2)', color: 'var(--primary-color)', padding: '4px 12px', borderRadius: '12px', fontWeight: 700 }}>{wishlist.length} Items</span>
            </h2>
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--muted-color)', cursor: 'pointer' }} className="hover-lift">
              <X size={24} />
            </button>
          </div>
          
          <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {wishlist.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--muted-color)' }}>
                <HeartCrack size={48} style={{ margin: '0 auto 16px auto', opacity: 0.5 }} />
                <h3 style={{ fontSize: '18px', margin: '0 0 8px 0', color: 'var(--text-color)' }}>Your wishlist is empty</h3>
                <p style={{ margin: 0 }}>Save products you love to keep an eye on their prices.</p>
              </div>
            ) : (
              wishlist.map((item) => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
                  <div style={{ fontSize: '24px', background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '12px' }}>
                    {getIconForEmoji(item.product_image, 24)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--text-color)' }}>{item.product_name}</h3>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-color)' }}>₹<CountUp end={item.min_price} duration={1} preserveValue /></span>
                      <span style={{ fontSize: '12px', color: 'var(--muted-color)' }}>via {item.platform}</span>
                    </div>
                  </div>
                  <button onClick={() => onRemove(item.product_id)} className="hover-lift" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', padding: '10px', borderRadius: '12px', cursor: 'pointer' }} title="Remove from Wishlist">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
