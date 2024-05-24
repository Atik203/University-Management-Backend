import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
const createStudentIntoDB = async (
  password: string,
  student: Partial<TStudent>,
) => {
  const date = new Date();
  const fullYear = date.getFullYear().toString(); // get full year 2024
  const year = date.getFullYear().toString().substr(-2); // get last two digits of year 24
  const trimester = Math.ceil((date.getMonth() + 1) / 4); // get trimester (1, 2, or 3)
  const studentCount = await User.countDocuments({}); // get current count of students
  const serial = String(studentCount + 1).padStart(3, '0'); // pad with zeros to get 3 digits

  const user: Partial<TUser> = {
    password: password || (config.default_password as string),
    role: 'student',
    id: `${fullYear}${year}${trimester}${serial}`,
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
