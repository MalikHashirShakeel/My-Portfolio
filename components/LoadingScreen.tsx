"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#020817",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(0,245,255,0.3)",
                  "0 0 60px rgba(0,245,255,0.6), 0 0 100px rgba(191,0,255,0.3)",
                  "0 0 20px rgba(0,245,255,0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                border: "2px solid rgba(0,245,255,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
              }}
            >
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  fontFamily: "var(--font-orbitron)",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #00f5ff, #bf00ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                MH
              </motion.span>
            </motion.div>
            <motion.p
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                marginTop: "1.5rem",
                fontFamily: "var(--font-orbitron)",
                fontSize: "0.7rem",
                letterSpacing: "0.3em",
                color: "#64748b",
                textTransform: "uppercase",
              }}
            >
              Initializing
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
