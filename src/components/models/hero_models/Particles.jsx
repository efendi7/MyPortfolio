import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Particles = ({ count = 150 }) => {
  const mesh = useRef();
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 20, // Lebih lebar untuk memastikan terlihat
          Math.random() * 15 + 2,     // Range Y yang lebih tinggi
          (Math.random() - 0.5) * 20, // Lebih dalam
        ],
        speed: 0.01 + Math.random() * 0.02, // Speed lebih terlihat
      });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    if (!mesh.current) return;
    
    const positions = mesh.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      let y = positions[i * 3 + 1];
      y -= particles[i].speed;
      
      // Reset partikel ke atas ketika turun terlalu rendah
      if (y < -5) {
        y = Math.random() * 15 + 10;
      }
      
      positions[i * 3 + 1] = y;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  const positions = new Float32Array(count * 3);
  particles.forEach((p, i) => {
    positions[i * 3] = p.position[0];
    positions[i * 3 + 1] = p.position[1];
    positions[i * 3 + 2] = p.position[2];
  });

  // Buat texture circular untuk partikel yang lebih terlihat
  const circleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 64;
    canvas.height = 64;
    
    const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, 64, 64);
    
    return new THREE.CanvasTexture(canvas);
  }, []);

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
        size={0.1}                              // Ukuran lebih besar untuk debug
        map={circleTexture}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        alphaTest={0.001}                       // Membantu rendering
      />
    </points>
  );
};

export default Particles;