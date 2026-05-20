import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { registerValidator, loginValidator, handleValidationErrors } from '../validators/auth.validator';

const router = Router();

router.post('/register', registerValidator, handleValidationErrors, register);
router.post('/login', loginValidator, handleValidationErrors, login);

export default router;