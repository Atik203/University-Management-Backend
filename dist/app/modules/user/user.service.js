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
exports.userService = void 0;
const config_1 = __importDefault(require("../../config"));
const student_model_1 = require("../student/student.model");
const user_model_1 = require("./user.model");
const createStudentIntoDB = (password, student) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const fullYear = date.getFullYear().toString(); // get full year 2024
    const year = date.getFullYear().toString().substr(-2); // get last two digits of year 24
    const trimester = Math.ceil((date.getMonth() + 1) / 4); // get trimester (1, 2, or 3)
    const studentCount = yield user_model_1.User.countDocuments({}); // get current count of students
    const serial = String(studentCount + 1).padStart(3, '0'); // pad with zeros to get 3 digits
    const user = {
        password: password || config_1.default.default_password,
        role: 'student',
        id: `${fullYear}${year}${trimester}${serial}`,
    };
    const newUser = yield user_model_1.User.create(user);
    if (Object.keys(newUser).length) {
        student.id = newUser.id;
        student.user = newUser._id;
        const newStudent = yield student_model_1.Student.create(student);
        return newStudent;
    }
});
exports.userService = {
    createStudentIntoDB,
};
