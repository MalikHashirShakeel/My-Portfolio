"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINE1 = "INITIALIZING MALIK HASHIR PORTFOLIO...";
const LINE2 = "ESTABLISHING OBSERVATORY TERMINAL...";
const LINE3 = "ACTIVATING NEURAL SYSTEMS...";
const CHAR_DELAY = 25; // Speed up typing slightly for better UX
const TOTAL_DURATION = 2200; // 0 -> 100% in 2.2s

function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showSkip, setShowSkip] = useState(false);
  const [line1Text, setLine1Text] = useState("");
  const [line2Text, setLine2Text] = useState("");
  const [line3Text, setLine3Text] = useState("");
  const [scaleOut, setScaleOut] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const handleSkip = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setReducedMotion(true);
      const t = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(t);
    }
  }, []);

  // Skip button appears after 600ms
  useEffect(() => {
    if (reducedMotion) return;
    const t = setTimeout(() => setShowSkip(true), 600);
    return () => clearTimeout(t);
  }, [reducedMotion]);

  // Sequential Typewriter Effect
  useEffect(() => {
    if (reducedMotion) return;

    // Typewriter Line 1
    let i = 0;
    const iv1 = setInterval(() => {
      i++;
      setLine1Text(LINE1.slice(0, i));
      if (i >= LINE1.length) {
        clearInterval(iv1);
        
        // Start Line 2
        let j = 0;
        const iv2 = setInterval(() => {
          j++;
          setLine2Text(LINE2.slice(0, j));
          if (j >= LINE2.length) {
            clearInterval(iv2);
            
            // Start Line 3
            let k = 0;
            const iv3 = setInterval(() => {
              k++;
              setLine3Text(LINE3.slice(0, k));
              if (k >= LINE3.length) {
                clearInterval(iv3);
              }
            }, CHAR_DELAY);
          }
        }, CHAR_DELAY);
      }
    }, CHAR_DELAY);

    return () => {
      clearInterval(iv1);
    };
  }, [reducedMotion]);

  // Progress counter: 0 -> 100 with easeInOut
  useEffect(() => {
    if (reducedMotion) return;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / TOTAL_DURATION, 1);
      const val = Math.round(easeInOutQuad(t) * 100);
      setProgress(val);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  // Transition out at 100%
  useEffect(() => {
    if (reducedMotion) return;
    if (progress >= 100) {
      const t1 = setTimeout(() => {
        setScaleOut(true);
        const t2 = setTimeout(() => setIsLoading(false), 300);
        return () => clearTimeout(t2);
      }, 200);
      return () => clearTimeout(t1);
    }
  }, [progress, reducedMotion]);

  const formatProgress = (p: number) => {
    const clamped = Math.min(p, 100);
    const str = clamped < 10 ? `0${clamped}` : `${clamped}`;
    return `[ ${str}% ]`;
  };

  // CSS for spinning ring decoration
  const keyframesCSS = `
    @keyframes spin-dashed {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes cursor-blink {
      0%, 100% { opacity: 1; }
      50%      { opacity: 0; }
    }
  `;

  if (reducedMotion) {
    return (
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#060B1A",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "3rem",
                fontWeight: 700,
                letterSpacing: "-0.05em",
                background: "linear-gradient(135deg, #00E5FF, #A855F7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              MH
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#060B1A",
            overflow: "hidden",
            transition: scaleOut ? "opacity 0.3s ease, transform 0.3s ease" : "none",
            opacity: scaleOut ? 0 : 1,
            transform: scaleOut ? "scale(1.05)" : "scale(1)",
          }}
        >
          {/* Inject spin keyframes */}
          <style dangerouslySetInnerHTML={{ __html: keyframesCSS }} />

          {/* Sleek cybernetic scanning circle visual */}
          <div
            style={{
              position: "relative",
              width: "120px",
              height: "120px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "2rem",
            }}
          >
            {/* Spinning Dashed Ring */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: "2px dashed rgba(0, 229, 255, 0.3)",
                animation: "spin-dashed 12s linear infinite",
              }}
            />
            {/* Inner pulsing glow circle */}
            <div
              style={{
                position: "absolute",
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                background: "rgba(0, 180, 216, 0.04)",
                border: "1px solid rgba(0, 229, 255, 0.2)",
                boxShadow: "0 0 20px rgba(0, 229, 255, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  letterSpacing: "-0.05em",
                  color: "#E2E8F0",
                  textShadow: "0 0 8px rgba(0, 229, 255, 0.4)",
                }}
              >
                MH
              </span>
            </div>
          </div>

          {/* Sequential typewriters and progress */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.4rem",
              zIndex: 10,
              textAlign: "center",
              minHeight: "100px",
            }}
          >
            {/* Line 1 */}
            <div
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "13px",
                color: "#00E5FF",
                letterSpacing: "0.08em",
                minHeight: "1.3em",
              }}
            >
              {line1Text}
              {line1Text.length > 0 && line1Text.length < LINE1.length && (
                <span style={{ animation: "cursor-blink 0.6s step-end infinite", marginLeft: "1px" }}>▌</span>
              )}
            </div>

            {/* Line 2 */}
            <div
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "12px",
                color: "#94A3B8",
                letterSpacing: "0.08em",
                minHeight: "1.3em",
              }}
            >
              {line2Text}
              {line2Text.length > 0 && line2Text.length < LINE2.length && (
                <span style={{ animation: "cursor-blink 0.6s step-end infinite", marginLeft: "1px" }}>▌</span>
              )}
            </div>

            {/* Line 3 */}
            <div
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "12px",
                color: "#64748B",
                letterSpacing: "0.08em",
                minHeight: "1.3em",
              }}
            >
              {line3Text}
              {line3Text.length > 0 && line3Text.length < LINE3.length && (
                <span style={{ animation: "cursor-blink 0.6s step-end infinite", marginLeft: "1px" }}>▌</span>
              )}
            </div>

            {/* Percentage counter */}
            <div
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "13px",
                color: "#00E5FF",
                letterSpacing: "0.15em",
                marginTop: "0.8rem",
              }}
            >
              {formatProgress(progress)}
            </div>
          </div>

          {/* Skip button */}
          {showSkip && (
            <button
              onClick={handleSkip}
              style={{
                position: "absolute",
                bottom: "2rem",
                right: "2rem",
                background: "none",
                border: "none",
                padding: 0,
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "11px",
                color: "#94A3B8",
                opacity: 0.4,
                cursor: "pointer",
                transition: "opacity 0.2s ease",
                letterSpacing: "0.05em",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.4")}
            >
              skip intro →
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
