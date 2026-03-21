"use client";
import { socialLinks } from "@/lib/data";

export default function Footer() {
  return (
    <footer
      style={{
        background: "rgba(2, 8, 23, 0.9)",
        borderTop: "1px solid rgba(0,245,255,0.1)",
        padding: "4rem 1.5rem 2rem",
        textAlign: "center",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-orbitron)",
            fontSize: "2rem",
            fontWeight: 800,
            background: "linear-gradient(135deg, #00f5ff, #bf00ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "0.1em",
          }}
        >
          MH
        </div>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "1rem",
            maxWidth: "400px",
          }}
        >
          Built with passion for Artificial Intelligence and modern web engineering.
        </p>

        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              title={social.label}
              style={{
                color: "#64748b",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#00f5ff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
            >
              <social.icon size={24} />
            </a>
          ))}
        </div>

        <div
          style={{
            width: "100%",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(0,245,255,0.2), transparent)",
            margin: "1rem 0",
          }}
        />

        <p
          style={{
            fontFamily: "Courier New, monospace",
            fontSize: "0.85rem",
            color: "#64748b",
          }}
        >
          &copy; {new Date().getFullYear()} Malik Hashir. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
