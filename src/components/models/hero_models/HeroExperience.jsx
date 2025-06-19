import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Suspense, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Import your enhanced model components
import { ResponsiveEnhancedModel } from "./EnhancedModel";

// Simplified Mobile Lights - Much lighter for performance
const MobileLights = () => (
  <>
    {/* Single ambient light for general illumination */}
    <ambientLight intensity={0.6} color="#ffffff" />
    
    {/* Single directional light instead of multiple spotlights */}
    <directionalLight
      position={[5, 10, 5]}
      intensity={0.4}
      color="#ffffff"
    />
    
    {/* Only the computer screen glow for visual interest */}
    <pointLight
      position={[-3.2, 2.5, -0.8]}
      intensity={5}
      color="#00ff88"
      distance={2}
      decay={1}
    />
  </>
);

// Full Desktop Lights (your original complex lighting)
const DesktopLights = () => (
  <>
    <spotLight
      position={[-1, 5, 0]}
      angle={0.4}
      penumbra={0.2}
      intensity={100}
      color="#ffffff"
      castShadow
      target-position={[-3, 1.5, -1]}
    />
    
    <spotLight
      position={[-2.5, 4, 0.5]}
      angle={0.3}
      penumbra={0.3}
      intensity={60}
      color="#ffffff"
      castShadow
      target-position={[-3, 2, -1]}
    />
    
    <ambientLight color="#404040" intensity={0.2} />
    
    <primitive
      object={new THREE.RectAreaLight("#ffffff", 3, 3, 2)}
      position={[0, 5.5, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      intensity={0.5}
    />
    
    <pointLight
      position={[-3.2, 2.5, -0.8]}
      intensity={15}
      color="#00ff88"
      distance={1.5}
      decay={2}
    />
    
    <pointLight
      position={[-0.5, 2, -1.8]}
      intensity={6}
      color="#fff4e6"
      distance={1}
      decay={3}
    />
    
    <pointLight
      position={[1.5, 2.5, -2]}
      intensity={35}
      color="#fff8dc"
      distance={2.5}
      decay={2}
      castShadow
    />
  </>
);

// Optimized Particles - Simplified for better performance
const OptimizedParticles = ({ count = 150 }) => {
  const mesh = useRef();
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 20,
          Math.random() * 15 + 2,
          (Math.random() - 0.5) * 20,
        ],
        speed: 0.005 + Math.random() * 0.01, // Slower animation for better performance
      });
    }
    return temp;
  }, [count]);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    
    // Throttle animation updates for better performance
    if (state.clock.elapsedTime % 0.1 < delta) return;
    
    const positions = mesh.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      let y = positions[i * 3 + 1];
      y -= particles[i].speed;
      
      if (y < -5) {
        y = Math.random() * 15 + 10;
      }
      
      positions[i * 3 + 1] = y;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    particles.forEach((p, i) => {
      pos[i * 3] = p.position[0];
      pos[i * 3 + 1] = p.position[1];
      pos[i * 3 + 2] = p.position[2];
    });
    return pos;
  }, [particles, count]);

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.03}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.4}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Main HeroExperience Component - Optimized for both mobile and desktop
const OptimizedHeroExperience = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isDesktop = !isMobile && !isTablet;

  return (
    <Canvas
      camera={{
        position: [-8, 1, -2],
        fov: isMobile ? 75 : 65,
        near: 0.1,
        far: 1000,
      }}
      gl={{
        antialias: isDesktop, // Disable antialiasing on mobile for performance
        alpha: true,
        powerPreference: isMobile ? "low-power" : "high-performance",
        stencil: false, // Disable stencil buffer for better performance
        depth: true,
      }}
      shadows={isDesktop} // Disable shadows on mobile
      dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)} // Limit pixel ratio on mobile
    >
      {/* Conditional lighting based on device capability */}
      {isMobile ? <MobileLights /> : <DesktopLights />}

      <OrbitControls
        enablePan={false}
        enableZoom={isDesktop}
        enableRotate={isDesktop}
        maxDistance={25}
        minDistance={3}
        minPolarAngle={Math.PI / 8}
        maxPolarAngle={Math.PI / 1.8}
        target={[0, 0, 0]}
      />

      <Suspense fallback={null}>
        {/* Only render particles on desktop and tablet for performance */}
        {!isMobile && (
          <OptimizedParticles count={isTablet ? 50 : 100} />
        )}
        
        <group
          scale={isMobile ? 0.6 : isTablet ? 0.8 : 1.0}
          position={isMobile ? [0, -2.8, 0] : [0, -1, 0]} // Lowered position for mobile
          rotation={[0, Math.PI / 6, 0]}
        >
          <ResponsiveEnhancedModel enableBloom={isDesktop} />
        </group>
      </Suspense>
    </Canvas>
  );
};

export default OptimizedHeroExperience;