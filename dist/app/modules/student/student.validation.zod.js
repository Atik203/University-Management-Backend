"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentValidations = void 0;
const zod_1 = require("zod");
const userNameSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, 'First name is required'),
    middleName: zod_1.z.string().min(1, 'Middle name is required'),
    lastName: zod_1.z.string().min(1, 'Last name is required'),
});
const guardianSchema = zod_1.z.object({
    fatherName: zod_1.z.string().min(1, 'Father name is required'),
    fatherOccupation: zod_1.z.string().min(1, 'Father occupation is required'),
    fatherContactNo: zod_1.z.string().min(1, 'Father contact number is required'),
    motherName: zod_1.z.string().min(1, 'Mother name is required'),
    motherOccupation: zod_1.z.string().min(1, 'Mother occupation is required'),
    motherContactNo: zod_1.z.string().min(1, 'Mother contact number is required'),
});
const localGuardianSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    occupation: zod_1.z.string().min(1, 'Occupation is required'),
    contactNo: zod_1.z.string().min(1, 'Contact number is required'),
    address: zod_1.z.string().min(1, 'Address is required'),
});
const createStudentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().min(4, 'Password must be at least 6 characters'),
        student: zod_1.z.object({
            name: userNameSchema,
            gender: zod_1.z.enum(['male', 'female', 'other']),
            dateOfBirth: zod_1.z.string().optional(),
            email: zod_1.z.string().email().min(1, 'Email is required'),
            contactNo: zod_1.z.string().min(1, 'Contact number is required'),
            emergencyContactNo: zod_1.z
                .string()
                .min(1, 'Emergency contact number is required'),
            bloodGroup: zod_1.z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
            presentAddress: zod_1.z.string().min(1, 'Present address is required'),
            permanentAddress: zod_1.z.string().min(1, 'Permanent address is required'),
            guardian: guardianSchema,
            localGuardian: localGuardianSchema,
            profileImg: zod_1.z.string().optional(),
            admissionSemester: zod_1.z.string().min(1, 'Admission semester is required'),
            academicDepartment: zod_1.z.string().min(1, 'Academic department is required'),
        }),
    }),
});
const updateUserNameSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, 'First name is required').optional(),
    middleName: zod_1.z.string().min(1, 'Middle name is required').optional(),
    lastName: zod_1.z.string().min(1, 'Last name is required').optional(),
});
const updateGuardianSchema = zod_1.z.object({
    fatherName: zod_1.z.string().min(1, 'Father name is required').optional(),
    fatherOccupation: zod_1.z
        .string()
        .min(1, 'Father occupation is required')
        .optional(),
    fatherContactNo: zod_1.z
        .string()
        .min(1, 'Father contact number is required')
        .optional(),
    motherName: zod_1.z.string().min(1, 'Mother name is required').optional(),
    motherOccupation: zod_1.z
        .string()
        .min(1, 'Mother occupation is required')
        .optional(),
    motherContactNo: zod_1.z
        .string()
        .min(1, 'Mother contact number is required')
        .optional(),
});
const updateLocalGuardianSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required').optional(),
    occupation: zod_1.z.string().min(1, 'Occupation is required').optional(),
    contactNo: zod_1.z.string().min(1, 'Contact number is required').optional(),
    address: zod_1.z.string().min(1, 'Address is required').optional(),
});
const updateStudentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        student: zod_1.z.object({
            name: updateUserNameSchema.optional(),
            gender: zod_1.z.enum(['male', 'female', 'other']).optional(),
            dateOfBirth: zod_1.z.string().optional(),
            email: zod_1.z.string().email().min(1, 'Email is required').optional(),
            contactNo: zod_1.z.string().min(1, 'Contact number is required').optional(),
            emergencyContactNo: zod_1.z
                .string()
                .min(1, 'Emergency contact number is required')
                .optional(),
            bloodGroup: zod_1.z
                .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
                .optional(),
            presentAddress: zod_1.z
                .string()
                .min(1, 'Present address is required')
                .optional(),
            permanentAddress: zod_1.z
                .string()
                .min(1, 'Permanent address is required')
                .optional(),
            guardian: updateGuardianSchema.optional(),
            localGuardian: updateLocalGuardianSchema.optional(),
            profileImg: zod_1.z.string().optional(),
            admissionSemester: zod_1.z
                .string()
                .min(1, 'Admission semester is required')
                .optional(),
            academicDepartment: zod_1.z
                .string()
                .min(1, 'Academic department is required')
                .optional(),
        }),
    }),
});
exports.studentValidations = {
    createStudentValidationSchema,
    updateStudentValidationSchema,
};
