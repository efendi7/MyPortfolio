import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Suspense } from "react";

import HeroLights from "./HeroLights";
import Particles from "./Particles";
import { EnhancedModelWithEffects } from "./EnhancedModel";

const HeroExperience = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  return (
    <Canvas 
      camera={{ 
        position: [-8, 1, -2], 
        fov: 70,
        near: 0.1,
        far: 1000
      }}
      gl={{ 
        antialias: true,
        alpha: true 
      }}
      shadows
    >
      {/* Sedikit terang tapi tetap gelap */}
      <ambientLight intensity={0.45} color="#1a1a40" />

      {/* Tambahan directional light sangat redup */}
      <directionalLight
        position={[10, 5, -5]}
        intensity={0.1}
        color="#ffffff"
      />

      <OrbitControls
        enablePan={false}
        enableZoom={!isTablet}
        maxDistance={25}
        minDistance={3}
        minPolarAngle={Math.PI / 8}
        maxPolarAngle={Math.PI / 1.8}
        target={[0, 0, 0]}
      />

      <Suspense fallback={null}>
        <HeroLights />
        <Particles count={150} />

        <group
          scale={isMobile ? 0.8 : 1.0}
          position={[0, -1, 0]}
          rotation={[0, Math.PI / 6, 0]}
        >
          <EnhancedModelWithEffects />
        </group>
      </Suspense>
    </Canvas>
  );
};

export default HeroExperience;
