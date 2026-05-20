import { Request, Response, NextFunction } from 'express';
import { 
  getLeadsService, 
  createLeadService, 
  updateLeadService, 
  deleteLeadService, 
  getLeadByIdService, 
  exportLeadsService 
} from '../services/lead.service';
import { sendSuccess } from '../utils/response';
import { leadsToCSV } from '../utils/csvExport';

export const getLeads = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await getLeadsService(req.user!.userId, req.user!.role, req.query);
    sendSuccess(res, data);
  } catch (error) {
    next(error);
  }
};

export const createLead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await createLeadService(req.body, req.user!.userId);
    sendSuccess(res, data, 201, 'Lead created successfully');
  } catch (error) {
    next(error);
  }
};

export const updateLead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await updateLeadService(req.params.id, req.body, req.user!.userId, req.user!.role);
    sendSuccess(res, data, 200, 'Lead updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteLead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await deleteLeadService(req.params.id, req.user!.userId, req.user!.role);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getLeadById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await getLeadByIdService(req.params.id, req.user!.userId, req.user!.role);
    sendSuccess(res, data);
  } catch (error) {
    next(error);
  }
};

export const exportLeads = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const leads = await exportLeadsService(req.user!.userId, req.user!.role, req.query);
    const csv = leadsToCSV(leads);
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment;filename="leads.csv"');
    res.status(200).send(csv);
  } catch (error) {
    next(error);
  }
};