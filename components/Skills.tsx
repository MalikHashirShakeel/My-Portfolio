"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { skillCategories } from "@/lib/data";

interface Position {
  x: number;
  y: number;
}

// Organic constellation coordinates inside a square 100x100 container
const getConstellationPos = (idx: number, total: number): Position => {
  if (idx === 0) return { x: 50, y: 50 }; // Primary core node at center
  const angle = ((idx - 1) * (2 * Math.PI)) / (total - 1);
  const radius = 35; // spacing from center
  const x = 50 + Math.cos(angle) * radius;
  const y = 50 + Math.sin(angle) * radius;
  return { x, y };
};

// Celestial telemetry metadata for each cluster
const catMetadata = [
  { ra: "RA: 05h 35m 17s", dec: "DEC: -05° 23′ 28″", constellation: "CLUSTER: ORION_NEBULA", spectral: "SPECTRAL_CLASS: O6" },
  { ra: "RA: 18h 36m 56s", dec: "DEC: +38° 47′ 01″", constellation: "CLUSTER: RING_NEBULA", spectral: "SPECTRAL_CLASS: A0V" },
  { ra: "RA: 13h 25m 12s", dec: "DEC: +54° 55′ 09″", constellation: "CLUSTER: PINWHEEL_GAL", spectral: "SPECTRAL_CLASS: F6V" },
  { ra: "RA: 04h 26m 54s", dec: "DEC: +15° 52′ 19″", constellation: "CLUSTER: HYADES_STARS", spectral: "SPECTRAL_CLASS: K5III" },
  { ra: "RA: 19h 50m 47s", dec: "DEC: +35° 12′ 01″", constellation: "CLUSTER: CYGNUS_ARM", spectral: "SPECTRAL_CLASS: A2V" },
];

