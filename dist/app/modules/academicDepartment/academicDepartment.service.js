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
exports.academicDepartmentService = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const academicDepartment_model_1 = require("./academicDepartment.model");
const createAcademicDepartmentIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const academicDepartment = yield academicDepartment_model_1.AcademicDepartment.create(payload);
    return academicDepartment;
});
const getAllAcademicDepartmentFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const departmentQuery = new QueryBuilder_1.default(academicDepartment_model_1.AcademicDepartment.find().populate('academicFaculty'), query)
        .search(['name'])
        .paginate()
        .filter()
        .sort()
        .fields();
    const result = yield departmentQuery.modelQuery;
    const meta = yield departmentQuery.countTotal();
    return {
        result,
        meta,
    };
});
const getAcademicDepartmentByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const academicDepartment = yield academicDepartment_model_1.AcademicDepartment.findById(id).populate('academicFaculty');
    return academicDepartment;
});
const updateAcademicDepartmentFromDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const academicDepartment = yield academicDepartment_model_1.AcademicDepartment.findByIdAndUpdate(id, payload, {
        new: true,
    }).populate('academicFaculty');
    return academicDepartment;
});
exports.academicDepartmentService = {
    createAcademicDepartmentIntoDB,
    getAllAcademicDepartmentFromDB,
    getAcademicDepartmentByIdFromDB,
    updateAcademicDepartmentFromDB,
};
