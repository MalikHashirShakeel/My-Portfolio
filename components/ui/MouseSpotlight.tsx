"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function MouseSpotlight() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 25 });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <motion.div
      style={{
        left: smoothX,
        top: smoothY,
        opacity: isVisible ? 1 : 0,
        pointerEvents: "none",
        position: "fixed",
        zIndex: 9999,
        transform: "translate(-50%, -50%)",
        borderRadius: "50%",
      }}
    >
      <div 
        style={{
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(0, 245, 255, 0.08) 0%, rgba(0,0,0,0) 50%)",
          filter: "blur(40px)",
        }}
      />
    </motion.div>
  );
}
