"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Lock, Plus, Edit2, Trash2, X, Save, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ALL_STORES = ["Zepto", "BigBasket", "Blinkit", "AmazonFresh", "JioMart", "SwiggyInstamart", "DmartReady"];

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  
  const supabase = createClient();

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  const fetchProducts = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false, nullsFirst: false });
    if (error) {
      console.error(error);
      alert("Failed to fetch products");
    } else {
      setProducts(data || []);
    }
    setIsLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      console.error(error);
      alert("Failed to delete product");
    } else {
      fetchProducts();
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product: any) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0A0A0A', color: 'white' }}>
        <form onSubmit={handleLogin} className="glass-panel" style={{ padding: '40px', width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <Lock size={48} color="var(--primary-color)" style={{ marginBottom: '16px' }} />
            <h1 style={{ fontSize: '24px', fontWeight: 700 }}>Admin Login</h1>
          </div>
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', fontSize: '16px' }}
          />
          <button type="submit" className="pro-btn btn-gradient" style={{ padding: '16px', borderRadius: '12px', border: 'none', color: '#0A0A0A', fontSize: '16px', fontWeight: 700, cursor: 'pointer' }}>
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', color: 'white', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 800 }} className="gradient-text">Admin Dashboard</h1>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button onClick={openAddModal} className="pro-btn btn-gradient" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '12px', border: 'none', color: '#0A0A0A', fontWeight: 700, cursor: 'pointer' }}>
              <Plus size={20} /> Add Product
            </button>
            <button onClick={() => setIsAuthenticated(false)} className="pro-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '12px', background: 'var(--danger-color)', border: 'none', color: 'white', fontWeight: 700, cursor: 'pointer' }}>
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading products...</div>
        ) : (
          <div className="glass-panel" style={{ overflowX: 'auto', borderRadius: '16px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <th style={{ padding: '20px', color: 'var(--muted-color)', fontWeight: 600 }}>Image</th>
                  <th style={{ padding: '20px', color: 'var(--muted-color)', fontWeight: 600 }}>Name</th>
                  <th style={{ padding: '20px', color: 'var(--muted-color)', fontWeight: 600 }}>Category</th>
                  <th style={{ padding: '20px', color: 'var(--muted-color)', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '20px', fontSize: '24px' }}>{product.image}</td>
                    <td style={{ padding: '20px', fontWeight: 600 }}>{product.name}</td>
                    <td style={{ padding: '20px' }}>
                      <span style={{ background: 'rgba(255,107,0,0.15)', color: 'var(--primary-color)', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>
                        {product.category}
                      </span>
                    </td>
                    <td style={{ padding: '20px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                        <button onClick={() => openEditModal(product)} className="hover-lift" style={{ background: 'rgba(255,255,255,0.1)', border: 'none', padding: '8px', borderRadius: '8px', color: 'white', cursor: 'pointer' }}>
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => handleDelete(product.id)} className="hover-lift" style={{ background: 'rgba(239,68,68,0.2)', border: 'none', padding: '8px', borderRadius: '8px', color: '#ef4444', cursor: 'pointer' }}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={editingProduct} 
        onSave={fetchProducts} 
      />
    </div>
  );
}

function ProductModal({ isOpen, onClose, product, onSave }: { isOpen: boolean, onClose: () => void, product: any, onSave: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    image: "🛒",
    prices: ALL_STORES.reduce((acc, store) => ({ ...acc, [store]: { price: 0, available: false, url: "" } }), {})
  });
  const [isSaving, setIsSaving] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        image: product.image || "🛒",
        prices: {
          ...ALL_STORES.reduce((acc, store) => ({ ...acc, [store]: { price: 0, available: false, url: "" } }), {}),
          ...product.prices
        }
      });
    } else {
      setFormData({
        name: "",
        category: "Grocery",
        image: "🛒",
        prices: ALL_STORES.reduce((acc, store) => ({ ...acc, [store]: { price: 0, available: false, url: "" } }), {})
      });
    }
  }, [product, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Convert string prices back to numbers for clean JSON
    const cleanPrices = Object.entries(formData.prices).reduce((acc, [store, data]: [string, any]) => {
      acc[store] = { ...data, price: Number(data.price) };
      return acc;
    }, {} as any);

    const payload = {
      name: formData.name,
      category: formData.category,
      image: formData.image,
      prices: cleanPrices
    };

    if (product?.id) {
      const { error } = await supabase.from('products').update(payload).eq('id', product.id);
      if (error) { console.error(error); alert("Update failed"); }
    } else {
      const { error } = await supabase.from('products').insert(payload);
      if (error) { console.error(error); alert("Insert failed"); }
    }

    setIsSaving(false);
    onSave();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="glass-panel" style={{ width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', padding: '32px', borderRadius: '24px', position: 'relative' }}>
          
          <button onClick={onClose} style={{ position: 'absolute', top: '24px', right: '24px', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer' }}>
            <X size={20} />
          </button>

          <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '32px' }}>{product ? 'Edit Product' : 'Add New Product'}</h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ color: 'var(--muted-color)', fontSize: '14px', fontWeight: 600 }}>Product Name</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ padding: '12px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ color: 'var(--muted-color)', fontSize: '14px', fontWeight: 600 }}>Category</label>
                <input required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ padding: '12px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ color: 'var(--muted-color)', fontSize: '14px', fontWeight: 600 }}>Emoji Image</label>
                <input required value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} style={{ padding: '12px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white' }} />
              </div>
            </div>

            <h3 style={{ fontSize: '20px', fontWeight: 700, marginTop: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>Store Pricing</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {ALL_STORES.map((store) => {
                const storeData = (formData.prices as any)[store];
                return (
                  <div key={store} style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <strong style={{ fontSize: '16px' }}>{store}</strong>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input type="checkbox" checked={storeData.available} onChange={e => setFormData(prev => ({ ...prev, prices: { ...prev.prices, [store]: { ...storeData, available: e.target.checked } } }))} style={{ width: '18px', height: '18px', accentColor: 'var(--primary-color)' }} />
                        <span style={{ fontSize: '14px', color: 'var(--muted-color)' }}>Available</span>
                      </label>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ color: 'var(--muted-color)' }}>₹</span>
                        <input type="number" value={storeData.price} onChange={e => setFormData(prev => ({ ...prev, prices: { ...prev.prices, [store]: { ...storeData, price: e.target.value } } }))} style={{ flex: 1, padding: '10px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white' }} disabled={!storeData.available} />
                      </div>
                      <input type="url" placeholder="Store URL (optional)" value={storeData.url} onChange={e => setFormData(prev => ({ ...prev, prices: { ...prev.prices, [store]: { ...storeData, url: e.target.value } } }))} style={{ padding: '10px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white', fontSize: '12px' }} disabled={!storeData.available} />
                    </div>
                  </div>
                )
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '24px' }}>
              <button type="button" onClick={onClose} className="pro-btn" style={{ padding: '12px 24px', borderRadius: '12px', background: 'transparent', border: '1px solid var(--border-color)', color: 'white', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button type="submit" disabled={isSaving} className="pro-btn btn-gradient" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 32px', borderRadius: '12px', border: 'none', color: '#0A0A0A', fontWeight: 700, cursor: isSaving ? 'not-allowed' : 'pointer', opacity: isSaving ? 0.7 : 1 }}>
                <Save size={18} /> {isSaving ? 'Saving...' : 'Save Product'}
              </button>
            </div>
          </form>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
