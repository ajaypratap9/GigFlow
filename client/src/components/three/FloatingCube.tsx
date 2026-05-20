import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const FloatingMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <boxGeometry args={[1, 1, 1, 4, 4, 4]} />
        <meshStandardMaterial color="#4F46E5" metalness={0.3} roughness={0.2} />
      </mesh>
    </Float>
  );
};

const FloatingCube: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[2, 2, 2]} color="#4F46E5" intensity={1.5} />
        <FloatingMesh />
      </Canvas>
    </div>
  );
};

export default FloatingCube;