import { z } from 'zod';

export const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    prefix: z.string().min(1),
    code: z.number().int(),
    credits: z.number().int(),
    preRequisiteCourses: z
      .array(
        z.object({
          course: z.string().min(1).optional(),
        }),
      )
      .optional(),
  }),
});

export const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    prefix: z.string().min(1).optional(),
    code: z.number().int().optional(),
    credits: z.number().int().optional(),
    preRequisiteCourses: z
      .array(
        z.object({
          course: z.string().min(1).optional(),
        }),
      )
      .optional(),
  }),
});

export const assignFacultiesValidationSchema = z.object({
  body: z.object({
    faculties: z.array(z.string().min(1)),
  }),
});
