import { model, Schema } from 'mongoose';
import AppError from '../../Errors/AppError';
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

// handle the duplicate semester in the same year

academicSemesterSchema.pre('save', async function (next) {
  const { name, year } = this as TAcademicSemester;
  const semester = await AcademicSemester.findOne({ name, year });
  if (semester) {
    throw new AppError(400, 'The semester already exists in the same year');
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
