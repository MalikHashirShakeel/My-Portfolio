"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_RUNGS = 12;
const RUNG_HEIGHT = 28;
const CHAR_DELAY = 40;
const LINE1 = "INITIALIZING NEURAL SYSTEMS...";
const LINE2 = "LOADING PORTFOLIO DATA...";
const TOTAL_DURATION = 2200; // ms for 0→100%

function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [flashActive, setFlashActive] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const [line1Text, setLine1Text] = useState("");
  const [line2Text, setLine2Text] = useState("");
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

  // Skip button appears after 800ms
  useEffect(() => {
    if (reducedMotion) return;
    const t = setTimeout(() => setShowSkip(true), 800);
    return () => clearTimeout(t);
  }, [reducedMotion]);

  // Typewriter line 1 (starts immediately)
  useEffect(() => {
    if (reducedMotion) return;
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setLine1Text(LINE1.slice(0, i));
      if (i >= LINE1.length) clearInterval(iv);
    }, CHAR_DELAY);
    return () => clearInterval(iv);
  }, [reducedMotion]);

  // Typewriter line 2 (starts after 800ms)
  useEffect(() => {
    if (reducedMotion) return;
    const delay = setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setLine2Text(LINE2.slice(0, i));
        if (i >= LINE2.length) clearInterval(iv);
      }, CHAR_DELAY);
      return () => clearInterval(iv);
    }, 800);
    return () => clearTimeout(delay);
  }, [reducedMotion]);

  // Progress counter: 0→100 over TOTAL_DURATION with easeInOut
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

  // Completion pulse: when all rungs lit (~1.8s) flash white briefly
  useEffect(() => {
    if (reducedMotion) return;
    const t = setTimeout(() => {
      setFlashActive(true);
      setTimeout(() => setFlashActive(false), 200);
    }, 1800);
    return () => clearTimeout(t);
  }, [reducedMotion]);

  // At 100%: wait 300ms, scale-up + fadeOut, then set isLoading false
  useEffect(() => {
    if (reducedMotion) return;
    if (progress >= 100) {
      const t1 = setTimeout(() => {
        setScaleOut(true);
        const t2 = setTimeout(() => setIsLoading(false), 400);
        return () => clearTimeout(t2);
      }, 300);
      return () => clearTimeout(t1);
    }
  }, [progress, reducedMotion]);

  const formatProgress = (p: number) => {
    const clamped = Math.min(p, 100);
    const str = clamped < 10 ? `0${clamped}` : `${clamped}`;
    return `[ ${str}% ]`;
  };

  // ---- CSS keyframes injected via <style> ----
  const keyframesCSS = `
    @keyframes dna-spin {
      from { transform: rotateY(0deg); }
      to   { transform: rotateY(360deg); }
    }
    @keyframes rung-appear {
      0%   { opacity: 0; transform: scale(0.5); }
      100% { opacity: 1; transform: scale(1); }
    }
    @keyframes helix-scale-out {
      0%   { transform: scale(1); opacity: 1; }
      100% { transform: scale(1.3); opacity: 0; }
    }
    @keyframes cursor-blink {
      0%, 100% { opacity: 1; }
      50%      { opacity: 0; }
    }
  `;

  // ---- Reduced motion: simple MH text ----
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
                fontSize: "3.2rem",
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

  // ---- Full animation ----
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(8px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
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
          }}
        >
          {/* Inject keyframes */}
          <style dangerouslySetInnerHTML={{ __html: keyframesCSS }} />

          {/* Subtle ambient glow */}
          <div
            style={{
              position: "absolute",
              width: "500px",
              height: "500px",
              background:
                "radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
          />

          {/* DNA Helix Container */}
          <div
            style={{
              perspective: "800px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ...(scaleOut
                ? {
                    animation: "helix-scale-out 400ms ease-in forwards",
                  }
                : {}),
            }}
          >
            <div
              style={{
                transformStyle: "preserve-3d",
                animation: "dna-spin 4s linear infinite",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0px",
              }}
            >
              {Array.from({ length: TOTAL_RUNGS }).map((_, i) => {
                const rotateY = i * 30; // 0, 30, 60 ... 330
                const delay = i * 0.15;
                const dotColor = flashActive
                  ? "#FFFFFF"
                  : undefined;
                const lineGrad = flashActive
                  ? "linear-gradient(90deg, #FFFFFF, #FFFFFF)"
                  : "linear-gradient(90deg, #00E5FF, #A855F7)";

                return (
                  <div
                    key={i}
                    style={{
                      height: `${RUNG_HEIGHT}px`,
                      width: "120px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      transform: `rotateY(${rotateY}deg)`,
                      transformStyle: "preserve-3d",
                      opacity: 0,
                      animation: `rung-appear 0.5s ease-out ${delay}s forwards`,
                    }}
                  >
                    {/* Left dot (cyan) */}
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: dotColor || "#00E5FF",
                        boxShadow: `0 0 8px ${dotColor || "#00E5FF"}, 0 0 16px ${dotColor || "rgba(0,229,255,0.3)"}`,
                        flexShrink: 0,
                        transition: "background 0.15s, box-shadow 0.15s",
                      }}
                    />
                    {/* Connecting line */}
                    <div
                      style={{
                        flex: 1,
                        height: "2px",
                        margin: "0 6px",
                        background: lineGrad,
                        borderRadius: "1px",
                        boxShadow: flashActive
                          ? "0 0 6px rgba(255,255,255,0.5)"
                          : "0 0 6px rgba(0,229,255,0.15)",
                        transition: "background 0.15s, box-shadow 0.15s",
                      }}
                    />
                    {/* Right dot (purple) */}
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: dotColor || "#A855F7",
                        boxShadow: `0 0 8px ${dotColor || "#A855F7"}, 0 0 16px ${dotColor || "rgba(168,85,247,0.3)"}`,
                        flexShrink: 0,
                        transition: "background 0.15s, box-shadow 0.15s",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Text section below helix */}
          <div
            style={{
              marginTop: "2.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
              zIndex: 10,
              textAlign: "center",
            }}
          >
            {/* Line 1: typewriter */}
            <div
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "13px",
                color: "#00E5FF",
                letterSpacing: "0.1em",
                minHeight: "1.3em",
              }}
            >
              {line1Text}
              {line1Text.length < LINE1.length && (
                <span
                  style={{
                    animation: "cursor-blink 0.6s step-end infinite",
                    marginLeft: "1px",
                  }}
                >
                  ▌
                </span>
              )}
            </div>

            {/* Line 2: typewriter */}
            <div
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "13px",
                color: "#94A3B8",
                letterSpacing: "0.1em",
                minHeight: "1.3em",
              }}
            >
              {line2Text}
              {line2Text.length > 0 && line2Text.length < LINE2.length && (
                <span
                  style={{
                    animation: "cursor-blink 0.6s step-end infinite",
                    marginLeft: "1px",
                  }}
                >
                  ▌
                </span>
              )}
            </div>

            {/* Percentage counter */}
            <div
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "14px",
                color: "#00E5FF",
                letterSpacing: "0.15em",
                marginTop: "0.75rem",
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
              onMouseEnter={(e) =>
                (e.currentTarget.style.opacity = "0.7")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.opacity = "0.4")
              }
            >
              skip intro →
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
