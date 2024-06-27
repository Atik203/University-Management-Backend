import express from 'express';

import { auth } from '../../middleware/auth';
import { validateRequest } from '../../middleware/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { FacultyControllers } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation.zod';

const router = express.Router();

router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', auth(USER_ROLE.admin), FacultyControllers.deleteFaculty);

router.get('/', auth(USER_ROLE.admin), FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
