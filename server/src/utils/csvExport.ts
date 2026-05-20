import { ILead } from '../types';

export const leadsToCSV = (leads: ILead[]): string => {
  const header = ['Name', 'Email', 'Status', 'Source', 'CreatedAt'];
  
  const rows = leads.map((lead) => {
    return [
      lead.name,
      lead.email,
      lead.status,
      lead.source,
      new Date(lead.createdAt).toISOString()
    ].map(field => `"${String(field).replace(/"/g, '""')}"`);
  });

  return [header.join(','), ...rows.map(row => row.join(','))].join('\n');
};