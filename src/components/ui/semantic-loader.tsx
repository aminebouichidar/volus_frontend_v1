"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Sphere, Line, Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Particle({ start, end, speed = 1, offset = 0 }: { start: THREE.Vector3; end: THREE.Vector3; speed?: number; offset?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!ref.current) return;
    const t = (state.clock.elapsedTime * speed + offset) % 1;
    // Lerp between start and end
    ref.current.position.lerpVectors(start, end, t);
    // Fade in/out at ends
    const opacity = Math.sin(t * Math.PI);
    if (ref.current.material instanceof THREE.MeshBasicMaterial) {
      ref.current.material.opacity = opacity;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#818cf8" transparent />
    </mesh>
  );
}

function Node({ position, label, isCenter = false }: { position: [number, number, number]; label?: string; isCenter?: boolean }) {
  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
        <Sphere args={[isCenter ? 0.4 : 0.15, 32, 32]}>
          <meshStandardMaterial 
            color={isCenter ? "#6366f1" : "#38bdf8"} 
            emissive={isCenter ? "#4f46e5" : "#0ea5e9"}
            emissiveIntensity={isCenter ? 3 : 2}
            toneMapped={false}
          />
        </Sphere>
        {isCenter && (
           <pointLight intensity={2} distance={5} color="#818cf8" />
        )}
      </Float>
      
      {label && (
        <Html distanceFactor={10} center className="pointer-events-none select-none">
          <div className="px-2 py-1 bg-zinc-950/80 backdrop-blur-md border border-indigo-500/30 rounded-md shadow-[0_0_15px_rgba(99,102,241,0.3)]">
            <span className="text-[10px] font-semibold text-indigo-100 tracking-wider uppercase whitespace-nowrap">
              {label}
            </span>
          </div>
        </Html>
      )}
    </group>
  );
}

function SemanticGraph() {
  const centerPos = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  
  const nodes = useMemo(() => [
    { pos: new THREE.Vector3(2.5, 0.5, 0), label: "Signals" },
    { pos: new THREE.Vector3(-2, 1.5, 1), label: "Context" },
    { pos: new THREE.Vector3(-1.5, -1.5, 1.5), label: "Sentiment" },
    { pos: new THREE.Vector3(1.5, -1.5, -1.5), label: "Trends" },
    { pos: new THREE.Vector3(0, 2.2, -1.5), label: "Temporal" },
    { pos: new THREE.Vector3(2, -1, 1.5), label: "Velocity" },
  ], []);

  return (
    <group>
      {/* Central Core */}
      <Node position={[0, 0, 0]} isCenter />

      {/* Surrounding Nodes */}
      {nodes.map((node, i) => (
        <React.Fragment key={i}>
          <Node position={[node.pos.x, node.pos.y, node.pos.z]} label={node.label} />
          
          {/* Connection Line */}
          <Line 
            points={[centerPos, node.pos]} 
            color="#6366f1" 
            transparent 
            opacity={0.15} 
            lineWidth={1} 
          />
          
          {/* Data Particles flowing outward */}
          <Particle start={centerPos} end={node.pos} speed={0.5} offset={i * 0.2} />
          {/* Data Particles flowing inward */}
          <Particle start={node.pos} end={centerPos} speed={0.5} offset={i * 0.2 + 0.5} />
        </React.Fragment>
      ))}
    </group>
  );
}

export default function SemanticLoader() {
  return (
    <div className="w-full h-[400px] md:h-[600px] relative flex items-center justify-center overflow-visible">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent rounded-full blur-3xl opacity-20 pointer-events-none" />
      
      <Canvas camera={{ position: [0, 0, 9], fov: 45 }} dpr={[1, 2]} className="w-full h-full">
        <ambientLight intensity={0.5} />
        <SemanticGraph />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  );
}
