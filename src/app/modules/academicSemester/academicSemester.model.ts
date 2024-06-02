import { model, Schema } from 'mongoose';
import { Codes, Months, Names } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';

export const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: Names,
    },
    code: {
      type: String,
      enum: Codes,
    },
    year: {
      type: String,
    },
    startMonth: {
      type: String,
      enum: Months,
    },
    endMonth: {
      type: String,
      enum: Months,
    },
  },
  {
    timestamps: true,
  },
);

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
