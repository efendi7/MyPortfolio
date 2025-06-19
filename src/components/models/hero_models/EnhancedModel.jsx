/*
Enhanced Room Model - Responsive PC & Mobile Versions
Automatically detects device capability and loads appropriate version
*/

import React, { useRef, forwardRef, useEffect, useState, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { EffectComposer, SelectiveBloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from 'three';

// Device detection utility
const useDeviceDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
      return mobileRegex.test(userAgent.toLowerCase());
    };

    // Check device performance indicators
    const checkPerformance = () => {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (!gl) return true; // No WebGL support, assume low performance
      
      const renderer = gl.getParameter(gl.RENDERER);
      const vendor = gl.getParameter(gl.VENDOR);
      
      // Check for low-end GPU indicators
      const lowEndIndicators = [
        'adreno 3', 'adreno 4', 'adreno 5',
        'mali-4', 'mali-t7', 'mali-t8',
        'powervr sgx', 'intel hd 3000',
        'intel hd 4000'
      ];
      
      const isLowEnd = lowEndIndicators.some(indicator => 
        renderer.toLowerCase().includes(indicator)
      );
      
      // Check memory (if available)
      const memory = navigator.deviceMemory;
      const lowMemory = memory && memory < 4;
      
      // Check CPU cores
      const cores = navigator.hardwareConcurrency;
      const lowCores = cores && cores < 4;
      
      return isLowEnd || lowMemory || lowCores;
    };

    setIsMobile(checkMobile());
    setIsLowPerformance(checkPerformance());
  }, []);

  return { isMobile, isLowPerformance };
};

