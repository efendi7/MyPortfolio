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

const App = () => (
  <>
    <Navbar />
    <div className="relative bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10 backdrop-blur-sm animate-pulse"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's',
              animationDuration: Math.random() * 2 + 3 + 's',
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
        <Experience />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </div>
  </>
);

export default App;
