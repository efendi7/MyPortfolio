import * as THREE from "three";

const HeroLights = () => (
  <>
    {/* Main spotlight focused on computer area (primary light for the desk) */}
    <spotLight
      position={[-1, 5, 0]} // Position above and slightly to the right of computer
      angle={0.4} // Wider cone to cover computer desk
      penumbra={0.2} // Softer edges
      intensity={100}
      color="#ffffff"
      castShadow
      target-position={[-3, 1.5, -1]} // Target the computer desk area more precisely
    />

    {/* Secondary spotlight for computer area (for better directional lighting and detail) */}
    <spotLight
      position={[-2.5, 4, 0.5]} // Position to the side for good angle on the monitor/keyboard
      angle={0.3}
      penumbra={0.3}
      intensity={60}
      color="#ffffff"
      castShadow
      target-position={[-3, 2, -1]} // Focus on computer screen area
    />

    {/* Ambient light for overall scene, but lower intensity to keep dark areas dark */}
    <ambientLight
      color="#404040"
      intensity={0.2} // Reduced ambient to allow spotlights to dominate
    />

    {/* Ceiling light - now using a RectAreaLight for a more controlled, softer light from above */}
    {/* This light is positioned high and is broad, intended to illuminate the general room, but not
        as a primary light source for the computer desk. Its intensity is lower to allow spotlights
        to stand out. */}
    <primitive
      object={new THREE.RectAreaLight("#ffffff", 3, 3, 2)}
      position={[0, 5.5, 0]} // Positioned in the ceiling
      rotation={[-Math.PI / 2, 0, 0]}
      intensity={0.5} // Lowered intensity to not over-light the room
    />

    {/* Computer screen glow - enhanced for better visibility */}
    <pointLight
      position={[-3.2, 2.5, -0.8]} // Right in front of computer screen
      intensity={15}
      color="#00ff88"
      distance={1.5} // Extended range for screen
      decay={2} // Moderate falloff
    />

    {/* Lamp area warm glow - contained (only affects lamp area, not bed) */}
    <pointLight
      position={[-0.5, 2, -1.8]} // Near lamp, adjusted position to be more precise
      intensity={6}
      color="#fff4e6"
      distance={1} // Very limited range to contain light to the lamp
      decay={3}
    />

    {/* Bed area - point light (retained but ensures it doesn't interfere with computer lighting) */}
    {/* This light is specifically for the bed area and should be separate from computer lighting concerns. */}
    <pointLight
      position={[1.5, 2.5, -2]} // Adjusted position for better bed illumination, away from computer
      intensity={35}
      color="#fff8dc"
      distance={2.5}
      decay={2}
      castShadow
    />
  </>
);

export default HeroLights;