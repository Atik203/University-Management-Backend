import { z } from 'zod';

export const userValidationSchema = z.object({
  id: z.string(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(20, 'Password must be at most 20 characters long'),
  needsPasswordChange: z.boolean().optional(),
  role: z.enum(['admin', 'student', 'faculty']),
  status: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean().default(false).optional(),
});
