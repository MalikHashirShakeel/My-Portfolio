"use client";

import { useRef, useEffect, useState, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface SkillNode {
  id: string;
  label: string;
  tier: "core" | "mid" | "supporting";
  baseX: number; // 0‑1 normalised
  baseY: number; // 0‑1 normalised
  radius: number;
  glowAlpha: number;
  phase: number;   // sin offset
  speed: number;   // oscillation speed
}

interface Edge {
  from: string;
  to: string;
}

interface ActiveEdge {
  edge: Edge;
  t: number;       // 0→1 progress
  startTime: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  startTime: number;
}

interface ActivatedNode {
  id: string;
  until: number;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const ALL_NODES: SkillNode[] = [
  // Core (radius 12‑14, bright)
  { id: "python",        label: "Python",        tier: "core",       baseX: 0.50, baseY: 0.38, radius: 14, glowAlpha: 1.0,  phase: 0.0,  speed: 0.6 },
  { id: "tensorflow",    label: "TensorFlow",    tier: "core",       baseX: 0.32, baseY: 0.25, radius: 13, glowAlpha: 0.95, phase: 1.2,  speed: 0.5 },
  { id: "pytorch",       label: "PyTorch",       tier: "core",       baseX: 0.68, baseY: 0.25, radius: 13, glowAlpha: 0.95, phase: 0.8,  speed: 0.55 },
  { id: "deeplearning",  label: "Deep Learning", tier: "core",       baseX: 0.50, baseY: 0.12, radius: 12, glowAlpha: 0.9,  phase: 2.0,  speed: 0.45 },
  { id: "ml",            label: "Machine Learning", tier: "core",    baseX: 0.22, baseY: 0.42, radius: 12, glowAlpha: 0.9,  phase: 3.1,  speed: 0.5 },

  // Mid‑tier (radius 10‑11, medium)
  { id: "bert",          label: "BERT",          tier: "mid",        baseX: 0.78, baseY: 0.42, radius: 11, glowAlpha: 0.7,  phase: 0.5,  speed: 0.4 },
  { id: "yolov8",        label: "YOLOv8",        tier: "mid",        baseX: 0.82, baseY: 0.58, radius: 11, glowAlpha: 0.7,  phase: 1.8,  speed: 0.45 },
  { id: "react",         label: "React",         tier: "mid",        baseX: 0.15, baseY: 0.62, radius: 11, glowAlpha: 0.7,  phase: 2.5,  speed: 0.42 },
  { id: "opencv",        label: "OpenCV",        tier: "mid",        baseX: 0.72, baseY: 0.68, radius: 10, glowAlpha: 0.65, phase: 3.5,  speed: 0.38 },
  { id: "nlp",           label: "NLP",           tier: "mid",        baseX: 0.60, baseY: 0.55, radius: 10, glowAlpha: 0.65, phase: 0.3,  speed: 0.5 },
  { id: "scikitlearn",   label: "Scikit-Learn",  tier: "mid",        baseX: 0.35, baseY: 0.55, radius: 10, glowAlpha: 0.65, phase: 1.0,  speed: 0.48 },
  { id: "django",        label: "Django",        tier: "mid",        baseX: 0.28, baseY: 0.72, radius: 10, glowAlpha: 0.65, phase: 4.0,  speed: 0.35 },
  { id: "pandas",        label: "Pandas",        tier: "mid",        baseX: 0.45, baseY: 0.70, radius: 10, glowAlpha: 0.65, phase: 2.2,  speed: 0.4 },
  { id: "numpy",         label: "NumPy",         tier: "mid",        baseX: 0.58, baseY: 0.72, radius: 10, glowAlpha: 0.65, phase: 1.5,  speed: 0.42 },

  // Supporting (radius 8‑9, dimmer)
  { id: "sql",           label: "SQL",           tier: "supporting",  baseX: 0.18, baseY: 0.82, radius: 9,  glowAlpha: 0.45, phase: 0.7,  speed: 0.3 },
  { id: "git",           label: "Git",           tier: "supporting",  baseX: 0.10, baseY: 0.48, radius: 9,  glowAlpha: 0.45, phase: 3.8,  speed: 0.32 },
  { id: "javascript",    label: "JavaScript",    tier: "supporting",  baseX: 0.08, baseY: 0.75, radius: 9,  glowAlpha: 0.45, phase: 2.8,  speed: 0.35 },
  { id: "fastapi",       label: "FastAPI",       tier: "supporting",  baseX: 0.40, baseY: 0.85, radius: 8,  glowAlpha: 0.4,  phase: 1.3,  speed: 0.3 },
  { id: "bytetrack",     label: "ByteTrack",     tier: "supporting",  baseX: 0.90, baseY: 0.72, radius: 8,  glowAlpha: 0.4,  phase: 4.5,  speed: 0.28 },
  { id: "qwen",          label: "Qwen2.5",       tier: "supporting",  baseX: 0.88, baseY: 0.35, radius: 8,  glowAlpha: 0.4,  phase: 0.2,  speed: 0.33 },
  { id: "streamlit",     label: "Streamlit",     tier: "supporting",  baseX: 0.35, baseY: 0.90, radius: 8,  glowAlpha: 0.4,  phase: 5.0,  speed: 0.3 },
  { id: "nextjs",        label: "Next.js",       tier: "supporting",  baseX: 0.12, baseY: 0.88, radius: 8,  glowAlpha: 0.4,  phase: 3.3,  speed: 0.32 },
  { id: "css",           label: "CSS",           tier: "supporting",  baseX: 0.05, baseY: 0.60, radius: 8,  glowAlpha: 0.4,  phase: 2.0,  speed: 0.28 },
  { id: "dl2",           label: "Deep Learning", tier: "supporting",  baseX: 0.50, baseY: 0.12, radius: 0,  glowAlpha: 0,    phase: 0,    speed: 0 }, // placeholder — unused, DL already core
];

// Remove the unused placeholder and keep exactly 24 unique
const FULL_NODES = ALL_NODES.filter((n) => n.radius > 0);

const MOBILE_IDS = new Set([
  "python", "tensorflow", "pytorch", "deeplearning", "ml",
  "bert", "yolov8", "react", "opencv", "nlp", "scikitlearn", "django",
]);

const EDGES: Edge[] = [
  // Python connections
  { from: "python", to: "tensorflow" },
  { from: "python", to: "pytorch" },
  { from: "python", to: "scikitlearn" },
  { from: "python", to: "pandas" },
  { from: "python", to: "numpy" },
  { from: "python", to: "django" },
  { from: "python", to: "nlp" },
  { from: "python", to: "opencv" },
  { from: "python", to: "bert" },
  { from: "python", to: "fastapi" },
  // TensorFlow
  { from: "tensorflow", to: "deeplearning" },
  { from: "tensorflow", to: "ml" },
  // PyTorch
  { from: "pytorch", to: "deeplearning" },
  { from: "pytorch", to: "ml" },
  { from: "pytorch", to: "yolov8" },
  // React
  { from: "react", to: "javascript" },
  { from: "react", to: "nextjs" },
  { from: "react", to: "css" },
  // YOLOv8
  { from: "yolov8", to: "opencv" },
  { from: "yolov8", to: "bytetrack" },
  // BERT
  { from: "bert", to: "nlp" },
  { from: "bert", to: "qwen" },
  // Django
  { from: "django", to: "sql" },
  { from: "django", to: "streamlit" },
  // Git
  { from: "git", to: "javascript" },
  // ML
  { from: "ml", to: "scikitlearn" },
  { from: "ml", to: "nlp" },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function dist(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Stats state
  const [activeConns, setActiveConns] = useState(47);
  const [inference, setInference] = useState(12);

  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(e.matches);
    handler(mql);
    mql.addEventListener("change", handler as (e: MediaQueryListEvent) => void);
    return () => mql.removeEventListener("change", handler as (e: MediaQueryListEvent) => void);
  }, []);

  // Stats timers
  useEffect(() => {
    if (isMobile) return;
    const connInterval = setInterval(() => {
      setActiveConns((c) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        return Math.max(40, Math.min(55, c + delta));
      });
    }, randomBetween(2000, 3000));

    const inferInterval = setInterval(() => {
      setInference(Math.round(randomBetween(8, 18)));
    }, 1500);

    return () => {
      clearInterval(connInterval);
      clearInterval(inferInterval);
    };
  }, [isMobile]);

  /* ---------------------------------------------------------------- */
  /*  Canvas animation                                                 */
  /* ---------------------------------------------------------------- */

  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const activeEdgesRef = useRef<ActiveEdge[]>([]);
  const shockwavesRef = useRef<Shockwave[]>([]);
  const activatedNodesRef = useRef<ActivatedNode[]>([]);
  const lastEdgeActivation = useRef(0);

  // Build node map for quick lookup
  const nodeMapRef = useRef<Map<string, SkillNode>>(new Map());
  useEffect(() => {
    if (isMobile) return;
    const map = new Map<string, SkillNode>();
    FULL_NODES.forEach((n) => map.set(n.id, n));
    nodeMapRef.current = map;
  }, [isMobile]);

  const getNodePos = useCallback(
    (node: SkillNode, w: number, h: number, time: number) => {
      const margin = 40;
      const areaW = w - margin * 2;
      const areaH = h - margin * 2;
      const ox = Math.sin(time * node.speed + node.phase) * 3;
      const oy = Math.cos(time * node.speed * 0.8 + node.phase + 1) * 3;
      return {
        x: margin + node.baseX * areaW + ox,
        y: margin + node.baseY * areaH + oy,
      };
    },
    []
  );

  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let w = 0;
    let h = 0;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    // Mouse handlers
    const onMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onMouseLeave = () => {
      mouseRef.current = null;
    };

    const onClick = (e: MouseEvent) => {
      if (isMobile) return;
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      shockwavesRef.current.push({
        x: cx,
        y: cy,
        radius: 0,
        alpha: 1,
        startTime: performance.now(),
      });
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("click", onClick);

    const nodes = isMobile
      ? FULL_NODES.filter((n) => MOBILE_IDS.has(n.id))
      : FULL_NODES;

    const edges = isMobile
      ? EDGES.filter(
          (e) =>
            nodes.some((n) => n.id === e.from) &&
            nodes.some((n) => n.id === e.to)
        )
      : EDGES;

    const edgeActivationInterval = isMobile ? 2500 : 1500;
    const edgeTravelDuration = isMobile ? 1200 : 800;

    /* ---- render loop ---- */
    const render = (now: number) => {
      const time = now / 1000;
      ctx.clearRect(0, 0, w, h);

      // --- Activate random edges periodically ---
      if (now - lastEdgeActivation.current > edgeActivationInterval) {
        lastEdgeActivation.current = now;
        const count = isMobile ? 1 : Math.floor(randomBetween(2, 4));
        for (let i = 0; i < count; i++) {
          const edge = edges[Math.floor(Math.random() * edges.length)];
          activeEdgesRef.current.push({ edge, t: 0, startTime: now });
        }
      }

      // Update active edges
      activeEdgesRef.current = activeEdgesRef.current.filter(
        (ae) => now - ae.startTime < edgeTravelDuration
      );

      // Active edge set for brightness
      const activeEdgeSet = new Set<string>();
      activeEdgesRef.current.forEach((ae) => {
        activeEdgeSet.add(`${ae.edge.from}-${ae.edge.to}`);
        activeEdgeSet.add(`${ae.edge.to}-${ae.edge.from}`);
      });

      // --- Update shockwaves ---
      const SHOCKWAVE_SPEED = 200; // px/s
      const SHOCKWAVE_MAX = 400;
      shockwavesRef.current = shockwavesRef.current.filter((sw) => {
        const elapsed = Math.max(0, (now - sw.startTime) / 1000);
        sw.radius = elapsed * SHOCKWAVE_SPEED;
        sw.alpha = Math.max(0, 1 - sw.radius / SHOCKWAVE_MAX);

        // Activate nodes the ring passes through
        if (sw.alpha > 0) {
          nodes.forEach((node) => {
            const pos = getNodePos(node, w, h, time);
            const d = Math.abs(dist(sw.x, sw.y, pos.x, pos.y) - sw.radius);
            if (d < 15) {
              // Check if already activated
              if (!activatedNodesRef.current.some((an) => an.id === node.id)) {
                activatedNodesRef.current.push({ id: node.id, until: now + 800 });
                // Also activate edges to connected neighbours
                edges.forEach((edge) => {
                  if (edge.from === node.id || edge.to === node.id) {
                    activeEdgesRef.current.push({ edge, t: 0, startTime: now });
                  }
                });
              }
            }
          });
        }

        return sw.radius < SHOCKWAVE_MAX;
      });

      // Clean up expired activated nodes
      activatedNodesRef.current = activatedNodesRef.current.filter(
        (an) => now < an.until
      );
      const activatedSet = new Set(activatedNodesRef.current.map((an) => an.id));

      // --- Find nearest node to mouse ---
      let hoveredNode: SkillNode | null = null;
      if (!isMobile && mouseRef.current) {
        let minD = 60;
        nodes.forEach((node) => {
          const pos = getNodePos(node, w, h, time);
          const d = dist(mouseRef.current!.x, mouseRef.current!.y, pos.x, pos.y);
          if (d < minD) {
            minD = d;
            hoveredNode = node;
          }
        });
      }

      // --- Draw edges ---
      edges.forEach((edge) => {
        const fromNode = nodeMapRef.current.get(edge.from);
        const toNode = nodeMapRef.current.get(edge.to);
        if (!fromNode || !toNode) return;
        // Skip nodes not in current set
        if (!nodes.some((n) => n.id === edge.from) || !nodes.some((n) => n.id === edge.to)) return;

        const p1 = getNodePos(fromNode, w, h, time);
        const p2 = getNodePos(toNode, w, h, time);

        const key = `${edge.from}-${edge.to}`;
        const isActive = activeEdgeSet.has(key);
        const isHovered =
          hoveredNode && (edge.from === hoveredNode.id || edge.to === hoveredNode.id);

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = isHovered
          ? "rgba(0,180,216,0.35)"
          : isActive
          ? "rgba(0,180,216,0.4)"
          : "rgba(0,180,216,0.1)";
        ctx.lineWidth = isActive || isHovered ? 1 : 0.5;
        ctx.stroke();
      });

      // --- Draw active edge glowing dots ---
      activeEdgesRef.current.forEach((ae) => {
        const fromNode = nodeMapRef.current.get(ae.edge.from);
        const toNode = nodeMapRef.current.get(ae.edge.to);
        if (!fromNode || !toNode) return;

        const p1 = getNodePos(fromNode, w, h, time);
        const p2 = getNodePos(toNode, w, h, time);
        const t = Math.min(1, (now - ae.startTime) / edgeTravelDuration);

        const dx = lerp(p1.x, p2.x, t);
        const dy = lerp(p1.y, p2.y, t);

        ctx.beginPath();
        ctx.arc(dx, dy, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,229,255,0.9)";
        ctx.shadowColor = "#00E5FF";
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // --- Draw shockwaves ---
      shockwavesRef.current.forEach((sw) => {
        if (sw.alpha <= 0) return;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,229,255,${(sw.alpha * 0.6).toFixed(3)})`;
        ctx.lineWidth = 2;
        ctx.shadowColor = "#00E5FF";
        ctx.shadowBlur = 8 * sw.alpha;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // --- Draw nodes ---
      nodes.forEach((node) => {
        const pos = getNodePos(node, w, h, time);
        const isHovered = hoveredNode?.id === node.id;
        const isActivated = activatedSet.has(node.id);

        let r = node.radius;
        let glowAmount = node.glowAlpha;
        let labelColor = "#94A3B8";
        let coreColor = "#00B4D8";

        if (isHovered) {
          r = node.radius * 1.5;
          glowAmount = 1.2;
          labelColor = "#FFFFFF";
          coreColor = "#FFFFFF";
        } else if (isActivated) {
          r = node.radius * 1.3;
          glowAmount = 1.0;
          coreColor = "#00E5FF";
        }

        // Glow
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2);
        ctx.shadowColor = coreColor;
        ctx.shadowBlur = 15 * glowAmount;
        ctx.fillStyle = coreColor;
        ctx.globalAlpha = glowAmount * 0.8;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;

        // Inner core
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, r * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? "#FFFFFF" : "rgba(0,229,255,0.9)";
        ctx.fill();

        // Label
        ctx.font = "10px 'JetBrains Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillStyle = labelColor;
        ctx.fillText(node.label, pos.x, pos.y + r + 14);
      });

      // --- Draw activated node arcs ---
      activatedNodesRef.current.forEach((an) => {
        const node = nodeMapRef.current.get(an.id);
        if (!node) return;
        const pos = getNodePos(node, w, h, time);
        const progress = 1 - (an.until - now) / 800;
        const arcAlpha = Math.max(0, 1 - progress);

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, node.radius * 2, 0, Math.PI * 2 * progress);
        ctx.strokeStyle = `rgba(0,229,255,${(arcAlpha * 0.5).toFixed(3)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("click", onClick);
    };
  }, [isMobile, getNodePos]);

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  if (isMobile) {
    return null;
  }

  return (
    <div
      ref={wrapperRef}
      role="img"
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      <canvas
        ref={canvasRef}
        aria-label="Interactive neural network visualization of skills"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          background: "transparent",
        }}
      />

      {/* Floating Stats Overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: 16,
          background: "rgba(13,33,55,0.7)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(0,228,255,0.12)",
          borderRadius: 8,
          padding: "12px 16px",
          fontFamily: "var(--font-jetbrains-mono), 'JetBrains Mono', monospace",
          fontSize: 10,
          color: "#94A3B8",
          lineHeight: 1.8,
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 2,
        }}
      >
        <div>
          Active connections:{" "}
          <span style={{ color: "#00E5FF" }}>{activeConns}</span>
        </div>
        <div>
          Models loaded: <span style={{ color: "#00E5FF" }}>3</span>
        </div>
        <div>
          Inference: <span style={{ color: "#00E5FF" }}>{inference}ms</span>
        </div>
      </div>
    </div>
  );
}
