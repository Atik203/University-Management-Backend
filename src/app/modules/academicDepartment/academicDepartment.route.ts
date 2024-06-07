import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { academicDepartmentController } from './academicDepartment.controller';
import { academicDepartmentValidation } from './academicDepartment.validation.zod';

const router = express.Router();

router.post(
  '/create-academic-department',
  validateRequest(
    academicDepartmentValidation.academicDepartmentValidationSchema,
  ),
  academicDepartmentController.createAcademicDepartment,
);

router.get('/', academicDepartmentController.getAcademicDepartment);

router.get('/:id', academicDepartmentController.getAcademicDepartmentById);

router.patch(
  '/:id',
  validateRequest(academicDepartmentValidation.updateAcademicDepartmentSchema),
  academicDepartmentController.updateAcademicDepartment,
);

export const academicDepartmentRoutes = router;
