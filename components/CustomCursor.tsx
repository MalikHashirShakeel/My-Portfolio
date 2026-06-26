"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const innerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  
  const [hidden, setHidden] = useState(true);
  const [hoverType, setHoverType] = useState<"normal" | "interactive" | "text">("normal");

  const pos = useRef({ x: 0, y: 0 }); // Mouse position
  const outerPos = useRef({ x: 0, y: 0 }); // Outer circle lagging position

  useEffect(() => {
    // Disable on coarse pointer devices (touch devices)
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) {
      return;
    }

    // Set cursor none on body
    document.body.style.cursor = "none";

    const onMouseMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      if (hidden) setHidden(false);
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    // Detect interactives (links, buttons, inputs, elements with role=button)
    // Detect text containers (p, h1, h2, h3, h4, h5, h6, span, li, a, etc.)
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if hover is interactive
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.style.cursor === "pointer";

      if (isInteractive) {
        setHoverType("interactive");
        return;
      }

      // Check if text (h1-h6, p, span, etc., that contains text directly or indirectly)
      const textTags = ["P", "H1", "H2", "H3", "H4", "H5", "H6", "SPAN", "LI", "CODE"];
      const isText = textTags.includes(target.tagName) || target.closest("p") || target.closest("code");
      if (isText) {
        setHoverType("text");
      } else {
        setHoverType("normal");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("mouseover", onMouseOver);

    // Animation Loop
    let rafId: number;
    const updateCursor = () => {
      // Lerp for outer ring
      const ease = 0.15; // roughly 80-100ms lag at 60fps
      outerPos.current.x += (pos.current.x - outerPos.current.x) * ease;
      outerPos.current.y += (pos.current.y - outerPos.current.y) * ease;

      // Position inner dot immediately
      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }

      // Position outer ring
      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${outerPos.current.x}px, ${outerPos.current.y}px, 0)`;
      }

      rafId = requestAnimationFrame(updateCursor);
    };

    rafId = requestAnimationFrame(updateCursor);

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, [hidden]);

  // If hidden (e.g. mouse left window or touch device), don't render anything visible
  if (hidden) return null;

  // Render cursor layers
  // Interactive style: Inner expands, outer expands, colors invert from cyan to purple
  // Text style: Outer ring squishes to a narrow vertical line (I-beam)
  const isInteractive = hoverType === "interactive";
  const isText = hoverType === "text";

  const innerSize = isInteractive ? 16 : 8;
  const outerSize = isInteractive ? 40 : 28;

  // Core colors: cyan #00E5FF, purple #A855F7
  const color = isInteractive ? "#A855F7" : "#00E5FF";

  return (
    <>
      {/* Inner Dot */}
      <div
        ref={innerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: innerSize,
          height: innerSize,
          borderRadius: "50%",
          backgroundColor: color,
          pointerEvents: "none",
          zIndex: 100000,
          transform: "translate3d(-50%, -50%, 0)",
          transition: "width 0.2s ease, height 0.2s ease, background-color 0.2s ease",
          marginTop: -innerSize / 2,
          marginLeft: -innerSize / 2,
          mixBlendMode: isInteractive ? "difference" : "normal",
          boxShadow: isInteractive
            ? `0 0 10px ${color}`
            : `0 0 4px ${color}`,
        }}
      />
      {/* Outer Ring */}
      <div
        ref={outerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: isText ? 2 : outerSize,
          height: outerSize,
          borderRadius: isText ? "1px" : "50%",
          border: isText ? "none" : `1px solid ${color}`,
          backgroundColor: isText ? color : "transparent",
          pointerEvents: "none",
          zIndex: 99999,
          transform: "translate3d(-50%, -50%, 0)",
          transition: "width 0.2s ease, height 0.2s ease, border-radius 0.2s ease, border 0.2s ease, background-color 0.2s ease",
          marginTop: -outerSize / 2,
          marginLeft: isText ? -1 : -outerSize / 2,
          boxShadow: isInteractive ? `0 0 15px rgba(168, 85, 247, 0.4)` : "none",
        }}
      />
    </>
  );
}
