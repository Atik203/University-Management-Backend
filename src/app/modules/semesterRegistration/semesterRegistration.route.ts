import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { semesterRegistrationController } from './semesterRegistration.controller';
import {
  createSemesterRegistrationSchema,
  updateSemesterRegistrationSchema,
} from './semesterRegistration.zod.validation';

const router = express.Router();

router.post(
  '/create-semester-registration',
  validateRequest(createSemesterRegistrationSchema),
  semesterRegistrationController.createSemesterRegistration,
);

router.get(
  '/:id',
  semesterRegistrationController.getSingleSemesterRegistration,
);

router.patch(
  '/:id',
  validateRequest(updateSemesterRegistrationSchema),
  semesterRegistrationController.updateSemesterRegistration,
);

router.get('/', semesterRegistrationController.getAllSemesterRegistration);

export const semesterRegistrationRoutes = router;
