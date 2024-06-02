import { z } from 'zod';
import { Codes, Months, Names } from './academicSemester.constant';

export const createAcademicSemesterSchema = z.object({
  body: z.object({
    name: z.enum([...Names] as [string, ...string[]]),
    code: z.enum([...Codes] as [string, ...string[]]),
    year: z.date(),
    startMonth: z.enum([...Months] as [string, ...string[]]),
    endMonth: z.enum([...Months] as [string, ...string[]]),
  }),
});

export const academicSemesterSchema = {
  createAcademicSemesterSchema,
};
