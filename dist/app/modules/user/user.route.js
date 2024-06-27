"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const admin_zod_validation_1 = require("../admin/admin.zod.validation");
const faculty_validation_zod_1 = require("../faculty/faculty.validation.zod");
const student_validation_zod_1 = require("../student/student.validation.zod");
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post('/create-student', (0, validateRequest_1.validateRequest)(student_validation_zod_1.studentValidations.createStudentValidationSchema), user_controller_1.userController.createStudent);
router.post('/create-faculty', (0, validateRequest_1.validateRequest)(faculty_validation_zod_1.createFacultyValidationSchema), user_controller_1.userController.createFaculty);
router.post('/create-admin', (0, validateRequest_1.validateRequest)(admin_zod_validation_1.createAdminValidationSchema), user_controller_1.userController.createAdmin);
exports.userRoute = router;
