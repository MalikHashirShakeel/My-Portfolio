"use client";

import { useEffect, useState } from "react";

export default function SystemStatusBar() {
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("LOCATING...");

  // Update Clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");
      const secs = String(now.getSeconds()).padStart(2, "0");
      setTime(`${hrs}:${mins}:${secs}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch Location
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (data.city) {
          setLocation(data.city.toUpperCase() + "_NODE");
        } else {
          setLocation("UNKNOWN_NODE");
        }
      } catch (err) {
        setLocation("UNKNOWN_NODE");
      }
    };

    fetchLocation();
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 24,
        background: "rgba(6, 11, 26, 0.9)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
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
      {/* Left: Blinking green dot + Status */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: "#10B981",
            boxShadow: "0 0 8px #10B981",
            animation: "pulse-green 2s infinite ease-in-out",
          }}
        />
        <span>SYSTEMS ONLINE</span>
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes pulse-green {
              0%, 100% { opacity: 0.4; }
              50% { opacity: 1; }
            }
          `
        }} />
      </div>

      {/* Center: Live Clock */}
      <div>
        <span>LOCAL_TIME: {time || "00:00:00"}</span>
      </div>

      {/* Right: City Node */}
      <div>
        <span>NODE: {location}</span>
      </div>
    </div>
  );
}
