import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { courseController } from './course.controller';
import {
  assignFacultiesValidationSchema,
  createCourseValidationSchema,
  updateCourseValidationSchema,
} from './course.zod.validation';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(createCourseValidationSchema),
  courseController.createCourse,
);

router.get('/', courseController.getAllCourses);

router.get('/:id', courseController.getSingleCourse);

router.patch(
  '/:id',
  validateRequest(updateCourseValidationSchema),
  courseController.updateCourse,
);

router.delete('/:id', courseController.deleteCourse);

router.put(
  '/:courseId/assign-faculties',
  validateRequest(assignFacultiesValidationSchema),
  courseController.assignFaculties,
);

router.delete('/:courseId/remove-faculties', courseController.removeFaculties);

export const courseRoutes = router;
