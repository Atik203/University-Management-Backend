"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const academicSemester_controller_1 = require("./academicSemester.controller");
const academicSemester_validation_zod_1 = require("./academicSemester.validation.zod");
const router = express_1.default.Router();
router.post('/create-academic-semester', (0, validateRequest_1.validateRequest)(academicSemester_validation_zod_1.academicSemesterValidation.createAcademicSemesterSchema), academicSemester_controller_1.academicSemesterController.createAcademicSemester);
router.get('/', academicSemester_controller_1.academicSemesterController.getAcademicSemester);
router.get('/:id', academicSemester_controller_1.academicSemesterController.getAcademicSemesterById);
router.patch('/:id', (0, validateRequest_1.validateRequest)(academicSemester_validation_zod_1.academicSemesterValidation.updateAcademicSemesterSchema), academicSemester_controller_1.academicSemesterController.updateAcademicSemester);
exports.academicSemesterRoute = router;
