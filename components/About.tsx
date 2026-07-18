"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { aboutData } from "@/lib/data";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";

function StatCounter({
  label,
  value,
  suffix,
  decimals,
}: {
  label: string;
  value: number;
  suffix: string;
  decimals: number;
}) {
  const { count, ref } = useCounterAnimation(value, 2000, decimals);
  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div
        style={{
          fontFamily: "var(--font-space-grotesk)",
          fontSize: "2.5rem",
          fontWeight: 700,
          background: "linear-gradient(135deg, #00E5FF 0%, #A855F7 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}
      >
        {count}
        {suffix}
      </div>
      <div
        style={{
          fontSize: "0.75rem",
          color: "#94A3B8",
          marginTop: "0.25rem",
          fontFamily: "var(--font-jetbrains-mono)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section 
      id="about" 
      style={{ 
        position: "relative", 
        overflow: "hidden", 
        background: "var(--bg-navy)"
      }}
      className="grid-pattern-overlay"
    >
      <div className="section-container" style={{ position: "relative", zIndex: 2 }}>
        
        {/* Section divider line above */}
        <div className="section-divider" style={{ position: "absolute", top: 0, left: 0 }} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "4rem",
            alignItems: "start",
            marginTop: "2rem"
          }}
          className="about-grid"
        >
          {/* Left Column: About Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            <span className="section-label">// ABOUT_ME</span>
            <h2 
              style={{ 
                fontFamily: "var(--font-space-grotesk)", 
                fontSize: "2.5rem", 
                fontWeight: 700,
                color: "#E2E8F0"
              }}
            >
              Malik Hashir
            </h2>
            <h3
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "1.15rem",
                color: "#00B4D8",
                fontWeight: 500,
              }}
            >
              {aboutData.title}
            </h3>

            {/* Profile image integrated beautifully inline */}
            <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", marginTop: "1rem" }} className="about-bio-photo-flex">
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  border: "2px solid rgba(0, 229, 255, 0.2)",
                  overflow: "hidden",
                  position: "relative",
                  flexShrink: 0,
                  boxShadow: "0 0 20px rgba(0, 180, 216, 0.15)",
                }}
              >
                <Image
                  src="/images/Profile.jpeg"
                  alt="Malik Hashir"
                  fill
                  sizes="100px"
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
              <p
                style={{
                  color: "#94A3B8",
                  lineHeight: 1.75,
                  fontSize: "1rem",
                }}
              >
                {aboutData.bio}
              </p>
            </div>
          </motion.div>

          {/* Right Column: Stats Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.25rem",
            }}
            className="about-stats-grid"
          >
            {aboutData.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className={`glass-card about-stat-card-${i}`}
                style={{ 
                  padding: "1.75rem 1rem", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  gridColumn: stat.label === "LeetCode" ? "span 2" : "span 1"
                }}
              >
                <StatCounter {...stat} />
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      <style jsx global>{`
        /* Custom layout adjustments for LeetCode spanning */
        .about-stat-card-2 {
          grid-column: span 2 !important;
        }

        @media (max-width: 991px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .about-stats-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .about-stat-card-2 {
            grid-column: span 2 !important;
          }
        }

        @media (max-width: 576px) {
          .about-bio-photo-flex {
            flex-direction: column !important;
            text-align: center;
          }
          .about-stats-grid {
            grid-template-columns: 1fr !important;
          }
          .about-stat-card-2 {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
