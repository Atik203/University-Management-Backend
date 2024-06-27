"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSemesterValidation = void 0;
const zod_1 = require("zod");
const academicSemester_constant_1 = require("./academicSemester.constant");
const createAcademicSemesterSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.enum([...academicSemester_constant_1.Names]),
        code: zod_1.z.enum([...academicSemester_constant_1.Codes]),
        year: zod_1.z.string().min(4).max(4),
        startMonth: zod_1.z.enum([...academicSemester_constant_1.Months]),
        endMonth: zod_1.z.enum([...academicSemester_constant_1.Months]),
    }),
});
const updateAcademicSemesterSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.enum([...academicSemester_constant_1.Names]).optional(),
        code: zod_1.z.enum([...academicSemester_constant_1.Codes]).optional(),
        year: zod_1.z.string().min(4).max(4).optional(),
        startMonth: zod_1.z.enum([...academicSemester_constant_1.Months]).optional(),
        endMonth: zod_1.z.enum([...academicSemester_constant_1.Months]).optional(),
    }),
});
exports.academicSemesterValidation = {
    createAcademicSemesterSchema,
    updateAcademicSemesterSchema,
};
