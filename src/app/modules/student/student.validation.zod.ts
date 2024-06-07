import { z } from 'zod';

const userNameSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().min(1, 'Middle name is required'),
  lastName: z.string().min(1, 'Last name is required'),
});

const guardianSchema = z.object({
  fatherName: z.string().min(1, 'Father name is required'),
  fatherOccupation: z.string().min(1, 'Father occupation is required'),
  fatherContactNo: z.string().min(1, 'Father contact number is required'),
  motherName: z.string().min(1, 'Mother name is required'),
  motherOccupation: z.string().min(1, 'Mother occupation is required'),
  motherContactNo: z.string().min(1, 'Mother contact number is required'),
});

const localGuardianSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  occupation: z.string().min(1, 'Occupation is required'),
  contactNo: z.string().min(1, 'Contact number is required'),
  address: z.string().min(1, 'Address is required'),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().min(4, 'Password must be at least 6 characters'),
    student: z.object({
      name: userNameSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email().min(1, 'Email is required'),
      contactNo: z.string().min(1, 'Contact number is required'),
      emergencyContactNo: z
        .string()
        .min(1, 'Emergency contact number is required'),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string().min(1, 'Present address is required'),
      permanentAddress: z.string().min(1, 'Permanent address is required'),
      guardian: guardianSchema,
      localGuardian: localGuardianSchema,
      profileImg: z.string().optional(),
      admissionSemester: z.string().min(1, 'Admission semester is required'),
      academicDepartment: z.string().min(1, 'Academic department is required'),
    }),
  }),
});

const updateUserNameSchema = z.object({
  firstName: z.string().min(1, 'First name is required').optional(),
  middleName: z.string().min(1, 'Middle name is required').optional(),
  lastName: z.string().min(1, 'Last name is required').optional(),
});

const updateGuardianSchema = z.object({
  fatherName: z.string().min(1, 'Father name is required').optional(),
  fatherOccupation: z
    .string()
    .min(1, 'Father occupation is required')
    .optional(),
  fatherContactNo: z
    .string()
    .min(1, 'Father contact number is required')
    .optional(),
  motherName: z.string().min(1, 'Mother name is required').optional(),
  motherOccupation: z
    .string()
    .min(1, 'Mother occupation is required')
    .optional(),
  motherContactNo: z
    .string()
    .min(1, 'Mother contact number is required')
    .optional(),
});

const updateLocalGuardianSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  occupation: z.string().min(1, 'Occupation is required').optional(),
  contactNo: z.string().min(1, 'Contact number is required').optional(),
  address: z.string().min(1, 'Address is required').optional(),
});

const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameSchema.optional(),
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().min(1, 'Email is required').optional(),
      contactNo: z.string().min(1, 'Contact number is required').optional(),
      emergencyContactNo: z
        .string()
        .min(1, 'Emergency contact number is required')
        .optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z
        .string()
        .min(1, 'Present address is required')
        .optional(),
      permanentAddress: z
        .string()
        .min(1, 'Permanent address is required')
        .optional(),
      guardian: updateGuardianSchema.optional(),
      localGuardian: updateLocalGuardianSchema.optional(),
      profileImg: z.string().optional(),
      admissionSemester: z
        .string()
        .min(1, 'Admission semester is required')
        .optional(),
      academicDepartment: z
        .string()
        .min(1, 'Academic department is required')
        .optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