// Base Model Component (shared between PC and mobile)
const BaseModel = forwardRef(({ enableEffects = true, simplifiedMaterials = false, ...props }, refs) => {
  const { nodes, materials } = useGLTF('/models/low_poly_isometric_room.glb');
  const { screenRef, lampRef, lightRef } = refs || {};

  // Material creation with performance optimization
  const enhancedMaterials = useMemo(() => {
    if (simplifiedMaterials) {
      // Simplified materials for mobile
      return {
        screen: new THREE.MeshBasicMaterial({
          color: materials.screen?.color || 0x00ff88,
        }),
        light: new THREE.MeshBasicMaterial({
          color: materials.light?.color || 0xffffff,
        }),
        lamp: new THREE.MeshBasicMaterial({
          color: materials.lamapra?.color || 0xfff4e6,
        })
      };
    } else {
      // Enhanced materials for PC
      return {
        screen: new THREE.MeshStandardMaterial({
          color: materials.screen?.color || 0x00ff88,
          emissive: new THREE.Color(0x00ff88),
          emissiveIntensity: 0.5,
        }),
        light: new THREE.MeshStandardMaterial({
          color: materials.light?.color || 0xffffff,
          emissive: new THREE.Color(0xffffff),
          emissiveIntensity: 0.8,
        }),
        lamp: new THREE.MeshStandardMaterial({
          color: materials.lamapra?.color || 0xfff4e6,
          emissive: new THREE.Color(0xfff4e6),
          emissiveIntensity: 0.3,
        })
      };
    }
  }, [materials, simplifiedMaterials]);

  return (
    <group {...props} dispose={null} rotation={[0, Math.PI, 0]} scale={[0.5, 0.5, 0.5]}>
      {/* Main room structure */}
      <group position={[0.095, -0.373, 0.14]} scale={4.819}>
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

      {/* Monitor with conditional bloom effect */}
      <group position={[-3.781, 2.47, -1.132]} scale={1.456}>
        {nodes.Object_33 && <mesh geometry={nodes.Object_33.geometry} material={materials.negro} />}
        {nodes.Object_34 && (
          <mesh 
            ref={enableEffects ? screenRef : null}
            geometry={nodes.Object_34.geometry} 
            material={enhancedMaterials.screen} 
          />
        )}
      </group>

      {/* Light with conditional bloom effect */}
      <group position={[-2.793, 1.422, -2.237]} scale={[0.137, 0.04, 0.083]}>
        {nodes.Object_36 && <mesh geometry={nodes.Object_36.geometry} material={materials.negro} />}
        {nodes.Object_37 && (
          <mesh 
            ref={enableEffects ? lightRef : null}
            geometry={nodes.Object_37.geometry} 
            material={enhancedMaterials.light} 
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

      {/* Lamp with conditional bloom effect */}
      <group position={[0.245, 1.026, -3.312]} scale={[0.316, 0.045, 0.316]}>
        {nodes.Object_49 && (
          <mesh 
            ref={enableEffects ? lampRef : null}
            geometry={nodes.Object_49.geometry} 
            material={enhancedMaterials.lamp} 
          />
        )}
        {nodes.Object_50 && <mesh geometry={nodes.Object_50.geometry} material={materials.negro} />}
      </group>

      {/* Book components */}
      <group position={[-2.771, 4.559, -3.744]} rotation={[Math.PI, 0, 2.849]} scale={[0.085, 0.433, 0.303]}>
        {nodes.Object_54 && <mesh geometry={nodes.Object_54.geometry} material={materials.pages} />}
        {nodes.Object_55 && <mesh geometry={nodes.Object_55.geometry} material={materials.libro} />}
      </group>

      {/* Individual objects */}
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

// PC Version - Full effects and enhanced materials
export const EnhancedModelPC = forwardRef((props, refs) => {
  return (
    <BaseModel 
      {...props} 
      refs={refs}
      enableEffects={true}
      simplifiedMaterials={false}
    />
  );
});

// Mobile Version - Simplified materials and no effects
export const EnhancedModelMobile = forwardRef((props, refs) => {
  return (
    <BaseModel 
      {...props} 
      refs={refs}
      enableEffects={false}
      simplifiedMaterials={true}
    />
  );
});

// PC Version with Effects
export function EnhancedModelPCWithEffects(props) {
  const screenRef = useRef();
  const lampRef = useRef();
  const lightRef = useRef();
  const [bloomSelection, setBloomSelection] = useState([]);

  useEffect(() => {
    const selectedObjects = [];
    if (screenRef.current) selectedObjects.push(screenRef.current);
    if (lampRef.current) selectedObjects.push(lampRef.current);
    if (lightRef.current) selectedObjects.push(lightRef.current);
    
    if (JSON.stringify(selectedObjects.map(obj => obj.uuid)) !== JSON.stringify(bloomSelection.map(obj => obj.uuid))) {
      setBloomSelection(selectedObjects);
    }
  }, [screenRef, lampRef, lightRef, bloomSelection]);

  return (
    <>
      <EnhancedModelPC 
        {...props} 
        refs={{ screenRef, lampRef, lightRef }} 
      />
      <EffectComposer>
        {bloomSelection.length > 0 && (
          <SelectiveBloom
            selection={bloomSelection}
            intensity={2.0}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            blendFunction={BlendFunction.ADD}
          />
        )}
      </EffectComposer>
    </>
  );
}

// Mobile Version without Effects
export function EnhancedModelMobileWithEffects(props) {
  return <EnhancedModelMobile {...props} />;
}

// Responsive Wrapper - Automatically selects appropriate version
export function ResponsiveEnhancedModel(props) {
  const { isMobile, isLowPerformance } = useDeviceDetection();
  const [modelVersion, setModelVersion] = useState('loading');

  useEffect(() => {
    // Determine which version to use based on device capabilities
    if (isMobile || isLowPerformance) {
      setModelVersion('mobile');
    } else {
      setModelVersion('pc');
    }
  }, [isMobile, isLowPerformance]);

  // Optional: Add performance monitoring
  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'measure' && entry.duration > 16.67) {
            // If frame time > 16.67ms (60fps), consider switching to mobile version
            console.warn('Performance warning: Frame time exceeded 16.67ms');
          }
        }
      });
      observer.observe({ entryTypes: ['measure'] });
      return () => observer.disconnect();
    }
  }, []);

  if (modelVersion === 'loading') {
    return null; // or a loading spinner
  }

  return modelVersion === 'mobile' ? 
    <EnhancedModelMobileWithEffects {...props} /> : 
    <EnhancedModelPCWithEffects {...props} />;
}

// Export the original components for backward compatibility
export const EnhancedModel = EnhancedModelPC;
export const EnhancedModelWithEffects = EnhancedModelPCWithEffects;

// Preload the model
useGLTF.preload('/models/low_poly_isometric_room.glb');

// Performance monitoring utility (optional)
export const usePerformanceMonitor = () => {
  const [fps, setFps] = useState(60);
  const [frameTime, setFrameTime] = useState(0);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId;

    const measurePerformance = (currentTime) => {
      frameCount++;
      const deltaTime = currentTime - lastTime;
      
      if (deltaTime >= 1000) { // Update every second
        const currentFps = Math.round((frameCount * 1000) / deltaTime);
        const avgFrameTime = deltaTime / frameCount;
        
        setFps(currentFps);
        setFrameTime(avgFrameTime);
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      animationId = requestAnimationFrame(measurePerformance);
    };

    animationId = requestAnimationFrame(measurePerformance);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return { fps, frameTime };
};