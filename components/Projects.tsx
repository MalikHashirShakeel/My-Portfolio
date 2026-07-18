"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Calendar, Terminal } from "lucide-react";
import { projects } from "@/lib/data";
import MagneticButton from "./MagneticButton";

const banners = [
  "linear-gradient(90deg, #00E5FF 0%, #7B2FBE 100%)",
  "linear-gradient(90deg, #00B4D8 0%, #A855F7 100%)",
  "linear-gradient(90deg, #7B2FBE 0%, #00E5FF 100%)",
  "linear-gradient(90deg, #A855F7 0%, #00B4D8 100%)",
];

export default function Projects() {
  const [filter, setFilter] = useState<"all" | "ai" | "fullstack">("all");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 991px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const filteredProjects = projects.filter(
    (p) => filter === "all" || p.category === filter
  );

  return (
    <section 
      id="projects" 
      style={{ 
        position: "relative", 
        overflow: "hidden",
        background: "var(--bg-space)",
        paddingBottom: "8rem"
      }}
    >
      <div className="section-container" style={{ position: "relative", zIndex: 2 }}>
        
        {/* Section Divider Line above */}
        <div className="section-divider" style={{ position: "absolute", top: 0, left: 0 }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "2.5rem" }}
        >
          <span className="section-label">// STAR_SYSTEMS</span>
          <h2 
            style={{ 
              fontFamily: "var(--font-space-grotesk)", 
              fontSize: "2.5rem", 
              fontWeight: 700,
              color: "#E2E8F0"
            }}
          >
            Featured Projects
          </h2>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: "flex",
            gap: "0.75rem",
            marginBottom: "4rem",
            flexWrap: "wrap",
          }}
        >
          {(
            [
              { id: "all", label: "All Systems" },
              { id: "ai", label: "AI & Deep Learning" },
              { id: "fullstack", label: "Full Stack" },
            ] as const
          ).map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id)}
              style={{
                background: filter === btn.id ? "rgba(0, 229, 255, 0.08)" : "rgba(13, 33, 55, 0.4)",
                border: `1px solid ${
                  filter === btn.id ? "#00E5FF" : "rgba(0, 228, 255, 0.12)"
                }`,
                color: filter === btn.id ? "#00E5FF" : "#94A3B8",
                padding: "0.45rem 1.25rem",
                borderRadius: "9999px",
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                boxShadow: filter === btn.id ? "0 0 15px rgba(0, 229, 255, 0.15)" : "none",
              }}
            >
              {btn.label}
            </button>
          ))}
        </motion.div>

        {/* Project Graph Network Layout */}
        <div style={{ position: "relative", width: "100%", minHeight: "400px" }}>
          
          {/* Central System Bus Spine (Desktop only) */}
          {!isMobile && (
            <div 
              style={{ 
                position: "absolute", 
                left: "50%", 
                transform: "translateX(-50%)", 
                top: "10px", 
                bottom: "10px", 
                width: "2px" 
              }}
            >
              <svg style={{ width: "100%", height: "100%", overflow: "visible" }}>
                <line
                  x1="1"
                  y1="0"
                  x2="1"
                  y2="100%"
                  stroke="url(#projects-spine-grad)"
                  strokeWidth="2"
                  style={{
                    filter: "drop-shadow(0px 0px 4px #00B4D8)"
                  }}
                />
                <defs>
                  <linearGradient id="projects-spine-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00E5FF" />
                    <stop offset="50%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}

          {/* Left System Spine (Mobile only) */}
          {isMobile && (
            <div 
              style={{ 
                position: "absolute", 
                left: "4px", 
                top: "10px", 
                bottom: "10px", 
                width: "2px",
                background: "linear-gradient(to bottom, #00E5FF, #A855F7, transparent)",
                opacity: 0.5
              }}
            />
          )}

          <motion.div layout style={{ position: "relative" }}>
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => {
                const bannerBg = banners[i % banners.length];
                const isLeft = i % 2 === 0;

                return (
                  <motion.div
                    key={project.title}
                    layout
                    initial={{ opacity: 0, x: isMobile ? -20 : (isLeft ? -40 : 40) }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    style={{ 
                      display: "flex",
                      alignItems: "center",
                      justifyContent: isMobile ? "flex-start" : "space-between",
                      width: "100%",
                      position: "relative",
                      marginBottom: isMobile ? "2rem" : "4.5rem",
                      paddingLeft: isMobile ? "2rem" : "0"
                    }}
                  >
                    {/* Node joint core */}
                    <div
                      style={{
                        position: "absolute",
                        left: isMobile ? "4px" : "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        background: "#060B1A",
                        border: "2px solid #00E5FF",
                        boxShadow: "0 0 12px rgba(0, 229, 255, 0.6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 10,
                        fontFamily: "var(--font-jetbrains-mono), monospace",
                        fontSize: "9px",
                        color: "#00E5FF",
                        fontWeight: "bold"
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    {/* Horizontal connector lines (Desktop only) */}
                    {!isMobile && (
                      <>
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "calc(50% - 3.5rem)",
                            width: "3.5rem",
                            height: "1.5px",
                            background: "linear-gradient(90deg, rgba(0, 229, 255, 0.4), rgba(168, 85, 247, 0.4))",
                            zIndex: 1
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            width: "3.5rem",
                            height: "1.5px",
                            background: "linear-gradient(90deg, rgba(168, 85, 247, 0.4), rgba(0, 229, 255, 0.4))",
                            zIndex: 1
                          }}
                        />
                      </>
                    )}

                    {/* Left Element (Card if left, Telemetry Console if right) */}
                    <div
                      style={{
                        width: isMobile ? "100%" : "calc(50% - 3.5rem)",
                        order: 1
                      }}
                    >
                      {isLeft ? (
                        <ProjectCard project={project} bannerBg={bannerBg} />
                      ) : (
                        <TelemetryConsole projectTitle={project.title} color={bannerBg} />
                      )}
                    </div>

                    {/* Right Element (Telemetry Console if left, Card if right) */}
                    {!isMobile && (
                      <div
                        style={{
                          width: "calc(50% - 3.5rem)",
                          order: 2
                        }}
                      >
                        {isLeft ? (
                          <TelemetryConsole projectTitle={project.title} color={bannerBg} />
                        ) : (
                          <ProjectCard project={project} bannerBg={bannerBg} />
                        )}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        .project-github-btn:hover {
          color: #00E5FF !important;
          border-color: #00E5FF !important;
          box-shadow: 0 0 10px rgba(0, 229, 255, 0.15);
          background: rgba(0, 229, 255, 0.03);
        }
        @keyframes spin-node {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}

// Sub-component: Project Card
function ProjectCard({ project, bannerBg }: { project: typeof projects[0]; bannerBg: string }) {
  return (
    <div
      className="glass-card"
      style={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        paddingBottom: "1.5rem",
        height: "380px",
        justifyContent: "space-between"
      }}
    >
      {/* Top Gradient Banner */}
      <div
        style={{
          width: "100%",
          height: "6px",
          background: bannerBg,
        }}
      />

      {/* Card Content Wrapper */}
      <div style={{ padding: "1.5rem 1.5rem 0.5rem", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        
        {/* Title and Date */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "1rem",
              gap: "1rem"
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "1.2rem",
                color: "#E2E8F0",
                fontWeight: 600,
                lineHeight: 1.25,
                textAlign: "left"
              }}
            >
              {project.title}
            </h3>

            {project.date && (
              <span 
                style={{ 
                  color: "#475569", 
                  fontFamily: "var(--font-jetbrains-mono)", 
                  fontSize: "0.7rem",
                  whiteSpace: "nowrap",
                  border: "1px solid rgba(71, 85, 105, 0.2)",
                  padding: "0.15rem 0.45rem",
                  borderRadius: "4px",
                  background: "rgba(7, 17, 33, 0.3)"
                }}
              >
                {project.date}
              </span>
            )}
          </div>

          {/* Description (either paragraph or bullet points) */}
          {project.bullets ? (
            <ul style={{ paddingLeft: "1.15rem", color: "#94A3B8", fontSize: "0.85rem", lineHeight: 1.5, marginBottom: "1rem", display: "flex", flexDirection: "column", gap: "0.4rem", textAlign: "left" }}>
              {project.bullets.slice(0, 3).map((bullet, idx) => (
                <li key={idx} style={{ listStyleType: "circle" }}>{bullet}</li>
              ))}
            </ul>
          ) : (
            <p
              style={{
                color: "#94A3B8",
                fontSize: "0.88rem",
                lineHeight: 1.5,
                marginBottom: "1rem",
                textAlign: "left"
              }}
            >
              {project.description}
            </p>
          )}
        </div>

        {/* Tech Stack Tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.4rem",
            marginBottom: "0.5rem"
          }}
        >
          {project.tech.map((tech) => (
            <span
              key={tech}
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "0.68rem",
                color: "#00E5FF",
                background: "rgba(0, 229, 255, 0.04)",
                border: "1px solid rgba(0, 229, 255, 0.12)",
                padding: "0.15rem 0.5rem",
                borderRadius: "6px",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer */}
      <div 
        style={{ 
          padding: "0 1.5rem", 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center" 
        }}
      >
        <MagneticButton>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              gap: "0.5rem",
              fontSize: "0.78rem",
              fontWeight: 600,
              fontFamily: "var(--font-space-grotesk)",
              color: "#94A3B8", 
              textDecoration: "none",
              padding: "0.4rem 0.9rem",
              border: "1px solid rgba(148, 163, 184, 0.15)",
              borderRadius: "9999px",
              transition: "all 0.3s ease"
            }}
            className="project-github-btn"
          >
            <Github size={14} />
            Repository
          </a>
        </MagneticButton>

        {/* Node indicator */}
        <div style={{ position: "relative", width: "20px", height: "20px", opacity: 0.25 }}>
          <div style={{
            position: "absolute",
            inset: 0,
            border: "1px solid #00B4D8",
            borderRadius: "50%",
            animation: "spin-node 6s linear infinite"
          }} />
          <div style={{
            position: "absolute",
            top: "-2px",
            left: "9px",
            width: "4px",
            height: "4px",
            background: "#00E5FF",
            borderRadius: "50%"
          }} />
        </div>
      </div>
    </div>
  );
}

// Sub-component: Telemetry/System Monitor Console
function TelemetryConsole({ projectTitle, color }: { projectTitle: string; color: string }) {
  const timeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const updateTime = () => {
      if (timeRef.current) {
        const now = new Date();
        timeRef.current.textContent = now.toISOString().split("T")[1].slice(0, 8);
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Telemetry metadata logic
  const getTelemetryData = (title: string) => {
    switch (title) {
      case "PII Masking Model":
        return [
          { key: "SYS_STATUS", value: "ACTIVE_REDACTION" },
          { key: "NER_ENGINE", value: "BERT-BASE-UNCASED" },
          { key: "F1_ACCURACY", value: "97.05%" },
          { key: "SYNTH_CORPUS", value: "WIKINEURAL" },
          { key: "LLM_FALLBACK", value: "QWEN2.5-1.5B" },
          { key: "PIPELINE", value: "REGEX_LLM_CASCADE" },
        ];
      case "Smart Traffic Analytics System":
        return [
          { key: "SYS_STATUS", value: "STREAMING_ACTIVE" },
          { key: "DETECTOR", value: "YOLOv8M" },
          { key: "TRACKER", value: "BYTETRACK / BOT-SORT" },
          { key: "ESTIMATOR", value: "PERSPECTIVE-AWARE" },
          { key: "ALERT_BUS", value: "CONGESTION_LEVEL_4" },
          { key: "FPS_FLOW", value: "30_FRAME_PER_SEC" },
        ];
      case "Image Captioning App":
        return [
          { key: "SYS_STATUS", value: "READY" },
          { key: "INTERFACE", value: "STREAMLIT" },
          { key: "BACKBONE", value: "RESNET50" },
          { key: "DECODER", value: "LSTM_RECURRENT" },
          { key: "BEAM_SEARCH", value: "ACTIVE_PARAM" },
          { key: "INPUT_MODALITY", value: "SINGLE_IMAGE_UPLOAD" },
        ];
      case "Image Captioning Model":
        return [
          { key: "SYS_STATUS", value: "STANDBY" },
          { key: "FRAMEWORK", value: "TENSORFLOW" },
          { key: "ACCURACY_TOP5", value: "94.21%" },
          { key: "LOSS_FN", value: "CAT_CROSSENTROPY" },
          { key: "DATASET", value: "MS_COCO_2017" },
          { key: "BATCH_SIZE", value: "64_SAMPLES" },
        ];
      case "AI-Powered Network Analyzer":
        return [
          { key: "SYS_STATUS", value: "MONITORING" },
          { key: "TELEMETRY", value: "REAL_TIME" },
          { key: "DATA_STORE", value: "INFLUXDB_TS" },
          { key: "VISUAL_ENGINE", value: "GRAFANA_DASH" },
          { key: "CONTAINER", value: "DOCKER_COMPOSE" },
          { key: "LATENCY", value: "8.2ms" },
        ];
      case "Fake News Detection":
        return [
          { key: "SYS_STATUS", value: "STANDBY" },
          { key: "CLASSIFIER", value: "SCIKIT_ENSEMBLE" },
          { key: "VECTORIZER", value: "TF_IDF_NGRAM" },
          { key: "CORPUS", value: "LIAR_DATASET" },
          { key: "ACCURACY", value: "91.24%" },
          { key: "FEATURES", value: "TEXT_PREPROCESSING" },
        ];
      case "Airline Customer Satisfaction":
        return [
          { key: "SYS_STATUS", value: "STANDBY" },
          { key: "MODEL", value: "RANDOM_FOREST" },
          { key: "OPTIMIZATION", value: "GRID_SEARCH_CV" },
          { key: "FEATURES", value: "SERVICE_DELAY_RATIO" },
          { key: "ESTIMATORS", value: "150_TREES" },
          { key: "VALIDATION", value: "89.65%" },
        ];
      case "Breast Cancer Detection":
        return [
          { key: "SYS_STATUS", value: "STANDBY" },
          { key: "CLASSIFIER", value: "LOG_REGRESSION" },
          { key: "SENSITIVITY", value: "96.72%" },
          { key: "MODALITY", value: "HISTOPATHOLOGY_IMG" },
          { key: "METRICS", value: "ROC_AUC_0.985" },
          { key: "VALIDATION", value: "98.11%" },
        ];
      case "ClassConnect":
        return [
          { key: "SYS_STATUS", value: "STABLE" },
          { key: "STACK", value: "DJANGO_SQLITE" },
          { key: "ROUTING", value: "DYNAMIC_ASSIGNMENT" },
          { key: "AUTH_SYS", value: "SESSION_MIDDLEWARE" },
          { key: "UI_FRAMEWORK", value: "TAILWIND_CSS" },
          { key: "STORAGE", value: "MEDIA_LOCAL" },
        ];
      case "PayScript":
        return [
          { key: "SYS_STATUS", value: "STABLE" },
          { key: "STACK", value: "DJANGO_HTML" },
          { key: "PDF_COMPILER", value: "WEASYPRINT" },
          { key: "INVOICE_CRON", value: "DOCKER_SCHEDULER" },
          { key: "UI_THEME", value: "NEO_DARK" },
          { key: "CRUD", value: "INVENTORY_STORE" },
        ];
      case "Mega Blog App":
        return [
          { key: "SYS_STATUS", value: "STABLE" },
          { key: "STACK", value: "REACT_APPWRITE" },
          { key: "STATE_ENGINE", value: "REDUX_TOOLKIT" },
          { key: "EDITOR", value: "TINYMCE_INTEG" },
          { key: "STORAGE_BAAS", value: "APPWRITE_BUCKET" },
          { key: "SESSION_LOCK", value: "OAUTH2_ACTIVE" },
        ];
      default:
        return [
          { key: "SYS_STATUS", value: "ACTIVE" },
          { key: "ENGINE", value: "SYSTEM_BUS" },
        ];
    }
  };

  const logs = getTelemetryData(projectTitle);

  return (
    <div
      style={{
        border: "1px dashed rgba(0, 229, 255, 0.15)",
        borderRadius: "16px",
        background: "rgba(7, 17, 33, 0.35)",
        height: "380px",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "var(--font-jetbrains-mono), monospace",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Scope line overlay */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(rgba(0, 229, 255, 0.015) 1px, transparent 1px)",
          backgroundSize: "100% 8px",
          pointerEvents: "none"
        }}
      />

      {/* Terminal Title */}
      <div 
        style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          fontSize: "9px",
          color: "#94A3B8",
          borderBottom: "1px solid rgba(0, 229, 255, 0.08)",
          paddingBottom: "8px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Terminal size={10} style={{ color: "#00E5FF" }} />
          <span>PROJECT_TELEMETRY: {projectTitle.replace(/\s+/g, "_").toUpperCase()}.SYS</span>
        </div>
        <span style={{ color: "rgba(0, 229, 255, 0.7)" }}>SEC_OK</span>
      </div>

      {/* Log Feed */}
      <div 
        style={{ 
          flexGrow: 1, 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center", 
          gap: "10px",
          margin: "12px 0",
          fontSize: "10px"
        }}
      >
        {logs.map((log) => (
          <div 
            key={log.key} 
            style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center" 
            }}
          >
            <span style={{ color: "#475569" }}>&gt; {log.key}:</span>
            <span style={{ color: "#00E5FF" }}>{log.value}</span>
          </div>
        ))}
      </div>

      {/* Terminal Footer */}
      <div 
        style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          fontSize: "8px",
          color: "#475569",
          borderTop: "1px solid rgba(0, 229, 255, 0.08)",
          paddingTop: "8px"
        }}
      >
        <span>SYS_EPOCH_LOCK</span>
        <span>TIME: <span ref={timeRef}>--:--:--</span></span>
      </div>
    </div>
  );
}
