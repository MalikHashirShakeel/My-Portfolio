"use client";
import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { certifications } from "@/lib/data";

export default function Certifications() {
  return (
    <section 
      id="certifications" 
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
          <span className="section-label">// CERTIFICATIONS_LOG</span>
          <h2 
            style={{ 
              fontFamily: "var(--font-space-grotesk)", 
              fontSize: "2.5rem", 
              fontWeight: 700,
              color: "#E2E8F0"
            }}
          >
            Specializations
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
            justifyContent: "center",
          }}
        >
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              style={{ height: "100%" }}
            >
              <div
                className="glass-card"
                style={{
                  padding: "2.5rem 2rem",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  height: "100%",
                }}
              >
                {/* Radial Glow Behind Icon */}
                <div
                  style={{
                    position: "absolute",
                    top: "10%",
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)",
                    pointerEvents: "none",
                  }}
                />

                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: "rgba(168, 85, 247, 0.1)",
                    border: "1px solid rgba(168, 85, 247, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.5rem",
                    color: "#A855F7",
                    boxShadow: "0 0 15px rgba(168, 85, 247, 0.2)",
                  }}
                >
                  <Award size={26} />
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    fontSize: "1.2rem",
                    color: "#E2E8F0",
                    marginBottom: "0.5rem",
                    fontWeight: 600,
                  }}
                >
                  {cert.title}
                </h3>

                <p
                  style={{
                    color: "#00E5FF",
                    fontWeight: 500,
                    fontSize: "0.95rem",
                    marginBottom: "0.25rem",
                    fontFamily: "var(--font-space-grotesk)"
                  }}
                >
                  {cert.issuer}
                </p>

                <p style={{ color: "#94A3B8", fontSize: "0.85rem", marginBottom: "2rem", flexGrow: 1 }}>
                  Platform: {cert.platform} · Instructor: {cert.instructor}
                </p>

                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ padding: "0.5rem 1.25rem", fontSize: "0.8rem" }}
                >
                  Verify Credential
                  <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
