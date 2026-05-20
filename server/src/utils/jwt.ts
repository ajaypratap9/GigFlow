import jwt from 'jsonwebtoken';
import { AuthPayload } from '../types';

export const signToken = (payload: AuthPayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '7d',
  });
};

export const verifyToken = (token: string): AuthPayload => {
  return jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as AuthPayload;
};