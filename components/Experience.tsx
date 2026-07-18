"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, ExternalLink, Calendar } from "lucide-react";
import { experienceData } from "@/lib/data";

export default function Experience() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return (
    <section 
      id="experience" 
      style={{ 
        position: "relative", 
        overflow: "hidden", 
        background: "var(--bg-space)"
      }}
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
          <span className="section-label">// EXPERIENCE</span>
          <h2 
            style={{ 
              fontFamily: "var(--font-space-grotesk)", 
              fontSize: "2.5rem", 
              fontWeight: 700,
              color: "#E2E8F0"
            }}
          >
            Work History
          </h2>
        </motion.div>

        {/* Timeline Path Layout */}
        <div style={{ position: "relative", width: "100%", marginTop: "2rem" }}>
          
          {/* Central Line (Desktop) or Left Line (Mobile) */}
          {isMobile ? (
            <div 
              style={{ 
                position: "absolute", 
                left: "4px", 
                top: "10px", 
                bottom: "10px", 
                width: "2px", 
                background: "linear-gradient(to bottom, #00B4D8, #7B2FBE, transparent)",
                opacity: 0.6
              }} 
            />
          ) : (
            <div 
              style={{ 
                position: "absolute", 
                left: "50%", 
                transform: "translateX(-50%)",
                top: "10px", 
                bottom: "10px", 
                width: "2px"
              }} 
            >
              <svg style={{ width: "100%", height: "100%", overflow: "visible" }}>
                <motion.line
                  x1="1"
                  y1="0"
                  x2="1"
                  y2="100%"
                  stroke="url(#experience-line-grad)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, ease: "easeInOut" }}
                  style={{
                    filter: "drop-shadow(0px 0px 4px #00B4D8)"
                  }}
                />
                <defs>
                  <linearGradient id="experience-line-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00B4D8" />
                    <stop offset="60%" stopColor="#7B2FBE" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}

          {experienceData.map((item, i) => {
            const isPresent = item.period.toLowerCase().includes("present");
            const isLeft = i % 2 === 0;
            return (
              <div
                key={item.company + i}
                style={{
                  display: "flex",
                  justifyContent: isMobile ? "flex-start" : (isLeft ? "flex-end" : "flex-start"),
                  width: "100%",
                  position: "relative",
                  marginBottom: isMobile ? "2.5rem" : "4rem",
                  paddingLeft: isMobile ? "2rem" : "0"
                }}
              >
                {/* Joint / Point Node (Central on Desktop, Left on Mobile) */}
                <div 
                  style={{ 
                    position: "absolute", 
                    left: isMobile ? "4px" : "50%", 
                    top: "16px", 
                    transform: "translate(-50%, 0)", 
                    width: "28px", 
                    height: "28px", 
                    borderRadius: "50%", 
                    background: "rgba(6, 11, 26, 0.95)", 
                    border: "2px solid #00E5FF",
                    boxShadow: "0 0 12px rgba(0, 229, 255, 0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 10,
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: "9px",
                    color: "#00E5FF",
                    fontWeight: "bold"
                  }} 
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Horizontal Branch Connector (Desktop Only) */}
                {!isMobile && (
                  <div
                    style={{
                      position: "absolute",
                      top: "30px",
                      left: isLeft ? "calc(50% - 2.5rem)" : "50%",
                      width: "2.5rem",
                      height: "1.5px",
                      background: "linear-gradient(90deg, rgba(0, 229, 255, 0.4), rgba(168, 85, 247, 0.4))",
                      zIndex: 1
                    }}
                  />
                )}

                {/* Floating glass card */}
                <motion.div
                  initial={{ opacity: 0, x: isMobile ? -20 : (isLeft ? -30 : 30) }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: isMobile ? 0 : i * 0.1 }}
                  style={{ 
                    width: isMobile ? "100%" : "calc(50% - 2.5rem)",
                    marginRight: !isMobile && isLeft ? "2.5rem" : "0",
                    marginLeft: !isMobile && !isLeft ? "2.5rem" : "0",
                  }}
                >
                  <div 
                    className="glass-card"
                    style={{ 
                      padding: isMobile ? "1.5rem" : "2rem",
                      boxShadow: "0 0 30px rgba(0,228,255,0.06)",
                      position: "relative"
                    }}
                  >
                    {/* Left Accent Glow Line */}
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: "4px",
                        background: "linear-gradient(to bottom, #00B4D8, #7B2FBE)",
                        borderTopLeftRadius: "16px",
                        borderBottomLeftRadius: "16px"
                      }}
                    />

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", textAlign: "left" }}>
                      <div>
                        {/* Company Name & Link */}
                        <a 
                          href={item.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ 
                            display: "inline-flex", 
                            alignItems: "center", 
                            gap: "0.5rem",
                            fontFamily: "var(--font-space-grotesk)",
                            fontSize: "1.25rem",
                            fontWeight: 600,
                            color: "#E2E8F0",
                            textDecoration: "none",
                            transition: "color 0.3s"
                          }}
                          className="experience-company-link"
                        >
                          {item.company}
                          <ExternalLink size={16} style={{ color: "#00B4D8" }} />
                        </a>

                        {/* Role Badge */}
                        <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.75rem", alignItems: "center" }}>
                          <span 
                            style={{
                              background: "linear-gradient(90deg, #00E5FF 0%, #A855F7 100%)",
                              color: "#060B1A",
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              padding: "0.25rem 0.75rem",
                              borderRadius: "9999px",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em"
                            }}
                          >
                            {item.role}
                          </span>
                        </div>
                      </div>

                      {/* Date and Location */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.35rem" }} className="experience-meta">
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          {isPresent && <span className="pulse-green" />}
                          <span 
                            style={{ 
                              fontSize: "0.9rem", 
                              color: "#94A3B8", 
                              fontFamily: "var(--font-jetbrains-mono)",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.25rem"
                            }}
                          >
                            <Calendar size={12} />
                            {item.period}
                          </span>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "#475569", fontSize: "0.85rem" }}>
                          <MapPin size={14} />
                          <span>{item.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Responsibilities bullets */}
                    <ul style={{ marginTop: "1.5rem", paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.65rem", textAlign: "left" }}>
                      {item.bullets.map((bullet, idx) => (
                        <li 
                          key={idx} 
                          style={{ 
                            color: "#94A3B8", 
                            fontSize: "0.95rem", 
                            lineHeight: 1.6,
                            listStyleType: "circle"
                          }}
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>

                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>

      <style jsx global>{`
        .experience-company-link:hover {
          color: #00E5FF !important;
        }
      `}</style>
    </section>
  );
}
