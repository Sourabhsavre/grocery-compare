import { useState } from 'react';

export default function BudgetPlanner({ cartTotal }: { cartTotal: number }) {
  const [monthlyLimit, setMonthlyLimit] = useState<string>("5000");

  const limit = parseInt(monthlyLimit) || 1;
  const percentage = Math.min((cartTotal / limit) * 100, 100);
  
  const isOverBudget = cartTotal > limit;

  return (
    <div className="glass-panel" style={{ padding: '32px', marginBottom: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: 'linear-gradient(135deg, #10b981, #3b82f6)', borderRadius: '16px', padding: '12px', fontSize: '28px' }}>
          📅
        </div>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: 'white' }}>Monthly Planner</h2>
          <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 600 }}>Track Spending</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8', fontSize: '14px', fontWeight: 600 }}>Set Monthly Budget (₹)</label>
          <input 
            type="number"
            value={monthlyLimit}
            onChange={(e) => setMonthlyLimit(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '12px', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)', color: 'white', fontSize: '18px', outline: 'none' }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#94a3b8', fontSize: '14px', fontWeight: 600 }}>Total Spent</label>
          <div style={{ padding: '12px', fontSize: '18px', fontWeight: 800, color: isOverBudget ? 'var(--danger-color)' : 'var(--success-color)' }}>
            ₹{cartTotal}
          </div>
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
          <span>Budget Utilization</span>
          <span style={{ color: isOverBudget ? 'var(--danger-color)' : 'white' }}>{percentage.toFixed(1)}%</span>
        </div>
        <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{ 
            height: '100%', 
            width: `${percentage}%`, 
            background: isOverBudget ? 'var(--danger-color)' : 'linear-gradient(90deg, #10b981, #3b82f6)',
            transition: 'width 0.5s ease-out'
          }}></div>
        </div>
      </div>
    </div>
  );
}
