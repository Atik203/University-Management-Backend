import express from 'express';
import { auth } from '../../middleware/auth';
import { validateRequest } from '../../middleware/validateRequest';
import { enrolledCourseController } from './enrolledCourse.controller';
import { enrolledCourseValidations } from './enrolledCourse.zod.validation';

const router = express.Router();

router.post(
  '/create-enrolled-course',
  auth('student'),
  validateRequest(
    enrolledCourseValidations.createEnrolledCourseValidationZodSchema,
  ),
  enrolledCourseController.createEnrolledCourse,
);

router.patch(
  '/update-enrolled-course-marks',
  auth('faculty'),
  validateRequest(
    enrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema,
  ),
  enrolledCourseController.updateEnrolledCourse,
);

router.get(
  '/',
  //  auth('admin'),
  enrolledCourseController.getAllEnrolledCourses,
);

router.get(
  '/:id',
  // auth('admin'),
  enrolledCourseController.getSingleEnrolledCourse,
);

export const enrolledCourseRoutes = router;
