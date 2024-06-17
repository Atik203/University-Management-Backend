import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../Errors/AppError';
import { User } from '../user/user.model';
import { searchAbleFields } from './student.constant';
import { TStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      })
      .populate('admissionSemester'),
    query,
  )
    .search(searchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;

  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById(id)
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

    const deletedStudent = await Student.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { session, new: true },
    );

    if (!deletedStudent) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Student not found and failed to delete',
      );
    }

    const userId = deletedStudent.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
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

  const updatedStudent = await Student.findByIdAndUpdate(id, modifiedData, {
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
