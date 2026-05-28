import Link from 'next/link';
import { ArrowRight, ShoppingCart, Search, Calculator, Heart, TrendingDown } from 'lucide-react';
import styles from './home.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <TrendingDown size={14} />
            <span>Save up to 40% on groceries</span>
          </div>
          <h1 className={styles.title}>
            <span className="gradient-text">GroceryCompare AI</span>
          </h1>
          <p className={styles.tagline}>
            India's Smartest Grocery Price Comparison
          </p>
          <div className={styles.ctaWrapper}>
            <Link href="/app" className={`pro-btn btn-gradient hover-lift ${styles.ctaButton}`}>
              Start Comparing
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className={styles.statsBar}>
        <div className="glass-panel" style={{ display: 'flex', justifyContent: 'space-around', padding: '24px', flexWrap: 'wrap', gap: '24px', alignItems: 'center' }}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>500+</span>
            <span className={styles.statLabel}>Products</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statNumber}>7</span>
            <span className={styles.statLabel}>Stores</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statNumber}>AI</span>
            <span className={styles.statLabel}>Powered</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statNumber}>Free</span>
            <span className={styles.statLabel}>To Use</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Everything you need to save</h2>
        <div className={styles.featureGrid}>
          <div className={`glass-panel hover-lift ${styles.featureCard}`}>
            <div className={styles.iconWrapper}><ShoppingCart size={24} /></div>
            <h3>Price Comparison</h3>
            <p>Compare real-time prices across 7 major Indian grocery stores instantly.</p>
          </div>
          <div className={`glass-panel hover-lift ${styles.featureCard}`}>
            <div className={styles.iconWrapper}><Search size={24} /></div>
            <h3>AI Search</h3>
            <p>Describe what you want naturally, and our AI finds the perfect match.</p>
          </div>
          <div className={`glass-panel hover-lift ${styles.featureCard}`}>
            <div className={styles.iconWrapper}><Calculator size={24} /></div>
            <h3>Budget Planner</h3>
            <p>Plan your monthly groceries and keep your expenses under control.</p>
          </div>
          <div className={`glass-panel hover-lift ${styles.featureCard}`}>
            <div className={styles.iconWrapper}><Heart size={24} /></div>
            <h3>Wishlist</h3>
            <p>Save your favorite items and get notified when prices drop.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={styles.howItWorks}>
        <h2 className={styles.sectionTitle}>How it works</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <h3>Search Products</h3>
            <p>Search for any grocery item or use our AI to find what you need.</p>
          </div>
          <div className={styles.stepLine} />
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <h3>Compare Prices</h3>
            <p>See prices from major stores side-by-side to find the best deal.</p>
          </div>
          <div className={styles.stepLine} />
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <h3>Save Money</h3>
            <p>Buy from the cheapest store and save big on your monthly bills.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>© {new Date().getFullYear()} GroceryCompare AI. Built for smart shoppers.</p>
          <p className={styles.creator}>Created by <span className="gradient-text">Sourabh</span></p>
        </div>
      </footer>
    </div>
  );
}
