import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { createStudentValidationSchema } from '../student/student.validation.zod';
import { userController } from './user.controller';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  userController.createStudent,
);

export const userRoute = router;
