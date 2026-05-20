import api from './axios';
import { Lead, PaginatedResponse, FilterState, LeadFormData } from '../types';

export const getLeads = async (params: FilterState): Promise<PaginatedResponse<Lead>> => {
  const response = await api.get('/leads', { params });
  return response.data.data;
};

export const getLeadById = async (id: string): Promise<Lead> => {
  const response = await api.get(`/leads/${id}`);
  return response.data.data;
};

export const createLead = async (data: LeadFormData): Promise<Lead> => {
  const response = await api.post('/leads', data);
  return response.data.data;
};

export const updateLead = async (id: string, data: Partial<LeadFormData>): Promise<Lead> => {
  const response = await api.put(`/leads/${id}`, data);
  return response.data.data;
};

export const deleteLead = async (id: string): Promise<void> => {
  await api.delete(`/leads/${id}`);
};

export const exportLeads = async (params: Partial<FilterState>): Promise<Blob> => {
  const response = await api.get('/leads/export', {
    params,
    responseType: 'blob',
  });
  return response.data;
};