"use client";
import { useEffect, useState, useCallback } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const total = docHeight - winHeight;
    if (total <= 0) {
      setProgress(0);
      return;
    }
    setProgress(Math.min(100, (scrollTop / total) * 100));
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress(); // initial
    return () => window.removeEventListener("scroll", handleScroll);
  }, [updateProgress]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "2px",
        zIndex: 1001,
        background: "transparent",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: "linear-gradient(90deg, #00E5FF, #A855F7)",
          boxShadow: progress > 0 ? "0 0 8px rgba(0, 229, 255, 0.5)" : "none",
          transition: "width 0.1s linear",
        }}
      />
    </div>
  );
}
