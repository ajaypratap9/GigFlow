import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import Button from './Button';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const EmptyIllustration = () => (
  <Canvas camera={{ position: [0, 0, 4] }}>
    <ambientLight intensity={0.8} />
    <pointLight position={[10, 10, 10]} color="#4F46E5" intensity={1.5} />
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh rotation={[0.5, 0.5, 0]}>
        <torusGeometry args={[1, 0.3, 16, 32]} />
        <meshStandardMaterial color="#818CF8" wireframe opacity={0.3} transparent />
      </mesh>
      <mesh>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#F43F5E" roughness={0.2} metalness={0.8} />
      </mesh>
    </Float>
  </Canvas>
);

const EmptyState: React.FC<EmptyStateProps> = ({ title, description, action }) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex flex-col items-center justify-center py-12 px-4 text-center"
    >
      <div className="w-[200px] h-[180px] mb-6 pointer-events-none opacity-80">
        <Suspense fallback={null}>
          <EmptyIllustration />
        </Suspense>
      </div>
      <h3 className="font-sora text-xl font-semibold text-slate-800 mb-2">{title}</h3>
      <p className="font-dm text-slate-500 max-w-sm mb-6">{description}</p>
      {action && (
        <Button onClick={action.onClick} variant="primary">
          {action.label}
        </Button>
      )}
    </motion.div>
  );
};

export default EmptyState;