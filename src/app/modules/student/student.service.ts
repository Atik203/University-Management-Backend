import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../Errors/AppError';
import { User } from '../user/user.model';
import { Student } from './student.model';

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
    .populate('admissionSemester');
  return result;
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
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
