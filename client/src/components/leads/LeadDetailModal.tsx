import React from 'react';
import { Lead } from '../../types';
import Modal from '../ui/Modal';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

interface LeadDetailModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
}

const DetailItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="py-4 border-b border-zinc-50 last:border-0">
    <p className="font-dm text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">{label}</p>
    <div className="font-dm text-sm text-black font-medium">{value}</div>
  </div>
);

const LeadDetailModal: React.FC<LeadDetailModalProps> = ({ lead, isOpen, onClose, onEdit }) => {
  if (!lead) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Lead Profile" size="md">
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-sora text-xl font-bold text-black mb-1">{lead.name}</h2>
            <Badge status={lead.status} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
          <DetailItem
            label="Email"
            value={<span className="text-black">{lead.email}</span>}
          />
          <DetailItem
            label="Source"
            value={lead.source}
          />
          <DetailItem
            label="Created"
            value={new Date(lead.createdAt).toLocaleString()}
          />
          <DetailItem
            label="Updated"
            value={new Date(lead.updatedAt).toLocaleString()}
          />
        </div>

        <div className="mt-10 pt-6 flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={onClose}>Close</Button>
          <Button variant="primary" size="sm" onClick={onEdit}>Edit Profile</Button>
        </div>
      </div>
    </Modal>
  );
};

export default LeadDetailModal;