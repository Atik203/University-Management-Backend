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

export const studentValidationSchema = z.object({
  name: userNameSchema,
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string().optional(),
  email: z.string().email().min(1, 'Email is required'),
  contactNo: z.string().min(1, 'Contact number is required'),
  emergencyContactNo: z.string().min(1, 'Emergency contact number is required'),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  presentAddress: z.string().min(1, 'Present address is required'),
  permanentAddress: z.string().min(1, 'Permanent address is required'),
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: z.string().optional(),
  isDeleted: z.boolean().optional(),
});

export default studentValidationSchema;
