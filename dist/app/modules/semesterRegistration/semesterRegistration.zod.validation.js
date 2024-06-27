"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSemesterRegistrationSchema = exports.createSemesterRegistrationSchema = void 0;
const zod_1 = require("zod");
exports.createSemesterRegistrationSchema = zod_1.z.object({
    body: zod_1.z.object({
        academicSemester: zod_1.z.string().nonempty(),
        status: zod_1.z.enum(['UPCOMING', 'ONGOING', 'ENDED']),
        startDate: zod_1.z.string(),
        endDate: zod_1.z.string(),
        minCredit: zod_1.z.number(),
        maxCredit: zod_1.z.number(),
    }),
});
exports.updateSemesterRegistrationSchema = zod_1.z.object({
    body: zod_1.z.object({
        academicSemester: zod_1.z.string().optional(),
        status: zod_1.z.enum(['UPCOMING', 'ONGOING', 'ENDED']).optional(),
        startDate: zod_1.z.string().optional(),
        endDate: zod_1.z.string().optional(),
        minCredit: zod_1.z.number().optional(),
        maxCredit: zod_1.z.number().optional(),
    }),
});
