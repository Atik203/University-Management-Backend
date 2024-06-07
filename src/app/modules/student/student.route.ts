import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { StudentControllers } from './student.controller';
import { studentValidations } from './student.validation.zod';

const router = express.Router();

router.get('/:id', StudentControllers.getSingleStudent);

router.delete('/:id', StudentControllers.deleteStudent);

router.get('/', StudentControllers.getAllStudents);

router.patch(
  '/:id',
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);
export const StudentRoutes = router;
