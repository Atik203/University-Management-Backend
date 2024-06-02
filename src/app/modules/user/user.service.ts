import config from '../../config';

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

  if (!admissionSemester) {
    throw new Error('Admission semester not found');
  }

  const user: Partial<TUser> = {
    password: password || (config.default_password as string),
    role: 'student',
    id: await generateStudentID(admissionSemester),
  };

  const newUser = await User.create(user);

  if (Object.keys(newUser).length) {
    student.id = newUser.id;
    student.user = newUser._id;
    const newStudent: TStudent = await Student.create(student);
    return newStudent;
  }
};

export const userService = {
  createStudentIntoDB,
};
