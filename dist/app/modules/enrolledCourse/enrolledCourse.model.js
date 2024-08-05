"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const enrolledCourse_constant_1 = require("./enrolledCourse.constant");
const courseMarksSchema = new mongoose_1.Schema({
    classTest1: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
    },
    midTerm: {
        type: Number,
        min: 0,
        max: 30,
        default: 0,
    },
    classTest2: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
    },
    finalTerm: {
        type: Number,
        min: 0,
        max: 50,
        default: 0,
    },
}, {
    _id: false,
});
const enrolledCourseSchema = new mongoose_1.Schema({
    semesterRegistration: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'SemesterRegistration',
        required: true,
    },
    academicSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicSemester',
        required: true,
    },
    academicFaculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
        required: true,
    },
    academicDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicDepartment',
        required: true,
    },
    offeredCourse: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'OfferedCourse',
        required: true,
    },
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    student: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    faculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Faculty',
        required: true,
    },
    isEnrolled: {
        type: Boolean,
        default: false,
    },
    courseMarks: {
        type: courseMarksSchema,
        default: {},
    },
    grade: {
        type: String,
        enum: enrolledCourse_constant_1.Grade,
        default: 'NA',
    },
    gradePoints: {
        type: Number,
        min: 0,
        max: 4,
        default: 0,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
});
const EnrolledCourse = mongoose_1.default.model('EnrolledCourse', enrolledCourseSchema);
exports.default = EnrolledCourse;
