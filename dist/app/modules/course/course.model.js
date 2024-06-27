"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = exports.CourseFaculty = exports.courseSchema = void 0;
const mongoose_1 = require("mongoose");
const preRequisiteCourses = new mongoose_1.Schema({
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Course',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});
exports.courseSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    prefix: {
        type: String,
        required: true,
        trim: true,
    },
    code: {
        type: Number,
        required: true,
        unique: true,
    },
    credits: {
        type: Number,
        required: true,
    },
    preRequisiteCourses: [preRequisiteCourses],
    isDeleted: {
        type: Boolean,
        default: false,
    },
});
const courseFacultySchema = new mongoose_1.Schema({
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Course',
        unique: true,
    },
    faculties: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Faculty',
        },
    ],
}, { timestamps: true });
exports.CourseFaculty = (0, mongoose_1.model)('CourseFaculty', courseFacultySchema);
exports.Course = (0, mongoose_1.model)('Course', exports.courseSchema);
