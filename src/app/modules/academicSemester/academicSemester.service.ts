import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (
  academicSemester: TAcademicSemester,
) => {
  const result = await AcademicSemester.create(academicSemester);
  return result;
};

export const academicSemesterService = {
  createAcademicSemesterIntoDB,
};
