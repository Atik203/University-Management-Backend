"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.semesterRegistrationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const semesterRegistration_controller_1 = require("./semesterRegistration.controller");
const semesterRegistration_zod_validation_1 = require("./semesterRegistration.zod.validation");
const router = express_1.default.Router();
router.post('/create-semester-registration', (0, validateRequest_1.validateRequest)(semesterRegistration_zod_validation_1.createSemesterRegistrationSchema), semesterRegistration_controller_1.semesterRegistrationController.createSemesterRegistration);
router.get('/:id', semesterRegistration_controller_1.semesterRegistrationController.getSingleSemesterRegistration);
router.patch('/:id', (0, validateRequest_1.validateRequest)(semesterRegistration_zod_validation_1.updateSemesterRegistrationSchema), semesterRegistration_controller_1.semesterRegistrationController.updateSemesterRegistration);
router.get('/', semesterRegistration_controller_1.semesterRegistrationController.getAllSemesterRegistration);
exports.semesterRegistrationRoutes = router;
