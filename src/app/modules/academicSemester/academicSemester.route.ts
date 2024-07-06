import express from 'express';
import { auth } from '../../middleware/auth';
import { validateRequest } from '../../middleware/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { academicSemesterController } from './academicSemester.controller';
import { academicSemesterValidation } from './academicSemester.validation.zod';

const router = express.Router();

router.post(
  '/create-academic-semester',
  auth(USER_ROLE.admin),
  validateRequest(academicSemesterValidation.createAcademicSemesterSchema),
  academicSemesterController.createAcademicSemester,
);

router.get('/', auth('admin'), academicSemesterController.getAcademicSemester);

router.get(
  '/:id',
  auth('admin'),
  academicSemesterController.getAcademicSemesterById,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(academicSemesterValidation.updateAcademicSemesterSchema),
  academicSemesterController.updateAcademicSemester,
);

export const academicSemesterRoute = router;
