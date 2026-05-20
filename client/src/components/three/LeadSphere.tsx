import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const MainSphere = () => {
  const groupRef = useRef<THREE.Group>(null);
  const orb1Ref = useRef<THREE.Mesh>(null);
  const orb2Ref = useRef<THREE.Mesh>(null);
  const orb3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.rotation.x += 0.001;
    }

    if (orb1Ref.current) {
      orb1Ref.current.position.x = Math.cos(t * 0.5) * 2.2;
      orb1Ref.current.position.z = Math.sin(t * 0.5) * 2.2;
      orb1Ref.current.position.y = Math.sin(t * 0.8) * 0.5;
    }
    
    if (orb2Ref.current) {
      orb2Ref.current.position.x = Math.cos(t * 0.7 + Math.PI) * 1.8;
      orb2Ref.current.position.z = Math.sin(t * 0.7 + Math.PI) * 1.8;
      orb2Ref.current.position.y = Math.sin(t * 1.2) * 1.2;
    }

    if (orb3Ref.current) {
      orb3Ref.current.position.x = Math.cos(t * 0.3 + Math.PI/2) * 2.5;
      orb3Ref.current.position.z = Math.sin(t * 0.3 + Math.PI/2) * 2.5;
      orb3Ref.current.position.y = Math.cos(t * 0.5) * 1.5;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[1.6, 4]} />
        <meshStandardMaterial color="#818CF8" wireframe transparent opacity={0.5} />
      </mesh>
      
      <mesh ref={orb1Ref}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#F43F5E" emissive="#F43F5E" emissiveIntensity={0.5} />
      </mesh>
      
      <mesh ref={orb2Ref}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={0.5} />
      </mesh>

      <mesh ref={orb3Ref}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

const ParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const temp = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 2.5 + Math.random() * 2;
      
      temp[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      temp[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      temp[i * 3 + 2] = r * Math.cos(phi);
    }
    return temp;
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= 0.0005;
      pointsRef.current.rotation.x -= 0.0002;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#ffffff" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

const LeadSphere: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }} style={{ width: '100%', height: '100%' }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#818CF8" />
      <pointLight position={[-10, -10, -10]} intensity={0.6} color="#F43F5E" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      <MainSphere />
      <ParticleField />
    </Canvas>
  );
};

export default LeadSphere;