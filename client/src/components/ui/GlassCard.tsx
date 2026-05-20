import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'className'> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  noBlur?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', onClick, noBlur = false, ...props }) => {
  const baseStyle = {
    background: '#FFFFFF',
    border: '1px solid #E5E5E5',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
  };

  return (
    <motion.div
      style={baseStyle}
      className={`p-6 ${className} ${onClick ? 'cursor-pointer' : ''}`}
      whileHover={onClick ? { y: -2, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' } : undefined}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;