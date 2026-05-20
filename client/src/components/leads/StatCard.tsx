import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';

interface StatCardProps {
  label: string;
  value: number;
  delta?: string;
  deltaPositive?: boolean;
  accentColor: string; // Keep for color logic if needed, but styling will be mono
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, delta, deltaPositive, icon }) => {
  return (
    <motion.div variants={{ hidden: { y: 10, opacity: 0 }, show: { y: 0, opacity: 1 } }}>
      <GlassCard className="p-5 border border-zinc-200">
        <div className="flex items-start justify-between mb-4">
          <div className="p-2 bg-zinc-50 rounded-lg text-black border border-zinc-100">
            {icon}
          </div>
          {delta && (
            <div className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${deltaPositive ? 'text-green-600' : 'text-red-600'}`}>
              {deltaPositive ? '+' : ''}{delta}
            </div>
          )}
        </div>
        <div>
          <p className="font-dm text-xs text-zinc-500 uppercase tracking-wider mb-1 font-medium">{label}</p>
          <h3 className="font-sora text-2xl font-bold text-black">{value.toLocaleString()}</h3>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default StatCard;