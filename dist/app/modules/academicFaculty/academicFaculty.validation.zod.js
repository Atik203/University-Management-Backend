"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicFacultyValidation = void 0;
const zod_1 = require("zod");
const academicFacultyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            invalid_type_error: 'Name must be a string',
        })
            .min(1, { message: 'Name is required' })
            .max(255, { message: 'Name is too long' }),
    }),
});
const updateAcademicFacultySchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            invalid_type_error: 'Name must be a string',
        })
            .min(1, { message: 'Name is required' })
            .max(255, { message: 'Name is too long' }),
    }),
});
exports.academicFacultyValidation = {
    academicFacultyValidationSchema,
    updateAcademicFacultySchema,
};
