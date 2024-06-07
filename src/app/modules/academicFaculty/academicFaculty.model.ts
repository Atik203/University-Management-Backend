import { Schema, model } from 'mongoose';
import AppError from '../../Errors/AppError';
import { TAcademicFaculty } from './academicFaculty.interface';

export const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

academicFacultySchema.pre('save', async function (next) {
  const academicFaculty = this as TAcademicFaculty;

  const isFacultyExist = await AcademicFaculty.findOne({
    name: academicFaculty.name,
  });
  if (isFacultyExist) {
    throw new AppError(404, 'Faculty already exist');
  }

  next();
});

academicFacultySchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isFacultyExist = await AcademicFaculty.findById(query._id);
  if (!isFacultyExist) {
    throw new AppError(404, 'Faculty does not exist');
  }

  next();
});

export const AcademicFaculty = model('AcademicFaculty', academicFacultySchema);
