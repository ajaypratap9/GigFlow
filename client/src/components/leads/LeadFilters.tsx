import React, { useState, useEffect } from 'react';

import { FilterState, LeadStatus, LeadSource } from '../../types';
import { useDebounce } from '../../hooks/useDebounce';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

interface LeadFiltersProps {
  filters: FilterState;
  onChange: (filters: Partial<FilterState>) => void;
  onExport: () => void;
  isExporting: boolean;
  onAdd: () => void;
}

const LeadFilters: React.FC<LeadFiltersProps> = ({ filters, onChange, onExport, isExporting, onAdd }) => {
  const [searchInput, setSearchInput] = useState(filters.search || '');
  const debouncedSearch = useDebounce(searchInput, 400);

  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      onChange({ search: debouncedSearch, page: 1 });
    }
  }, [debouncedSearch, onChange, filters.search]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex flex-1 items-center gap-3 w-full">
        <div className="w-full max-w-sm">
          <Input
            placeholder="Filter by name or email..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-32">
          <Select
            options={[
              { value: '', label: 'Status' },
              ...Object.values(LeadStatus).map(s => ({ value: s, label: s }))
            ]}
            value={filters.status || ''}
            onChange={(e) => onChange({ status: e.target.value, page: 1 })}
          />
        </div>
        <div className="w-32">
          <Select
            options={[
              { value: '', label: 'Source' },
              ...Object.values(LeadSource).map(s => ({ value: s, label: s }))
            ]}
            value={filters.source || ''}
            onChange={(e) => onChange({ source: e.target.value, page: 1 })}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto">
        <Button
          variant="secondary"
          size="sm"
          onClick={onExport}
          loading={isExporting}
          className="flex-1 md:flex-none"
        >
          Export
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={onAdd}
          className="flex-1 md:flex-none"
        >
          Add Lead
        </Button>
      </div>
    </div>
  );
};

export default LeadFilters;