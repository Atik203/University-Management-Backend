import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const academicFaculty = await AcademicFaculty.create(payload);
  return academicFaculty;
};

const getAllAcademicFacultyFromDB = async () => {
  const academicFaculty = await AcademicFaculty.find();
  return academicFaculty;
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
