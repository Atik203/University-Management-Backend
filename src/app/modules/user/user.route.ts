import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { createAdminValidationSchema } from '../admin/admin.zod.validation';
import { createFacultyValidationSchema } from '../faculty/faculty.validation.zod';
import { studentValidations } from '../student/student.validation.zod';
import { userController } from './user.controller';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  userController.createStudent,
);

router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  userController.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  userController.createAdmin,
);

export const userRoute = router;