export default function Skills() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 991px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return (
    <section 
      id="skills" 
      style={{ 
        position: "relative", 
        overflow: "hidden",
        background: "var(--bg-navy)",
        paddingBottom: "8rem"
      }}
      className="grid-pattern-overlay"
    >
      <div className="section-container" style={{ position: "relative", zIndex: 2 }}>
        
        {/* Section Divider Line above */}
        <div className="section-divider" style={{ position: "absolute", top: 0, left: 0 }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "3.5rem" }}
        >
          <span className="section-label">// SKILL_MAP</span>
          <h2 
            style={{ 
              fontFamily: "var(--font-space-grotesk)", 
              fontSize: "2.5rem", 
              fontWeight: 700,
              color: "#E2E8F0"
            }}
          >
            Constellation Grid
          </h2>
        </motion.div>

        {/* Constellation Clusters Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(440px, 1fr))",
            gap: "2.5rem",
          }}
          className="skills-constellations"
        >
          {skillCategories.map((category, catIndex) => (
            <ConstellationCard 
              key={category.title}
              category={category}
              catIndex={catIndex}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ConstellationCardProps {
  category: typeof skillCategories[0];
  catIndex: number;
  isMobile: boolean;
}

function ConstellationCard({ category, catIndex, isMobile }: ConstellationCardProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Generate constellation positions once (mapped within a 100x100 square)
  const positions = category.skills.map((_, idx) => 
    getConstellationPos(idx, category.skills.length)
  );

  const meta = catMetadata[catIndex % catMetadata.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: catIndex * 0.08 }}
      className="glass-card"
      style={{
        padding: "2.5rem 2rem 2rem",
        border: "1px solid rgba(0, 229, 255, 0.08)",
        boxShadow: "0 4px 20px rgba(6, 11, 26, 0.4)",
        position: "relative",
        minHeight: isMobile ? "auto" : "360px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden"
      }}
    >
      {/* Decorative Observatory Coordinates (Telemetry overlay) */}
      {!isMobile && (
        <>
          <div style={{ position: "absolute", top: "10px", left: "12px", fontSize: "7px", fontFamily: "var(--font-jetbrains-mono), monospace", color: "rgba(148, 163, 184, 0.3)" }}>
            {meta.ra}
          </div>
          <div style={{ position: "absolute", top: "10px", right: "12px", fontSize: "7px", fontFamily: "var(--font-jetbrains-mono), monospace", color: "rgba(148, 163, 184, 0.3)" }}>
            {meta.dec}
          </div>
          <div style={{ position: "absolute", bottom: "10px", left: "12px", fontSize: "7px", fontFamily: "var(--font-jetbrains-mono), monospace", color: "rgba(148, 163, 184, 0.3)" }}>
            {meta.constellation}
          </div>
          <div style={{ position: "absolute", bottom: "10px", right: "12px", fontSize: "7px", fontFamily: "var(--font-jetbrains-mono), monospace", color: "rgba(148, 163, 184, 0.3)" }}>
            {meta.spectral}
          </div>
        </>
      )}

      {/* Nebula/Cluster Glowing Background Behind Header */}
      <div 
        style={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${category.color}08 0%, transparent 70%)`,
          pointerEvents: "none",
          zIndex: 0
        }}
      />

      {/* Glowing Cluster Title */}
      <h3
        style={{
          fontFamily: "var(--font-space-grotesk)",
          fontSize: "1rem",
          fontWeight: 600,
          color: category.color,
          marginBottom: "1.5rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          textShadow: `0 0 10px ${category.color}30`,
          position: "relative",
          zIndex: 2
        }}
      >
        {category.title}
      </h3>

      {isMobile ? (
        /* Mobile Layout: Clean compact chips grid */
        <div 
          style={{ 
            display: "flex", 
            flexWrap: "wrap", 
            gap: "0.65rem",
            position: "relative",
            zIndex: 1
          }}
        >
          {category.skills.map((skill) => (
            <div
              key={skill.name}
              style={{
                background: "rgba(13, 33, 55, 0.6)",
                border: "1px solid rgba(0, 180, 216, 0.12)",
                borderRadius: "8px",
                padding: "0.45rem 0.75rem",
                display: "flex",
                alignItems: "center",
                gap: "0.45rem",
              }}
            >
              {skill.icon ? (
                <skill.icon size={14} style={{ color: "#00E5FF" }} />
              ) : (
                <div 
                  style={{ 
                    width: "6px", 
                    height: "6px", 
                    borderRadius: "50%", 
                    background: category.color 
                  }} 
                />
              )}
              <span 
                style={{ 
                  fontSize: "0.8rem", 
                  color: "#E2E8F0",
                  fontFamily: "var(--font-inter)" 
                }}
              >
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      ) : (
        /* Desktop Layout: Split Constellation Map + Level HUD */
        <div 
          style={{ 
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2.5rem",
            position: "relative",
            zIndex: 1,
            width: "100%",
            height: "260px"
          }}
        >
          {/* Left: Fixed Square Constellation Map Box */}
          <div 
            style={{ 
              position: "relative",
              width: "220px",
              height: "220px",
              flexShrink: 0,
            }}
          >
            {/* Constellation SVG Links & Concentric grid rings */}
            <svg 
              style={{ 
                position: "absolute", 
                inset: 0, 
                width: "100%", 
                height: "100%", 
                overflow: "visible",
                pointerEvents: "none" 
              }}
            >
              {/* Background alignment rings */}
              <circle cx="50%" cy="50%" r="35%" fill="none" stroke={category.color} strokeOpacity="0.04" strokeDasharray="3,5" />
              <circle cx="50%" cy="50%" r="18%" fill="none" stroke={category.color} strokeOpacity="0.03" strokeDasharray="1,3" />

              {/* Draw lines from center to outer nodes */}
              {positions.slice(1).map((pos, idx) => {
                const outerIdx = idx + 1;
                const isHighlighted = hoveredIdx === 0 || hoveredIdx === outerIdx;
                return (
                  <line
                    key={`center-line-${idx}`}
                    x1="50%"
                    y1="50%"
                    x2={`${pos.x}%`}
                    y2={`${pos.y}%`}
                    stroke={category.color}
                    strokeOpacity={isHighlighted ? 0.75 : 0.12}
                    strokeWidth={isHighlighted ? 1.5 : 0.75}
                    strokeDasharray={isHighlighted ? "none" : "2,4"}
                    style={{ transition: "all 0.25s ease" }}
                  />
                );
              })}

              {/* Draw lines connecting outer nodes sequentially */}
              {positions.slice(1).map((pos, idx) => {
                const nextIdx = idx === positions.length - 2 ? 1 : idx + 2;
                const nextPos = positions[nextIdx];
                const outerIdx1 = idx + 1;
                const isHighlighted = hoveredIdx === outerIdx1 || hoveredIdx === nextIdx;

                return (
                  <line
                    key={`outer-line-${idx}`}
                    x1={`${pos.x}%`}
                    y1={`${pos.y}%`}
                    x2={`${nextPos.x}%`}
                    y2={`${nextPos.y}%`}
                    stroke={category.color}
                    strokeOpacity={isHighlighted ? 0.5 : 0.07}
                    strokeWidth={isHighlighted ? 1.2 : 0.5}
                    style={{ transition: "all 0.25s ease" }}
                  />
                );
              })}
            </svg>

            {/* Render Skills as floating stars/nodes inside the square box */}
            {category.skills.map((skill, idx) => {
              const pos = positions[idx];
              const isHovered = hoveredIdx === idx;
              const isAnyHovered = hoveredIdx !== null;
              const opacity = !isAnyHovered || isHovered ? 1 : 0.35;

              return (
                <div
                  key={skill.name}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    position: "absolute",
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                    zIndex: isHovered ? 10 : 2,
                    opacity,
                    transition: "opacity 0.2s ease"
                  }}
                >
                  {/* Star point */}
                  <div
                    style={{
                      width: idx === 0 ? "10px" : "7px",
                      height: idx === 0 ? "10px" : "7px",
                      borderRadius: "50%",
                      backgroundColor: isHovered ? "#FFFFFF" : category.color,
                      border: `1.5px solid ${isHovered ? category.color : "transparent"}`,
                      boxShadow: isHovered 
                        ? `0 0 12px #FFFFFF, 0 0 20px ${category.color}` 
                        : `0 0 6px ${category.color}`,
                      transition: "all 0.25s ease",
                      marginBottom: "4px"
                    }}
                  />

                  {/* Tiny label on node hover */}
                  {isHovered && (
                    <span
                      style={{
                        fontFamily: "var(--font-jetbrains-mono), monospace",
                        fontSize: "8px",
                        color: "#FFFFFF",
                        whiteSpace: "nowrap",
                        background: "rgba(6, 11, 26, 0.9)",
                        padding: "0.1rem 0.3rem",
                        borderRadius: "2px",
                        border: `1px solid ${category.color}`,
                        marginTop: "2px"
                      }}
                    >
                      {skill.name}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Level Telemetry HUD List */}
          <div 
            style={{ 
              flexGrow: 1, 
              display: "flex", 
              flexDirection: "column", 
              gap: "8px",
              borderLeft: "1px dashed rgba(0, 229, 255, 0.08)",
              paddingLeft: "1.5rem",
              height: "220px",
              justifyContent: "center"
            }}
          >
            <div 
              style={{ 
                fontSize: "8px", 
                fontFamily: "var(--font-jetbrains-mono), monospace", 
                color: "rgba(0, 229, 255, 0.4)", 
                borderBottom: "1px dashed rgba(0, 229, 255, 0.08)", 
                paddingBottom: "4px",
                marginBottom: "6px",
                textTransform: "uppercase",
                letterSpacing: "0.1em"
              }}
            >
              CLUSTER_REGISTRY_LOG
            </div>

            {category.skills.map((skill, idx) => {
              const isHovered = hoveredIdx === idx;
              const isAnyHovered = hoveredIdx !== null;
              const level = skill.level || 85;

              return (
                <div
                  key={skill.name}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                    cursor: "pointer",
                    opacity: !isAnyHovered || isHovered ? 1 : 0.35,
                    transition: "opacity 0.2s ease"
                  }}
                >
                  <div 
                    style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "center",
                      fontSize: "10px",
                      fontFamily: "var(--font-jetbrains-mono), monospace"
                    }}
                  >
                    <span style={{ color: isHovered ? "#FFFFFF" : "#94A3B8" }}>
                      &gt; {skill.name}
                    </span>
                    <span style={{ color: isHovered ? "#FFFFFF" : category.color, fontSize: "9px" }}>
                      {level}%
                    </span>
                  </div>

                  {/* Level Progress Bar */}
                  <div 
                    style={{ 
                      width: "100%", 
                      height: "3px", 
                      background: "rgba(226, 232, 240, 0.04)", 
                      borderRadius: "1px", 
                      overflow: "hidden" 
                    }}
                  >
                    <div 
                      style={{ 
                        width: `${level}%`, 
                        height: "100%", 
                        background: isHovered ? "linear-gradient(90deg, #FFFFFF, " + category.color + ")" : category.color,
                        boxShadow: isHovered ? `0 0 6px ${category.color}` : "none",
                        transition: "all 0.3s ease"
                      }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
}
