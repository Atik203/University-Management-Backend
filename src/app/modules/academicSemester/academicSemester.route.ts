import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { academicSemesterController } from './academicSemester.controller';
import { createAcademicSemesterSchema } from './academicSemester.validation.zod';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(createAcademicSemesterSchema),
  academicSemesterController.createAcademicSemester,
);

router.get('/', academicSemesterController.getAcademicSemester);

export const academicSemesterRoute = router;
