import React, { useEffect } from 'react';
import { useForm as useReactHookForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { LeadFormData, LeadStatus, LeadSource } from '../../types';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  status: z.nativeEnum(LeadStatus),
  source: z.nativeEnum(LeadSource),
});

interface LeadFormProps {
  initialData?: Partial<LeadFormData>;
  onSubmit: (data: LeadFormData) => void;
  isLoading: boolean;
}

const LeadForm: React.FC<LeadFormProps> = ({ initialData, onSubmit, isLoading }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useReactHookForm<LeadFormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData || {
      name: '',
      email: '',
      status: LeadStatus.New,
      source: LeadSource.Website,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || '',
        email: initialData.email || '',
        status: initialData.status || LeadStatus.New,
        source: initialData.source || LeadSource.Website,
      });
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Full Name"
        placeholder="Enter name"
        error={errors.name?.message}
        {...register('name')}
      />

      <Input
        label="Email Address"
        type="email"
        placeholder="Enter email"
        error={errors.email?.message}
        {...register('email')}
      />

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Status"
          options={Object.values(LeadStatus).map(s => ({ value: s, label: s }))}
          error={errors.status?.message}
          {...register('status')}
        />

        <Select
          label="Source"
          options={Object.values(LeadSource).map(s => ({ value: s, label: s }))}
          error={errors.source?.message}
          {...register('source')}
        />
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          variant="primary"
          className="w-full py-3"
          loading={isLoading}
        >
          {initialData ? 'Update Lead' : 'Create Lead'}
        </Button>
      </div>
    </form>
  );
};

export default LeadForm;