"use client";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { aboutData } from "@/lib/data";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";
import TiltCard from "./ui/TiltCard";

const DNAHelix = dynamic(() => import("./three/DNAHelix"), { ssr: false });

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
          fontFamily: "var(--font-orbitron)",
          fontSize: "2rem",
          fontWeight: 700,
          background: "linear-gradient(135deg, #00f5ff, #bf00ff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {count}
        {suffix}
      </div>
      <div
        style={{
          fontSize: "0.8rem",
          color: "#64748b",
          marginTop: "0.25rem",
          fontFamily: "var(--font-orbitron)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function About() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 2000], [0, 400]);

  return (
    <section id="about" className="circuit-bg" style={{ position: "relative", overflow: "hidden" }}>
      {/* 3D DNA background */}
      <motion.div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "300px",
          height: "100%",
          opacity: 0.15,
          y,
        }}
        className="about-dna"
      >
        <DNAHelix />
      </motion.div>

      <div className="section-container" style={{ position: "relative", zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">About Me</h2>
          <div className="accent-line" />
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: "3rem",
            alignItems: "center",
            marginTop: "3rem",
          }}
          className="about-grid"
        >
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(0,245,255,0.3)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="about-photo-wrapper"
            style={{
              width: "250px",
              height: "250px",
              borderRadius: "50%",
              border: "2px solid rgba(0,245,255,0.2)",
              overflow: "hidden",
              position: "relative",
              flexShrink: 0,
              boxShadow: "0 0 30px rgba(0,245,255,0.1)",
              cursor: "pointer",
            }}
          >
            <Image
              src="/images/Profile.jpeg"
              alt="Malik Hashir"
              fill
              sizes="(max-width: 768px) 180px, 250px"
              style={{ objectFit: "cover" }}
              priority
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3
              style={{
                fontFamily: "var(--font-orbitron)",
                fontSize: "1.2rem",
                color: "#00f5ff",
                marginBottom: "0.5rem",
              }}
            >
              {aboutData.title}
            </h3>
            <p
              style={{
                color: "#94a3b8",
                lineHeight: 1.8,
                fontSize: "1rem",
              }}
            >
              {aboutData.bio}
            </p>
          </motion.div>
        </div>

        {/* Stats */}
        <div
          style={{
            marginTop: "3rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {aboutData.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1, type: "spring", stiffness: 100 }}
              style={{ perspective: "1000px" }}
            >
              <TiltCard>
                <div
                  className="glass-card"
                  style={{ padding: "2rem 1rem", height: "100%", width: "100%" }}
                >
                  <StatCounter {...stat} />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            justify-items: center;
            text-align: center;
          }
          .about-photo-wrapper {
            width: 180px !important;
            height: 180px !important;
          }
          .about-dna {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          /* Glass cards in stats will automatically reflow due to minmax auto-fit */
        }
      `}</style>
    </section>
  );
}
