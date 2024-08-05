import QueryBuilder from '../../builder/QueryBuilder';
import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const academicFaculty = await AcademicFaculty.create(payload);
  return academicFaculty;
};

const getAllAcademicFacultyFromDB = async (query: Record<string, unknown>) => {
  const academicFacultyQuery = new QueryBuilder(AcademicFaculty.find(), query)
    .search(['name'])
    .paginate()
    .filter()
    .sort()
    .fields();

  const result = await academicFacultyQuery.modelQuery;
  const meta = await academicFacultyQuery.countTotal();

  return {
    result,
    meta,
  };
};

const getAcademicFacultyByIdFromDB = async (id: string) => {
  const academicFaculty = await AcademicFaculty.findById(id);
  return academicFaculty;
};

const updateAcademicFacultyFromDB = async (
  id: string,
  payload: TAcademicFaculty,
) => {
  const academicFaculty = await AcademicFaculty.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return academicFaculty;
};

export const academicFacultyService = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultyFromDB,
  getAcademicFacultyByIdFromDB,
  updateAcademicFacultyFromDB,
};
