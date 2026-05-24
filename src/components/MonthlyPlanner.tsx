"use client";
import { useState, useRef } from 'react';
import { Calendar, Upload, Mic, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MonthlyPlanner({ products, addToCart }: { products: any[], addToCart: (items: any[]) => void }) {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<any>(null);
  const [isListening, setIsListening] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generatePlan = async (requirements: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/monthly-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requirements, products })
      });
      const data = await res.json();
      setPlan(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleVoice = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Voice recognition not supported in this browser.");
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      generatePlan(transcript);
    };
    recognition.start();
  };

  const handleFile = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      generatePlan("Image Uploaded");
    }
  };

  const sharePlan = () => {
    if (!plan) return;
    let text = `📅 *My AI Monthly Grocery Plan*\nTotal Budget: ₹${plan.grandTotal}\n\n`;
    plan.plan.forEach((w: any) => {
      text += `*Week ${w.week}: ${w.title}* (₹${w.total})\n`;
      w.items.forEach((i: any) => text += `- ${i.item.name} via ${i.platform} (₹${i.price})\n`);
      text += `\n`;
    });
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="glass-panel" style={{ padding: '32px', marginBottom: '32px', borderTop: '2px solid rgba(255, 107, 0, 0.5)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <div className="btn-gradient" style={{ borderRadius: '16px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <Calendar size={28} />
        </div>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: 'white' }}>Monthly Planner</h2>
          <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 600 }}>Smart Weekly Breakdown</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!plan ? (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ color: '#94a3b8', margin: 0, fontSize: '15px' }}>Upload a photo of your list or speak your requirements to generate a complete monthly plan.</p>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => fileInputRef.current?.click()}
                disabled={loading}
                className="pro-btn hover-lift"
                style={{ flex: 1, background: 'var(--surface-color)', border: '1px solid var(--border-color)', color: 'white', padding: '16px', borderRadius: '16px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Upload size={20} /> Upload List
              </button>
              <input type="file" ref={fileInputRef} onChange={handleFile} accept="image/*" capture="environment" style={{ display: 'none' }} />
              
              <button 
                onClick={handleVoice}
                disabled={loading || isListening}
                className="pro-btn hover-lift"
                style={{ flex: 1, background: isListening ? 'rgba(239, 68, 68, 0.1)' : 'var(--surface-color)', border: isListening ? '1px solid #fca5a5' : '1px solid var(--border-color)', color: isListening ? '#fca5a5' : 'white', padding: '16px', borderRadius: '16px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                {isListening ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', height: '16px' }}>
                      <div className="mic-wave"></div><div className="mic-wave"></div><div className="mic-wave"></div><div className="mic-wave"></div>
                    </div>
                    Listening...
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Mic size={20} /> Speak Needs
                  </div>
                )}
              </button>
            </div>
            {loading && <div style={{ textAlign: 'center', color: '#94a3b8', marginTop: '12px', fontWeight: 600 }} className="pulse-anim">Generating your smart monthly plan...</div>}
          </motion.div>
        ) : (
          <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: 'rgba(255, 107, 0, 0.1)', padding: '24px', borderRadius: '20px', border: '1px solid rgba(255, 107, 0, 0.3)' }}>
              <div style={{ color: 'var(--muted-color)', fontSize: '14px', marginBottom: '4px', fontWeight: 600, textTransform: 'uppercase' }}>Total Monthly Budget</div>
              <div className="price-highlight" style={{ fontSize: '36px', fontWeight: 800 }}>₹{plan.grandTotal}</div>
              <p style={{ margin: '8px 0 0 0', fontSize: '15px', color: '#cbd5e1', lineHeight: 1.5 }}>{plan.summary}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {plan.plan.map((w: any, index: number) => (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} key={w.week} style={{ background: 'var(--surface-color)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ fontWeight: 700, fontSize: '18px', color: 'var(--text-color)' }}>Week {w.week}: <span style={{ color: 'var(--muted-color)', fontWeight: 500 }}>{w.title}</span></div>
                    <div style={{ fontWeight: 800, color: 'white', fontSize: '18px' }}>₹{w.total}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {w.items.map((i: any, idx: number) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', alignItems: 'center' }}>
                        <span style={{ fontWeight: 500 }}>{i.item.name}</span>
                        <span style={{ color: 'var(--muted-color)' }}>via <span style={{ color: 'white', fontWeight: 600 }}>{i.platform}</span> <span className="price-highlight" style={{ marginLeft: '8px', fontWeight: 600 }}>₹{i.price}</span></span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => addToCart(w.items)} className="pro-btn hover-lift" style={{ width: '100%', marginTop: '16px', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--border-color)', padding: '12px', borderRadius: '12px', cursor: 'pointer', fontWeight: 600, display: 'flex', justifyContent: 'center' }}>
                    Add Week {w.week} to Cart
                  </button>
                </motion.div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
              <button onClick={() => setPlan(null)} className="pro-btn hover-lift" style={{ flex: 1, background: 'transparent', border: '1px solid var(--border-color)', color: 'white', padding: '14px', borderRadius: '14px', cursor: 'pointer', fontWeight: 600, display: 'flex', justifyContent: 'center' }}>Start Over</button>
              <button onClick={sharePlan} className="pro-btn hover-lift" style={{ flex: 1, background: '#25D366', border: 'none', color: 'white', padding: '14px', borderRadius: '14px', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)' }}>
                <Share2 size={18} /> WhatsApp Share
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
