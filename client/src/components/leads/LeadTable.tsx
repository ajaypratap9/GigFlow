import React from 'react';
import { motion } from 'framer-motion';
import { Lead } from '../../types';
import LeadRow from './LeadRow';
import GlassCard from '../ui/GlassCard';

interface LeadTableProps {
  leads: Lead[];
  isLoading: boolean;
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
  onView: (lead: Lead) => void;
}

const LeadRowSkeleton = () => (
  <tr className="border-b border-zinc-50">
    {Array.from({ length: 6 }).map((_, i) => (
      <td key={i} className="px-6 py-4">
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="h-3 bg-zinc-100 rounded w-full"
        />
      </td>
    ))}
  </tr>
);

const LeadTable: React.FC<LeadTableProps> = ({ leads, isLoading, onEdit, onDelete, onView }) => {
  return (
    <GlassCard className="p-0 border border-zinc-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50/50 border-b border-zinc-200">
              <th className="px-6 py-4 font-dm text-[10px] font-bold uppercase tracking-widest text-zinc-400">Name</th>
              <th className="px-6 py-4 font-dm text-[10px] font-bold uppercase tracking-widest text-zinc-400">Email</th>
              <th className="px-6 py-4 font-dm text-[10px] font-bold uppercase tracking-widest text-zinc-400">Status</th>
              <th className="px-6 py-4 font-dm text-[10px] font-bold uppercase tracking-widest text-zinc-400">Source</th>
              <th className="px-6 py-4 font-dm text-[10px] font-bold uppercase tracking-widest text-zinc-400">Created</th>
              <th className="px-6 py-4 font-dm text-[10px] font-bold uppercase tracking-widest text-zinc-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => <LeadRowSkeleton key={i} />)
            ) : leads.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-20">
                  <div className="flex flex-col items-center justify-center text-center">
                    <p className="font-dm text-sm text-zinc-400">No leads found.</p>
                  </div>
                </td>
              </tr>
            ) : (
              leads.map((lead, index) => (
                <LeadRow
                  key={lead._id}
                  lead={lead}
                  delay={index * 0.03}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onView={onView}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
};

export default LeadTable;