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
exports.AcademicSemester = exports.academicSemesterSchema = void 0;
const mongoose_1 = require("mongoose");
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const academicSemester_constant_1 = require("./academicSemester.constant");
exports.academicSemesterSchema = new mongoose_1.Schema({
    name: {
        type: String,
        enum: academicSemester_constant_1.Names,
    },
    code: {
        type: String,
        enum: academicSemester_constant_1.Codes,
    },
    year: {
        type: String,
    },
    startMonth: {
        type: String,
        enum: academicSemester_constant_1.Months,
    },
    endMonth: {
        type: String,
        enum: academicSemester_constant_1.Months,
    },
}, {
    timestamps: true,
});
// handle the duplicate semester in the same year
exports.academicSemesterSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, year } = this;
        const semester = yield exports.AcademicSemester.findOne({ name, year });
        if (semester) {
            throw new AppError_1.default(400, 'The semester already exists in the same year');
        }
        next();
    });
});
exports.AcademicSemester = (0, mongoose_1.model)('AcademicSemester', exports.academicSemesterSchema);
