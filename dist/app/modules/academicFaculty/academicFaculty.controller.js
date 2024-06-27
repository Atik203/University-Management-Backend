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
exports.academicFacultyController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const academicFaculty_service_1 = require("./academicFaculty.service");
const createAcademicFaculty = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_service_1.academicFacultyService.createAcademicFacultyIntoDB(req.body);
    res.status(http_status_1.default.OK).json({
        status: 'success',
        message: 'Academic faculty created successfully',
        data: result,
    });
}));
const getAcademicFaculty = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_service_1.academicFacultyService.getAllAcademicFacultyFromDB();
    res.status(http_status_1.default.OK).json({
        status: 'success',
        message: 'Academic faculty fetched successfully',
        data: result,
    });
}));
const getAcademicFacultyById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicFaculty_service_1.academicFacultyService.getAcademicFacultyByIdFromDB(req.params.id);
    res.status(http_status_1.default.OK).json({
        status: 'success',
        message: 'Academic faculty fetched successfully',
        data: result,
    });
}));
const updateAcademicFaculty = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const academicFaculty = req.body;
    const result = yield academicFaculty_service_1.academicFacultyService.updateAcademicFacultyFromDB(id, academicFaculty);
    res.status(http_status_1.default.OK).json({
        status: 'success',
        message: 'Academic faculty updated successfully',
        data: result,
    });
}));
exports.academicFacultyController = {
    createAcademicFaculty,
    getAcademicFaculty,
    getAcademicFacultyById,
    updateAcademicFaculty,
};
