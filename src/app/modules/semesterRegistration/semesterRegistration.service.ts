import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

const createSemesterRegistrationIntoDB = async (
  payload: Partial<TSemesterRegistration>,
) => {
  const isAlreadyRegistered = await SemesterRegistration.findById(
    payload.academicSemester,
  );
  if (isAlreadyRegistered) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Semester Registration already exists',
    );
  }

  const isAcademicSemesterExist = await AcademicSemester.findById(
    payload.academicSemester,
  );
  if (!isAcademicSemesterExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic Semester does not exist',
    );
  }

  const result = SemesterRegistration.create(payload);
  return result;
};

export const semesterRegistrationService = {
  createSemesterRegistrationIntoDB,
};
