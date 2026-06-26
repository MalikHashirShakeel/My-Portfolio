"use client";

import { motion } from "framer-motion";
import React from "react";

/* ------------------------------------------------------------------ */
/*  1. Words Fly-In (for About Bio)                                   */
/* ------------------------------------------------------------------ */

interface WordsFlyInProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export function WordsFlyIn({ text, className = "", style = {} }: WordsFlyInProps) {
  const words = text.split(" ");
  
  return (
    <span 
      className={className} 
      style={{ 
        display: "inline-block", 
        whiteSpace: "normal",
        ...style 
      }}
    >
      {words.map((word, idx) => {
        // Generate pseudo-random direction and rotation based on word index
        const angle = (idx * 37) % 360;
        const radius = 80 + (idx * 13) % 120; // 80px to 200px offset
        const rad = (angle * Math.PI) / 180;
        const initialX = Math.round(Math.cos(rad) * radius);
        const initialY = Math.round(Math.sin(rad) * radius);
        const initialRotate = Math.round(-45 + (idx * 23) % 90); // -45 to 45 deg

        return (
          <motion.span
            key={idx}
            initial={{ opacity: 0, x: initialX, y: initialY, rotate: initialRotate }}
            whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              type: "spring",
              damping: 18,
              stiffness: 80,
              delay: idx * 0.02,
            }}
            style={{ display: "inline-block", marginRight: "0.28em" }}
          >
            {word}
          </motion.span>
        );
      })}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  2. Meteor Shoot-In (for Skill Chips)                              */
/* ------------------------------------------------------------------ */

interface MeteorShootInProps {
  children: React.ReactNode;
  index: number;
  catIndex: number;
  className?: string;
  style?: React.CSSProperties;
}

export function MeteorShootIn({
  children,
  index,
  catIndex,
  className = "",
  style = {},
}: MeteorShootInProps) {
  // Stagger calculation
  const delay = catIndex * 0.08 + index * 0.025;
  
  // Pseudo-random angle & offscreen offset based on indices
  const angle = (catIndex * 43 + index * 71) % 360;
  const rad = (angle * Math.PI) / 180;
  const offset = 250; // px
  const initialX = Math.round(Math.cos(rad) * offset);
  const initialY = Math.round(Math.sin(rad) * offset);

  return (
    <motion.div
      initial={{ opacity: 0, x: initialX, y: initialY, scale: 0.7 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      whileHover={{ 
        scale: 1.05, 
        borderColor: "rgba(0, 229, 255, 0.4)",
        boxShadow: "0 0 15px rgba(0, 229, 255, 0.15)"
      }}
      transition={{
        type: "spring",
        stiffness: 85,
        damping: 14, // Spring with overshoot
        delay,
      }}
      className={className}
      style={{
        display: "inline-flex",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  3. Form Input Width Expansion (for Contact)                      */
/* ------------------------------------------------------------------ */

interface ExpandWidthProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function ExpandWidth({ children, delay = 0, className = "", style = {} }: ExpandWidthProps) {
  return (
    <div 
      className={className}
      style={{ 
        position: "relative",
        width: "100%",
        overflow: "hidden",
        ...style 
      }}
    >
      <motion.div
        initial={{ width: "0%" }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ 
          duration: 0.8, 
          ease: [0.16, 1, 0.3, 1], // easeOutQuint
          delay 
        }}
        style={{ width: "100%" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
