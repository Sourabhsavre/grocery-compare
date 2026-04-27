"use client";

export default function AboutModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)',
      zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        width: '100%', maxWidth: '560px', padding: '48px 40px', position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background glow accent */}
        <div style={{
          position: 'absolute', top: '-60px', right: '-60px', width: '200px', height: '200px',
          background: 'radial-gradient(circle, rgba(108,58,232,0.18) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', bottom: '-40px', left: '-40px', width: '160px', height: '160px',
          background: 'radial-gradient(circle, rgba(0,212,170,0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        {/* Close button */}
        <button
          onClick={onClose}
          className="pro-btn"
          style={{
            position: 'absolute', top: '20px', right: '20px',
            background: 'var(--card-bg)', border: '1px solid var(--border-color)',
            color: 'var(--text-color)', width: '36px', height: '36px',
            borderRadius: '50%', fontSize: '20px', lineHeight: 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          ×
        </button>

        {/* Avatar / Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px', position: 'relative', zIndex: 1 }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto 16px',
            background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 32px rgba(108,58,232,0.4)',
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
            background: 'linear-gradient(135deg, rgba(108,58,232,0.12), rgba(0,212,170,0.08))',
            border: '1px solid rgba(108,58,232,0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--primary-color)', flexShrink: 0 }}>
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z"/>
              </svg>
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--secondary-color)', flexShrink: 0 }}>
                <path d="M12 3L1 9l4 2.18V15c0 1.66 3.13 3 7 3s7-1.34 7-3v-3.82L22 9 12 3zM5 13.18V11l7 3.82 7-3.82v2.18c0 .5-2.13 1-5 1.32v-.5c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1v.5c-2.87-.32-5-.82-5-1.32z"/>
              </svg>
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#f97316', flexShrink: 0 }}>
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
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
            <p style={{ color: 'var(--muted-color)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px' }}>Built With</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Next.js 15', 'TypeScript', 'Supabase', 'React', 'Tailwind CSS'].map(tech => (
                <span key={tech} style={{
                  padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
                  background: 'rgba(108,58,232,0.15)', color: 'var(--primary-color)',
                  border: '1px solid rgba(108,58,232,0.25)'
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
      </div>
    </div>
  );
}
