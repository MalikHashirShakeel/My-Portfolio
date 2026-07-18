"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Download, FileText, ExternalLink } from "lucide-react";
import MagneticButton from "../../components/MagneticButton";

export default function TranscriptPage() {
  const router = useRouter();

  const handleDownload = () => {
    // Direct download trigger
    const link = document.createElement("a");
    link.href = "/transcript.pdf";
    link.setAttribute("download", "Malik_Hashir_Transcript.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#060B1A",
        color: "#E2E8F0",
        display: "flex",
        flexDirection: "column",
        fontFamily: "var(--font-space-grotesk), sans-serif",
      }}
    >
      {/* Top bar */}
      <header
        style={{
          height: "64px",
          background: "rgba(13, 33, 55, 0.8)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0, 228, 255, 0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <button
          onClick={() => router.back()}
          style={{
            background: "transparent",
            border: "none",
            color: "#94A3B8",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "0.9rem",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#00E5FF")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#94A3B8")}
        >
          <ArrowLeft size={18} />
          Back to Portfolio
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FileText size={18} style={{ color: "#00E5FF" }} />
          <span style={{ fontWeight: 600, fontSize: "1rem", letterSpacing: "0.05em" }}>
            TRANSCRIPT_VIEWER
          </span>
        </div>

        <MagneticButton>
          <button
            onClick={handleDownload}
            style={{
              background: "linear-gradient(135deg, #00E5FF 0%, #A855F7 100%)",
              color: "#060B1A",
              border: "none",
              borderRadius: "9999px",
              padding: "0.5rem 1.25rem",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 0 15px rgba(0, 229, 255, 0.2)",
            }}
          >
            <Download size={15} />
            Download PDF
          </button>
        </MagneticButton>
      </header>

      {/* Main content container */}
      <main style={{ flex: 1, position: "relative", height: "calc(100vh - 64px)" }}>
        {/* PDF embedding */}
        <object
          data="/transcript.pdf"
          type="application/pdf"
          width="100%"
          height="100%"
          style={{ border: "none" }}
        >
          {/* Fallback in case viewer doesn't render */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              padding: "24px",
              textAlign: "center",
            }}
          >
            <FileText size={48} style={{ color: "#00E5FF", marginBottom: "16px" }} />
            <h2 style={{ marginBottom: "8px" }}>PDF Viewer Not Supported</h2>
            <p style={{ color: "#94A3B8", maxWidth: "400px", marginBottom: "24px" }}>
              Your browser doesn't support viewing PDFs directly. You can view or download it using the link below.
            </p>
            <a
              href="/transcript.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#00E5FF",
                textDecoration: "underline",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              Open PDF Directly
              <ExternalLink size={14} />
            </a>
          </div>
        </object>
      </main>
    </div>
  );
}
