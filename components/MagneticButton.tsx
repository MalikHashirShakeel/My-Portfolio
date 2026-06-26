"use client";
import { useRef, useState, useCallback, ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  strength?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function MagneticButton({
  children,
  strength = 8,
  className,
  style,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      // Lerp toward cursor, clamped to max strength
      const maxDist = Math.max(rect.width, rect.height) / 2;
      const factor = Math.min(1, strength / maxDist);
      setTransform({
        x: Math.max(-strength, Math.min(strength, dx * factor)),
        y: Math.max(-strength, Math.min(strength, dy * factor)),
      });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    setTransform({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: "inline-block",
        transition: transform.x === 0 && transform.y === 0
          ? "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
          : "transform 0.15s ease-out",
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
