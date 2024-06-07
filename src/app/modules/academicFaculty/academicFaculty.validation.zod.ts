import { z } from 'zod';

const academicFacultyValidationSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name must be a string',
    })
    .min(1, { message: 'Name is required' })
    .max(255, { message: 'Name is too long' }),
});

export const academicFacultyValidation = {
  academicFacultyValidationSchema,
};
