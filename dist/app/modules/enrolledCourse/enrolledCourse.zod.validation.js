"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrolledCourseValidations = void 0;
const zod_1 = require("zod");
const createEnrolledCourseValidationZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        offeredCourse: zod_1.z.string(),
    }),
});
const updateEnrolledCourseMarksValidationZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        semesterRegistration: zod_1.z.string(),
        offeredCourse: zod_1.z.string(),
        student: zod_1.z.string(),
        courseMarks: zod_1.z.object({
            classTest1: zod_1.z.number().max(10).optional(),
            midTerm: zod_1.z.number().max(30).optional(),
            classTest2: zod_1.z.number().max(10).optional(),
            finalTerm: zod_1.z.number().max(50).optional(),
        }),
    }),
});
exports.enrolledCourseValidations = {
    createEnrolledCourseValidationZodSchema,
    updateEnrolledCourseMarksValidationZodSchema,
};
