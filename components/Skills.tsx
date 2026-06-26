"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/lib/data";
import { MeteorShootIn } from "./SectionAnimations";

export default function Skills() {
  return (
    <section 
      id="skills" 
      style={{ 
        position: "relative", 
        overflow: "hidden",
        background: "var(--bg-navy)"
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
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
          }}
          className="skills-constellations"
        >
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.08 }}
              className="glass-card"
              style={{
                padding: "2rem",
                border: "1px solid rgba(0, 229, 255, 0.08)",
                boxShadow: "0 4px 20px rgba(6, 11, 26, 0.4)",
                position: "relative",
              }}
            >
              {/* Nebula/Cluster Glowing Background Behind Header */}
              <div 
                style={{
                  position: "absolute",
                  top: "10%",
                  left: "10%",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${category.color}15 0%, transparent 70%)`,
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
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textShadow: `0 0 10px ${category.color}40`,
                  position: "relative",
                  zIndex: 1
                }}
              >
                {category.title}
              </h3>

              {/* Constellation chips container */}
              <div 
                style={{ 
                  display: "flex", 
                  flexWrap: "wrap", 
                  gap: "0.75rem",
                  position: "relative",
                  zIndex: 1
                }}
              >
                {category.skills.map((skill, skillIndex) => (
                  <MeteorShootIn
                    key={skill.name}
                    index={skillIndex}
                    catIndex={catIndex}
                    style={{
                      background: "rgba(13, 33, 55, 0.5)",
                      border: "1px solid rgba(0, 180, 216, 0.12)",
                      borderRadius: "8px",
                      padding: "0.5rem 0.75rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      cursor: "default",
                      transition: "border-color 0.3s, box-shadow 0.3s"
                    }}
                  >
                    {skill.icon ? (
                      <skill.icon size={15} style={{ color: "#00E5FF" }} />
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
                        fontSize: "0.85rem", 
                        color: "#E2E8F0",
                        fontFamily: "var(--font-inter)" 
                      }}
                    >
                      {skill.name}
                    </span>
                  </MeteorShootIn>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
