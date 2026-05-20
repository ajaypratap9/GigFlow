import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import Spinner from './Spinner';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'className' | 'children'> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  disabled, 
  icon, 
  className = '', 
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-dm font-medium transition-all focus:outline-none rounded-lg disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden';
  
  const variantClasses = {
    primary: 'bg-black hover:bg-zinc-800 text-white',
    secondary: 'bg-zinc-100 hover:bg-zinc-200 text-black',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    ghost: 'bg-transparent text-zinc-600 hover:bg-zinc-100',
    outline: 'bg-transparent text-black border border-black hover:bg-zinc-50',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.01 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <Spinner size="sm" className="mr-2" color={variant === 'primary' ? 'white' : 'indigo'} />
          <span className="opacity-80">{children}</span>
        </>
      ) : (
        <>
          {icon && <span className="flex-shrink-0">{icon}</span>}
          {children}
        </>
      )}
    </motion.button>
  );
};

export default Button;