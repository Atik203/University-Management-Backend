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
  auth(USER_ROLE.admin),
  validateRequest(createSemesterRegistrationSchema),
  semesterRegistrationController.createSemesterRegistration,
);

router.get(
  '/:id',
  semesterRegistrationController.getSingleSemesterRegistration,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(updateSemesterRegistrationSchema),
  semesterRegistrationController.updateSemesterRegistration,
);

router.get('/', semesterRegistrationController.getAllSemesterRegistration);

export const semesterRegistrationRoutes = router;
