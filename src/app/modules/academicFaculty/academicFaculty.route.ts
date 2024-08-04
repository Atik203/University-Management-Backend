import express from 'express';
import { auth } from '../../middleware/auth';
import { validateRequest } from '../../middleware/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { academicFacultyController } from './academicFaculty.controller';
import { academicFacultyValidation } from './academicFaculty.validation.zod';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(academicFacultyValidation.academicFacultyValidationSchema),
  academicFacultyController.createAcademicFaculty,
);

router.get(
  '/',
  auth(USER_ROLE.admin),
  academicFacultyController.getAcademicFaculty,
);

router.get(
  '/:id',
  auth(USER_ROLE.admin),
  academicFacultyController.getAcademicFacultyById,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(academicFacultyValidation.updateAcademicFacultySchema),
  academicFacultyController.updateAcademicFaculty,
);

export const academicFacultyRoutes = router;
