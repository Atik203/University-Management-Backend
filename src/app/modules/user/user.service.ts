/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../Errors/AppError';
import { sendImageToCloudnary } from '../../utils/sendImageToCloudnary';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { Admin } from '../admin/admin.model';
import { TFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentID,
} from './user.utils';
const createStudentIntoDB = async (
  password: string,
  student: Partial<TStudent>,

  file: any,
): Promise<TStudent> => {
  const admissionSemester = await AcademicSemester.findById(
    student.admissionSemester,
  );
  if (!admissionSemester) {
    throw new AppError(404, 'Admission semester not found');
  }
  const academicDepartment = await AcademicDepartment.findById(
    student.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic department not found');
  }

  student.academicFaculty = academicDepartment.academicFaculty;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const id = await generateStudentID(admissionSemester);
    if (file) {
      const imageName = `${id}-${student.name?.firstName}-${student.name?.lastName}`;
      const path = file.path;
      const profileImg = await sendImageToCloudnary(imageName, path);
      student.profileImg = profileImg;
    }

    const user: Partial<TUser> = {
      password: password || (config.default_password as string),
      role: 'student',
      id,
      email: student.email,
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
    throw new AppError(httpStatus.BAD_REQUEST, 'Error creating student');
  }
};

const createFacultyIntoDB = async (
  password: string,
  payload: TFaculty,
  file: any,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'faculty';
  userData.email = payload.email;

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  // set academic faculty
  payload.academicFaculty = academicDepartment.academicFaculty;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id

    const id = await generateFacultyId();
    userData.id = id;
    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    // upload image to cloudinary

    if (file) {
      const imageName = `${id}-${payload.name?.firstName}-${payload.name?.lastName}`;
      const path = file.path;
      const profileImg = await sendImageToCloudnary(imageName, path);
      payload.profileImg = profileImg;
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, (err as Error).message);
  }
};

const createAdminIntoDB = async (
  password: string,
  payload: TFaculty,
  file: any,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'admin';
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id

    const id = await generateAdminId();

    userData.id = id;

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    if (file) {
      // upload image to cloudinary
      const imageName = `${id}-${payload.name?.firstName}-${payload.name?.lastName}`;
      const path = file.path;
      const profileImg = await sendImageToCloudnary(imageName, path);
      payload.profileImg = profileImg;
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, (err as Error).message);
  }
};

const getMeService = async (id: string, role: string) => {
  let result = null;

  if (role === 'student') {
    result = await Student.findOne({ id })
      .populate('user')
      .populate('academicSemester')
      .populate('academicDepartment');
  }
  if (role === 'faculty') {
    result = await Faculty.findOne({ id })
      .populate('user')
      .populate('academicDepartment');
  }
  if (role === 'admin') {
    result = await Admin.findOne({ id }).populate('user');
  }
  if (role === 'superAdmin') {
    result = await User.findOne({ id });
  }

  return result;
};

const changeStatusService = async (id: string, status: string) => {
  // user exists or not

  const user = await User.findOne({ _id: id });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // check user is deleted or not

  if (user.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is already deleted');
  }

  const result = await User.findOneAndUpdate(
    { _id: id },
    { status },
    { new: true },
  );
  return result;
};

export const userService = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMeService,
  changeStatusService,
};
