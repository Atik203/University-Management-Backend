import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { studentValidations } from '../student/student.validation.zod';
import { userController } from './user.controller';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  userController.createStudent,
);

export const userRoute = router;
