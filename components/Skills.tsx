"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { skillCategories } from "@/lib/data";

const FloatingShapes = dynamic(() => import("./three/FloatingShapes"), {
  ssr: false,
});

export default function Skills() {
  return (
    <section id="skills" style={{ position: "relative" }}>
      {/* Floating 3D shapes */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.2,
        }}
        className="skills-3d"
      >
        <FloatingShapes />
      </div>

      <div className="section-container" style={{ position: "relative", zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Skills & Expertise</h2>
          <p className="section-subtitle">
            Technologies and concepts I&apos;ve mastered across AI/ML, full-stack
            development, and beyond.
          </p>
          <div className="accent-line" style={{ marginBottom: "3rem" }} />
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              whileHover={{
                borderColor: `${category.color}40`,
                boxShadow: `0 0 25px ${category.color}15`,
              }}
              className="glass-card"
              style={{ padding: "1.5rem" }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-orbitron)",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: category.color,
                  marginBottom: "1.25rem",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {category.title}
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: catIndex * 0.1 + skillIndex * 0.05,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "0.35rem",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        {skill.icon && (
                          <skill.icon size={14} style={{ color: category.color, opacity: 0.7 }} />
                        )}
                        <span style={{ fontSize: "0.85rem", color: "#e0e7ff" }}>
                          {skill.name}
                        </span>
                      </div>
                      <span
                        style={{
                          fontFamily: "Courier New, monospace",
                          fontSize: "0.7rem",
                          color: "#64748b",
                        }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    {/* Progress bar */}
                    <div
                      style={{
                        height: "3px",
                        background: "rgba(255,255,255,0.05)",
                        borderRadius: "2px",
                        overflow: "hidden",
                      }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: catIndex * 0.1 + skillIndex * 0.05,
                          ease: "easeOut",
                        }}
                        style={{
                          height: "100%",
                          background: `linear-gradient(90deg, ${category.color}, ${category.color}80)`,
                          borderRadius: "2px",
                          boxShadow: `0 0 8px ${category.color}40`,
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .skills-3d {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
