"use client";

import React, { useRef, useState, useEffect } from "react";

interface HolographicCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function HolographicCard({ children, className = "" }: HolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    // Mouse coords relative to card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalise coordinates from -0.5 to 0.5
    const normX = (x / rect.width) - 0.5;
    const normY = (y / rect.height) - 0.5;
    
    setCoords({ x: normX, y: normY });
  };

  const handleMouseEnter = () => {
    if (isMobile) return;
    setHovered(true);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  // Max 12deg tilt
  const rotateX = hovered ? -coords.y * 24 : 0;
  const rotateY = hovered ? coords.x * 24 : 0;

  // Radial gradient position for reflection highlight overlay
  const highlightStyle: React.CSSProperties = hovered
    ? {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 10,
        background: `radial-gradient(circle 250px at ${(coords.x + 0.5) * 100}% ${(coords.y + 0.5) * 100}%, rgba(255, 255, 255, 0.12), transparent 80%)`,
        mixBlendMode: "overlay",
        borderRadius: "inherit",
      }
    : { display: "none" };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        position: "relative",
        transformStyle: "preserve-3d",
        perspective: 800,
        transition: hovered ? "none" : "transform 0.5s ease",
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        height: "100%",
      }}
    >
      {/* Holographic light reflection overlay */}
      <div style={highlightStyle} />
      
      {/* Content wrapper */}
      <div style={{ transform: "translateZ(10px)", height: "100%" }}>
        {children}
      </div>
    </div>
  );
}
