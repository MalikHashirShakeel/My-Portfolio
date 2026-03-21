"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Helix() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  const helixPoints: { pos: [number, number, number]; color: string }[] = [];
  const rungs: { a: [number, number, number]; b: [number, number, number] }[] = [];
  const turns = 4;
  const pointsPerTurn = 20;
  const total = turns * pointsPerTurn;
  const height = 5;
  const radius = 0.6;

  for (let i = 0; i < total; i++) {
    const t = i / total;
    const angle = t * Math.PI * 2 * turns;
    const y = (t - 0.5) * height;

    const x1 = Math.cos(angle) * radius;
    const z1 = Math.sin(angle) * radius;
    const x2 = Math.cos(angle + Math.PI) * radius;
    const z2 = Math.sin(angle + Math.PI) * radius;

    helixPoints.push({ pos: [x1, y, z1], color: "#00f5ff" });
    helixPoints.push({ pos: [x2, y, z2], color: "#bf00ff" });

    if (i % 4 === 0) {
      rungs.push({ a: [x1, y, z1], b: [x2, y, z2] });
    }
  }

  return (
    <group ref={groupRef}>
      {helixPoints.map((p, i) => (
        <mesh key={i} position={p.pos}>
          <sphereGeometry args={[0.04, 6, 6]} />
          <meshBasicMaterial color={p.color} transparent opacity={0.7} />
        </mesh>
      ))}
      {rungs.map((r, i) => {
        const start = new THREE.Vector3(...r.a);
        const end = new THREE.Vector3(...r.b);
        const mid = start.clone().lerp(end, 0.5);
        const len = start.distanceTo(end);
        const dir = end.clone().sub(start).normalize();
        const quaternion = new THREE.Quaternion();
        quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);

        return (
          <mesh key={`rung-${i}`} position={mid} quaternion={quaternion}>
            <cylinderGeometry args={[0.01, 0.01, len, 4]} />
            <meshBasicMaterial color="#ffd700" transparent opacity={0.3} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function DNAHelix() {
  return (
    <div style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <Helix />
      </Canvas>
    </div>
  );
}
