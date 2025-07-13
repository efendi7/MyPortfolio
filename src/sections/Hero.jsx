import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import AnimatedCounter from "../components/AnimatedCounter";
import Button from "../components/Button";
import { words } from "../constants";
import RawCard from "./RawCard"

const Hero = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
    );
  });

  // Function to handle CV download
  const handleDownloadCV = () => {
    // Convert Google Drive view link to direct download link
    const fileId = "1I4VJIhzfGvLLiTXH9HL0I5j0EIlJXaVm";
    const downloadLink = `https://drive.google.com/uc?export=download&id=${fileId}`;
    
    // Create a temporary anchor element and trigger download
    const link = document.createElement('a');
    link.href = downloadLink;
    link.download = 'Efendi_CV.pdf'; // Optional: specify filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute top-0 left-0 z-10">
        <img src="/images/bg.png" alt="" />
      </div>

      <div className="hero-layout">
        {/* LEFT: Hero Content */}
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
          <div className="flex flex-col gap-7">
            <div className="hero-text">
              <h1>
                Shaping
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <img
                          src={word.imgPath}
                          alt="person"
                          className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1>into Real Projects</h1>
              <h1>that Deliver Results</h1>
            </div>

            <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
             Hello! I'm Efendi, a passionate web developer. <br/> dedicated to continuous learning and self-improvement. <br />
              I study at Universitas Negeri Semarang — thrilled to connect and share ideas!
            </p>

            {/* Button Container */}
            <div className="flex md:flex-row flex-col gap-4">
              <Button
                text="See My Work"
                className="md:w-80 md:h-16 w-60 h-12"
                id="counter"
              />
              
              <Button
                text="Download my CV"
                className="md:w-80 md:h-16 w-60 h-12"
                onClick={handleDownloadCV}
              />
            </div>
          </div>
        </header>

        {/* RIGHT: 3D Model or Visual */}
        <figure>
          <div className="hero-3d-layout">
            <RawCard />
          </div>
        </figure>
      </div>

      <AnimatedCounter />
    </section>
  );
};

export default Hero;