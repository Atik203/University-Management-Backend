"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterRegistration = void 0;
const mongoose_1 = require("mongoose");
const semesterRegistration_constant_1 = require("./semesterRegistration.constant");
const semesterRegistrationSchema = new mongoose_1.Schema({
    academicSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AcademicSemester',
        required: true,
    },
    status: {
        type: String,
        enum: semesterRegistration_constant_1.semesterRegistrationStatus,
        default: 'UPCOMING',
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    minCredit: {
        type: Number,
        required: true,
    },
    maxCredit: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
exports.SemesterRegistration = (0, mongoose_1.model)('SemesterRegistration', semesterRegistrationSchema);
