import React from 'react';
import { motion } from 'framer-motion';
import { Lead, UserRole } from '../../types';
import Badge from '../ui/Badge';
import { useAuthStore } from '../../store/authStore';

interface LeadRowProps {
  lead: Lead;
  delay: number;
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
  onView: (lead: Lead) => void;
}

const LeadRow: React.FC<LeadRowProps> = ({ lead, delay, onEdit, onDelete, onView }) => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === UserRole.Admin;

  return (
    <motion.tr
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay, duration: 0.2 }}
      className="group hover:bg-zinc-50 transition-colors border-b border-zinc-100 last:border-0"
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-zinc-100 text-black flex items-center justify-center font-sora font-bold text-xs border border-zinc-200">
            {lead.name.charAt(0).toUpperCase()}
          </div>
          <div className="font-dm text-sm font-semibold text-black">{lead.name}</div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap font-dm text-xs text-zinc-500">
        {lead.email}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Badge status={lead.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap font-dm text-xs text-zinc-600 font-medium">
        {lead.source}
      </td>
      <td className="px-6 py-4 whitespace-nowrap font-dm text-[11px] text-zinc-400">
        {new Date(lead.createdAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => onView(lead)}
            className="p-1.5 text-zinc-400 hover:text-black transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          
          <button
            onClick={() => onEdit(lead)}
            className="p-1.5 text-zinc-400 hover:text-black transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>

          {isAdmin && (
            <button
              onClick={() => onDelete(lead._id)}
              className="p-1.5 text-zinc-400 hover:text-red-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </td>
    </motion.tr>
  );
};

export default LeadRow;