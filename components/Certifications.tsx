"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { certifications } from "@/lib/data";

const CertShield = dynamic(() => import("./three/CertShield"), {
  ssr: false,
});

export default function Certifications() {
  return (
    <section id="certifications" style={{ position: "relative" }}>
      {/* 3D Shield Background */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "10%",
          width: "400px",
          height: "100%",
          opacity: 0.15,
        }}
        className="cert-3d"
      >
        <CertShield />
      </div>

      <div className="section-container" style={{ position: "relative", zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Certifications</h2>
          <p className="section-subtitle">
            Professional specializations proving my expertise in Machine Learning
            and Deep Learning.
          </p>
          <div className="accent-line" style={{ marginBottom: "3rem" }} />
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "2rem",
            justifyContent: "center",
          }}
        >
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              whileHover={{ y: -5 }}
              className="glass-card"
              style={{
                padding: "2.5rem 2rem",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                boxShadow: "0 0 20px rgba(191,0,255,0.05)",
              }}
            >
              {/* Holographic glare effect */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(125deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 100%)",
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "rgba(191,0,255,0.1)",
                  border: "1px solid rgba(191,0,255,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                  color: "#bf00ff",
                  boxShadow: "0 0 15px rgba(191,0,255,0.2)",
                }}
              >
                <Award size={30} />
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-orbitron)",
                  fontSize: "1.2rem",
                  color: "#e0e7ff",
                  marginBottom: "0.5rem",
                  fontWeight: 600,
                }}
              >
                {cert.title}
              </h3>

              <p
                style={{
                  color: "#00f5ff",
                  fontWeight: 500,
                  fontSize: "1.05rem",
                  marginBottom: "0.25rem",
                }}
              >
                {cert.issuer}
              </p>

              <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginBottom: "2rem" }}>
                Instructor: {cert.instructor}
              </p>

              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="neon-btn neon-btn-purple"
                style={{ marginTop: "2rem", padding: "0.5rem 1.5rem" }}
              >
                <ExternalLink size={16} />
                Verify Credential
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .cert-3d {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
