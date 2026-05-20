import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { LeadStatus, LeadSource } from '../types';

export const createLeadValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('status').optional().isIn(Object.values(LeadStatus)).withMessage('Invalid status'),
  body('source').isIn(Object.values(LeadSource)).withMessage('Invalid source'),
];

export const updateLeadValidator = [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Please provide a valid email'),
  body('status').optional().isIn(Object.values(LeadStatus)).withMessage('Invalid status'),
  body('source').optional().isIn(Object.values(LeadSource)).withMessage('Invalid source'),
];

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ success: false, errors: errors.array() });
    return;
  }
  next();
};