import { useMemo, useEffect } from 'react';
import Navbar from "./components/NavBar";
import Hero from "./sections/Hero";
import ShowcaseSection from "./sections/ShowcaseSection";
import LogoShowcase from "./sections/LogoShowcase";
import FeatureCards from "./sections/FeatureCards";
import Experience from "./sections/Experience";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import AnimatedCounter from "./components/AnimatedCounter";
import Tech from "./sections/TechStack";

const App = () => {
  // Generate partikel sekali saja menggunakan useMemo
  const particles = useMemo(() => {
    return [...Array(25)].map((_, i) => ({
      id: i,
      width: Math.random() * 4 + 2,
      height: Math.random() * 4 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 3,
      animationDuration: Math.random() * 2 + 3,
    }));
  }, []);

  // Scroll management
  useEffect(() => {
    // Disable browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Force scroll to top on component mount
    window.scrollTo(0, 0);

    // Cleanup function
    return () => {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto';
      }
    };
  }, []);

  // Prevent scroll restoration during page load
  useEffect(() => {
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="relative bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        {/* Particles */}
        <div className="absolute inset-0 overflow-hidden z-0">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full bg-white/10 backdrop-blur-sm animate-pulse"
              style={{
                width: particle.width + 'px',
                height: particle.height + 'px',
                left: particle.left + '%',
                top: particle.top + '%',
                animationDelay: particle.animationDelay + 's',
                animationDuration: particle.animationDuration + 's',
              }}
            />
          ))}
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5 z-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          ></div>
        </div>

        <div className="relative z-10">
          <Hero />
          <AnimatedCounter />
          <ShowcaseSection />
          <LogoShowcase />
          <FeatureCards />
          <Tech />
          <Experience />
          <Testimonials />
          <Contact />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default App;