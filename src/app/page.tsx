'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { 
  ArrowRight, 
  ShoppingCart, 
  Search, 
  Calculator, 
  Heart, 
  TrendingDown, 
  Users, 
  Sparkles, 
  BarChart2, 
  CheckCircle,
  Briefcase,
  Layers,
  Cpu,
  Bookmark
} from 'lucide-react';
import styles from './home.module.css';

export default function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100
      }
    }
  };

  return (
    <div className={styles.container}>
      {/* Background Decorative Mesh & Dots */}
      <div className="mesh-gradient-bg">
        <div className="mesh-circle-1" />
        <div className="mesh-circle-2" />
        <div className="mesh-circle-3" />
      </div>
      <div className="dot-grid-bg" />

      {/* Hero Section */}
      <section className={styles.hero}>
        {/* Floating Glassmorphism Cards */}
        <motion.div 
          className={`${styles.floatingCard} ${styles.floatingCard1}`}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className={styles.cardHeader}>
            <span>Blinkit Matcher</span>
            <span className="cheapest-badge">cheapest</span>
          </div>
          <p className={styles.cardTitle}>Organic Brown Sugar 1kg</p>
          <div className={styles.cardValue}>₹145 <span style={{ fontSize: '0.75rem', color: 'var(--muted-color)', textDecoration: 'line-through' }}>₹210</span></div>
        </motion.div>

        <motion.div 
          className={`${styles.floatingCard} ${styles.floatingCard2}`}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <div className={styles.cardHeader}>
            <span>Active Cart</span>
            <span style={{ color: 'var(--success-color)', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <CheckCircle size={10} /> Saved 35%
            </span>
          </div>
          <p className={styles.cardTitle}>Monthly Groceries</p>
          <div className={styles.cardValue}>₹2,840</div>
        </motion.div>

        <motion.div 
          className={`${styles.floatingCard} ${styles.floatingCard3}`}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        >
          <div className={styles.cardHeader}>
            <span>AI Insights</span>
            <Sparkles size={12} style={{ color: '#FBBF24' }} />
          </div>
          <p className={styles.cardTitle}>Instant matching active</p>
          <div className={styles.cardValue} style={{ fontSize: '0.875rem' }}>Across 7 Indian Stores</div>
        </motion.div>

        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className={styles.badge}>
            <TrendingDown size={14} />
            <span>Save up to 40% on groceries</span>
          </div>
          <h1 className={styles.title}>
            Smart Grocery Shopping <br />
            <span className="gradient-accent-text">Powered by AI</span>
          </h1>
          <p className={styles.tagline}>
            Compare real-time prices across major Indian grocery platforms and optimize your cart automatically.
          </p>
          <div className={styles.ctaWrapper}>
            <Link href="/app" className={`pro-btn btn-gradient hover-lift ${styles.ctaButton}`}>
              Start Comparing
              <ArrowRight size={20} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Platform Preview Section */}
      <section className={styles.previewSection}>
        <h2 className={styles.sectionTitle}>Experience the Dashboard</h2>
        <motion.div 
          className={styles.mockupWrapper}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ margin: '0 auto' }}
        >
          <img 
            src="/dashboard-mockup.png" 
            alt="GroceryCompare AI Premium Dashboard Mockup" 
            className={styles.mockupImage}
          />
        </motion.div>
      </section>

      {/* Trusted by Section */}
      <section className={styles.trustedSection}>
        <div className={styles.trustedTitle}>Supported Store Interfaces</div>
        <div className={styles.logoGrid}>
          <div className={styles.logoItem}>
            <ShoppingCart size={20} className={styles.logoIcon} />
            <span>BigBasket</span>
          </div>
          <div className={styles.logoItem}>
            <Sparkles size={20} className={styles.logoIcon} />
            <span>Blinkit</span>
          </div>
          <div className={styles.logoItem}>
            <Layers size={20} className={styles.logoIcon} />
            <span>Instamart</span>
          </div>
          <div className={styles.logoItem}>
            <Cpu size={20} className={styles.logoIcon} />
            <span>Zepto</span>
          </div>
          <div className={styles.logoItem}>
            <Bookmark size={20} className={styles.logoIcon} />
            <span>JioMart</span>
          </div>
        </div>
      </section>

      {/* Stats with icons Section */}
      <section className={styles.statsSection}>
        <h2 className={styles.sectionTitle}>Engineered for Value</h2>
        <div className={styles.statsGrid}>
          <div className={`glass-panel hover-lift ${styles.statCard} border-accent-glow`}>
            <div className={styles.statIconWrapper}>
              <BarChart2 size={24} />
            </div>
            <div className={styles.statNumberPremium}>
              <CountUp end={7} duration={2.5} />+
            </div>
            <span className={styles.statLabel}>Integrated Stores</span>
          </div>

          <div className={`glass-panel hover-lift ${styles.statCard} border-accent-glow`}>
            <div className={styles.statIconWrapper}>
              <Sparkles size={24} />
            </div>
            <div className={styles.statNumberPremium}>
              <CountUp end={1500} duration={2.5} separator="," />+
            </div>
            <span className={styles.statLabel}>AI matched items</span>
          </div>

          <div className={`glass-panel hover-lift ${styles.statCard} border-accent-glow`}>
            <div className={styles.statIconWrapper}>
              <TrendingDown size={24} />
            </div>
            <div className={styles.statNumberPremium}>
              <CountUp end={40} duration={2} />%
            </div>
            <span className={styles.statLabel}>Average Monthly Saving</span>
          </div>

          <div className={`glass-panel hover-lift ${styles.statCard} border-accent-glow`}>
            <div className={styles.statIconWrapper}>
              <Users size={24} />
            </div>
            <div className={styles.statNumberPremium}>
              <CountUp end={10} duration={2} suffix="k" />+
            </div>
            <span className={styles.statLabel}>Happy Shoppers</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Core Platform Features</h2>
        <motion.div 
          className={styles.featureGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div variants={itemVariants} className={`glass-panel hover-lift ${styles.featureCard} border-accent-glow`}>
            <div className={styles.iconWrapper}><ShoppingCart size={24} /></div>
            <h3>Price Comparison</h3>
            <p>Compare real-time prices across 7 major Indian grocery stores instantly.</p>
          </motion.div>
          <motion.div variants={itemVariants} className={`glass-panel hover-lift ${styles.featureCard} border-accent-glow`}>
            <div className={styles.iconWrapper}><Search size={24} /></div>
            <h3>AI Search</h3>
            <p>Describe what you want naturally, and our AI finds the perfect match.</p>
          </motion.div>
          <motion.div variants={itemVariants} className={`glass-panel hover-lift ${styles.featureCard} border-accent-glow`}>
            <div className={styles.iconWrapper}><Calculator size={24} /></div>
            <h3>Budget Planner</h3>
            <p>Plan your monthly groceries and keep your expenses under control.</p>
          </motion.div>
          <motion.div variants={itemVariants} className={`glass-panel hover-lift ${styles.featureCard} border-accent-glow`}>
            <div className={styles.iconWrapper}><Heart size={24} /></div>
            <h3>Wishlist</h3>
            <p>Save your favorite items and get notified when prices drop.</p>
          </motion.div>
        </motion.div>
      </section>



      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>© {new Date().getFullYear()} GroceryCompare AI. Built for smart shoppers.</p>
          <p className={styles.creator}>Created by <span className="gradient-accent-text" style={{ fontWeight: 700 }}>Sourabh</span></p>
        </div>
      </footer>
    </div>
  );
}
