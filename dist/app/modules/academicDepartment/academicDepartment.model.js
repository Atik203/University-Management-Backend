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
exports.AcademicDepartment = exports.academicDepartmentSchema = void 0;
const mongoose_1 = require("mongoose");
const AppError_1 = __importDefault(require("../../Errors/AppError"));
exports.academicDepartmentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
        required: true,
    },
}, {
    timestamps: true,
});
exports.academicDepartmentSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const academicDepartment = this;
        const isDepartmentExist = yield exports.AcademicDepartment.findOne({
            name: academicDepartment.name,
        });
        if (isDepartmentExist) {
            throw new AppError_1.default(400, 'Department already exist');
        }
        next();
    });
});
exports.academicDepartmentSchema.pre('findOneAndUpdate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = this.getQuery();
        const isDepartmentExist = yield exports.AcademicDepartment.findById(query._id);
        if (!isDepartmentExist) {
            throw new AppError_1.default(404, 'Department does not exist');
        }
        next();
    });
});
exports.AcademicDepartment = (0, mongoose_1.model)('AcademicDepartment', exports.academicDepartmentSchema);
