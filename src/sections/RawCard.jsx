/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { Band } from './Band'; // Asumsi komponen Band dipisah ke file sendiri


export default function RawCard() {
  return (
    // PERBAIKAN 1: Menambahkan `gl={{ alpha: true }}` untuk mengaktifkan transparansi.
    <Canvas gl={{ alpha: true }} camera={{ position: [0, 0, 13], fov: 25 }} style={{ background: 'transparent' }}>
      <ambientLight intensity={Math.PI} />
      <Suspense fallback={null}>
        <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
          <Band />
        </Physics>
        {/* PERBAIKAN 2: Menghapus prop `background` dan elemen `<color />` dari Environment. */}
        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Suspense>
    </Canvas>
  );
}
