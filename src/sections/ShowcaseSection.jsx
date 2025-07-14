import { useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// Extended mock data with 6 projects
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Modern e-commerce solution with React and Node.js",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop",
    github: "https://github.com/example/ecommerce",
    category: "fullstack",
    techStack: [
      { name: "React", icon: "⚛️", color: "#61DAFB" },
      { name: "Node.js", icon: "🟢", color: "#68A063" },
      { name: "MongoDB", icon: "🍃", color: "#47A248" },
      { name: "Express", icon: "🚀", color: "#000000" }
    ]
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "Responsive portfolio with modern design",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop",
    github: "https://github.com/example/portfolio",
    category: "frontend",
    techStack: [
      { name: "React", icon: "⚛️", color: "#61DAFB" },
      { name: "Tailwind", icon: "🎨", color: "#38B2AC" },
      { name: "GSAP", icon: "✨", color: "#88CE02" }
    ]
  },
  {
    id: 3,
    title: "Task Management API",
    description: "RESTful API for task management system",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
    github: "https://github.com/example/api",
    category: "backend",
    techStack: [
      { name: "Node.js", icon: "🟢", color: "#68A063" },
      { name: "Express", icon: "🚀", color: "#000000" },
      { name: "PostgreSQL", icon: "🐘", color: "#336791" },
      { name: "JWT", icon: "🔐", color: "#000000" }
    ]
  },
  {
    id: 4,
    title: "Chat Application",
    description: "Real-time messaging app with WebSocket support",
    image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=400&h=300&fit=crop",
    github: "https://github.com/example/chat-app",
    category: "fullstack",
    techStack: [
      { name: "React", icon: "⚛️", color: "#61DAFB" },
      { name: "Socket.io", icon: "🔌", color: "#010101" },
      { name: "Node.js", icon: "🟢", color: "#68A063" },
      { name: "Redis", icon: "🔴", color: "#DC382D" }
    ]
  },
  {
    id: 5,
    title: "Weather Dashboard",
    description: "Interactive weather visualization with charts",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop",
    github: "https://github.com/example/weather-dashboard",
    category: "frontend",
    techStack: [
      { name: "Vue.js", icon: "🟢", color: "#4FC08D" },
      { name: "Chart.js", icon: "📊", color: "#FF6384" },
      { name: "TypeScript", icon: "🔷", color: "#3178C6" },
      { name: "Sass", icon: "🎨", color: "#CC6699" }
    ]
  },
  {
    id: 6,
    title: "Authentication Service",
    description: "Secure authentication microservice with JWT",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop",
    github: "https://github.com/example/auth-service",
    category: "backend",
    techStack: [
      { name: "Python", icon: "🐍", color: "#3776AB" },
      { name: "FastAPI", icon: "⚡", color: "#009688" },
      { name: "PostgreSQL", icon: "🐘", color: "#336791" },
      { name: "Docker", icon: "🐳", color: "#2496ED" }
    ]
  }
];

const categories = ["all", "frontend", "backend", "fullstack"];

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const gridRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const handleCategoryChange = (newCategory) => {
    if (newCategory === activeCategory || isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Animate out current cards
    gsap.to(cardRefs.current.filter(card => card), {
      opacity: 0,
      y: 20,
      scale: 0.95,
      duration: 0.2,
      stagger: 0.03,
      ease: "power2.in",
      onComplete: () => {
        setActiveCategory(newCategory);
        setIsTransitioning(false);
      }
    });
  };

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5 }
    );

    // Animate in cards after category change
    if (cardRefs.current.length > 0) {
      gsap.fromTo(cardRefs.current.filter(card => card), 
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "back.out(1.7)",
          delay: 0.1
        }
      );
    }
  }, [activeCategory]);

  return (
    <section ref={sectionRef} id="work" className="px-6 py-16 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
          My <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Projects</span>
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Explore my latest work and creative solutions
        </p>

        {/* Enhanced Filter */}
        <div className="flex justify-center gap-3 mb-16 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              disabled={isTransitioning}
              className={`
                px-6 py-3 rounded-full text-sm font-medium transition-all duration-300
                relative overflow-hidden group disabled:opacity-50
                ${activeCategory === cat 
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25" 
                  : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20"
                }
              `}
            >
              <span className="relative z-10">
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </span>
              {activeCategory !== cat && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]"
        >
          {filteredProjects.map((project, i) => (
            <div
              key={project.id}
              ref={(el) => (cardRefs.current[i] = el)}
              onClick={() => window.open(project.github, "_blank")}
              className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl cursor-pointer overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30 hover:-translate-y-2"
            >
              {/* Animated border gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              
              {/* Content wrapper */}
              <div className="relative z-10 h-full">
                {/* Image section with enhanced hover effects */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  
                  {/* Animated overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 text-white text-sm font-medium">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        Click to view on GitHub
                      </div>
                    </div>
                  </div>

                  {/* Floating tech icons */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                    {project.techStack.slice(0, 3).map((tech, idx) => (
                      <div
                        key={tech.name}
                        className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-xs animate-bounce"
                        style={{ 
                          animationDelay: `${idx * 0.1}s`,
                          animationDuration: '2s'
                        }}
                      >
                        {tech.icon}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content section */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Enhanced tech stack */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, idx) => (
                        <div
                          key={tech.name}
                          className="group/tech relative isolate z-10 overflow-hidden bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full text-xs font-medium text-gray-300 transition-all duration-300 hover:scale-105 border border-white/10 hover:border-white/20"
                          style={{
                            '--delay': `${idx * 0.1}s`
                          }}
                        >
                          {/* Glowing effect */}
                          <div 
                            className="absolute inset-0 rounded-full opacity-0 group-hover/tech:opacity-20 transition-opacity duration-300 blur-sm z-0"
                            style={{ backgroundColor: tech.color }}
                          ></div>

                          {/* Content */}
                          <div className="relative z-10 flex items-center gap-2">
                            <span className="text-sm filter group-hover/tech:brightness-150 transition-all duration-300">
                              {tech.icon}
                            </span>
                            <span className="group-hover/tech:text-white transition-colors duration-300">
                              {tech.name}
                            </span>
                          </div>

                          {/* Border glow */}
                          <div 
                            className="absolute inset-0 rounded-full border-2 opacity-0 group-hover/tech:opacity-60 transition-all duration-300 z-0"
                            style={{ borderColor: tech.color }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hover shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 opacity-20">📭</div>
            <p className="text-gray-400 text-lg">No projects found in this category</p>
          </div>
        )}

        {/* Project count indicator */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;