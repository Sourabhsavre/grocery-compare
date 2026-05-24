"use client";
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Sparkles } from 'lucide-react';

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
          style={{ width: '400px', padding: '40px', position: 'relative' }}
        >
          <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: 'var(--muted-color)', cursor: 'pointer' }} className="hover-lift">
            <X size={24} />
          </button>
          
          <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px', textAlign: 'center', color: 'var(--text-color)' }}>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p style={{ color: 'var(--muted-color)', textAlign: 'center', marginBottom: '32px' }}>India's Smartest Grocery App</p>

          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ position: 'relative' }}>
              <Mail size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-color)' }} />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '12px', background: 'var(--surface-color)', border: '1px solid var(--border-color)', color: 'var(--text-color)', outline: 'none', fontFamily: 'inherit', fontSize: '15px' }}
                className="glow-effect"
              />
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-color)' }} />
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '12px', background: 'var(--surface-color)', border: '1px solid var(--border-color)', color: 'var(--text-color)', outline: 'none', fontFamily: 'inherit', fontSize: '15px' }}
                className="glow-effect"
              />
            </div>
            <button type="submit" disabled={loading} className="pro-btn hover-lift" style={{ background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', color: 'white', padding: '16px', borderRadius: '12px', border: 'none', fontWeight: 700, fontSize: '16px', cursor: 'pointer', marginTop: '8px', display: 'flex', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 14px rgba(139, 92, 246, 0.4)' }}>
              {loading ? <Sparkles className="pulse-anim" size={20} /> : null}
              {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '24px 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
            <span style={{ color: 'var(--muted-color)', fontSize: '14px', fontWeight: 600 }}>OR</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
          </div>

          <button onClick={handleGoogle} className="pro-btn hover-lift" style={{ width: '100%', background: 'white', color: 'black', padding: '16px', borderRadius: '12px', border: 'none', fontWeight: 700, fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.99 13.9v-3.72h9.36c.14.73.22 1.5.22 2.33 0 2.76-.98 5.15-2.6 6.78-1.55 1.54-3.7 2.47-6.98 2.47-5.35 0-9.74-4.39-9.74-9.74S6.64 2.28 11.99 2.28c2.89 0 5.34 1.05 7.23 2.85l-2.73 2.73c-.94-.88-2.37-1.74-4.5-1.74-3.55 0-6.47 2.89-6.47 6.47s2.92 6.47 6.47 6.47c4.14 0 5.75-2.88 6-4.38h-6z" fill="#4285F4"/></svg>
            Continue with Google
          </button>

          <p style={{ textAlign: 'center', marginTop: '24px', color: 'var(--muted-color)', fontSize: '14px' }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', border: 'none', color: 'var(--secondary-color)', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </p>

          <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: 'var(--muted-color)', letterSpacing: '0.03em' }}>
              Created by{' '}
              <span style={{ fontWeight: 700, background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Sourabh Savre
              </span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
