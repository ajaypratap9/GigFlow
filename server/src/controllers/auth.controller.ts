import { Request, Response, NextFunction } from 'express';
import { registerService, loginService } from '../services/auth.service';
import { sendSuccess } from '../utils/response';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await registerService(req.body);
    sendSuccess(res, data, 201, 'User registered successfully');
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await loginService(req.body);
    sendSuccess(res, data, 200, 'User logged in successfully');
  } catch (error) {
    next(error);
  }
};