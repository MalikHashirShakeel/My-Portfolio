"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { projects } from "@/lib/data";

export default function Projects() {
  const [filter, setFilter] = useState<"all" | "ai" | "fullstack">("all");

  const filteredProjects = projects.filter(
    (p) => filter === "all" || p.category === filter
  );

  return (
    <section id="projects" style={{ position: "relative" }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
        >
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            A selection of my best work in AI/ML and Full-Stack Development.
          </p>
          <div className="accent-line" style={{ marginBottom: "2rem" }} />
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "3rem",
            flexWrap: "wrap",
          }}
        >
          {(
            [
              { id: "all", label: "All Projects" },
              { id: "ai", label: "AI & Machine Learning" },
              { id: "fullstack", label: "Full Stack Web" },
            ] as const
          ).map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id)}
              style={{
                background: filter === btn.id ? "rgba(0,245,255,0.1)" : "transparent",
                border: `1px solid ${
                  filter === btn.id ? "#00f5ff" : "rgba(148,163,184,0.2)"
                }`,
                color: filter === btn.id ? "#00f5ff" : "#94a3b8",
                padding: "0.5rem 1.5rem",
                borderRadius: "2rem",
                fontFamily: "var(--font-orbitron)",
                fontSize: "0.85rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: filter === btn.id ? "0 0 15px rgba(0,245,255,0.2)" : "none",
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
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "2rem",
              }}
            >
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ 
                    type: "spring", stiffness: 200, damping: 20,
                    delay: i * 0.1 
                  }}
                  whileHover={{ 
                    y: -12, 
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(0, 245, 255, 0.15)",
                    transition: { type: "tween", duration: 0.2 } 
                  }}
                  className="glass-card"
                  style={{
                    padding: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Category Accent */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "3px",
                      background:
                        project.category === "ai"
                          ? "linear-gradient(90deg, #00f5ff, #bf00ff)"
                          : "linear-gradient(90deg, #ffd700, #ff8c00)",
                    }}
                  />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "1rem",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--font-orbitron)",
                        fontSize: "1.25rem",
                        color: "#e0e7ff",
                        fontWeight: 600,
                      }}
                    >
                      {project.title}
                    </h3>
                    <div style={{ display: "flex", gap: "0.75rem" }}>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#94a3b8", transition: "color 0.2s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#00f5ff")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
                        aria-label={`GitHub repo for ${project.title}`}
                      >
                        <Github size={20} />
                      </a>
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#94a3b8", transition: "color 0.2s" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "#bf00ff")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
                          aria-label={`Live demo for ${project.title}`}
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>

                  <p
                    style={{
                      color: "#94a3b8",
                      fontSize: "0.95rem",
                      lineHeight: 1.6,
                      marginBottom: "2rem",
                      flexGrow: 1,
                    }}
                  >
                    {project.description}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                      marginTop: "auto",
                    }}
                  >
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontFamily: "Courier New, monospace",
                          fontSize: "0.75rem",
                          color:
                            project.category === "ai" ? "#00f5ff" : "#ffd700",
                          background:
                            project.category === "ai"
                              ? "rgba(0,245,255,0.05)"
                              : "rgba(255,215,0,0.05)",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "4px",
                          border: `1px solid ${
                            project.category === "ai"
                              ? "rgba(0,245,255,0.1)"
                              : "rgba(255,215,0,0.1)"
                          }`,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
