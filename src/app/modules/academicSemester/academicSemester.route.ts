import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { academicSemesterController } from './academicSemester.controller';
import { academicSemesterValidation } from './academicSemester.validation.zod';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(academicSemesterValidation.createAcademicSemesterSchema),
  academicSemesterController.createAcademicSemester,
);

router.get('/', academicSemesterController.getAcademicSemester);

router.get('/:id', academicSemesterController.getAcademicSemesterById);

router.patch(
  '/:id',
  validateRequest(academicSemesterValidation.updateAcademicSemesterSchema),
  academicSemesterController.updateAcademicSemester,
);

export const academicSemesterRoute = router;
