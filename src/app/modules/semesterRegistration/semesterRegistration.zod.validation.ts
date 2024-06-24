import { z } from 'zod';

export const createSemesterRegistrationSchema = z.object({
  body: z.object({
    academicSemester: z.string().nonempty(),
    status: z.enum(['UPCOMING', 'ONGOING', 'ENDED']),
    startDate: z.string(),
    endDate: z.string(),
    minCredit: z.number(),
    maxCredit: z.number(),
  }),
});
