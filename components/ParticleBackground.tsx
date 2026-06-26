"use client";
import { useEffect, useRef, useState } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  color: string;
  speedY: number; // drift speed
  layer: number;  // 1 (deep), 2 (mid), 3 (close)
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let stars: Star[] = [];

    // Track scroll
    let currentScrollY = 0;
    const handleScroll = () => {
      currentScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Track cursor
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    const initCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Determine star count based on screen size
      const isMobile = window.innerWidth < 768;
      const count = isMobile ? 60 : 200;

      stars = [];
      for (let i = 0; i < count; i++) {
        const layer = Math.random() < 0.6 ? 1 : Math.random() < 0.85 ? 2 : 3;
        let size = 1;
        let speedY = 0.05;
        let color = "rgba(226, 232, 240, "; // default starlight

        if (layer === 2) {
          size = 2;
          speedY = 0.1;
          color = Math.random() < 0.3 ? "rgba(0, 180, 216, " : "rgba(226, 232, 240, "; // cyan or white
        } else if (layer === 3) {
          size = 3;
          speedY = 0.15;
          color = Math.random() < 0.5 ? "rgba(0, 229, 255, " : "rgba(168, 85, 247, "; // neon cyan or violet
        }

        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size,
          color: color + (Math.random() * 0.4 + 0.3) + ")",
          speedY,
          layer,
        });
      }
    };

    initCanvas();
    window.addEventListener("resize", initCanvas);

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (reduceMotion) {
        // Just draw static stars in reduced motion mode
        stars.forEach((star) => {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.fill();
        });
        return;
      }

      stars.forEach((star) => {
        // Apply drifting speed
        star.y -= star.speedY;

        // Apply scroll parallax effect
        // Layer 1 moves very slowly, Layer 3 moves faster with scroll
        const parallaxOffset = currentScrollY * (star.layer * 0.08);
        const displayY = (star.y - parallaxOffset + canvas.height) % canvas.height;

        // Wrap around boundaries
        if (star.y < 0) star.y = canvas.height;

        ctx.beginPath();
        ctx.arc(star.x, displayY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;

        // Soft outer glow for larger stars
        if (star.size > 1) {
          ctx.shadowBlur = 4;
          ctx.shadowColor = star.color;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fill();
      });

      // Clear shadow properties for performance
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", initCanvas);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [reduceMotion]);

  return (
    <>
      {/* Starfield Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: "#060B1A",
        }}
      />

      {/* Glowing Cursor Trail */}
      {!reduceMotion && (
        <div
          style={{
            position: "fixed",
            left: cursorPos.x - 15,
            top: cursorPos.y - 15,
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0, 229, 255, 0.15) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 9999,
            transition: "left 0.12s cubic-bezier(0.25, 1, 0.5, 1), top 0.12s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        />
      )}
    </>
  );
}
