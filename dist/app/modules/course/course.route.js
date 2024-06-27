"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const course_controller_1 = require("./course.controller");
const course_zod_validation_1 = require("./course.zod.validation");
const router = express_1.default.Router();
router.post('/create-course', (0, validateRequest_1.validateRequest)(course_zod_validation_1.createCourseValidationSchema), course_controller_1.courseController.createCourse);
router.get('/', course_controller_1.courseController.getAllCourses);
router.get('/:id', course_controller_1.courseController.getSingleCourse);
router.patch('/:id', (0, validateRequest_1.validateRequest)(course_zod_validation_1.updateCourseValidationSchema), course_controller_1.courseController.updateCourse);
router.delete('/:id', course_controller_1.courseController.deleteCourse);
router.put('/:courseId/assign-faculties', (0, validateRequest_1.validateRequest)(course_zod_validation_1.assignFacultiesValidationSchema), course_controller_1.courseController.assignFaculties);
router.delete('/:courseId/remove-faculties', course_controller_1.courseController.removeFaculties);
exports.courseRoutes = router;
