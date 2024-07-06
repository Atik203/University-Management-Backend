import express from 'express';
import { auth } from '../../middleware/auth';
import { validateRequest } from '../../middleware/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { academicFacultyController } from './academicFaculty.controller';
import { academicFacultyValidation } from './academicFaculty.validation.zod';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  auth(USER_ROLE.admin),
  validateRequest(academicFacultyValidation.academicFacultyValidationSchema),
  academicFacultyController.createAcademicFaculty,
);

router.get('/', academicFacultyController.getAcademicFaculty);

router.get('/:id', academicFacultyController.getAcademicFacultyById);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(academicFacultyValidation.updateAcademicFacultySchema),
  academicFacultyController.updateAcademicFaculty,
);

export const academicFacultyRoutes = router;
