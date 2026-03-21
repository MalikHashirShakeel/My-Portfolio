"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { useTypewriter } from "@/hooks/useTypewriter";
import { heroRoles } from "@/lib/data";

const NeuralGlobe = dynamic(() => import("./three/NeuralGlobe"), {
  ssr: false,
});

export default function Hero() {
  const typedText = useTypewriter(heroRoles, 100, 60, 2000);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* 3D globe behind content */}
      <div
        style={{
          position: "absolute",
          right: "-5%",
          top: "10%",
          width: "55%",
          height: "80%",
          opacity: 0.6,
        }}
        className="hero-globe"
      >
        <NeuralGlobe />
      </div>

      <div
        className="section-container"
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          paddingTop: "6rem",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            fontFamily: "Courier New, monospace",
            fontSize: "0.9rem",
            color: "#00f5ff",
            letterSpacing: "0.1em",
          }}
        >
          {"// Welcome to my portfolio"}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            fontFamily: "var(--font-orbitron)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: "700px",
          }}
        >
          <span style={{ color: "#e0e7ff" }}>Hi, I&apos;m </span>
          <span
            style={{
              background: "linear-gradient(135deg, #00f5ff, #bf00ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Malik Hashir
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{
            fontFamily: "var(--font-orbitron)",
            fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
            fontWeight: 500,
            color: "#ffd700",
            minHeight: "2.2rem",
          }}
        >
          {typedText}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            style={{ color: "#00f5ff", marginLeft: "2px" }}
          >
            |
          </motion.span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          style={{
            fontSize: "1.05rem",
            color: "#94a3b8",
            maxWidth: "550px",
            lineHeight: 1.7,
          }}
        >
          Building intelligent systems at the intersection of AI, Deep Learning,
          and modern software engineering.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            marginTop: "0.5rem",
          }}
        >
          <a href="#projects" className="neon-btn">
            <ArrowDown size={16} />
            View Projects
          </a>
          <a
            href="/resume.pdf"
            download="Malik_Hashir_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="neon-btn neon-btn-purple"
          >
            <Download size={16} />
            Download Resume
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-orbitron)",
            fontSize: "0.6rem",
            color: "#64748b",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "30px",
            background: "linear-gradient(to bottom, #00f5ff, transparent)",
          }}
        />
      </motion.div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .hero-globe {
            position: absolute !important;
            right: -20% !important;
            top: 5% !important;
            width: 80% !important;
            height: 60% !important;
            opacity: 0.3 !important;
          }
        }
      `}</style>
    </section>
  );
}
