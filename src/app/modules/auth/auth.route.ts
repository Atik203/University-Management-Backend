import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { authController } from './auth.controller';
import { loginValidationSchema } from './auth.zod.validation';

const router = express.Router();

router.post(
  '/login',
  validateRequest(loginValidationSchema),
  authController.loginUser,
);

export const authRoutes = router;
