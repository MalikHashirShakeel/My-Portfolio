import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollToTop from "@/components/ScrollToTop";
import ParticleBackground from "@/components/ParticleBackground";
import CustomCursor from "@/components/CustomCursor";
import SystemStatusBar from "@/components/SystemStatusBar";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <CustomCursor />
      
      <div className="scanline-overlay" />
      <div className="noise-overlay" />
      <ParticleBackground />

      <main style={{ position: "relative", zIndex: 1, paddingBottom: "24px" }}>
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Certifications />
        <Education />
        <Contact />
        <Footer />
      </main>

      <SystemStatusBar />
      <ScrollToTop />
    </>
  );
}
