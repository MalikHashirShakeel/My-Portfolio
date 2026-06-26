"use client";
import { motion } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";
import { education } from "@/lib/data";

export default function Education() {
  return (
    <section 
      id="education" 
      style={{ 
        position: "relative", 
        overflow: "hidden", 
        background: "var(--bg-space)"
      }}
    >
      <div className="section-container" style={{ maxWidth: "800px", position: "relative", zIndex: 2 }}>
        
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

        <motion.div
          initial={{ opacity: 0, scale: 0.5, boxShadow: "0 0 0px rgba(0, 229, 255, 0)" }}
          whileInView={{ opacity: 1, scale: 1, boxShadow: "0 0 35px rgba(0, 229, 255, 0.25)" }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 90, damping: 15, duration: 0.8 }}
        >
          <div
            className="glass-card edu-card"
            style={{
              padding: "3rem 2rem",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              gap: "2.5rem",
              alignItems: "center",
              height: "100%",
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
              }}
            />

            {/* University Logo Placeholder / Graduation Icon */}
            <div
              className="edu-icon-wrap"
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                background: "rgba(0, 180, 216, 0.08)",
                border: "1px solid rgba(0, 180, 216, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#00E5FF",
                flexShrink: 0,
                boxShadow: "0 0 15px rgba(0, 180, 216, 0.2)"
              }}
            >
              <GraduationCap size={36} />
            </div>

            <div>
              <h3
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  fontSize: "1.35rem",
                  color: "#E2E8F0",
                  marginBottom: "0.5rem",
                  fontWeight: 600
                }}
              >
                {education.degree}
              </h3>
              <p
                style={{
                  color: "#00E5FF",
                  fontSize: "1.05rem",
                  fontWeight: 500,
                  marginBottom: "0.75rem",
                  fontFamily: "var(--font-space-grotesk)"
                }}
              >
                {education.university}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.25rem",
                  color: "#94A3B8",
                  fontSize: "0.9rem",
                  flexWrap: "wrap"
                }}
                className="edu-meta"
              >
                <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                  <MapPin size={14} style={{ color: "#475569" }} />
                  {education.location}
                </span>

                <span
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    background: "rgba(0, 229, 255, 0.05)",
                    color: "#00E5FF",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "4px",
                    border: "1px solid rgba(0, 229, 255, 0.15)",
                  }}
                >
                  CGPA: {education.cgpa}
                </span>

                <span
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    background: "rgba(168, 85, 247, 0.05)",
                    color: "#A855F7",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "4px",
                    border: "1px solid rgba(168, 85, 247, 0.15)",
                  }}
                >
                  Semester: {education.semester}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 640px) {
          .edu-card {
            flex-direction: column;
            text-align: center;
            padding: 2.5rem 1.5rem !important;
          }
          .edu-meta {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
