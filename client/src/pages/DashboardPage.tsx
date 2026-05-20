import React, { useState } from 'react';

import { Lead, FilterState, LeadStatus, LeadFormData, UserRole } from '../types';
import { useLeadsQuery, useCreateLead, useUpdateLead, useDeleteLead } from '../hooks/useLeads';
import { useCSVExport } from '../hooks/useCSVExport';
import { useAuthStore } from '../store/authStore';

import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import StatCard from '../components/leads/StatCard';
import LeadFilters from '../components/leads/LeadFilters';
import LeadTable from '../components/leads/LeadTable';
import Pagination from '../components/leads/Pagination';
import Modal from '../components/ui/Modal';
import LeadForm from '../components/leads/LeadForm';
import LeadDetailModal from '../components/leads/LeadDetailModal';

const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const [filters, setFilters] = useState<FilterState>({
    status: '',
    source: '',
    search: '',
    sort: 'latest',
    page: 1,
    limit: 10,
  });

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const { data: leadsData, isLoading } = useLeadsQuery(filters);
  const createLeadMutation = useCreateLead();
  const updateLeadMutation = useUpdateLead();
  const deleteLeadMutation = useDeleteLead();
  const { exportCSV, isExporting } = useCSVExport();

  const leads = leadsData?.data ?? [];
  const totalLeads = leadsData?.total ?? 0;
  const totalPages = leadsData?.totalPages ?? 0;

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleCreate = (data: LeadFormData) => {
    createLeadMutation.mutate(data, {
      onSuccess: () => setIsCreateOpen(false),
    });
  };

  const handleUpdate = (data: LeadFormData) => {
    if (selectedLead) {
      updateLeadMutation.mutate(
        { id: selectedLead._id, data },
        { onSuccess: () => setIsEditOpen(false) }
      );
    }
  };

  const handleDelete = (id: string) => {
    if (user?.role === UserRole.Admin) {
      if (window.confirm('Are you sure you want to delete this lead?')) {
        deleteLeadMutation.mutate(id);
      }
    } else {
      alert('Only administrators can delete leads.');
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar title="Dashboard" />
        
        <main className="flex-1 overflow-y-auto px-8 py-10 bg-[#FAFAFA]">
          <div className="max-w-6xl mx-auto space-y-10">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                label="Total"
                value={totalLeads}
                accentColor="#000"
                icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
              />
              <StatCard
                label="New"
                value={leads.filter(l => l.status === LeadStatus.New).length}
                accentColor="#000"
                icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>}
              />
              <StatCard
                label="Qualified"
                value={leads.filter(l => l.status === LeadStatus.Qualified).length}
                accentColor="#000"
                icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
              />
              <StatCard
                label="Lost"
                value={leads.filter(l => l.status === LeadStatus.Lost).length}
                accentColor="#000"
                icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>}
              />
            </div>

            <div className="space-y-6">
              <LeadFilters
                filters={filters}
                onChange={handleFilterChange}
                onExport={() => exportCSV(filters)}
                isExporting={isExporting}
                onAdd={() => setIsCreateOpen(true)}
              />

              <LeadTable
                leads={leads}
                isLoading={isLoading}
                onEdit={(lead) => { setSelectedLead(lead); setIsEditOpen(true); }}
                onDelete={handleDelete}
                onView={(lead) => { setSelectedLead(lead); setIsDetailOpen(true); }}
              />
              
              <Pagination
                page={filters.page || 1}
                totalPages={totalPages}
                onPageChange={(p) => handleFilterChange({ page: p })}
              />
            </div>

          </div>
        </main>
      </div>

      {/* Modals */}
      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="New Lead">
        <LeadForm
          onSubmit={handleCreate}
          isLoading={createLeadMutation.isPending}
        />
      </Modal>

      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Lead">
        <LeadForm
          initialData={selectedLead || undefined}
          onSubmit={handleUpdate}
          isLoading={updateLeadMutation.isPending}
        />
      </Modal>

      <LeadDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        lead={selectedLead}
        onEdit={() => {
          setIsDetailOpen(false);
          setIsEditOpen(true);
        }}
      />
    </div>
  );
};

export default DashboardPage;