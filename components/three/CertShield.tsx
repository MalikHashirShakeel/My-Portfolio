"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Shield() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.4;
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer ring */}
      <mesh>
        <torusGeometry args={[1.2, 0.06, 8, 32]} />
        <meshBasicMaterial color="#ffd700" transparent opacity={0.5} />
      </mesh>
      {/* Inner ring */}
      <mesh>
        <torusGeometry args={[0.9, 0.04, 8, 32]} />
        <meshBasicMaterial color="#00f5ff" transparent opacity={0.4} />
      </mesh>
      {/* Shield face */}
      <mesh>
        <circleGeometry args={[0.85, 6]} />
        <meshBasicMaterial
          color="#bf00ff"
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Star */}
      <mesh rotation={[0, 0, Math.PI / 6]}>
        <circleGeometry args={[0.4, 6]} />
        <meshBasicMaterial
          color="#ffd700"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Cross bars */}
      <mesh>
        <boxGeometry args={[0.04, 1.6, 0.04]} />
        <meshBasicMaterial color="#00f5ff" transparent opacity={0.3} />
      </mesh>
      <mesh>
        <boxGeometry args={[1.6, 0.04, 0.04]} />
        <meshBasicMaterial color="#00f5ff" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

export default function CertShield() {
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
        camera={{ position: [0, 0, 4], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <Shield />
      </Canvas>
    </div>
  );
}
