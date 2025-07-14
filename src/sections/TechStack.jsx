import React from "react";
import { BallCanvas } from "../components/canvas";
import { SectionWrapper } from "../components/hoc";
import { technologies } from "../constants";

const Tech = () => {
  return (
    <div className="relative z-10 py-20">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
          My <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Skills</span>
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Mastering cutting-edge technologies to build exceptional digital experiences
        </p>
        <div className="mt-6 mx-auto w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
      </div>

      {/* Technologies Grid */}
      <div className="flex flex-row flex-wrap justify-center gap-10">
        {technologies.map((technology) => (
          <div 
            key={technology.name} 
            className="w-28 h-28 group relative"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Tech ball */}
            <div className="relative z-10 w-full h-full">
              <BallCanvas icon={technology.icon} />
            </div>
            
            {/* Tooltip */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                {technology.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "");
