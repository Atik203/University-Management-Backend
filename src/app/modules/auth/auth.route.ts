import express from 'express';
import { auth } from '../../middleware/auth';
import { validateRequest } from '../../middleware/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { authController } from './auth.controller';
import {
  changePasswordValidationSchema,
  forgotPasswordValidationSchema,
  loginValidationSchema,
  refreshTokenValidationSchema,
  resetPasswordValidationSchema,
} from './auth.zod.validation';

const router = express.Router();

router.post(
  '/login',
  validateRequest(loginValidationSchema),
  authController.loginUser,
);

router.post(
  '/change-password',
  auth(
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
    USER_ROLE.superAdmin,
  ),
  validateRequest(changePasswordValidationSchema),
  authController.changePassword,
);

router.post(
  '/refresh-token',
  validateRequest(refreshTokenValidationSchema),
  authController.refreshToken,
);

router.post(
  '/forgot-password',
  validateRequest(forgotPasswordValidationSchema),
  authController.forgotPassword,
);

router.post(
  '/reset-password',
  validateRequest(resetPasswordValidationSchema),
  authController.resetPassword,
);

export const authRoutes = router;
