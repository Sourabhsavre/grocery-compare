"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Share2, Heart } from "lucide-react";
import { getIconForEmoji, getStoreIcon } from "@/utils/iconMap";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

interface ProductCardProps {
  product: any;
  stats: {
    cheapestPlatform: string | null;
    min: number;
    max: number;
    savings: number;
  };
  platformColors: any;
  t: (key: string) => string;
  shareProduct: (product: any) => void;
  getStoreSearchUrl: (platform: string, productName: string) => string;
  user?: any;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: any, stats: any) => void;
}

const ProductCard = memo(({ product, stats, platformColors, t, shareProduct, getStoreSearchUrl, user, isWishlisted, onToggleWishlist }: ProductCardProps) => {
  return (
    <motion.div variants={itemVariants} className="glass-panel hover-lift" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'flex-start', gap: '20px', position: 'relative' }}>
        <div style={{ fontSize: '32px', background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))', borderRadius: '20px', padding: '16px', color: 'var(--text-color)', border: '1px solid var(--border-color)', boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.05)' }}>
          {getIconForEmoji(product.image, 32)}
        </div>
        <div style={{ flex: 1, paddingRight: '80px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 8px 0', lineHeight: 1.2 }}>{product.name}</h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', background: 'rgba(255,107,0,0.15)', color: 'var(--secondary-color)', padding: '4px 12px', borderRadius: '12px', fontWeight: 600, border: '1px solid rgba(255,107,0,0.25)' }}>{product.category}</span>
            {stats.savings > 0 && (
              <span style={{ fontSize: '12px', background: 'rgba(255,107,0,0.2)', color: 'var(--primary-color)', padding: '4px 12px', borderRadius: '12px', fontWeight: 600 }}>
                {t('save')} ₹<CountUp end={stats.savings} duration={1} />
              </span>
            )}
          </div>
        </div>
        <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 10, display: 'flex', gap: '8px' }}>
          {user && onToggleWishlist && (
            <button 
              onClick={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                await onToggleWishlist(product, stats);
              }} 
              style={{ background: isWishlisted ? 'rgba(255, 107, 0, 0.2)' : 'rgba(255, 255, 255, 0.1)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', color: isWishlisted ? 'var(--primary-color)' : 'var(--text-color)' }} 
              className="hover-lift" 
              title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <Heart size={16} fill={isWishlisted ? 'var(--primary-color)' : 'none'} />
            </button>
          )}
          <button onClick={() => shareProduct(product)} style={{ background: 'rgba(37, 211, 102, 0.2)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', color: '#25D366' }} className="hover-lift" title="Share on WhatsApp">
            <Share2 size={16} />
          </button>
        </div>
      </div>
      
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {Object.entries(product.prices).map(([platform, data]) => {
          const val = data as any;
          const isCheap = platform === stats.cheapestPlatform;
          const isExpensive = val.available && val.price === stats.max && stats.max > stats.min;
          const c = platformColors[platform];
          
          return (
            <div key={platform} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '12px 16px', borderRadius: '16px',
              background: isCheap ? 'rgba(255, 107, 0, 0.1)' : 'rgba(17, 17, 17, 0.8)',
              border: `1px solid ${isCheap ? 'rgba(255, 107, 0, 0.45)' : (isExpensive ? 'rgba(239,68,68,0.3)' : 'rgba(255,107,0,0.08)')}`,
              boxShadow: isCheap ? '0 0 16px rgba(255, 107, 0, 0.25)' : 'none',
              transition: 'all 0.2s ease'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: c.text, display: 'flex', alignItems: 'center' }}>{getStoreIcon(platform, 18)}</span>
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-color)' }}>{c.name}</span>
                {isCheap && <span className="cheapest-badge">{t('best')}</span>}
                {isExpensive && <span style={{ fontSize: '10px', background: 'rgba(239,68,68,0.8)', color: 'white', padding: '2px 8px', borderRadius: '8px', fontWeight: 800 }}>{t('costly')}</span>}
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                {val.available ? (
                  <>
                    <span className={isCheap ? 'price-highlight' : ''} style={{ fontSize: '18px', fontWeight: 800, color: isCheap ? 'var(--primary-color)' : (isExpensive ? '#fca5a5' : 'white') }}>
                      ₹<CountUp end={val.price} duration={1.5} preserveValue />
                    </span>
                    <a href={getStoreSearchUrl(platform, product.name)} target="_blank" rel="noreferrer" className={`hover-lift${isCheap ? ' btn-gradient' : ''}`} style={{
                      fontSize: '13px', background: isCheap ? undefined : 'var(--card-bg-elevated)', color: isCheap ? '#0A0A0A' : 'white', padding: '8px 16px',
                      border: `1px solid ${isCheap ? 'transparent' : 'var(--border-color)'}`,
                      borderRadius: '10px', textDecoration: 'none', fontWeight: 700, display: 'inline-block'
                    }}>{t('buy')}</a>
                  </>
                ) : (
                  <span style={{ fontSize: '14px', color: 'var(--muted-color)', fontWeight: 500 }}>{t('unavailable')}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
