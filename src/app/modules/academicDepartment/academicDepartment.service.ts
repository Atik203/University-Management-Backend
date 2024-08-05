import QueryBuilder from '../../builder/QueryBuilder';
import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const academicDepartment = await AcademicDepartment.create(payload);
  return academicDepartment;
};

const getAllAcademicDepartmentFromDB = async (
  query: Record<string, unknown>,
) => {
  const departmentQuery = new QueryBuilder(
    AcademicDepartment.find().populate('academicFaculty'),
    query,
  )
    .search(['name'])
    .paginate()
    .filter()
    .sort()
    .fields();

  const result = await departmentQuery.modelQuery;
  const meta = await departmentQuery.countTotal();

  return {
    result,
    meta,
  };
};

const getAcademicDepartmentByIdFromDB = async (id: string) => {
  const academicDepartment =
    await AcademicDepartment.findById(id).populate('academicFaculty');
  return academicDepartment;
};

const updateAcademicDepartmentFromDB = async (
  id: string,
  payload: TAcademicDepartment,
) => {
  const academicDepartment = await AcademicDepartment.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
    },
  ).populate('academicFaculty');
  return academicDepartment;
};

export const academicDepartmentService = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentFromDB,
  getAcademicDepartmentByIdFromDB,
  updateAcademicDepartmentFromDB,
};
