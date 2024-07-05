import express from 'express';
import { parseRequestBodyData } from '../../middleware/parseRequestBodyData';
import { validateRequest } from '../../middleware/validateRequest';
import { upload } from '../../utils/sendImageToCloudnary';
import { StudentControllers } from './student.controller';
import { studentValidations } from './student.validation.zod';

const router = express.Router();

router.get('/:id', StudentControllers.getSingleStudent);

router.delete('/:id', StudentControllers.deleteStudent);

router.get('/', StudentControllers.getAllStudents);

router.patch(
  '/:id',
  upload.single('file'),
  parseRequestBodyData,
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);
export const StudentRoutes = router;
