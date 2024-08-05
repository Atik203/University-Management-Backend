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
exports.academicDepartmentController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const academicDepartment_service_1 = require("./academicDepartment.service");
const createAcademicDepartment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_service_1.academicDepartmentService.createAcademicDepartmentIntoDB(req.body);
    res.status(http_status_1.default.OK).json({
        status: 'success',
        message: 'Academic Department created successfully',
        data: result,
    });
}));
const getAcademicDepartment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_service_1.academicDepartmentService.getAllAcademicDepartmentFromDB(req.query);
    res.status(http_status_1.default.OK).json({
        status: 'success',
        message: 'Academic Department fetched successfully',
        meta: result.meta,
        data: result.result,
    });
}));
const getAcademicDepartmentById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicDepartment_service_1.academicDepartmentService.getAcademicDepartmentByIdFromDB(req.params.id);
    res.status(http_status_1.default.OK).json({
        status: 'success',
        message: 'Academic Department fetched successfully',
        data: result,
    });
}));
const updateAcademicDepartment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const academicDepartment = req.body;
    const result = yield academicDepartment_service_1.academicDepartmentService.updateAcademicDepartmentFromDB(id, academicDepartment);
    res.status(http_status_1.default.OK).json({
        status: 'success',
        message: 'Academic Department updated successfully',
        data: result,
    });
}));
exports.academicDepartmentController = {
    createAcademicDepartment,
    getAcademicDepartment,
    getAcademicDepartmentById,
    updateAcademicDepartment,
};
