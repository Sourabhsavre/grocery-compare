"use client";
import { useState, useRef } from 'react';

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
      // Simulate reading file and passing to API
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
    <div className="glass-panel" style={{ padding: '32px', marginBottom: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: 'linear-gradient(135deg, #10b981, #3b82f6)', borderRadius: '16px', padding: '12px', fontSize: '28px' }}>
          📅
        </div>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: 'white' }}>Monthly Planner</h2>
          <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 600 }}>Smart Weekly Breakdown</span>
        </div>
      </div>

      {!plan ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ color: '#94a3b8', margin: 0 }}>Upload a photo of your list or speak your requirements to generate a complete monthly plan.</p>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
              className="hover-lift"
              style={{ flex: 1, background: 'rgba(255,255,255,0.1)', border: '1px solid var(--border-color)', color: 'white', padding: '16px', borderRadius: '16px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              📷 Upload List
            </button>
            <input type="file" ref={fileInputRef} onChange={handleFile} accept="image/*" capture="environment" style={{ display: 'none' }} />
            
            <button 
              onClick={handleVoice}
              disabled={loading || isListening}
              className="hover-lift"
              style={{ flex: 1, background: isListening ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.1)', border: '1px solid var(--border-color)', color: isListening ? '#fca5a5' : 'white', padding: '16px', borderRadius: '16px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              {isListening ? '🎙️ Listening...' : '🎤 Speak Needs'}
            </button>
          </div>
          {loading && <div style={{ textAlign: 'center', color: '#94a3b8', marginTop: '12px' }} className="pulse-anim">Generating your smart monthly plan...</div>}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <div style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '4px' }}>Total Monthly Budget</div>
            <div style={{ fontSize: '32px', fontWeight: 800, color: '#4ade80' }}>₹{plan.grandTotal}</div>
            <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#cbd5e1' }}>{plan.summary}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {plan.plan.map((w: any) => (
              <div key={w.week} style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ fontWeight: 700, fontSize: '16px' }}>Week {w.week}: <span style={{ color: '#94a3b8' }}>{w.title}</span></div>
                  <div style={{ fontWeight: 800, color: 'white' }}>₹{w.total}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {w.items.map((i: any, idx: number) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                      <span>{i.item.name}</span>
                      <span style={{ color: '#94a3b8' }}>via <span style={{ color: 'white', fontWeight: 600 }}>{i.platform}</span> (₹{i.price})</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => addToCart(w.items)} style={{ width: '100%', marginTop: '12px', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
                  Add Week {w.week} to Cart
                </button>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
            <button onClick={() => setPlan(null)} style={{ flex: 1, background: 'transparent', border: '1px solid var(--border-color)', color: 'white', padding: '12px', borderRadius: '12px', cursor: 'pointer', fontWeight: 600 }}>Start Over</button>
            <button onClick={sharePlan} style={{ flex: 1, background: '#25D366', border: 'none', color: 'white', padding: '12px', borderRadius: '12px', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              WhatsApp Share
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
