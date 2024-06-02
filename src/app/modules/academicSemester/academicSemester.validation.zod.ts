import { z } from 'zod';
import { Codes, Months, Names } from './academicSemester.constant';

const createAcademicSemesterSchema = z.object({
  body: z.object({
    name: z.enum([...Names] as [string, ...string[]]),
    code: z.enum([...Codes] as [string, ...string[]]),
    year: z.string().min(4).max(4),
    startMonth: z.enum([...Months] as [string, ...string[]]),
    endMonth: z.enum([...Months] as [string, ...string[]]),
  }),
});

const updateAcademicSemesterSchema = z.object({
  body: z.object({
    name: z.enum([...Names] as [string, ...string[]]).optional(),
    code: z.enum([...Codes] as [string, ...string[]]).optional(),
    year: z.string().min(4).max(4).optional(),
    startMonth: z.enum([...Months] as [string, ...string[]]).optional(),
    endMonth: z.enum([...Months] as [string, ...string[]]).optional(),
  }),
});

export const academicSemesterValidation = {
  createAcademicSemesterSchema,
  updateAcademicSemesterSchema,
};
