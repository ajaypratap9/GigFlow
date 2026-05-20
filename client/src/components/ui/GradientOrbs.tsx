import React from 'react';
import { motion } from 'framer-motion';

const GradientOrbs: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Orb 1: Indigo */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-[500px] h-[500px] bg-indigo-400 rounded-full blur-[80px] opacity-25 -top-[100px] -left-[100px]"
      />
      
      {/* Orb 2: Rose */}
      <motion.div
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 40, -10, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute w-[400px] h-[400px] bg-rose-300 rounded-full blur-[80px] opacity-20 -top-[50px] -right-[50px]"
      />
      
      {/* Orb 3: Amber */}
      <motion.div
        animate={{
          x: [0, 20, -30, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute w-[600px] h-[600px] bg-amber-300 rounded-full blur-[80px] opacity-20 -bottom-[100px] left-[30%]"
      />
    </div>
  );
};

export default GradientOrbs;