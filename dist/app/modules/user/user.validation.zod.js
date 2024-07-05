"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeStatusValidationSchema = exports.userValidationSchema = void 0;
const zod_1 = require("zod");
exports.userValidationSchema = zod_1.z.object({
    password: zod_1.z
        .string({
        invalid_type_error: 'Password must be a string',
    })
        .min(6, { message: 'Password must be at least 6 characters long' })
        .max(20, { message: 'Password must be at most 20 characters long' })
        .optional(),
});
exports.changeStatusValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(['in-progress', 'blocked']),
    }),
});
