import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../Errors/AppError';

import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentID } from './user.utils';
const createStudentIntoDB = async (
  password: string,
  student: Partial<TStudent>,
) => {
  const admissionSemester = await AcademicSemester.findById(
    student.admissionSemester,
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    if (!admissionSemester) {
      throw new AppError(404, 'Admission semester not found');
    }

    const user: Partial<TUser> = {
      password: password || (config.default_password as string),
      role: 'student',
      id: await generateStudentID(admissionSemester),
    };

    // transaction 1
    const newUser = await User.create([user], { session }); // array

    if (!newUser.length) {
      throw new AppError(500, 'Error creating user');
    }

    student.id = newUser[0].id;
    student.user = newUser[0]._id;
    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new AppError(500, 'Error creating student');
    }

    await session.commitTransaction();
    session.endSession();

    return newStudent[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
  }
};

export const userService = {
  createStudentIntoDB,
};
