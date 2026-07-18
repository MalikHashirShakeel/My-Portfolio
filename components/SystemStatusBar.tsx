"use client";

import { useEffect, useRef } from "react";

export default function SystemStatusBar() {
  const timeRef = useRef<HTMLSpanElement>(null);
  const fpsRef = useRef<HTMLSpanElement>(null);
  const loadRef = useRef<HTMLSpanElement>(null);
  const locationRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Skip on mobile - the bar is hidden via CSS
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) return;

    // Live Clock – update via DOM to avoid re-renders
    const clockInterval = setInterval(() => {
      if (!timeRef.current) return;
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      const s = String(now.getSeconds()).padStart(2, "0");
      timeRef.current.textContent = `${h}:${m}:${s}`;
    }, 1000);

    // FPS meter via RAF
    let frameCount = 0;
    let lastTime = performance.now();
    let rafId: number;
    const measureFps = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (now - lastTime));
        if (fpsRef.current) fpsRef.current.textContent = String(fps);
        frameCount = 0;
        lastTime = now;
      }
      rafId = requestAnimationFrame(measureFps);
    };
    rafId = requestAnimationFrame(measureFps);

    // Simulated system load
    let currentLoad = 12;
    const loadInterval = setInterval(() => {
      const delta = Math.round((Math.random() - 0.5) * 4);
      currentLoad = Math.max(6, Math.min(22, currentLoad + delta));
      if (loadRef.current) loadRef.current.textContent = `${currentLoad}%`;
    }, 2500);

    // Fetch location once
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((d) => {
        if (locationRef.current && d.city) {
          locationRef.current.textContent = d.city.toUpperCase() + "_NODE";
        }
      })
      .catch(() => {
        if (locationRef.current) locationRef.current.textContent = "UNKNOWN_NODE";
      });

    return () => {
      clearInterval(clockInterval);
      clearInterval(loadInterval);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className="system-status-bar"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 24,
        background: "rgba(6, 11, 26, 0.95)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        borderTop: "1px solid rgba(0, 228, 255, 0.12)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        fontFamily: "var(--font-jetbrains-mono), 'JetBrains Mono', monospace",
        fontSize: 10,
        color: "#94A3B8",
        zIndex: 50,
        pointerEvents: "none",
        userSelect: "none",
        letterSpacing: "0.05em",
      }}
    >
      {/* Left: Status + FPS */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              width: 6, height: 6, borderRadius: "50%",
              backgroundColor: "#10B981",
              boxShadow: "0 0 8px #10B981",
              animation: "pulse-green 2s infinite ease-in-out",
              display: "inline-block"
            }}
          />
          <span>SYSTEMS ONLINE</span>
        </div>
        <span style={{ color: "#475569" }}>|</span>
        <span>RENDER_FPS: <span ref={fpsRef} style={{ color: "#00E5FF" }}>--</span></span>
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes pulse-green { 0%,100%{opacity:0.4}50%{opacity:1} }
            @media(max-width:767px){.system-status-bar{display:none!important}}
          `
        }} />
      </div>

      {/* Center: Clock */}
      <div>LOCAL_TIME: <span ref={timeRef} style={{ color: "#E2E8F0" }}>--:--:--</span></div>

      {/* Right: Load + Node */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span>SYS_LOAD: <span ref={loadRef} style={{ color: "#00E5FF" }}>--</span></span>
        <span style={{ color: "#475569" }}>|</span>
        <span>NODE: <span ref={locationRef} style={{ color: "#00E5FF" }}>LOCATING...</span></span>
      </div>
    </div>
  );
}
