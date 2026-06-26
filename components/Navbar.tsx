"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Simple active section detection
      const scrollPosition = window.scrollY + 160;
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once on mount to set correct state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "0 2rem",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        background: scrolled
          ? "rgba(6, 11, 26, 0.85)"
          : "transparent",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: scrolled
          ? "1px solid rgba(0, 229, 255, 0.08)"
          : "1px solid transparent",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "4.5rem",
        }}
      >
        {/* Logo */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontSize: "1.6rem",
            fontWeight: 700,
            background: "linear-gradient(135deg, #00E5FF 0%, #A855F7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textDecoration: "none",
            display: "inline-block",
            letterSpacing: "-0.02em"
          }}
        >
          MH
        </motion.a>

        {/* Desktop links */}
        <div
          style={{
            display: "flex",
            gap: "2.25rem",
            alignItems: "center",
          }}
          className="nav-desktop"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <motion.a
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  fontSize: "13px",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: isActive ? "#00E5FF" : "#94A3B8",
                  textDecoration: "none",
                  position: "relative",
                  padding: "6px 0",
                  transition: "color 0.3s ease",
                  display: "inline-block",
                }}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "2px",
                      background: "#00B4D8",
                      borderRadius: "1px",
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.a>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="nav-mobile-toggle"
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: "#E2E8F0",
            cursor: "pointer",
            padding: "0.25rem",
            zIndex: 1100,
          }}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(6, 11, 26, 0.6)",
                backdropFilter: "blur(4px)",
                zIndex: 1050,
              }}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="nav-mobile-drawer"
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                width: "280px",
                background: "rgba(10, 22, 40, 0.95)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderLeft: "1px solid rgba(0, 228, 255, 0.12)",
                display: "flex",
                flexDirection: "column",
                padding: "6rem 2rem 2rem",
                gap: "1.75rem",
                zIndex: 1080,
              }}
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    fontSize: "14px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color:
                      activeSection === link.href.replace("#", "")
                        ? "#00E5FF"
                        : "#94A3B8",
                    textDecoration: "none",
                    padding: "0.5rem 0",
                    borderBottom: "1px solid rgba(0, 228, 255, 0.05)",
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @media (max-width: 768px) {
          .nav-desktop {
            display: none !important;
          }
          .nav-mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </motion.nav>
  );
}
