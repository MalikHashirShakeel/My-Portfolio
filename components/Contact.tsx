"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { contactInfo, socialLinks, emailjsConfig } from "@/lib/data";
import MagneticButton from "./MagneticButton";
import { ExpandWidth } from "./SectionAnimations";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("loading");

    try {
      if (emailjsConfig.serviceId === "YOUR_EMAILJS_SERVICE_ID" || emailjsConfig.serviceId === "") {
        // Mock successful submission if config is not set up
        setTimeout(() => {
          setStatus("success");
          formRef.current?.reset();
          setTimeout(() => setStatus("idle"), 5000);
        }, 1500);
        return;
      }

      await emailjs.sendForm(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        formRef.current,
        emailjsConfig.publicKey
      );
      
      setStatus("success");
      formRef.current.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section 
      id="contact" 
      style={{ 
        position: "relative", 
        overflow: "hidden",
        background: "var(--bg-navy)"
      }}
      className="grid-pattern-overlay"
    >
      {/* Spinning sonar/radar background decoration */}
      <div 
        style={{
          position: "absolute",
          right: "-10%",
          bottom: "-10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          border: "1px solid rgba(0, 180, 216, 0.08)",
          pointerEvents: "none",
          zIndex: 1
        }}
        className="radar-circle radar-circle-1"
      />
      <div 
        style={{
          position: "absolute",
          right: "-10%",
          bottom: "-10%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          border: "1px dashed rgba(168, 85, 247, 0.06)",
          pointerEvents: "none",
          zIndex: 1
        }}
        className="radar-circle radar-circle-2"
      />

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
          <span className="section-label">// TRANSMISSION</span>
          <h2 
            style={{ 
              fontFamily: "var(--font-space-grotesk)", 
              fontSize: "2.5rem", 
              fontWeight: 700,
              color: "#E2E8F0"
            }}
          >
            Send a signal across the cosmos
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "4rem",
            alignItems: "start",
          }}
          className="contact-grid"
        >
          {/* Left Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="glass-card"
              style={{ padding: "2.5rem" }}
            >
              <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <ExpandWidth delay={0.0}>
                  <div className="input-group">
                    <input type="text" name="user_name" required placeholder=" " className="form-input" />
                    <label className="form-label">Your Name</label>
                  </div>
                </ExpandWidth>
                
                <ExpandWidth delay={0.15}>
                  <div className="input-group">
                    <input type="email" name="user_email" required placeholder=" " className="form-input" />
                    <label className="form-label">Email Address</label>
                  </div>
                </ExpandWidth>
                
                <ExpandWidth delay={0.3}>
                  <div className="input-group">
                    <input type="text" name="subject" required placeholder=" " className="form-input" />
                    <label className="form-label">Subject</label>
                  </div>
                </ExpandWidth>
                
                <ExpandWidth delay={0.45}>
                  <div className="input-group">
                    <textarea name="message" required placeholder=" " rows={5} className="form-input" style={{ resize: "none" }} />
                    <label className="form-label">Your Message</label>
                  </div>
                </ExpandWidth>

                <MagneticButton style={{ width: "100%" }}>
                  <motion.button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className="btn-primary"
                    whileTap={{ scale: 0.98 }}
                    style={{ width: "100%", justifyContent: "center", cursor: "pointer", border: "none" }}
                  >
                    {status === "loading" ? "Transmitting Signal..." : "Transmit Message"}
                    {status !== "loading" && <Send size={16} />}
                  </motion.button>
                </MagneticButton>

                {/* Status Messages */}
                <AnimatePresence>
                  {status === "success" && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      style={{ padding: "1rem", background: "rgba(16, 185, 129, 0.1)", border: "1px solid #10B981", borderRadius: "8px", display: "flex", alignItems: "center", gap: "0.5rem", color: "#10B981" }}
                    >
                      <CheckCircle size={20} /> Signal transmitted successfully!
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      style={{ padding: "1rem", background: "rgba(239, 68, 68, 0.1)", border: "1px solid #EF4444", borderRadius: "8px", display: "flex", alignItems: "center", gap: "0.5rem", color: "#FCA5A5" }}
                    >
                      <AlertCircle size={20} /> Transmission failed. Please try again.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>

          {/* Right Column: Social / Direct Channels */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  fontSize: "1.25rem",
                  color: "#E2E8F0",
                  marginBottom: "1.5rem",
                  fontWeight: 600
                }}
              >
                Direct Terminals
              </h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {[
                  { icon: Mail, label: "Email", value: contactInfo.email, link: `mailto:${contactInfo.email}` },
                  { icon: Phone, label: "Phone", value: contactInfo.phone, link: `tel:${contactInfo.phone}` },
                  { icon: MapPin, label: "Location", value: "Karachi, Pakistan", link: null }
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        background: "rgba(0, 180, 216, 0.06)",
                        border: "1px solid rgba(0, 180, 216, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#00E5FF",
                      }}
                    >
                      <item.icon size={18} />
                    </div>
                    <div>
                      <h4 style={{ color: "#475569", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "var(--font-jetbrains-mono)" }}>
                        {item.label}
                      </h4>
                      {item.link ? (
                        <a href={item.link} style={{ color: "#E2E8F0", textDecoration: "none", fontSize: "1rem", transition: "color 0.3s" }} className="contact-link">
                          {item.value}
                        </a>
                      ) : (
                        <span style={{ color: "#E2E8F0", fontSize: "1rem" }}>{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Grid */}
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  fontSize: "1.25rem",
                  color: "#E2E8F0",
                  marginBottom: "1.25rem",
                  fontWeight: 600
                }}
              >
                Cosmic Sync
              </h3>
              <div 
                style={{ 
                  display: "grid", 
                  gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", 
                  gap: "0.75rem" 
                }}
              >
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ 
                      scale: 1.05,
                      borderColor: "#00E5FF",
                      boxShadow: "0 0 15px rgba(0, 229, 255, 0.15)",
                      background: "rgba(0, 229, 255, 0.03)"
                    }}
                    style={{
                      background: "rgba(13, 33, 55, 0.4)",
                      border: "1px solid rgba(0, 228, 255, 0.12)",
                      borderRadius: "12px",
                      padding: "1rem 0.5rem",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.5rem",
                      color: "#94A3B8",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      textAlign: "center"
                    }}
                    className="contact-social-card"
                  >
                    <social.icon size={22} style={{ color: "#00B4D8" }} />
                    <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-space-grotesk)" }}>
                      {social.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        .input-group {
          position: relative;
        }
        .form-input {
          width: 100%;
          background: rgba(6, 11, 26, 0.6);
          border: 1px solid rgba(0, 228, 255, 0.12);
          border-radius: 8px;
          padding: 1rem;
          color: #E2E8F0;
          font-family: var(--font-inter);
          font-size: 0.95rem;
          outline: none;
          transition: all 0.3s ease;
        }
        .form-input:focus {
          border-color: #00E5FF;
          box-shadow: 0 0 12px rgba(0, 229, 255, 0.15);
        }
        .form-label {
          position: absolute;
          left: 1rem;
          top: 1rem;
          color: #475569;
          transition: all 0.3s ease;
          pointer-events: none;
          background: #0D2137;
          padding: 0 0.35rem;
          border-radius: 4px;
          font-size: 0.9rem;
        }
        .form-input:focus ~ .form-label,
        .form-input:not(:placeholder-shown) ~ .form-label {
          top: -0.65rem;
          left: 0.75rem;
          font-size: 0.75rem;
          color: #00E5FF;
        }

        .contact-link:hover {
          color: #00E5FF !important;
        }

        /* Radar animations */
        .radar-circle {
          transform-origin: center;
        }
        .radar-circle-1 {
          animation: radar-pulse 8s linear infinite;
        }
        .radar-circle-2 {
          animation: radar-pulse-reverse 12s linear infinite;
        }

        @keyframes radar-pulse {
          0% { transform: rotate(0deg) scale(1); opacity: 0.8; }
          50% { transform: rotate(180deg) scale(1.05); opacity: 0.4; }
          100% { transform: rotate(360deg) scale(1); opacity: 0.8; }
        }

        @keyframes radar-pulse-reverse {
          0% { transform: rotate(360deg) scale(1); opacity: 0.6; }
          50% { transform: rotate(180deg) scale(0.95); opacity: 0.3; }
          100% { transform: rotate(0deg) scale(1); opacity: 0.6; }
        }

        @media (max-width: 991px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
