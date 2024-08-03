import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { enrolledCourseController } from './enrolledCourse.controller';
import { enrolledCourseValidations } from './enrolledCourse.zod.validation';

const router = express.Router();

router.post(
  '/create-enrolled-course',
  validateRequest(
    enrolledCourseValidations.createEnrolledCourseValidationZodSchema,
  ),
  enrolledCourseController.createEnrolledCourse,
);

export const enrolledCourseRoutes = router;
