// ===== Alternative Tiny_isometric_room.jsx (if original doesn't work) =====
import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  try {
    const { nodes, materials } = useGLTF('/models/tiny_isometric_room.glb')
    
    // If materials are undefined, use basic materials
    const fallbackMaterial = new THREE.MeshStandardMaterial({ 
      color: '#8B4513', // Brown color for room
      roughness: 0.7,
      metalness: 0.1 
    });
    
    return (
      <group {...props} dispose={null}>
        {/* Render with fallback materials if original materials fail */}
        {Object.entries(nodes).map(([key, node]) => {
          if (node.geometry) {
            return (
              <mesh 
                key={key}
                geometry={node.geometry} 
                material={materials?.[node.material?.name] || fallbackMaterial}
                position={node.position}
                rotation={node.rotation}
                scale={node.scale}
              />
            );
          }
          return null;
        })}
      </group>
    )
  } catch (error) {
    console.error('Error loading GLB model:', error);
    // Return fallback geometry
    return (
      <group {...props}>
        <mesh>
          <boxGeometry args={[4, 2, 4]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[0, 1.5, 0]}>
          <boxGeometry args={[3.8, 0.2, 3.8]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      </group>
    );
  }
}

useGLTF.preload('/models/tiny_isometric_room.glb')