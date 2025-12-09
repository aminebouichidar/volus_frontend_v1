"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function DataWave() {
  const ref = useRef<THREE.Points>(null);
  const count = 3000;
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 12;
      const y = 0;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime;
    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      const x = positions[i * 3];
      const z = positions[i * 3 + 2];
      
      // Complex wave interference pattern to simulate "data flux"
      const y = Math.sin(x * 0.5 + time * 0.5) * Math.cos(z * 0.3 + time * 0.3) * 1.5 +
                Math.sin(x * 1.2 + time) * 0.2;
                
      positions[i * 3 + 1] = y;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    
    // Slowly rotate the whole system
    ref.current.rotation.y = time * 0.05;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#818cf8"
        size={0.04}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function PredictionLoader() {
  return (
    <div className="w-full h-[400px] md:h-[600px] relative flex items-center justify-center overflow-visible">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent rounded-full blur-3xl opacity-20 pointer-events-none" />
      
      <Canvas camera={{ position: [0, 4, 8], fov: 45 }} className="w-full h-full">
        <ambientLight intensity={0.5} />
        <DataWave />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} maxPolarAngle={Math.PI / 2} minPolarAngle={0} />
      </Canvas>
    </div>
  );
}
