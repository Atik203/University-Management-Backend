"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicFacultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const validateRequest_1 = require("../../middleware/validateRequest");
const user_constant_1 = require("../user/user.constant");
const academicFaculty_controller_1 = require("./academicFaculty.controller");
const academicFaculty_validation_zod_1 = require("./academicFaculty.validation.zod");
const router = express_1.default.Router();
router.post('/create-academic-faculty', (0, auth_1.auth)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin), (0, validateRequest_1.validateRequest)(academicFaculty_validation_zod_1.academicFacultyValidation.academicFacultyValidationSchema), academicFaculty_controller_1.academicFacultyController.createAcademicFaculty);
router.get('/', (0, auth_1.auth)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin), academicFaculty_controller_1.academicFacultyController.getAcademicFaculty);
router.get('/:id', (0, auth_1.auth)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin), academicFaculty_controller_1.academicFacultyController.getAcademicFacultyById);
router.patch('/:id', (0, auth_1.auth)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin), (0, validateRequest_1.validateRequest)(academicFaculty_validation_zod_1.academicFacultyValidation.updateAcademicFacultySchema), academicFaculty_controller_1.academicFacultyController.updateAcademicFaculty);
exports.academicFacultyRoutes = router;
