import { Schema, model } from 'mongoose';

export const academicFacultySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const AcademicFaculty = model('AcademicFaculty', academicFacultySchema);
