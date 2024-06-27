"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.offeredCourseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const offeredCourse_controller_1 = require("./offeredCourse.controller");
const offeredCourse_zod_validation_1 = require("./offeredCourse.zod.validation");
const router = express_1.default.Router();
router.get('/', offeredCourse_controller_1.OfferedCourseControllers.getAllOfferedCourses);
router.get('/:id', offeredCourse_controller_1.OfferedCourseControllers.getSingleOfferedCourses);
router.post('/create-offered-course', (0, validateRequest_1.validateRequest)(offeredCourse_zod_validation_1.OfferedCourseValidations.createOfferedCourseValidationSchema), offeredCourse_controller_1.OfferedCourseControllers.createOfferedCourse);
router.patch('/:id', (0, validateRequest_1.validateRequest)(offeredCourse_zod_validation_1.OfferedCourseValidations.updateOfferedCourseValidationSchema), offeredCourse_controller_1.OfferedCourseControllers.updateOfferedCourse);
router.delete('/:id', offeredCourse_controller_1.OfferedCourseControllers.deleteOfferedCourseFromDB);
exports.offeredCourseRoutes = router;
