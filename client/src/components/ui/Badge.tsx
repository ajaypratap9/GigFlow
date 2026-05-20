import React from 'react';
import { motion } from 'framer-motion';
import { LeadStatus } from '../../types';

interface BadgeProps {
  status: LeadStatus | string;
}

const Badge: React.FC<BadgeProps> = ({ status }) => {
  const getStyles = () => {
    switch (status) {
      case LeadStatus.New:
        return 'bg-zinc-100 text-zinc-900 border-zinc-200';
      case LeadStatus.Contacted:
        return 'bg-zinc-100 text-zinc-700 border-zinc-200';
      case LeadStatus.Qualified:
        return 'bg-black text-white border-black';
      case LeadStatus.Lost:
        return 'bg-zinc-50 text-zinc-400 border-zinc-100';
      default:
        return 'bg-zinc-100 text-zinc-700 border-zinc-200';
    }
  };

  return (
    <motion.span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter border ${getStyles()}`}
    >
      {status}
    </motion.span>
  );
};

export default Badge;