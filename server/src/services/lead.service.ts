import { Lead } from '../models/Lead';
import { UserRole, LeadFilterQuery, PaginatedResponse, ILead } from '../types';

export const getLeadsService = async (userId: string, role: UserRole, filters: LeadFilterQuery): Promise<PaginatedResponse<ILead>> => {
  const query: any = {};

  if (role === UserRole.Sales) {
    query.createdBy = userId;
  }

  if (filters.status) query.status = filters.status;
  if (filters.source) query.source = filters.source;
  
  if (filters.search) {
    query.$or = [
      { name: { $regex: filters.search, $options: 'i' } },
      { email: { $regex: filters.search, $options: 'i' } }
    ];
  }

  const page = Number(filters.page) || 1;
  const limit = Number(filters.limit) || 10;
  const skip = (page - 1) * limit;

  const sortOrder = filters.sort === 'oldest' ? 1 : -1;

  const [data, total] = await Promise.all([
    Lead.find(query).sort({ createdAt: sortOrder }).skip(skip).limit(limit).lean(),
    Lead.countDocuments(query),
  ]);

  return {
    data: JSON.parse(JSON.stringify(data)),
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

export const createLeadService = async (data: any, userId: string): Promise<ILead> => {
  const doc = await Lead.create({ ...data, createdBy: userId });
  return JSON.parse(JSON.stringify(doc));
};

export const updateLeadService = async (leadId: string, data: any, userId: string, role: UserRole): Promise<ILead | null> => {
  const lead = await Lead.findById(leadId);
  if (!lead) throw new Error('Lead not found');

  if (role === UserRole.Sales && lead.createdBy.toString() !== userId) {
    throw new Error('Not authorized to update this lead');
  }

  const updated = await Lead.findByIdAndUpdate(leadId, data, { new: true }).lean();
  return updated ? JSON.parse(JSON.stringify(updated)) : null;
};

export const deleteLeadService = async (leadId: string, userId: string, role: UserRole): Promise<void> => {
  const lead = await Lead.findById(leadId);
  if (!lead) throw new Error('Lead not found');

  if (role !== UserRole.Admin) {
    throw new Error('Only admins can delete leads');
  }

  await Lead.findByIdAndDelete(leadId);
};

export const getLeadByIdService = async (leadId: string, userId: string, role: UserRole): Promise<ILead | null> => {
  const lead = await Lead.findById(leadId).lean();
  if (!lead) throw new Error('Lead not found');

  if (role === UserRole.Sales && lead.createdBy.toString() !== userId) {
    throw new Error('Not authorized to view this lead');
  }

  return lead ? JSON.parse(JSON.stringify(lead)) : null;
};

export const exportLeadsService = async (userId: string, role: UserRole, filters: LeadFilterQuery): Promise<ILead[]> => {
  const query: any = {};

  if (role === UserRole.Sales) {
    query.createdBy = userId;
  }

  if (filters.status) query.status = filters.status;
  if (filters.source) query.source = filters.source;
  
  if (filters.search) {
    query.$or = [
      { name: { $regex: filters.search, $options: 'i' } },
      { email: { $regex: filters.search, $options: 'i' } }
    ];
  }

  const sortOrder = filters.sort === 'oldest' ? 1 : -1;

  const docs = await Lead.find(query).sort({ createdAt: sortOrder }).lean();
  return JSON.parse(JSON.stringify(docs));
};