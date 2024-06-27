"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicDepartmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const academicDepartment_controller_1 = require("./academicDepartment.controller");
const academicDepartment_validation_zod_1 = require("./academicDepartment.validation.zod");
const router = express_1.default.Router();
router.post('/create-academic-department', (0, validateRequest_1.validateRequest)(academicDepartment_validation_zod_1.academicDepartmentValidation.academicDepartmentValidationSchema), academicDepartment_controller_1.academicDepartmentController.createAcademicDepartment);
router.get('/', academicDepartment_controller_1.academicDepartmentController.getAcademicDepartment);
router.get('/:id', academicDepartment_controller_1.academicDepartmentController.getAcademicDepartmentById);
router.patch('/:id', (0, validateRequest_1.validateRequest)(academicDepartment_validation_zod_1.academicDepartmentValidation.updateAcademicDepartmentSchema), academicDepartment_controller_1.academicDepartmentController.updateAcademicDepartment);
exports.academicDepartmentRoutes = router;
