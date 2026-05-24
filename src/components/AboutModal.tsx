"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { X, Briefcase, GraduationCap, Mail, Code } from 'lucide-react';

export default function AboutModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)',
          zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '20px'
        }}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }} 
          animate={{ scale: 1, opacity: 1, y: 0 }} 
          exit={{ scale: 0.9, opacity: 0, y: 20 }} 
          className="glass-panel" 
          style={{
            width: '100%', maxWidth: '560px', padding: '48px 40px', position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Background glow accent */}
          <div style={{
            position: 'absolute', top: '-60px', right: '-60px', width: '200px', height: '200px',
            background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute', bottom: '-40px', left: '-40px', width: '160px', height: '160px',
            background: 'radial-gradient(circle, rgba(79,142,247,0.12) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          {/* Close button */}
          <button
            onClick={onClose}
            className="pro-btn hover-lift"
            style={{
              position: 'absolute', top: '20px', right: '20px',
              background: 'var(--surface-color)', border: '1px solid var(--border-color)',
              color: 'var(--text-color)', width: '36px', height: '36px',
              borderRadius: '50%', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>

          {/* Avatar / Logo */}
          <div style={{ textAlign: 'center', marginBottom: '32px', position: 'relative', zIndex: 1 }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto 16px',
              background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 32px rgba(139,92,246,0.4)',
              fontSize: '36px', fontWeight: 800, color: 'white', letterSpacing: '-1px'
            }}>
              SS
            </div>
            <h2 className="gradient-text" style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 4px' }}>
              Sourabh Savre
            </h2>
          </div>

          {/* Info cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', zIndex: 1 }}>

            {/* Project */}
            <div style={{
              padding: '20px', borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(79,142,247,0.08))',
              border: '1px solid rgba(139,92,246,0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <Briefcase size={20} style={{ color: 'var(--primary-color)', flexShrink: 0 }} />
                <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-color)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Project</span>
              </div>
              <p style={{ color: 'var(--muted-color)', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
                <strong style={{ color: 'var(--text-color)' }}>GroceryCompare AI</strong> is an AI-powered grocery price comparison platform that helps Indian consumers save money by comparing real-time prices across Zepto, BigBasket, and Blinkit — with smart budget planning, voice search, and image scanning.
              </p>
            </div>

            {/* Institution */}
            <div style={{
              padding: '20px', borderRadius: '16px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <GraduationCap size={20} style={{ color: 'var(--secondary-color)', flexShrink: 0 }} />
                <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-color)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Institution</span>
              </div>
              <p style={{ color: 'var(--muted-color)', fontSize: '14px', margin: 0, lineHeight: 1.6 }}>
                Indore Institute of Science and Technology, Indore<br />
                <span style={{ fontSize: '13px' }}>B.Tech Computer Science Engineering</span>
              </p>
            </div>

            {/* Contact */}
            <div style={{
              padding: '20px', borderRadius: '16px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <Mail size={20} style={{ color: '#f97316', flexShrink: 0 }} />
                <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-color)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Contact</span>
              </div>
              <a
                href="mailto:sourabhsavre8435@gmail.com"
                style={{
                  color: 'var(--secondary-color)', fontWeight: 600, fontSize: '14px',
                  textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px',
                  transition: 'opacity 0.2s'
                }}
                onMouseOver={e => (e.currentTarget.style.opacity = '0.8')}
                onMouseOut={e => (e.currentTarget.style.opacity = '1')}
              >
                sourabhsavre8435@gmail.com
              </a>
            </div>

            {/* Tech Stack */}
            <div style={{
              padding: '16px 20px', borderRadius: '16px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border-color)'
            }}>
              <p style={{ color: 'var(--muted-color)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Code size={14} /> Built With
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['Next.js 15', 'TypeScript', 'Supabase', 'React', 'Framer Motion', 'Tailwind CSS'].map(tech => (
                  <span key={tech} style={{
                    padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
                    background: 'rgba(139,92,246,0.15)', color: 'var(--primary-color)',
                    border: '1px solid rgba(139,92,246,0.25)'
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer credit */}
          <p style={{
            textAlign: 'center', marginTop: '28px', fontSize: '13px',
            color: 'var(--muted-color)', position: 'relative', zIndex: 1
          }}>
            Designed & Developed in India &nbsp;·&nbsp; © 2026 Sourabh Savre
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
