"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrolledCourseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const validateRequest_1 = require("../../middleware/validateRequest");
const user_constant_1 = require("../user/user.constant");
const enrolledCourse_controller_1 = require("./enrolledCourse.controller");
const enrolledCourse_zod_validation_1 = require("./enrolledCourse.zod.validation");
const router = express_1.default.Router();
router.get('/my-enrolled-courses', (0, auth_1.auth)(user_constant_1.USER_ROLE.student), enrolledCourse_controller_1.enrolledCourseController.getMyEnrolledCourses);
router.post('/create-enrolled-course', (0, auth_1.auth)(user_constant_1.USER_ROLE.student), (0, validateRequest_1.validateRequest)(enrolledCourse_zod_validation_1.enrolledCourseValidations.createEnrolledCourseValidationZodSchema), enrolledCourse_controller_1.enrolledCourseController.createEnrolledCourse);
router.patch('/update-enrolled-course-marks', (0, auth_1.auth)(user_constant_1.USER_ROLE.faculty, user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin), (0, validateRequest_1.validateRequest)(enrolledCourse_zod_validation_1.enrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema), enrolledCourse_controller_1.enrolledCourseController.updateEnrolledCourse);
router.get('/', (0, auth_1.auth)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.student), enrolledCourse_controller_1.enrolledCourseController.getAllEnrolledCourses);
router.get('/:id', (0, auth_1.auth)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.student), enrolledCourse_controller_1.enrolledCourseController.getSingleEnrolledCourse);
exports.enrolledCourseRoutes = router;
