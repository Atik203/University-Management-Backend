"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const validateRequest_1 = require("../../middleware/validateRequest");
const user_constant_1 = require("../user/user.constant");
const academicSemester_controller_1 = require("./academicSemester.controller");
const academicSemester_validation_zod_1 = require("./academicSemester.validation.zod");
const router = express_1.default.Router();
router.post('/create-academic-semester', (0, auth_1.auth)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin), (0, validateRequest_1.validateRequest)(academicSemester_validation_zod_1.academicSemesterValidation.createAcademicSemesterSchema), academicSemester_controller_1.academicSemesterController.createAcademicSemester);
router.get('/', (0, auth_1.auth)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin), academicSemester_controller_1.academicSemesterController.getAcademicSemester);
router.get('/:id', (0, auth_1.auth)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin), academicSemester_controller_1.academicSemesterController.getAcademicSemesterById);
router.patch('/:id', (0, auth_1.auth)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin), (0, validateRequest_1.validateRequest)(academicSemester_validation_zod_1.academicSemesterValidation.updateAcademicSemesterSchema), academicSemester_controller_1.academicSemesterController.updateAcademicSemester);
exports.academicSemesterRoute = router;
