import express from 'express';
import { auth } from '../../middleware/auth';
import { parseRequestBodyData } from '../../middleware/parseRequestBodyData';
import { validateRequest } from '../../middleware/validateRequest';
import { upload } from '../../utils/sendImageToCloudnary';
import { USER_ROLE } from '../user/user.constant';
import { StudentControllers } from './student.controller';
import { studentValidations } from './student.validation.zod';

const router = express.Router();

router.get('/:id', StudentControllers.getSingleStudent);

router.delete('/:id', auth(USER_ROLE.admin), StudentControllers.deleteStudent);

router.get(
  '/',
  // auth(USER_ROLE.admin, 'faculty', 'student'),
  StudentControllers.getAllStudents,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  upload.single('file'),
  parseRequestBodyData,
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);
export const StudentRoutes = router;
