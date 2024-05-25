"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const student_validation_zod_1 = __importDefault(require("../student/student.validation.zod"));
const user_service_1 = require("./user.service");
const createStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, student } = req.body;
        const zodParseStudent = student_validation_zod_1.default.parse(student);
        const result = yield user_service_1.userService.createStudentIntoDB(password, zodParseStudent);
        if (result) {
            res.status(201).json({
                success: true,
                message: 'Student Created Successfully',
                data: result,
            });
        }
        else {
            res
                .status(400)
                .json({ success: false, message: 'Failed to create student' });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.userController = {
    createStudent,
};
