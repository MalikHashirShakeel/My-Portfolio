"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          title="Back to top"
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            zIndex: 999,
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: "rgba(10,22,40,0.8)",
            border: "1px solid rgba(0,245,255,0.3)",
            color: "#00f5ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 0 15px rgba(0,245,255,0.2)",
            backdropFilter: "blur(8px)",
          }}
          whileHover={{
            backgroundColor: "rgba(0,245,255,0.1)",
            boxShadow: "0 0 25px rgba(0,245,255,0.4)",
            y: -5,
          }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
