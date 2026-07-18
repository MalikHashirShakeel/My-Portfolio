"use client";
import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { useTypewriter } from "@/hooks/useTypewriter";
import { heroRoles } from "@/lib/data";
import NeuralNetwork from "./NeuralNetwork";
import GlitchText from "./GlitchText";
import MagneticButton from "./MagneticButton";

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
        background: "radial-gradient(circle at 10% 20%, rgba(13, 33, 55, 0.3) 0%, transparent 50%)"
      }}
    >
      <div
        className="section-container hero-flex-container"
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "2rem",
          paddingTop: "6rem",
        }}
      >
        {/* Left Side: Text and CTAs */}
        <div style={{ flex: "1 1 55%", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          {/* Monospace label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "0.85rem",
              color: "#00E5FF",
              letterSpacing: "0.15em",
              display: "flex",
              alignItems: "center"
            }}
          >
            <span>{typedText}</span>
            <span className="cursor-blink" style={{ fontWeight: "bold", marginLeft: "2px" }}>|</span>
          </motion.div>

          {/* Huge Space Grotesk Name */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em"
            }}
          >
            <span style={{ color: "#E2E8F0", display: "block" }}>
              <GlitchText>Malik Hashir</GlitchText>
            </span>
          </motion.h1>

          {/* Tagline Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{
              fontSize: "1.1rem",
              color: "#94A3B8",
              maxWidth: "520px",
              lineHeight: 1.7,
              fontFamily: "var(--font-inter), sans-serif"
            }}
          >
            Building intelligent systems at the intersection of AI, Deep Learning,
            and modern software engineering.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{
              display: "flex",
              gap: "1.25rem",
              flexWrap: "wrap",
              marginTop: "0.75rem",
            }}
          >
            <MagneticButton>
              <a href="#projects" className="btn-primary">
                Explore My Work
                <ArrowDown size={16} />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="/resume"
                className="btn-secondary"
              >
                Resume
                <Download size={16} />
              </a>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right Side: Animated Interactive Neural Network Canvas */}
        <div 
          className="hero-orbit-container"
          style={{ 
            flex: "1 1 40%", 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center",
            height: "450px",
            width: "100%",
            position: "relative"
          }}
        >
          <NeuralNetwork />
        </div>
      </div>

      {/* Scroll indicator bouncing chevron */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.25rem",
          cursor: "pointer",
          zIndex: 5
        }}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "0.6rem",
            color: "#475569",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          Explore
        </span>
        <ArrowDown size={14} style={{ color: "#00B4D8" }} />
      </motion.div>

      <style jsx global>{`
        @media (max-width: 991px) {
          .hero-flex-container {
            flex-direction: column !important;
            text-align: center;
            padding-bottom: 4rem;
          }
          .hero-flex-container > div {
            flex: 1 1 100% !important;
            align-items: center;
          }
          .hero-flex-container p {
            margin: 0 auto;
          }
          .hero-orbit-container {
            margin-top: 2rem;
            order: 2;
          }
        }
        @media (max-width: 767px) {
          .hero-orbit-container {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
