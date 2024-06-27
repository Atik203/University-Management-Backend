"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const student_controller_1 = require("./student.controller");
const student_validation_zod_1 = require("./student.validation.zod");
const router = express_1.default.Router();
router.get('/:id', student_controller_1.StudentControllers.getSingleStudent);
router.delete('/:id', student_controller_1.StudentControllers.deleteStudent);
router.get('/', student_controller_1.StudentControllers.getAllStudents);
router.patch('/:id', (0, validateRequest_1.validateRequest)(student_validation_zod_1.studentValidations.updateStudentValidationSchema), student_controller_1.StudentControllers.updateStudent);
exports.StudentRoutes = router;
