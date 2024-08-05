import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../Errors/AppError';
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
    throw new AppError(400, 'Invalid semester code');
  }

  const result = await AcademicSemester.create(academicSemester);
  return result;
};

const getAcademicSemesterFromDB = async (query: Record<string, unknown>) => {
  const academicSemesterQuery = new QueryBuilder(AcademicSemester.find(), query)
    .search(['name'])
    .paginate()
    .filter()
    .sort()
    .fields();

  const result = await academicSemesterQuery.modelQuery;
  const meta = await academicSemesterQuery.countTotal();

  return {
    result,
    meta,
  };
};

const getAcademicSemesterByIdFromDB = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateAcademicSemesterFromDB = async (
  id: string,
  academicSemester: TAcademicSemester,
) => {
  if (
    academicSemesterNameCodeMapper[academicSemester.name] !==
    academicSemester.code
  ) {
    throw new AppError(400, 'Invalid semester code');
  }

  const result = await AcademicSemester.findByIdAndUpdate(
    id,
    academicSemester,
    {
      new: true,
    },
  );
  return result;
};

export const academicSemesterService = {
  createAcademicSemesterIntoDB,
  getAcademicSemesterFromDB,
  getAcademicSemesterByIdFromDB,
  updateAcademicSemesterFromDB,
};
