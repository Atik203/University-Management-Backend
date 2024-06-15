import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../Errors/AppError';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // search
  const searchTerm = query.searchTerm ? query.searchTerm : '';
  const searchRegex = new RegExp(searchTerm as string, 'i');
  const studentSearchAbleFields = ['name.firstName', 'name.lastName', 'email'];

  const SearchQuery = Student.find({
    $or: studentSearchAbleFields.map((key) => ({
      [key]: searchRegex,
    })),
  });

  // filtering

  const queryObject = { ...query };
  const excludedFields = ['searchTerm', 'page', 'limit', 'sort'];

  excludedFields.forEach((field) => {
    if (queryObject[field]) {
      delete queryObject[field];
    }
  });

  const filterQuery = SearchQuery.find(queryObject)
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
    .populate('admissionSemester');

  // sort

  const sort = query.sort ? query.sort : '-createdAt';

  const sortQuery = filterQuery.sort(sort as string);

  // limit

  const limit = query.limit ? parseInt(query.limit as string) : 1;

  const limitQuery = await sortQuery.limit(limit);

  return limitQuery;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
    .populate('admissionSemester');
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const student = await Student.isStudentExists(id);
  if (student === null) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Student not found and failed to delete',
    );
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { session, new: true },
    );

    if (!deletedStudent) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Student not found and failed to delete',
      );
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { session, new: true },
    );

    if (!deletedUser) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'User not found and failed to delete',
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to delete student',
    );
  }
};

const updateStudentInDB = async (id: string, updateData: Partial<TStudent>) => {
  const student = await Student.isStudentExists(id);
  if (student === null) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Student not found and failed to update',
    );
  }

  const { name, guardian, localGuardian, ...remaining } = updateData;

  const modifiedData: Record<string, unknown> = {
    ...remaining,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedData[`localGuardian.${key}`] = value;
    }
  }

  const updatedStudent = await Student.findOneAndUpdate({ id }, modifiedData, {
    new: true,
    runValidators: true,
  });

  return updatedStudent;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentInDB,
};
