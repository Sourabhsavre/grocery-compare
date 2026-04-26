"use client";
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function AuthModal({ isOpen, onClose, onLogin }: { isOpen: boolean, onClose: () => void, onLogin: (user: any) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  if (!isOpen) return null;

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onLogin(data.user);
      } else {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Signup successful! Please login.');
        setIsLogin(true);
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-panel" style={{ width: '400px', padding: '40px', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer' }}>×</button>
        
        <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px', textAlign: 'center' }}>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: '32px' }}>India's Smartest Grocery App</p>

        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '16px', borderRadius: '12px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)', color: 'white', outline: 'none' }}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '16px', borderRadius: '12px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)', color: 'white', outline: 'none' }}
          />
          <button type="submit" disabled={loading} style={{ background: 'var(--primary-color)', color: 'white', padding: '16px', borderRadius: '12px', border: 'none', fontWeight: 700, fontSize: '16px', cursor: 'pointer', marginTop: '8px' }}>
            {loading ? '...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '24px 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
          <span style={{ color: '#94a3b8', fontSize: '14px' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
        </div>

        <button onClick={handleGoogle} style={{ width: '100%', background: 'white', color: 'black', padding: '16px', borderRadius: '12px', border: 'none', fontWeight: 700, fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.99 13.9v-3.72h9.36c.14.73.22 1.5.22 2.33 0 2.76-.98 5.15-2.6 6.78-1.55 1.54-3.7 2.47-6.98 2.47-5.35 0-9.74-4.39-9.74-9.74S6.64 2.28 11.99 2.28c2.89 0 5.34 1.05 7.23 2.85l-2.73 2.73c-.94-.88-2.37-1.74-4.5-1.74-3.55 0-6.47 2.89-6.47 6.47s2.92 6.47 6.47 6.47c4.14 0 5.75-2.88 6-4.38h-6z" fill="#4285F4"/></svg>
          Continue with Google
        </button>

        <p style={{ textAlign: 'center', marginTop: '24px', color: '#94a3b8', fontSize: '14px' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', border: 'none', color: 'var(--secondary-color)', fontWeight: 700, cursor: 'pointer' }}>
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}
