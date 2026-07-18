"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, FileText, Calendar } from "lucide-react";
import { educationData } from "@/lib/data";

export default function Education() {
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
      id="education" 
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
          <span className="section-label">// EDUCATION</span>
          <h2 
            style={{ 
              fontFamily: "var(--font-space-grotesk)", 
              fontSize: "2.5rem", 
              fontWeight: 700,
              color: "#E2E8F0"
            }}
          >
            Academic Journey
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
                  stroke="url(#education-line-grad)"
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
                  <linearGradient id="education-line-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00E5FF" />
                    <stop offset="60%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}

          {educationData.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={item.institution + i}
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
                        background: "linear-gradient(to bottom, #00E5FF, #A855F7)",
                        borderTopLeftRadius: "16px",
                        borderBottomLeftRadius: "16px"
                      }}
                    />

                    <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", flexDirection: isMobile ? "column" : "row" }}>
                      
                      {/* Icon container */}
                      <div
                        style={{
                          width: "56px",
                          height: "56px",
                          borderRadius: "50%",
                          background: "rgba(0, 180, 216, 0.08)",
                          border: "1px solid rgba(0, 180, 216, 0.3)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#00E5FF",
                          flexShrink: 0,
                          boxShadow: "0 0 12px rgba(0, 180, 216, 0.15)"
                        }}
                      >
                        <GraduationCap size={28} />
                      </div>

                      <div style={{ flex: 1, width: "100%", textAlign: "left" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem", marginBottom: "0.5rem" }}>
                          <div>
                            <h3
                              style={{
                                fontFamily: "var(--font-space-grotesk)",
                                fontSize: isMobile ? "1.15rem" : "1.3rem",
                                color: "#E2E8F0",
                                fontWeight: 600,
                              }}
                            >
                              {item.degree}
                            </h3>
                            <p
                              style={{
                                color: "#00E5FF",
                                fontSize: "1rem",
                                fontWeight: 500,
                                fontFamily: "var(--font-space-grotesk)",
                                marginTop: "0.15rem"
                              }}
                            >
                              {item.institution}
                            </p>
                          </div>

                          {/* Date and Location */}
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.25rem" }}>
                            <span 
                              style={{ 
                                fontSize: "0.85rem", 
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
                            <span 
                              style={{ 
                                fontSize: "0.85rem", 
                                color: "#475569", 
                                display: "flex",
                                alignItems: "center",
                                gap: "0.25rem"
                              }}
                            >
                              <MapPin size={12} />
                              {item.location}
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <p
                          style={{
                            color: "#94A3B8",
                            fontSize: "0.95rem",
                            lineHeight: 1.6,
                            marginBottom: "1rem",
                            marginTop: "0.5rem"
                          }}
                        >
                          {item.description}
                        </p>

                        {/* Grades / GPA details & Transcript button */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginTop: "1rem" }}>
                          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                            <span
                              style={{
                                fontFamily: "var(--font-jetbrains-mono)",
                                background: "rgba(0, 229, 255, 0.05)",
                                color: "#00E5FF",
                                padding: "0.25rem 0.6rem",
                                borderRadius: "4px",
                                border: "1px solid rgba(0, 229, 255, 0.15)",
                                fontSize: "0.8rem"
                              }}
                            >
                              {item.cgpa ? `CGPA: ${item.cgpa}` : `Grade: ${item.grade}`}
                            </span>
                            
                            {item.semester && (
                              <span
                                style={{
                                  fontFamily: "var(--font-jetbrains-mono)",
                                  background: "rgba(168, 85, 247, 0.05)",
                                  color: "#A855F7",
                                  padding: "0.25rem 0.6rem",
                                  borderRadius: "4px",
                                  border: "1px solid rgba(168, 85, 247, 0.15)",
                                  fontSize: "0.8rem"
                                }}
                              >
                                Semester: {item.semester}
                              </span>
                            )}
                          </div>

                          {item.transcript && (
                            <a
                              href={item.transcript}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                fontSize: "0.8rem",
                                fontFamily: "var(--font-space-grotesk)",
                                color: "#00E5FF",
                                border: "1px solid rgba(0, 229, 255, 0.2)",
                                background: "rgba(0, 229, 255, 0.03)",
                                padding: "0.45rem 1rem",
                                borderRadius: "6px",
                                textDecoration: "none",
                                transition: "all 0.2s ease",
                              }}
                              className="view-transcript-btn"
                            >
                              <FileText size={14} />
                              View Transcript
                            </a>
                          )}
                        </div>

                      </div>
                    </div>

                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>

      <style jsx global>{`
        .view-transcript-btn:hover {
          color: #E2E8F0 !important;
          border-color: #00E5FF !important;
          background: rgba(0, 229, 255, 0.1) !important;
          box-shadow: 0 0 10px rgba(0, 229, 255, 0.15);
        }
      `}</style>
    </section>
  );
}
