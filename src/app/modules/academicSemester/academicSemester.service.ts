import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (
  academicSemester: TAcademicSemester,
) => {
  if (
    academicSemesterNameCodeMapper[academicSemester.name] !==
    academicSemester.code
  ) {
    throw new Error('Invalid semester code');
  }

  const result = await AcademicSemester.create(academicSemester);
  return result;
};

const getAcademicSemesterFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getAcademicSemesterByIdFromDB = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

export const academicSemesterService = {
  createAcademicSemesterIntoDB,
  getAcademicSemesterFromDB,
  getAcademicSemesterByIdFromDB,
};
