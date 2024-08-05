import express from 'express';
import { auth } from '../../middleware/auth';
import { validateRequest } from '../../middleware/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { courseController } from './course.controller';
import {
  assignFacultiesValidationSchema,
  createCourseValidationSchema,
  updateCourseValidationSchema,
} from './course.zod.validation';

const router = express.Router();

router.post(
  '/create-course',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(createCourseValidationSchema),
  courseController.createCourse,
);

router.get(
  '/',

  courseController.getAllCourses,
);

router.get('/:id', courseController.getSingleCourse);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(updateCourseValidationSchema),
  courseController.updateCourse,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  courseController.deleteCourse,
);

router.put(
  '/:courseId/assign-faculties',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(assignFacultiesValidationSchema),
  courseController.assignFaculties,
);

router.delete(
  '/:courseId/remove-faculties',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  courseController.removeFaculties,
);

export const courseRoutes = router;
