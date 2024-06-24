import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { semesterRegistrationController } from './semesterRegistration.controller';
import { createSemesterRegistrationSchema } from './semesterRegistration.zod.validation';

const router = express.Router();

router.post(
  '/create-semester-registration',
  validateRequest(createSemesterRegistrationSchema),
  semesterRegistrationController.createSemesterRegistration,
);

router.get('/:id');

router.patch('/:id');

router.get('/:id');

router.delete('/:id');

router.get('/');

export const semesterRegistrationRoutes = router;
