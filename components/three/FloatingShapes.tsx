"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function Shape({
  geometry,
  color,
  position,
  speed,
}: {
  geometry: "torus" | "icosahedron" | "octahedron";
  color: string;
  position: [number, number, number];
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * speed * 0.3;
      meshRef.current.rotation.y = clock.getElapsedTime() * speed * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        {geometry === "torus" && <torusGeometry args={[0.5, 0.15, 12, 24]} />}
        {geometry === "icosahedron" && <icosahedronGeometry args={[0.5, 0]} />}
        {geometry === "octahedron" && <octahedronGeometry args={[0.5, 0]} />}
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>
    </Float>
  );
}

export default function FloatingShapes() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <Shape geometry="torus" color="#00f5ff" position={[-3, 1, -2]} speed={1} />
        <Shape geometry="icosahedron" color="#bf00ff" position={[3, -1, -1]} speed={0.7} />
        <Shape geometry="octahedron" color="#ffd700" position={[0, 2, -3]} speed={1.2} />
        <Shape geometry="torus" color="#bf00ff" position={[-2, -2, -2]} speed={0.5} />
        <Shape geometry="icosahedron" color="#00f5ff" position={[2, 2, -4]} speed={0.8} />
      </Canvas>
    </div>
  );
}
