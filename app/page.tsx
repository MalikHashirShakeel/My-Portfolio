import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollToTop from "@/components/ScrollToTop";
import ParticleBackground from "@/components/ParticleBackground";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <div className="scanline-overlay" />
      <div className="noise-overlay" />
      <ParticleBackground />

      <main style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Education />
        <Contact />
        <Footer />
      </main>

      <ScrollToTop />
    </>
  );
}
