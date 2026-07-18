"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const innerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on coarse pointer devices (touch devices)
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // Set cursor none on body
    document.body.style.cursor = "none";

    const mousePos = { x: 0, y: 0 };
    const outerPos = { x: 0, y: 0 };
    let isHidden = true;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;

      if (isHidden) {
        isHidden = false;
        container.style.opacity = "1";
      }
    };

    const onMouseLeave = () => {
      isHidden = true;
      container.style.opacity = "0";
    };

    const onMouseEnter = () => {
      isHidden = false;
      container.style.opacity = "1";
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

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
        container.className = "custom-cursor-container cursor-hover-interactive";
        return;
      }

      const textTags = ["P", "H1", "H2", "H3", "H4", "H5", "H6", "SPAN", "LI", "CODE"];
      const isText = textTags.includes(target.tagName) || target.closest("p") || target.closest("code");
      if (isText) {
        container.className = "custom-cursor-container cursor-hover-text";
      } else {
        container.className = "custom-cursor-container";
      }
    };

    const onClick = (e: MouseEvent) => {
      // Spawn a zero-re-render high performance click ripple in DOM
      const ripple = document.createElement("div");
      ripple.className = "custom-cursor-ripple";
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);

      // Clean up after animation finishes
      setTimeout(() => {
        ripple.remove();
      }, 600);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("click", onClick);

    // Animation Loop
    let rafId: number;
    const updateCursor = () => {
      // Easing/Lag for outer ring
      const ease = 0.16;
      outerPos.x += (mousePos.x - outerPos.x) * ease;
      outerPos.y += (mousePos.y - outerPos.y) * ease;

      // Position inner dot immediately
      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`;
      }

      // Position outer ring
      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${outerPos.x}px, ${outerPos.y}px, 0)`;
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
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const stylesCSS = `
    .custom-cursor-container {
      opacity: 0;
      transition: opacity 0.2s ease;
      pointer-events: none;
    }
    
    .custom-cursor-inner {
      position: fixed;
      top: 0;
      left: 0;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #00E5FF;
      pointer-events: none;
      z-index: 100000;
      transform: translate3d(-50%, -50%, 0);
      transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1), 
                  height 0.25s cubic-bezier(0.16, 1, 0.3, 1), 
                  background-color 0.25s cubic-bezier(0.16, 1, 0.3, 1), 
                  box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 0 8px rgba(0, 229, 255, 0.8);
      will-change: transform;
    }

    .custom-cursor-outer {
      position: fixed;
      top: 0;
      left: 0;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 1.5px solid rgba(0, 229, 255, 0.4);
      pointer-events: none;
      z-index: 99999;
      transform: translate3d(-50%, -50%, 0);
      transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1), 
                  height 0.25s cubic-bezier(0.16, 1, 0.3, 1), 
                  border-color 0.25s cubic-bezier(0.16, 1, 0.3, 1), 
                  border-radius 0.25s cubic-bezier(0.16, 1, 0.3, 1), 
                  background-color 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      margin-top: -14px;
      margin-left: -14px;
      will-change: transform;
    }

    /* Reticle styling ticks */
    .custom-cursor-outer::before,
    .custom-cursor-outer::after {
      content: '';
      position: absolute;
      background-color: rgba(0, 229, 255, 0.6);
      transition: background-color 0.25s ease, opacity 0.25s ease;
    }

    /* Vertical reticle line */
    .custom-cursor-outer::before {
      top: -4px;
      bottom: -4px;
      left: 50%;
      width: 1px;
      transform: scaleY(0.16) translateX(-50%);
    }

    /* Horizontal reticle line */
    .custom-cursor-outer::after {
      left: -4px;
      right: -4px;
      top: 50%;
      height: 1px;
      transform: scaleX(0.16) translateY(-50%);
    }

    /* Hovering Interactive Element State */
    .cursor-hover-interactive .custom-cursor-inner {
      width: 10px;
      height: 10px;
      background-color: #A855F7;
      box-shadow: 0 0 12px rgba(168, 85, 247, 0.9);
    }

    .cursor-hover-interactive .custom-cursor-outer {
      width: 44px;
      height: 44px;
      margin-top: -22px;
      margin-left: -22px;
      border-color: rgba(168, 85, 247, 0.7);
      background-color: rgba(168, 85, 247, 0.04);
      animation: spin-reticle 10s linear infinite;
    }

    .cursor-hover-interactive .custom-cursor-outer::before,
    .cursor-hover-interactive .custom-cursor-outer::after {
      background-color: rgba(168, 85, 247, 0.8);
    }

    /* Hovering Text Element State */
    .cursor-hover-text .custom-cursor-inner {
      width: 4px;
      height: 4px;
      background-color: #00E5FF;
      box-shadow: 0 0 4px rgba(0, 229, 255, 0.6);
    }

    .cursor-hover-text .custom-cursor-outer {
      width: 2px;
      height: 20px;
      margin-top: -10px;
      margin-left: -1px;
      border-radius: 2px;
      border: none;
      background-color: #00E5FF;
      box-shadow: 0 0 8px rgba(0, 229, 255, 0.4);
    }

    .cursor-hover-text .custom-cursor-outer::before,
    .cursor-hover-text .custom-cursor-outer::after {
      opacity: 0;
    }

    /* Click Ripple Effect in DOM */
    .custom-cursor-ripple {
      position: fixed;
      width: 8px;
      height: 8px;
      border: 1.5px solid #00E5FF;
      border-radius: 50%;
      pointer-events: none;
      z-index: 99998;
      transform: translate3d(-50%, -50%, 0);
      animation: ripple-out 0.6s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
      box-shadow: 0 0 10px rgba(0, 229, 255, 0.3);
      will-change: width, height, opacity;
    }

    @keyframes spin-reticle {
      from { transform: translate3d(0, 0, 0) rotate(0deg); }
      to { transform: translate3d(0, 0, 0) rotate(360deg); }
    }

    @keyframes ripple-out {
      0% {
        width: 8px;
        height: 8px;
        opacity: 1;
        border-color: #00E5FF;
      }
      100% {
        width: 64px;
        height: 64px;
        opacity: 0;
        border-color: #A855F7;
      }
    }
  `;

  return (
    <div ref={containerRef} className="custom-cursor-container">
      <style dangerouslySetInnerHTML={{ __html: stylesCSS }} />
      <div ref={innerRef} className="custom-cursor-inner" />
      <div ref={outerRef} className="custom-cursor-outer" />
    </div>
  );
}
