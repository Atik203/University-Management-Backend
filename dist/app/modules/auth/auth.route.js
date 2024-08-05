"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const validateRequest_1 = require("../../middleware/validateRequest");
const user_constant_1 = require("../user/user.constant");
const auth_controller_1 = require("./auth.controller");
const auth_zod_validation_1 = require("./auth.zod.validation");
const router = express_1.default.Router();
router.post('/login', (0, validateRequest_1.validateRequest)(auth_zod_validation_1.loginValidationSchema), auth_controller_1.authController.loginUser);
router.post('/change-password', (0, auth_1.auth)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.faculty, user_constant_1.USER_ROLE.student, user_constant_1.USER_ROLE.superAdmin), (0, validateRequest_1.validateRequest)(auth_zod_validation_1.changePasswordValidationSchema), auth_controller_1.authController.changePassword);
router.post('/refresh-token', (0, validateRequest_1.validateRequest)(auth_zod_validation_1.refreshTokenValidationSchema), auth_controller_1.authController.refreshToken);
router.post('/forgot-password', (0, validateRequest_1.validateRequest)(auth_zod_validation_1.forgotPasswordValidationSchema), auth_controller_1.authController.forgotPassword);
router.post('/reset-password', (0, validateRequest_1.validateRequest)(auth_zod_validation_1.resetPasswordValidationSchema), auth_controller_1.authController.resetPassword);
exports.authRoutes = router;
