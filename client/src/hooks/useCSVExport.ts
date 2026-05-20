import { useState } from 'react';
import { exportLeads } from '../api/leads.api';
import { FilterState } from '../types';

export const useCSVExport = () => {
  const [isExporting, setIsExporting] = useState(false);

  const exportCSV = async (filters: Partial<FilterState>) => {
    setIsExporting(true);
    try {
      const blob = await exportLeads(filters);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'leads.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to export CSV', error);
    } finally {
      setIsExporting(false);
    }
  };

  return { exportCSV, isExporting };
};