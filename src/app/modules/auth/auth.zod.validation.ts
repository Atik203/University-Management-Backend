import { z } from 'zod';

export const loginValidationSchema = z.object({
  body: z.object({
    id: z
      .string({
        required_error: 'id is required',
      })
      .min(2, {
        message: 'id must be at least 4 characters long',
      })
      .max(20, {
        message: 'id must be at most 20 characters long',
      }),
    password: z
      .string({
        required_error: 'password is required',
      })
      .min(6, {
        message: 'password must be at least 6 characters long',
      })
      .max(50, {
        message: 'password must be at most 50 characters long',
      }),
  }),
});
