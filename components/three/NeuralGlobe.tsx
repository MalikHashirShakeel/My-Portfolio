"use client";
import { useRef, useMemo, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const [{ nodes, edges, sizes }] = useState(() => {
    const nodeCount = 80;
    const nodePositions: THREE.Vector3[] = [];
    const nodeSizes: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodePositions.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 4
        )
      );
      nodeSizes.push(0.03 + Math.random() * 0.02);
    }

    const edgeList: [number, number][] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 1.2) {
          edgeList.push([i, j]);
        }
      }
    }

    return { nodes: nodePositions, edges: edgeList, sizes: nodeSizes };
  });

  const linePositions = useMemo(() => {
    const positions: number[] = [];
    edges.forEach(([a, b]) => {
      positions.push(nodes[a].x, nodes[a].y, nodes[a].z);
      positions.push(nodes[b].x, nodes[b].y, nodes[b].z);
    });
    return new Float32Array(positions);
  }, [nodes, edges]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
      groupRef.current.rotation.x =
        Math.sin(clock.getElapsedTime() * 0.05) * 0.1 + mouseRef.current.y * 0.3;
      groupRef.current.rotation.z = mouseRef.current.x * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[sizes[i], 16, 16]} />
          <meshPhysicalMaterial
            color={i % 3 === 0 ? "#00f5ff" : i % 3 === 1 ? "#bf00ff" : "#ffd700"}
            emissive={i % 3 === 0 ? "#00f5ff" : i % 3 === 1 ? "#bf00ff" : "#ffd700"}
            emissiveIntensity={1.2}
            transparent
            opacity={0.9}
            roughness={0.2}
            metalness={0.8}
            clearcoat={1}
            clearcoatRoughness={0.2}
          />
        </mesh>
      ))}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#00f5ff" transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
}

export default function NeuralGlobe() {
  return (
    <div style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
        <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: "transparent", pointerEvents: "none" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <NeuralNetwork />
        </Suspense>
      </Canvas>
    </div>
  );
}
