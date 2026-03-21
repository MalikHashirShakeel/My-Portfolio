"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { contactInfo, socialLinks, emailjsConfig } from "@/lib/data";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("loading");

    try {
      if (emailjsConfig.serviceId === "YOUR_EMAILJS_SERVICE_ID") {
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
    <section id="contact" style={{ position: "relative" }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Let&apos;s Build Something Intelligent</h2>
          <p className="section-subtitle">
            Open for opportunities, collaborations, and discussions about AI and systems design.
          </p>
          <div className="accent-line" style={{ marginBottom: "3rem" }} />
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "4rem",
            alignItems: "start",
          }}
          className="contact-grid"
        >
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3
              style={{
                fontFamily: "var(--font-orbitron)",
                fontSize: "1.5rem",
                color: "#e0e7ff",
                marginBottom: "2rem",
              }}
            >
              Contact Information
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {[
                { icon: Mail, label: "Email", value: contactInfo.email, link: `mailto:${contactInfo.email}` },
                { icon: Phone, label: "Phone", value: contactInfo.phone, link: `tel:${contactInfo.phone}` },
                { icon: MapPin, label: "Location", value: "Karachi, Pakistan", link: null }
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: "rgba(0,245,255,0.05)",
                      border: "1px solid rgba(0,245,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#00f5ff",
                    }}
                  >
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 style={{ color: "#94a3b8", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {item.label}
                    </h4>
                    {item.link ? (
                      <a href={item.link} style={{ color: "#e0e7ff", textDecoration: "none", fontSize: "1.1rem" }}>
                        {item.value}
                      </a>
                    ) : (
                      <span style={{ color: "#e0e7ff", fontSize: "1.1rem" }}>{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "3rem" }}>
              <h4 style={{ color: "#94a3b8", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>
                Connect on Socials
              </h4>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.label}
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: "rgba(10,22,40,0.6)",
                      border: "1px solid rgba(148,163,184,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#e0e7ff",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#bf00ff";
                      e.currentTarget.style.color = "#bf00ff";
                      e.currentTarget.style.boxShadow = "0 0 15px rgba(191,0,255,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(148,163,184,0.2)";
                      e.currentTarget.style.color = "#e0e7ff";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card"
            style={{ padding: "2.5rem" }}
          >
            <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {/* Form fields */}
              <div className="input-group">
                <input type="text" name="user_name" required placeholder=" " className="form-input" />
                <label className="form-label">Your Name</label>
              </div>
              <div className="input-group">
                <input type="email" name="user_email" required placeholder=" " className="form-input" />
                <label className="form-label">Email Address</label>
              </div>
              <div className="input-group">
                <input type="text" name="subject" required placeholder=" " className="form-input" />
                <label className="form-label">Subject</label>
              </div>
              <div className="input-group">
                <textarea name="message" required placeholder=" " rows={5} className="form-input" style={{ resize: "none" }} />
                <label className="form-label">Your Message</label>
              </div>

              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="neon-btn"
                style={{ width: "100%", justifyContent: "center", marginTop: "1rem" }}
              >
                {status === "loading" ? "Transmitting..." : "Send Message"}
                {status !== "loading" && <Send size={18} />}
              </button>

              {/* Status Messages */}
              {status === "success" && (
                <div style={{ padding: "1rem", background: "rgba(0,245,255,0.1)", border: "1px solid #00f5ff", borderRadius: "8px", display: "flex", alignItems: "center", gap: "0.5rem", color: "#00f5ff", marginTop: "1rem" }}>
                  <CheckCircle size={20} /> Message transmitted successfully!
                </div>
              )}
              {status === "error" && (
                <div style={{ padding: "1rem", background: "rgba(255,0,0,0.1)", border: "1px solid #ff0000", borderRadius: "8px", display: "flex", alignItems: "center", gap: "0.5rem", color: "#ff8080", marginTop: "1rem" }}>
                  <AlertCircle size={20} /> Transmission failed. Please try again or email directly.
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        .input-group {
          position: relative;
        }
        .form-input {
          width: 100%;
          background: rgba(2, 8, 23, 0.5);
          border: 1px solid rgba(148,163,184,0.2);
          border-radius: 8px;
          padding: 1rem;
          color: #e0e7ff;
          font-family: var(--font-exo2);
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
        }
        .form-input:focus {
          border-color: #00f5ff;
          box-shadow: 0 0 10px rgba(0,245,255,0.1);
        }
        .form-label {
          position: absolute;
          left: 1rem;
          top: 1rem;
          color: #64748b;
          transition: all 0.3s ease;
          pointer-events: none;
          background: #061121;
          padding: 0 0.25rem;
        }
        .form-input:focus ~ .form-label,
        .form-input:not(:placeholder-shown) ~ .form-label {
          top: -0.6rem;
          left: 0.8rem;
          font-size: 0.8rem;
          color: #00f5ff;
        }

        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
