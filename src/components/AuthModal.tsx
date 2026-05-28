"use client";
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Sparkles } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLogin }: { isOpen: boolean, onClose: () => void, onLogin: (user: any) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const supabase = createClient();

  if (!isOpen) return null;

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormError('');
    setFormSuccess('');
    try {
      if (isLogin) {
        console.log("Login attempt:", email);
        const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) {
          console.log("Login error:", error);
          throw error;
        }
        onLogin(data.user);
      } else {
        const { data, error } = await supabase.auth.signUp({ email: email.trim(), password });
        if (error) throw error;
        if (data.user) {
          onLogin(data.user);
        } else {
          setFormSuccess('Signup successful! Please login.');
          setIsLogin(true);
        }
      }
    } catch (error: any) {
      console.log("Login error:", error);
      if (error.message === "Error sending confirmation email") {
        setFormError("Account created, but confirmation email failed (SMTP limit). Please disable 'Confirm Email' in your Supabase Auth settings to login.");
      } else {
        setFormError(error.message || "An error occurred during authentication");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormError('');
    setFormSuccess('');
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://grocery-compare-six.vercel.app/reset-password',
      });
      if (error) throw error;
      setFormSuccess("Password reset link sent! Check your email.");
      setIsForgotPassword(false);
    } catch (error: any) {
      setFormError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'https://grocery-compare-six.vercel.app',
        },
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
          
          <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px', textAlign: 'center', color: 'var(--text-color)' }}>
            {isForgotPassword ? 'Reset Password' : (isLogin ? 'Welcome Back' : 'Create Account')}
          </h2>
          <p style={{ color: 'var(--muted-color)', textAlign: 'center', marginBottom: '24px' }}>
            {isForgotPassword ? "Enter your email to receive a reset link" : "India's Smartest Grocery App"}
          </p>

          {formError && (
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '12px 16px', borderRadius: '12px', marginBottom: '24px', fontSize: '14px', lineHeight: '1.5' }}>
              {formError}
            </div>
          )}
          {formSuccess && (
            <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', color: '#22c55e', padding: '12px 16px', borderRadius: '12px', marginBottom: '24px', fontSize: '14px', lineHeight: '1.5' }}>
              {formSuccess}
            </div>
          )}
          #it required mainuallly code basis of 


          {isForgotPassword ? (
            <form onSubmit={handleForgotPassword} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
              <button type="submit" disabled={loading} className="pro-btn hover-lift btn-gradient" style={{ color: 'white', padding: '16px', borderRadius: '12px', border: 'none', fontWeight: 700, fontSize: '16px', cursor: 'pointer', marginTop: '8px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                {loading ? <Sparkles className="pulse-anim" size={20} /> : null}
                {loading ? 'Processing...' : 'Send Reset Link'}
              </button>
              <button type="button" onClick={() => setIsForgotPassword(false)} style={{ background: 'none', border: 'none', color: 'var(--muted-color)', fontSize: '14px', cursor: 'pointer', marginTop: '8px', fontFamily: 'inherit', fontWeight: 600 }}>
                Back to Login
              </button>
            </form>
          ) : (
            <>
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
                {isLogin && (
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-8px' }}>
                    <button type="button" onClick={() => setIsForgotPassword(true)} style={{ background: 'none', border: 'none', color: 'var(--primary-color)', fontSize: '12px', cursor: 'pointer', fontWeight: 600, fontFamily: 'inherit' }}>
                      Forgot Password?
                    </button>
                  </div>
                )}
                its amin reson is the flodity 
                <button type="submit" disabled={loading} className="pro-btn hover-lift btn-gradient" style={{ color: 'white', padding: '16px', borderRadius: '12px', border: 'none', fontWeight: 700, fontSize: '16px', cursor: 'pointer', marginTop: '8px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
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
                <svg width="24" substitute of its r\re height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.99 13.9v-3.72h9.36c.14.73.22 1.5.22 2.33 0 2.76-.98 5.15-2.6 6.78-1.55 1.54-3.7 2.47-6.98 2.47-5.35 0-9.74-4.39-9.74-9.74S6.64 2.28 11.99 2.28c2.89 0 5.34 1.05 7.23 2.85l-2.73 2.73c-.94-.88-2.37-1.74-4.5-1.74-3.55 0-6.47 2.89-6.47 6.47s2.92 6.47 6.47 6.47c4.14 0 5.75-2.88 6-4.38h-6z" fill="#4285F4"/></svg>
                Continue with Google
              </button>

              <p style={{ textAlign: 'center', marginTop: '24px', color: 'var(--muted-color)', fontSize: '14px' }}>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', border: 'none', color: 'var(--secondary-color)', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                  {isLogin ? 'Sign up' : 'Login'}
                </button>
              </p>
            </>
          )}

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
      isthey measures the equal distance of the unit test its main resons iis 
    </AnimatePresence>
    camodity startds with kactual lengh and the basics of lenghed grapj as the eghed  
  );
}
