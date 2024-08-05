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
exports.enrolledCourseController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const enrolledCourse_service_1 = require("./enrolledCourse.service");
const createEnrolledCourse = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield enrolledCourse_service_1.enrolledCourseService.createEnrolledCourseIntoDB(req.user.id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Enrolled course created successfully',
        data: result,
    });
}));
const updateEnrolledCourse = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield enrolledCourse_service_1.enrolledCourseService.updateEnrolledCourseMarksIntoDB(req.user.id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Marks Updated successfully',
        data: result,
    });
}));
const getAllEnrolledCourses = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield enrolledCourse_service_1.enrolledCourseService.getAllEnrolledCoursesFromDB(req.query);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'All Enrolled Courses retrieved successfully',
        meta: result.meta,
        data: result.result,
    });
}));
const getSingleEnrolledCourse = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield enrolledCourse_service_1.enrolledCourseService.getSingleEnrolledCourseFromDB(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Single Enrolled Course retrieved successfully',
        data: result,
    });
}));
const getMyEnrolledCourses = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield enrolledCourse_service_1.enrolledCourseService.getMyEnrolledCoursesFromDB(req.user.id, req.query);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'My Enrolled Courses retrieved successfully',
        meta: result.meta,
        data: result.result,
    });
}));
exports.enrolledCourseController = {
    createEnrolledCourse,
    updateEnrolledCourse,
    getAllEnrolledCourses,
    getSingleEnrolledCourse,
    getMyEnrolledCourses,
};
