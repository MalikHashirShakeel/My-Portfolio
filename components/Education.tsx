"use client";
import { motion } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";
import { education } from "@/lib/data";
import TiltCard from "./ui/TiltCard";

export default function Education() {
  return (
    <section id="education" className="circuit-bg">
      <div className="section-container" style={{ maxWidth: "800px" }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Education</h2>
          <div className="accent-line" style={{ marginBottom: "3rem" }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ perspective: "1000px" }}
        >
          <TiltCard>
            <div
              className="glass-card edu-card"
              style={{
                padding: "3rem 2rem",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                gap: "2rem",
                alignItems: "center",
                height: "100%",
              }}
            >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "4px",
              background: "linear-gradient(to bottom, #00f5ff, #bf00ff)",
            }}
          />

          <div
            className="edu-icon-wrap"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "rgba(0,245,255,0.1)",
              border: "1px solid rgba(0,245,255,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#00f5ff",
              flexShrink: 0,
            }}
          >
            <GraduationCap size={40} />
          </div>

          <div>
            <h3
              style={{
                fontFamily: "var(--font-orbitron)",
                fontSize: "1.4rem",
                color: "#e0e7ff",
                marginBottom: "0.5rem",
              }}
            >
              {education.degree}
            </h3>
            <p
              style={{
                color: "#00f5ff",
                fontSize: "1.1rem",
                fontWeight: 500,
                marginBottom: "0.5rem",
              }}
            >
              {education.university}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
                color: "#94a3b8",
                fontSize: "0.9rem",
              }}
              className="edu-meta"
            >
              <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <MapPin size={14} />
                {education.location}
              </span>
              <span
                style={{
                  fontFamily: "Courier New, monospace",
                  background: "rgba(191,0,255,0.1)",
                  color: "#bf00ff",
                  padding: "0.1rem 0.5rem",
                  borderRadius: "4px",
                  border: "1px solid rgba(191,0,255,0.2)",
                }}
              >
                CGPA: {education.cgpa}
              </span>
            </div>
          </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 640px) {
          .edu-card {
            flex-direction: column;
            text-align: center;
          }
          .edu-meta {
            justify-content: center;
            flex-wrap: wrap;
          }
        }
      `}</style>
    </section>
  );
}
