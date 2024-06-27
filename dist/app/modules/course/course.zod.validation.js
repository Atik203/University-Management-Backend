"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignFacultiesValidationSchema = exports.updateCourseValidationSchema = exports.createCourseValidationSchema = void 0;
const zod_1 = require("zod");
exports.createCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1),
        prefix: zod_1.z.string().min(1),
        code: zod_1.z.number().int(),
        credits: zod_1.z.number().int(),
        preRequisiteCourses: zod_1.z
            .array(zod_1.z.object({
            course: zod_1.z.string().min(1).optional(),
        }))
            .optional(),
    }),
});
exports.updateCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1).optional(),
        prefix: zod_1.z.string().min(1).optional(),
        code: zod_1.z.number().int().optional(),
        credits: zod_1.z.number().int().optional(),
        preRequisiteCourses: zod_1.z
            .array(zod_1.z.object({
            course: zod_1.z.string().min(1).optional(),
        }))
            .optional(),
    }),
});
exports.assignFacultiesValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        faculties: zod_1.z.array(zod_1.z.string().min(1)),
    }),
});
