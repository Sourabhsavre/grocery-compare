'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PasswordPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Shagun@2026') {
      document.cookie = `site_access=${password}; path=/; max-age=${7 * 24 * 60 * 60}`;
      router.push('/');
      router.refresh();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div 
        className="glass-panel hover-lift"
        style={{
          width: '100%',
          maxWidth: '420px',
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          textAlign: 'center'
        }}
      >
        <div>
          <h1 className="gradient-text" style={{ fontSize: '28px', marginBottom: '8px' }}>Restricted Access</h1>
          <p style={{ color: 'var(--muted-color)', fontSize: '14px' }}>
            Please enter the site password to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="glow-effect" style={{
            borderRadius: '12px',
            border: `1px solid ${error ? 'var(--danger-color)' : 'var(--border-color)'}`,
            padding: '4px',
            transition: 'border-color 0.3s'
          }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-color)',
                outline: 'none',
                fontSize: '16px',
                fontFamily: 'inherit'
              }}
            />
          </div>
          {error && (
             <span style={{ color: 'var(--danger-color)', fontSize: '12px', textAlign: 'left', marginTop: '-8px' }}>
               Incorrect password, please try again.
             </span>
          )}

          <button 
            type="submit" 
            className="pro-btn btn-gradient"
            style={{
              padding: '14px',
              borderRadius: '12px',
              color: '#0A0A0A',
              fontSize: '16px',
              marginTop: '8px',
              justifyContent: 'center'
            }}
          >
            Unlock Access
          </button>
        </form>
      </div>
    </div>
  );
}
