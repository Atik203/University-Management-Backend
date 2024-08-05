import express from 'express';
import { auth } from '../../middleware/auth';
import { validateRequest } from '../../middleware/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { semesterRegistrationController } from './semesterRegistration.controller';
import {
  createSemesterRegistrationSchema,
  updateSemesterRegistrationSchema,
} from './semesterRegistration.zod.validation';

const router = express.Router();

router.post(
  '/create-semester-registration',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(createSemesterRegistrationSchema),
  semesterRegistrationController.createSemesterRegistration,
);

router.get(
  '/:id',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.student,
    USER_ROLE.faculty,
  ),
  semesterRegistrationController.getSingleSemesterRegistration,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(updateSemesterRegistrationSchema),
  semesterRegistrationController.updateSemesterRegistration,
);

router.get(
  '/',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.student,
    USER_ROLE.faculty,
  ),
  semesterRegistrationController.getAllSemesterRegistration,
);

export const semesterRegistrationRoutes = router;
