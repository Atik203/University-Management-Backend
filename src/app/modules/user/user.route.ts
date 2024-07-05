import express from 'express';
import { auth } from '../../middleware/auth';
import { validateRequest } from '../../middleware/validateRequest';
import { createAdminValidationSchema } from '../admin/admin.zod.validation';
import { createFacultyValidationSchema } from '../faculty/faculty.validation.zod';
import { studentValidations } from '../student/student.validation.zod';
import { USER_ROLE } from './user.constant';
import { userController } from './user.controller';
import { changeStatusValidationSchema } from './user.validation.zod';

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

router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  userController.getMe,
);

router.post(
  '/change-status/:id',
  auth(USER_ROLE.admin),
  validateRequest(changeStatusValidationSchema),
  userController.changeStatus,
);

export const userRoute = router;
