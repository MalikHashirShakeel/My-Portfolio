"use client";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

export default function TiltCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth springs for the rotation
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const rotXSpring = useSpring(useTransform(mouseY, [0, 1], [15, -15]), springConfig);
  const rotYSpring = useSpring(useTransform(mouseX, [0, 1], [-15, 15]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    mouseX.set(mouseXPos / width);
    mouseY.set(mouseYPos / height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotXSpring,
        rotateY: rotYSpring,
        transformStyle: "preserve-3d",
      }}
      className="h-full"
    >
      {/* Container adding perspective */}
      <div style={{ transform: "translateZ(30px)", display: "flex", flexDirection: "column", height: "100%" }}>
        {children}
      </div>
    </motion.div>
  );
}
