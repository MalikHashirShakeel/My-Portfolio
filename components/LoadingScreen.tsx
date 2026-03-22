"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500); // delay before hiding
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5; // jump by 5-20%
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#020817",
            overflow: "hidden",
          }}
        >
          {/* Background grid/glow */}
          <div className="circuit-bg" style={{ position: "absolute", inset: 0, opacity: 0.2 }} />
          <div 
            style={{ 
              position: "absolute", 
              width: "600px", 
              height: "600px", 
              background: "radial-gradient(circle, rgba(0,245,255,0.05) 0%, transparent 70%)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            }} 
          />

          <div style={{ position: "relative", width: "250px", height: "250px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            
            {/* Outer rotating dashed ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                border: "1px dashed rgba(0, 245, 255, 0.3)",
              }}
            />

            {/* Middle rotating solid ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                width: "90%",
                height: "90%",
                borderRadius: "50%",
                borderTop: "3px solid #00f5ff",
                borderRight: "1px solid transparent",
                borderBottom: "1px solid rgba(191, 0, 255, 0.5)",
                borderLeft: "1px solid transparent",
                boxShadow: "0 0 15px rgba(0, 245, 255, 0.2)",
              }}
            />

            {/* Inner rotating rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                width: "75%",
                height: "75%",
                borderRadius: "50%",
                border: "2px solid rgba(191, 0, 255, 0.1)",
                borderLeft: "2px solid #bf00ff",
              }}
            />

            {/* Central MH Text */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
              }}
            >
              <motion.span
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  fontFamily: "var(--font-orbitron)",
                  fontSize: "3rem",
                  fontWeight: 800,
                  color: "#e0e7ff",
                  textShadow: "0 0 20px rgba(0,245,255,0.8)",
                  letterSpacing: "0.05em",
                }}
              >
                MH
              </motion.span>
              
              <div 
                style={{ 
                  marginTop: "1rem", 
                  fontFamily: "Courier New, monospace", 
                  color: "#00f5ff",
                  fontSize: "0.85rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.5rem"
                }}
              >
                <span>SYS.INIT // {Math.min(progress, 100)}%</span>
                <div style={{ width: "120px", height: "2px", background: "rgba(0,245,255,0.2)", overflow: "hidden" }}>
                  <motion.div 
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    style={{ height: "100%", background: "#00f5ff", boxShadow: "0 0 8px #00f5ff" }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
