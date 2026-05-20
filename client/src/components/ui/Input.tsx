import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="font-dm text-[11px] font-bold uppercase tracking-wider text-zinc-400">{label}</label>}
      <div className="relative flex items-center">
        <input
          ref={ref}
          className={`w-full rounded-lg border bg-zinc-50/50 px-4 py-2.5 font-dm text-sm text-black transition-all duration-200 outline-none
            ${error 
              ? 'border-red-500 focus:ring-1 focus:ring-red-500' 
              : 'border-zinc-200 focus:border-black focus:ring-1 focus:ring-black'}
          `}
          {...props}
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-[10px] text-red-500 font-bold uppercase tracking-tight mt-0.5"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});

Input.displayName = 'Input';
export default Input;