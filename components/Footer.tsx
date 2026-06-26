"use client";
import { socialLinks } from "@/lib/data";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#060B1A",
        padding: "4rem 1.5rem 2.5rem",
        textAlign: "center",
        position: "relative"
      }}
    >
      {/* Subtle star divider line above */}
      <div 
        style={{ 
          position: "absolute", 
          top: 0, 
          left: 0, 
          right: 0, 
          height: "1px",
          background: "linear-gradient(90deg, transparent, #00B4D8, transparent)",
          opacity: 0.25 
        }} 
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.75rem",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontSize: "1.75rem",
            fontWeight: 700,
            background: "linear-gradient(135deg, #00E5FF 0%, #A855F7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.02em",
          }}
        >
          Malik Hashir
        </div>

        <p
          style={{
            color: "#94A3B8",
            fontSize: "0.95rem",
            fontFamily: "var(--font-inter)",
          }}
        >
          Built in the cosmos. Specializing in Deep Learning and Intelligent Systems.
        </p>

        {/* Social Icons Row */}
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              title={social.label}
              style={{
                color: "#475569",
                transition: "all 0.3s ease",
              }}
              className="footer-social-icon"
            >
              <social.icon size={22} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "0.8rem",
            color: "#475569",
            marginTop: "1rem"
          }}
        >
          &copy; {new Date().getFullYear()} Malik Hashir. All rights reserved.
        </p>
      </div>

      <style jsx global>{`
        .footer-social-icon:hover {
          color: #00E5FF !important;
          transform: translateY(-2px);
        }
      `}</style>
    </footer>
  );
}
