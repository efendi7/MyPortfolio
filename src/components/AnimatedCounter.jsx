import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import { counterItems } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const AnimatedCounter = () => {
  const counterRef = useRef(null);
  const countersRef = useRef([]);

  useGSAP(() => {
    countersRef.current.forEach((counter, index) => {
      const numberElement = counter.querySelector(".counter-number");
      const item = counterItems[index];

      gsap.set(numberElement, { innerText: "0" });

      gsap.to(numberElement, {
        innerText: item.value,
        duration: 2.5,
        ease: "power2.out",
        snap: false,
        scrollTrigger: {
          trigger: "#counter",
          start: "top center",
        },
        onUpdate: function () {
          const value = Number(numberElement.innerText).toFixed(1);
          numberElement.textContent = `${value}${item.suffix}`;
        },
        onComplete: () => {
          numberElement.textContent = `${item.value}${item.suffix}`;
        },
      });
    });

    // Animate background particles
    gsap.fromTo(
      ".counter-particle",
      { scale: 0, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 3, 
        stagger: 0.1, 
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        scrollTrigger: {
          trigger: "#counter",
          start: "top center",
        }
      }
    );
  }, []);

  return (
    <section 
      id="counter" 
      ref={counterRef} 
      className="relative"
      style={{ margin: 0, padding: 0 }}
    >
      {/* Content */}
      <div className="relative z-10 px-8 pb-20">
        {/* Baris ke-1 */}
        <div className="mx-auto grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8 max-w-7xl">
          {counterItems.slice(0, 4).map((item, index) => (
            <div
              key={index}
              ref={(el) => el && (countersRef.current[index] = el)}
              className="relative rounded-xl p-8 flex flex-col items-center justify-center
                backdrop-blur-md bg-white/5 border border-white/10 shadow-lg
                transition-all duration-300 hover:scale-105 hover:bg-white/10
                group"
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-br from-blue-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              
              {/* Inner glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="counter-number text-5xl font-extrabold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent relative z-10">
                0{item.suffix}
              </div>
              <div className="text-white/80 text-lg text-center relative z-10">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Baris ke-2 */}
        <div className="mx-auto grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8 max-w-7xl mt-8">
          {counterItems.slice(4, 8).map((item, index) => (
            <div
              key={index + 4}
              ref={(el) => el && (countersRef.current[index + 4] = el)}
              className="relative rounded-xl p-8 flex flex-col items-center justify-center
                backdrop-blur-md bg-white/5 border border-white/10 shadow-lg
                transition-all duration-300 hover:scale-105 hover:bg-white/10
                group"
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-br from-green-500/30 to-teal-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              
              {/* Inner glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-green-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="counter-number text-5xl font-extrabold mb-2 bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent relative z-10">
                0{item.suffix}
              </div>
              <div className="text-white/80 text-lg text-center relative z-10">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimatedCounter;