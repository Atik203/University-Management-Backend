"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.semesterRegistrationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const validateRequest_1 = require("../../middleware/validateRequest");
const user_constant_1 = require("../user/user.constant");
const semesterRegistration_controller_1 = require("./semesterRegistration.controller");
const semesterRegistration_zod_validation_1 = require("./semesterRegistration.zod.validation");
const router = express_1.default.Router();
router.post('/create-semester-registration', (0, auth_1.auth)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin), (0, validateRequest_1.validateRequest)(semesterRegistration_zod_validation_1.createSemesterRegistrationSchema), semesterRegistration_controller_1.semesterRegistrationController.createSemesterRegistration);
router.get('/:id', (0, auth_1.auth)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.student, user_constant_1.USER_ROLE.faculty), semesterRegistration_controller_1.semesterRegistrationController.getSingleSemesterRegistration);
router.patch('/:id', (0, auth_1.auth)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin), (0, validateRequest_1.validateRequest)(semesterRegistration_zod_validation_1.updateSemesterRegistrationSchema), semesterRegistration_controller_1.semesterRegistrationController.updateSemesterRegistration);
router.get('/', (0, auth_1.auth)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.student, user_constant_1.USER_ROLE.faculty), semesterRegistration_controller_1.semesterRegistrationController.getAllSemesterRegistration);
exports.semesterRegistrationRoutes = router;
