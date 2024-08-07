import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { auth } from './../../middleware/auth';
import { academicDepartmentController } from './academicDepartment.controller';
import { academicDepartmentValidation } from './academicDepartment.validation.zod';

const router = express.Router();

router.post(
  '/create-academic-department',
  auth(USER_ROLE.admin),
  validateRequest(
    academicDepartmentValidation.academicDepartmentValidationSchema,
  ),
  academicDepartmentController.createAcademicDepartment,
);

router.get('/', academicDepartmentController.getAcademicDepartment);

router.get('/:id', academicDepartmentController.getAcademicDepartmentById);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(academicDepartmentValidation.updateAcademicDepartmentSchema),
  academicDepartmentController.updateAcademicDepartment,
);

export const academicDepartmentRoutes = router;
