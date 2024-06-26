import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../Errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

const createSemesterRegistrationIntoDB = async (
  payload: Partial<TSemesterRegistration>,
) => {
  // check if there any registered semester ONGOING or UPCOMING

  const isOngoingOrUpcomingSemester = await SemesterRegistration.findOne({
    $or: [{ status: 'ONGOING' }, { status: 'UPCOMING' }],
  });

  if (isOngoingOrUpcomingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an ${isOngoingOrUpcomingSemester.status} semester registration`,
    );
  }

  // Check if the semester registration already exists
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

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = SemesterRegistration.findById(id);
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  // Check if the semester registration already exists
  const isAcademicSemesterExist = await SemesterRegistration.findById(
    payload.academicSemester,
  );
  if (!isAcademicSemesterExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic Semester does not exist',
    );
  }

  // check if requested semester registration ENDED
  const currentSemesterStatus = isAcademicSemesterExist?.status;
  if (currentSemesterStatus === 'ENDED') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Semester Registration has already ENDED',
    );
  }

  const result = SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const semesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
