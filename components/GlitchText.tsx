"use client";
import { useEffect, useState, ReactNode } from "react";

interface GlitchTextProps {
  children: ReactNode;
  interval?: number;
  duration?: number;
}

export default function GlitchText({
  children,
  interval = 6000,
  duration = 300,
}: GlitchTextProps) {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), duration);
    }, interval);
    return () => clearInterval(timer);
  }, [interval, duration]);

  return (
    <span
      className={glitching ? "glitch-active" : ""}
      style={{ position: "relative", display: "inline-block" }}
    >
      {children}

      {/* Glitch layers - only rendered during glitch */}
      {glitching && (
        <>
          <span
            aria-hidden="true"
            className="glitch-layer glitch-layer-1"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              color: "#00E5FF",
              zIndex: 1,
              pointerEvents: "none",
            }}
          >
            {children}
          </span>
          <span
            aria-hidden="true"
            className="glitch-layer glitch-layer-2"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              color: "#A855F7",
              zIndex: 2,
              pointerEvents: "none",
            }}
          >
            {children}
          </span>
        </>
      )}

      <style jsx global>{`
        .glitch-active {
          animation: glitch-base 300ms steps(1) forwards;
        }

        .glitch-layer-1 {
          animation: glitch-shift-1 300ms steps(1) infinite;
        }

        .glitch-layer-2 {
          animation: glitch-shift-2 300ms steps(1) infinite;
        }

        @keyframes glitch-base {
          0%, 100% { transform: translate(0); }
          5% { transform: translate(-3px, 1px); }
          10% { transform: translate(2px, -1px); }
          15% { transform: translate(0); }
          40% { transform: translate(3px, 2px); }
          45% { transform: translate(-2px, -1px); }
          50% { transform: translate(0); }
          75% { transform: translate(1px, -2px); }
          80% { transform: translate(-3px, 1px); }
          85% { transform: translate(0); }
        }

        @keyframes glitch-shift-1 {
          0%, 100% {
            clip-path: inset(0 0 85% 0);
            transform: translate(-3px, 0);
          }
          10% {
            clip-path: inset(15% 0 60% 0);
            transform: translate(3px, 0);
          }
          20% {
            clip-path: inset(50% 0 20% 0);
            transform: translate(-2px, 0);
          }
          30% {
            clip-path: inset(70% 0 5% 0);
            transform: translate(4px, 0);
          }
          40% {
            clip-path: inset(5% 0 80% 0);
            transform: translate(-3px, 0);
          }
          50% {
            clip-path: inset(30% 0 40% 0);
            transform: translate(2px, 0);
          }
          60% {
            clip-path: inset(60% 0 15% 0);
            transform: translate(-4px, 0);
          }
          70% {
            clip-path: inset(10% 0 70% 0);
            transform: translate(3px, 0);
          }
          80% {
            clip-path: inset(45% 0 30% 0);
            transform: translate(-2px, 0);
          }
          90% {
            clip-path: inset(80% 0 0% 0);
            transform: translate(3px, 0);
          }
        }

        @keyframes glitch-shift-2 {
          0%, 100% {
            clip-path: inset(65% 0 0% 0);
            transform: translate(3px, 0);
          }
          10% {
            clip-path: inset(0% 0 70% 0);
            transform: translate(-3px, 0);
          }
          20% {
            clip-path: inset(40% 0 35% 0);
            transform: translate(2px, 0);
          }
          30% {
            clip-path: inset(20% 0 55% 0);
            transform: translate(-4px, 0);
          }
          40% {
            clip-path: inset(75% 0 5% 0);
            transform: translate(3px, 0);
          }
          50% {
            clip-path: inset(10% 0 65% 0);
            transform: translate(-2px, 0);
          }
          60% {
            clip-path: inset(55% 0 20% 0);
            transform: translate(4px, 0);
          }
          70% {
            clip-path: inset(85% 0 0% 0);
            transform: translate(-3px, 0);
          }
          80% {
            clip-path: inset(25% 0 50% 0);
            transform: translate(2px, 0);
          }
          90% {
            clip-path: inset(0% 0 85% 0);
            transform: translate(-3px, 0);
          }
        }
      `}</style>
    </span>
  );
}
