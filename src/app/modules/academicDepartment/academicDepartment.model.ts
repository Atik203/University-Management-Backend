import { model, Schema } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';

export const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

academicDepartmentSchema.pre('save', async function (next) {
  const academicDepartment = this as TAcademicDepartment;

  const isDepartmentExist = await AcademicDepartment.findOne({
    name: academicDepartment.name,
  });
  if (isDepartmentExist) {
    throw new Error('Department already exist');
  }

  next();
});

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isDepartmentExist = await AcademicDepartment.findById(query._id);
  if (!isDepartmentExist) {
    throw new Error('Department does not exist');
  }

  next();
});

export const AcademicDepartment = model(
  'AcademicDepartment',
  academicDepartmentSchema,
);
