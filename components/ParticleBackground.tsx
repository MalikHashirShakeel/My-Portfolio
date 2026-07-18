"use client";
import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Mobile detection (no setState, no re-render)
    const isMobile = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // On mobile skip all canvas work entirely — static bg CSS handles background
    if (isMobile) return;

    let animId: number;
    let stars: Array<{ x: number; y: number; size: number; r: number; g: number; b: number; a: number; speed: number; layer: number }> = [];
    let currentScrollY = 0;

    const handleScroll = () => { currentScrollY = window.scrollY; };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const initCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);

      // Reduced star count for better performance
      const count = 140;
      stars = [];
      for (let i = 0; i < count; i++) {
        const layer = Math.random() < 0.6 ? 1 : Math.random() < 0.85 ? 2 : 3;
        const size = layer === 1 ? 1 : layer === 2 ? 1.5 : 2.5;
        const speed = layer === 1 ? 0.04 : layer === 2 ? 0.08 : 0.12;

        // Pre-compute rgba parts for fast rendering
        let r = 226, g = 232, b = 240;
        if (layer === 2 && Math.random() < 0.3) { r = 0; g = 180; b = 216; }
        if (layer === 3) {
          if (Math.random() < 0.5) { r = 0; g = 229; b = 255; }
          else { r = 168; g = 85; b = 247; }
        }
        const a = Math.random() * 0.4 + 0.3;

        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size, speed, layer, r, g, b, a
        });
      }
    };

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initCanvas, 200);
    };

    initCanvas();
    window.addEventListener("resize", handleResize);

    const BG_COLOR = "#060B1A";

    const draw = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;

      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, W, H);

      if (reduceMotion) {
        // Static snapshot — no animation frame needed
        stars.forEach((s) => {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${s.r},${s.g},${s.b},${s.a})`;
          ctx.fill();
        });
        return; // Do NOT call requestAnimationFrame
      }

      // Animated drawing loop
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.y -= s.speed;
        if (s.y < 0) s.y = H;

        const parallax = currentScrollY * s.layer * 0.06;
        const displayY = ((s.y - parallax) % H + H) % H;

        // Only shadowBlur for layer-3 stars on desktop to keep perf up
        if (s.size > 2) {
          ctx.shadowBlur = 4;
          ctx.shadowColor = `rgba(${s.r},${s.g},${s.b},0.6)`;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        ctx.arc(s.x, displayY, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.r},${s.g},${s.b},${s.a})`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        background: "#060B1A",
      }}
    />
  );
}
