"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { projects } from "@/lib/data";
import HolographicCard from "./HolographicCard";
import MagneticButton from "./MagneticButton";

const banners = [
  "linear-gradient(90deg, #00E5FF 0%, #7B2FBE 100%)",
  "linear-gradient(90deg, #00B4D8 0%, #A855F7 100%)",
  "linear-gradient(90deg, #7B2FBE 0%, #00E5FF 100%)",
  "linear-gradient(90deg, #A855F7 0%, #00B4D8 100%)",
];

export default function Projects() {
  const [filter, setFilter] = useState<"all" | "ai" | "fullstack">("all");

  const filteredProjects = projects.filter(
    (p) => filter === "all" || p.category === filter
  );

  return (
    <section 
      id="projects" 
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
          style={{ marginBottom: "2.5rem" }}
        >
          <span className="section-label">// STAR_SYSTEMS</span>
          <h2 
            style={{ 
              fontFamily: "var(--font-space-grotesk)", 
              fontSize: "2.5rem", 
              fontWeight: 700,
              color: "#E2E8F0"
            }}
          >
            Featured Projects
          </h2>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: "flex",
            gap: "0.75rem",
            marginBottom: "3rem",
            flexWrap: "wrap",
          }}
        >
          {(
            [
              { id: "all", label: "All Systems" },
              { id: "ai", label: "AI & Deep Learning" },
              { id: "fullstack", label: "Full Stack" },
            ] as const
          ).map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id)}
              style={{
                background: filter === btn.id ? "rgba(0, 229, 255, 0.08)" : "rgba(13, 33, 55, 0.4)",
                border: `1px solid ${
                  filter === btn.id ? "#00E5FF" : "rgba(0, 228, 255, 0.12)"
                }`,
                color: filter === btn.id ? "#00E5FF" : "#94A3B8",
                padding: "0.45rem 1.25rem",
                borderRadius: "9999px",
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                boxShadow: filter === btn.id ? "0 0 15px rgba(0, 229, 255, 0.15)" : "none",
              }}
            >
              {btn.label}
            </button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <motion.div layout style={{ position: "relative", minHeight: "400px" }}>
          <AnimatePresence mode="popLayout">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
                gap: "2rem",
              }}
              className="projects-grid"
            >
              {filteredProjects.map((project, i) => {
                const bannerBg = banners[i % banners.length];
                return (
                  <motion.div
                    key={project.title}
                    layout
                    initial={{ opacity: 0, rotateY: 90, y: 20 }}
                    animate={{ opacity: 1, rotateY: 0, y: 0 }}
                    exit={{ opacity: 0, rotateY: -90, y: 20 }}
                    transition={{ 
                      type: "spring", stiffness: 100, damping: 20,
                      delay: i * 0.05 
                    }}
                    style={{ height: "100%", perspective: 1000 }}
                  >
                    <HolographicCard>
                      <div
                        className="glass-card"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          height: "100%",
                          position: "relative",
                          overflow: "hidden",
                          paddingBottom: "1.5rem"
                        }}
                      >
                      {/* Top Gradient Banner */}
                      <div
                        style={{
                          width: "100%",
                          height: "6px",
                          background: bannerBg,
                        }}
                      />

                      {/* Card Content Wrapper */}
                      <div style={{ padding: "2rem 2rem 1rem", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                        
                        {/* Title and Date */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            marginBottom: "1.25rem",
                            gap: "1rem"
                          }}
                        >
                          <h3
                            style={{
                              fontFamily: "var(--font-space-grotesk)",
                              fontSize: "1.35rem",
                              color: "#E2E8F0",
                              fontWeight: 600,
                              lineHeight: 1.25
                            }}
                          >
                            {project.title}
                          </h3>

                          {project.date && (
                            <span 
                              style={{ 
                                color: "#475569", 
                                fontFamily: "var(--font-jetbrains-mono)", 
                                fontSize: "0.75rem",
                                whiteSpace: "nowrap",
                                border: "1px solid rgba(71, 85, 105, 0.2)",
                                padding: "0.15rem 0.5rem",
                                borderRadius: "4px",
                                background: "rgba(7, 17, 33, 0.3)"
                              }}
                            >
                              {project.date}
                            </span>
                          )}
                        </div>

                        {/* Description (either paragraph or bullet points) */}
                        {project.bullets ? (
                          <ul style={{ paddingLeft: "1rem", color: "#94A3B8", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "2rem", flexGrow: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            {project.bullets.map((bullet, idx) => (
                              <li key={idx} style={{ listStyleType: "circle" }}>{bullet}</li>
                            ))}
                          </ul>
                        ) : (
                          <p
                            style={{
                              color: "#94A3B8",
                              fontSize: "0.95rem",
                              lineHeight: 1.6,
                              marginBottom: "2rem",
                              flexGrow: 1,
                            }}
                          >
                            {project.description}
                          </p>
                        )}

                        {/* Tech Stack Tags */}
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "0.4rem",
                            marginBottom: "1.5rem"
                          }}
                        >
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              style={{
                                fontFamily: "var(--font-jetbrains-mono)",
                                fontSize: "0.7rem",
                                color: "#00E5FF",
                                background: "rgba(0, 229, 255, 0.04)",
                                border: "1px solid rgba(0, 229, 255, 0.12)",
                                padding: "0.15rem 0.55rem",
                                borderRadius: "6px",
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card Footer (GitHub Link and Orbit Decoration) */}
                      <div 
                        style={{ 
                          padding: "0 2rem", 
                          display: "flex", 
                          justifyContent: "space-between", 
                          alignItems: "center" 
                        }}
                      >
                        <MagneticButton>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ 
                              display: "inline-flex", 
                              alignItems: "center", 
                              gap: "0.5rem",
                              fontSize: "0.8rem",
                              fontWeight: 600,
                              fontFamily: "var(--font-space-grotesk)",
                              color: "#94A3B8", 
                              textDecoration: "none",
                              padding: "0.45rem 1rem",
                              border: "1px solid rgba(148, 163, 184, 0.15)",
                              borderRadius: "9999px",
                              transition: "all 0.3s ease"
                            }}
                            className="project-github-btn"
                          >
                            <Github size={16} />
                            Repository
                          </a>
                        </MagneticButton>

                        {/* Subtle orbit decoration in corner */}
                        <div style={{ position: "relative", width: "24px", height: "24px", opacity: 0.25 }}>
                          <div style={{
                            position: "absolute",
                            inset: 0,
                            border: "1px solid #00B4D8",
                            borderRadius: "50%",
                            animation: "spin 6s linear infinite"
                          }} />
                          <div style={{
                            position: "absolute",
                            top: "-2px",
                            left: "11px",
                            width: "4px",
                            height: "4px",
                            background: "#00E5FF",
                            borderRadius: "50%"
                          }} />
                        </div>
                      </div>

                    </div>
                    </HolographicCard>
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>
        </motion.div>
      </div>

      <style jsx global>{`
        .project-github-btn:hover {
          color: #00E5FF !important;
          border-color: #00E5FF !important;
          box-shadow: 0 0 10px rgba(0, 229, 255, 0.15);
          background: rgba(0, 229, 255, 0.03);
        }
        @media (max-width: 991px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
