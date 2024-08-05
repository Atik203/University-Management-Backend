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
exports.academicSemesterController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const academicSemester_service_1 = require("./academicSemester.service");
const createAcademicSemester = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_service_1.academicSemesterService.createAcademicSemesterIntoDB(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Academic semester created successfully',
        data: result,
    });
}));
const getAcademicSemester = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_service_1.academicSemesterService.getAcademicSemesterFromDB(req.query);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Academic semester fetched successfully',
        meta: result.meta,
        data: result.result,
    });
}));
const getAcademicSemesterById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_service_1.academicSemesterService.getAcademicSemesterByIdFromDB(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Academic semester fetched successfully',
        data: result,
    });
}));
const updateAcademicSemester = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const academicSemester = req.body;
    const result = yield academicSemester_service_1.academicSemesterService.updateAcademicSemesterFromDB(id, academicSemester);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Academic semester updated successfully',
        data: result,
    });
}));
exports.academicSemesterController = {
    createAcademicSemester,
    getAcademicSemester,
    getAcademicSemesterById,
    updateAcademicSemester,
};
