"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const parseRequestBodyData_1 = require("../../middleware/parseRequestBodyData");
const validateRequest_1 = require("../../middleware/validateRequest");
const sendImageToCloudnary_1 = require("../../utils/sendImageToCloudnary");
const admin_controller_1 = require("./admin.controller");
const admin_zod_validation_1 = require("./admin.zod.validation");
const router = express_1.default.Router();
router.get('/', admin_controller_1.AdminControllers.getAllAdmins);
router.get('/:id', admin_controller_1.AdminControllers.getSingleAdmin);
router.patch('/:id', sendImageToCloudnary_1.upload.single('file'), parseRequestBodyData_1.parseRequestBodyData, (0, validateRequest_1.validateRequest)(admin_zod_validation_1.updateAdminValidationSchema), admin_controller_1.AdminControllers.updateAdmin);
router.delete('/:adminId', admin_controller_1.AdminControllers.deleteAdmin);
exports.AdminRoutes = router;
