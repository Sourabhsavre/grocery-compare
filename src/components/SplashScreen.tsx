"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Show splash for a minimum of 1.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 500); // give time for the exit animation
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "#0A0A0A", // Midnight Black
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div style={{ position: "relative" }}>
            {/* Pulsing glow behind the logo */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "120px",
                height: "120px",
                background: "radial-gradient(circle, rgba(255, 107, 0, 0.4) 0%, transparent 70%)",
                borderRadius: "50%",
                zIndex: 0
              }}
            />
            
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              style={{ position: "relative", zIndex: 1, color: "var(--primary-color)" }}
            >
              <ShoppingCart size={64} strokeWidth={2.5} />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{ marginTop: "24px", textAlign: "center" }}
          >
            <h1 className="gradient-text" style={{ fontSize: "28px", fontWeight: 800, margin: "0 0 8px 0" }}>
              GroceryCompare AI
            </h1>
            <p style={{ color: "var(--muted-color)", fontSize: "14px", margin: 0 }}>
              India's Smartest Grocery App
            </p>
          </motion.div>

          {/* Orange loading spinner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ marginTop: "40px", display: "flex", gap: "8px" }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  y: ["0%", "-50%", "0%"],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "var(--primary-color)",
                  boxShadow: "0 0 8px rgba(255, 107, 0, 0.5)"
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
