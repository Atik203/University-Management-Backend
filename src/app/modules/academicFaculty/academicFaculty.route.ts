import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { academicFacultyController } from './academicFaculty.controller';
import { academicFacultyValidation } from './academicFaculty.validation.zod';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(academicFacultyValidation.academicFacultyValidationSchema),
  academicFacultyController.createAcademicFaculty,
);

router.get('/', academicFacultyController.getAcademicFaculty);

router.get('/:id', academicFacultyController.getAcademicFacultyById);

router.patch(
  '/:id',
  validateRequest(academicFacultyValidation.updateAcademicFacultySchema),
  academicFacultyController.updateAcademicFaculty,
);

export const academicFacultyRoutes = router;
