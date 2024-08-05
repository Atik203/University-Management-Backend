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
exports.academicSemesterService = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const academicSemester_constant_1 = require("./academicSemester.constant");
const academicSemester_model_1 = require("./academicSemester.model");
const createAcademicSemesterIntoDB = (academicSemester) => __awaiter(void 0, void 0, void 0, function* () {
    if (academicSemester_constant_1.academicSemesterNameCodeMapper[academicSemester.name] !==
        academicSemester.code) {
        throw new AppError_1.default(400, 'Invalid semester code');
    }
    const result = yield academicSemester_model_1.AcademicSemester.create(academicSemester);
    return result;
});
const getAcademicSemesterFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemesterQuery = new QueryBuilder_1.default(academicSemester_model_1.AcademicSemester.find(), query)
        .search(['name'])
        .paginate()
        .filter()
        .sort()
        .fields();
    const result = yield academicSemesterQuery.modelQuery;
    const meta = yield academicSemesterQuery.countTotal();
    return {
        result,
        meta,
    };
});
const getAcademicSemesterByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_model_1.AcademicSemester.findById(id);
    return result;
});
const updateAcademicSemesterFromDB = (id, academicSemester) => __awaiter(void 0, void 0, void 0, function* () {
    if (academicSemester_constant_1.academicSemesterNameCodeMapper[academicSemester.name] !==
        academicSemester.code) {
        throw new AppError_1.default(400, 'Invalid semester code');
    }
    const result = yield academicSemester_model_1.AcademicSemester.findByIdAndUpdate(id, academicSemester, {
        new: true,
    });
    return result;
});
exports.academicSemesterService = {
    createAcademicSemesterIntoDB,
    getAcademicSemesterFromDB,
    getAcademicSemesterByIdFromDB,
    updateAcademicSemesterFromDB,
};
