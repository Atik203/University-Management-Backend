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
exports.academicFacultyService = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const academicFaculty_model_1 = require("./academicFaculty.model");
const createAcademicFacultyIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const academicFaculty = yield academicFaculty_model_1.AcademicFaculty.create(payload);
    return academicFaculty;
});
const getAllAcademicFacultyFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const academicFacultyQuery = new QueryBuilder_1.default(academicFaculty_model_1.AcademicFaculty.find(), query)
        .search(['name'])
        .paginate()
        .filter()
        .sort()
        .fields();
    const result = yield academicFacultyQuery.modelQuery;
    const meta = yield academicFacultyQuery.countTotal();
    return {
        result,
        meta,
    };
});
const getAcademicFacultyByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const academicFaculty = yield academicFaculty_model_1.AcademicFaculty.findById(id);
    return academicFaculty;
});
const updateAcademicFacultyFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const academicFaculty = yield academicFaculty_model_1.AcademicFaculty.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return academicFaculty;
});
exports.academicFacultyService = {
    createAcademicFacultyIntoDB,
    getAllAcademicFacultyFromDB,
    getAcademicFacultyByIdFromDB,
    updateAcademicFacultyFromDB,
};
