import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import AnimatedCounter from "../components/AnimatedCounter";
import Button from "../components/Button";
import { words } from "../constants";
import RawCard from "./RawCard";

const Hero = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
    );

    gsap.fromTo(
      ".hero-description",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power2.inOut" }
    );

    gsap.fromTo(
      ".hero-buttons",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.8, ease: "power2.inOut" }
    );
  });

  const handleDownloadCV = () => {
    try {
      const fileId = "1I4VJIhzfGvLLiTXH9HL0I5j0EIlJXaVm";
      const downloadLink = `https://drive.google.com/uc?export=download&id=${fileId}`;
      
      const link = document.createElement('a');
      link.href = downloadLink;
      link.download = 'Efendi_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading CV:', error);
      window.open(`https://drive.google.com/file/d/1I4VJIhzfGvLLiTXH9HL0I5j0EIlJXaVm/view`, '_blank');
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col md:flex-row items-center justify-between px-5 md:px-20 pt-20">
      {/* Background image - Optimized size */}
      <div className="absolute top-0 left-0 z-0 w-full h-full">
        <img 
          src="/images/bg.png" 
          alt="Background decoration"
          className="w-full h-full object-contain opacity-60 max-w-4xl mx-auto"
        />
      </div>

      {/* Main content + Photo side by side */}
      <div className="relative z-20 flex flex-col md:flex-row items-center w-full">
        {/* Left: Text content */}
        <header className="flex flex-col justify-center md:w-1/2 w-full gap-7">
          <div className="hero-text">
            <h1 className="text-white">
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
                        className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50 shadow-lg"
                      />
                      <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {word.text}
                      </span>
                    </span>
                  ))}
                </span>
              </span>
            </h1>
            <h1 className="text-white">into Real Projects</h1>
            {/* <h1 className="text-white">that Deliver Results</h1> */}
          </div>

          <p className="hero-description text-white-50 md:text-xl relative z-10 leading-relaxed">
            Hello! I'm Efendi, a passionate web developer who loves to learn and grow. I'm currently pursuing my 6th semester at 
            <span className="text-purple-400 font-semibold"> Universitas Negeri Semarang</span> and enjoy collaborating to build useful web applications.
            I have experience with 
            <span className="text-blue-400 font-semibold"> React</span>, 
            <span className="text-green-400 font-semibold"> Vue 3</span>, 
            <span className="text-gray-400 font-semibold"> Next.js</span>, 
            <span className="text-pink-400 font-semibold"> Inertia.js</span>, 
            <span className="text-red-400 font-semibold"> Laravel</span>, and 
            <span className="text-yellow-400 font-semibold"> MySQL</span>. Let's connect and share ideas!
          </p>

          <div className="hero-buttons flex md:flex-row flex-col gap-4">
            <Button text="See My Work" className="md:w-80 md:h-16 w-60 h-12" />
            <Button text="Download my CV" className="md:w-80 md:h-16 w-60 h-12" onClick={handleDownloadCV} />
          </div>
        </header>

        {/* Right: RawCard */}
        <div className="relative md:w-1/2 w-full flex justify-center mt-10 md:mt-0">
          <div className="w-[300px] h-[400px] md:w-[400px] md:h-[500px]">
            <RawCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;