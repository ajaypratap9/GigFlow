import { Router } from 'express';
import { 
  getLeads, 
  createLead, 
  exportLeads, 
  getLeadById, 
  updateLead, 
  deleteLead 
} from '../controllers/lead.controller';
import { auth } from '../middleware/auth';
import { authorize } from '../middleware/authorize';
import { createLeadValidator, updateLeadValidator, handleValidationErrors } from '../validators/lead.validator';
import { UserRole } from '../types';

const router = Router();

router.use(auth);

router.get('/', getLeads);
router.post('/', createLeadValidator, handleValidationErrors, createLead);
router.get('/export', exportLeads);
router.get('/:id', getLeadById);
router.put('/:id', updateLeadValidator, handleValidationErrors, updateLead);
router.delete('/:id', authorize(UserRole.Admin), deleteLead);

export default router;