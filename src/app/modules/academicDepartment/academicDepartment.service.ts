import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const academicDepartment = await AcademicDepartment.create(payload);
  return academicDepartment;
};

const getAllAcademicDepartmentFromDB = async () => {
  const academicDepartment = await AcademicDepartment.find();
  return academicDepartment;
};

const getAcademicDepartmentByIdFromDB = async (id: string) => {
  const academicDepartment = await AcademicDepartment.findById(id);
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
  );
  return academicDepartment;
};

export const academicDepartmentService = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentFromDB,
  getAcademicDepartmentByIdFromDB,
  updateAcademicDepartmentFromDB,
};
