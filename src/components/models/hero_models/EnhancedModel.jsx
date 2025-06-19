/*
Safe Enhanced Room Model 
Model only - EffectComposer is now correctly placed in EnhancedModelWithEffects.
*/

import React, { useRef, forwardRef, useEffect, useState } from 'react'; // Added useEffect and useState imports
import { useGLTF } from '@react-three/drei';
import { EffectComposer, SelectiveBloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from 'three';

// EnhancedModel is the core component that loads and renders the GLB model.
// It uses forwardRef to allow parent components to pass refs to specific mesh objects.
export const EnhancedModel = forwardRef((props, refs) => {
  // Load the GLB model. Ensure the path is correct: /public/models/low_poly_isometric_room.glb
  const { nodes, materials } = useGLTF('/models/low_poly_isometric_room.glb');
  
  // Destructure refs from parent component (EnhancedModelWithEffects)
  const { screenRef, lampRef, lightRef } = refs || {};
  
  // Define enhanced materials for specific parts of the model to achieve bloom effect
  const enhancedScreenMaterial = new THREE.MeshStandardMaterial({
    color: materials.screen?.color || 0x00ff88,
    emissive: new THREE.Color(0x00ff88),
    emissiveIntensity: 0.5,
  });
  
  const enhancedLightMaterial = new THREE.MeshStandardMaterial({
    color: materials.light?.color || 0xffffff,
    emissive: new THREE.Color(0xffffff),
    emissiveIntensity: 0.8,
  });
  
  const enhancedLampMaterial = new THREE.MeshStandardMaterial({
    color: materials.lamapra?.color || 0xfff4e6,
    emissive: new THREE.Color(0xfff4e6),
    emissiveIntensity: 0.3,
  });

  // --- DEBUGGING REFS: UNCOMMENT THIS BLOCK TO SEE REF VALUES IN CONSOLE ---
  // This useEffect will log the current value of the refs to the console,
  // helping to verify if they are successfully attached to the mesh objects.
  /*
  useEffect(() => {
    console.log("EnhancedModel mounted. Checking refs...");
    if (screenRef && screenRef.current) {
      console.log("screenRef current:", screenRef.current.name, screenRef.current);
    } else {
      console.log("screenRef is null or undefined.");
    }
    if (lampRef && lampRef.current) {
      console.log("lampRef current:", lampRef.current.name, lampRef.current);
    } else {
      console.log("lampRef is null or undefined.");
    }
    if (lightRef && lightRef.current) {
      console.log("lightRef current:", lightRef.current.name, lightRef.current);
    } else {
      console.log("lightRef is null or undefined.");
    }
  }, [screenRef, lampRef, lightRef]); // Dependency array to re-run when refs change
  */
  // --- END DEBUGGING REFS ---

  return (
   <group {...props} dispose={null} rotation={[0, Math.PI, 0]} scale={[0.5, 0.5, 0.5]}>
      {/* Main room structure - using materials provided by the GLB */}
      <group position={[0.095, -0.373, 0.14]} scale={4.819}>
        {/* Each mesh below corresponds to a part of the 3D model */}
        {/* It's crucial that 'nodes.Object_X.geometry' and 'materials.NAME' exist in your GLB */}
        {nodes.Object_4 && <mesh geometry={nodes.Object_4.geometry} material={materials.pared} />}
        {nodes.Object_5 && <mesh geometry={nodes.Object_5.geometry} material={materials.suelo} />}
        {nodes.Object_6 && <mesh geometry={nodes.Object_6.geometry} material={materials.afuera} />}
        {nodes.Object_7 && <mesh geometry={nodes.Object_7.geometry} material={materials.puerta} />}
        {nodes.Object_8 && <mesh geometry={nodes.Object_8.geometry} material={materials.negro} />}
      </group>

      {/* Bed components */}
      <group position={[-1.049, -0.692, 1.149]} scale={1.419}>
        {nodes.Object_16 && <mesh geometry={nodes.Object_16.geometry} material={materials.base_cama} />}
        {nodes.Object_17 && <mesh geometry={nodes.Object_17.geometry} material={materials.colchon} />}
      </group>

      {/* Small objects */}
      <group position={[-3.882, 1.509, -2.596]} scale={0.12}>
        {nodes.Object_25 && <mesh geometry={nodes.Object_25.geometry} material={materials['Material.001']} />}
        {nodes.Object_26 && <mesh geometry={nodes.Object_26.geometry} material={materials['Material.002']} />}
      </group>

      {/* PC components */}
      <group position={[-3.958, 1.431, -3.489]} scale={0.077}>
        {nodes.Object_30 && <mesh geometry={nodes.Object_30.geometry} material={materials.negro} />}
        {nodes.Object_31 && <mesh geometry={nodes.Object_31.geometry} material={materials.pcinsidenormal} />}
      </group>

      {/* Monitor with bloom effect - Check if node exists before using ref */}
      <group position={[-3.781, 2.47, -1.132]} scale={1.456}>
        {nodes.Object_33 && <mesh geometry={nodes.Object_33.geometry} material={materials.negro} />}
        {/*
          IMPORTANT: Replace 'Object_34' with the EXACT name of your screen's mesh node
          found in the GLB viewer (e.g., 'ScreenDisplay', 'MonitorSurface', etc.)
        */}
        {nodes.Object_34 && ( // If node exists, assign ref
          <mesh 
            ref={screenRef} // Assign ref for SelectiveBloom targeting
            geometry={nodes.Object_34.geometry} 
            material={enhancedScreenMaterial} 
          />
        )}
      </group>

      {/* Light with bloom effect - Check if node exists before using ref */}
      <group position={[-2.793, 1.422, -2.237]} scale={[0.137, 0.04, 0.083]}>
        {nodes.Object_36 && <mesh geometry={nodes.Object_36.geometry} material={materials.negro} />}
        {/*
          IMPORTANT: Replace 'Object_37' with the EXACT name of your light's mesh node
          found in the GLB viewer (e.g., 'StripLight', 'CeilingLight', etc.)
        */}
        {nodes.Object_37 && ( // If node exists, assign ref
          <mesh 
            ref={lightRef} // Assign ref for SelectiveBloom targeting
            geometry={nodes.Object_37.geometry} 
            material={enhancedLightMaterial} 
          />
        )}
      </group>

      {/* Keyboard components */}
      <group position={[-2.859, 1.4, -1.158]} scale={[0.266, 0.019, 0.797]}>
        {nodes.Object_41 && <mesh geometry={nodes.Object_41.geometry} material={materials.negro} />}
        {nodes.Object_42 && <mesh geometry={nodes.Object_42.geometry} material={materials.material} />}
      </group>

      {/* Shelf components */}
      <group position={[0.261, 0.659, -2.511]} rotation={[-Math.PI, 0, 0]} scale={[-0.296, 0.034, 0.034]}>
        {nodes.Object_46 && <mesh geometry={nodes.Object_46.geometry} material={materials.base_cama} />}
        {nodes.Object_47 && <mesh geometry={nodes.Object_47.geometry} material={materials.gris} />}
      </group>

      {/* Lamp with bloom effect - Check if node exists before using ref */}
      <group position={[0.245, 1.026, -3.312]} scale={[0.316, 0.045, 0.316]}>
        {/*
          IMPORTANT: Replace 'Object_49' with the EXACT name of your lamp's mesh node
          found in the GLB viewer (e.g., 'TableLampBulb', 'LightFixture', etc.)
        */}
        {nodes.Object_49 && ( // If node exists, assign ref
          <mesh 
            ref={lampRef} // Assign ref for SelectiveBloom targeting
            geometry={nodes.Object_49.geometry} 
            material={enhancedLampMaterial} 
          />
        )}
        {nodes.Object_50 && <mesh geometry={nodes.Object_50.geometry} material={materials.negro} />}
      </group>

      {/* Book components */}
      <group position={[-2.771, 4.559, -3.744]} rotation={[Math.PI, 0, 2.849]} scale={[0.085, 0.433, 0.303]}>
        {nodes.Object_54 && <mesh geometry={nodes.Object_54.geometry} material={materials.pages} />}
        {nodes.Object_55 && <mesh geometry={nodes.Object_55.geometry} material={materials.libro} />}
      </group>

      {/* Individual objects - added checks for node existence */}
      {nodes.Object_10 && <mesh geometry={nodes.Object_10.geometry} material={materials.material_0} position={[-3.66, 0.011, 1.339]} scale={0.577} />}
      {nodes.Object_12 && <mesh geometry={nodes.Object_12.geometry} material={materials.material_0} position={[-3.492, 0.078, 1.435]} rotation={[0, 0, -0.878]} scale={0.577} />}
      {nodes.Object_14 && <mesh geometry={nodes.Object_14.geometry} material={materials.negro} position={[-3.58, 0.515, 1.407]} scale={0.394} />}
      {nodes.Object_19 && <mesh geometry={nodes.Object_19.geometry} material={materials.sabanas} position={[3.11, 0.988, -3.333]} rotation={[0.604, 0, 0]} scale={[1.205, 1.596, 1.205]} />}
      {nodes.Object_21 && <mesh geometry={nodes.Object_21.geometry} material={materials.sabanas} position={[3.211, 1.29, -0.072]} scale={[2.502, 1.205, 3.534]} />}
      {nodes.Object_23 && <mesh geometry={nodes.Object_23.geometry} material={materials.negro} position={[-2.845, 1.371, -1.386]} scale={1.205} />}
      {nodes.Object_28 && <mesh geometry={nodes.Object_28.geometry} material={materials.base_cama} position={[-2.943, 1.349, -2.506]} scale={[1.205, 0.12, 1.205]} />}
      {nodes.Object_39 && <mesh geometry={nodes.Object_39.geometry} material={materials.silla2} position={[-2.496, -0.292, -0.907]} rotation={[-0.498, -1.215, 1.1]} scale={0.083} />}
      {nodes.Object_44 && <mesh geometry={nodes.Object_44.geometry} material={materials.gris} position={[-4.157, 2.42, 4.442]} rotation={[0, 0, -Math.PI / 2]} scale={0.111} />}
      {nodes.Object_52 && <mesh geometry={nodes.Object_52.geometry} material={materials.base_cama} position={[-2.92, 4.041, -3.764]} scale={[1.205, 0.086, 0.455]} />}
    </group>
  );
});

// EnhancedModelWithEffects is a wrapper component that adds the EffectComposer.
// This separation ensures the model itself is clean and effects are applied externally.
export function EnhancedModelWithEffects(props) {
  const screenRef = useRef();
  const lampRef = useRef();
  const lightRef = useRef();

  // State to hold the actual mesh objects for SelectiveBloom
  const [bloomSelection, setBloomSelection] = useState([]);

  // Use useEffect to update the bloomSelection state only when refs are populated
  useEffect(() => {
    const selectedObjects = [];
    if (screenRef.current) {
      selectedObjects.push(screenRef.current);
    }
    if (lampRef.current) {
      selectedObjects.push(lampRef.current);
    }
    if (lightRef.current) {
      selectedObjects.push(lightRef.current);
    }
    // Only update state if the selection array has changed to prevent unnecessary re-renders
    if (JSON.stringify(selectedObjects.map(obj => obj.uuid)) !== JSON.stringify(bloomSelection.map(obj => obj.uuid))) {
      setBloomSelection(selectedObjects);
    }
  }, [screenRef, lampRef, lightRef, bloomSelection]); // Depend on refs and current bloomSelection for comparison

  return (
    <>
      {/* Render the core model, passing the refs down */}
      <EnhancedModel 
        {...props} 
        refs={{ screenRef, lampRef, lightRef }} 
      />
      {/* EffectComposer placed here to apply post-processing effects */}
      <EffectComposer>
        {/* SelectiveBloom targets specific meshes (via refs) for a glowing effect */}
        {/* Only apply SelectiveBloom if there are objects in bloomSelection */}
        {bloomSelection.length > 0 && (
          <SelectiveBloom
            selection={bloomSelection} // Pass the state variable as selection
            intensity={2.0} // Strength of the bloom effect
            luminanceThreshold={0.1} // Minimum brightness for bloom to apply
            luminanceSmoothing={0.9} // Smoothness of the transition for bloom
            blendFunction={BlendFunction.ADD} // How the bloom effect is blended with the scene
          />
        )}
      </EffectComposer>
    </>
  );
}

// Preload the model to improve loading performance
useGLTF.preload('/models/low_poly_isometric_room.glb');
