import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentID = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    { id: 1 },
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentID = async (payload: TAcademicSemester) => {
  let currentId = (0).toString(); // 0000

  const lastStudentID = await findLastStudentID(); // 2024 01 0001
  const lastStudentIDYear = lastStudentID?.slice(0, 4); // 2024
  const lastStudentIDSemesterCode = lastStudentID?.slice(4, 6); // 01
  const currentSemesterCode = payload.code; // 01
  const currentYear = payload.year; // 2024

  if (
    lastStudentID &&
    lastStudentIDYear === currentYear &&
    lastStudentIDSemesterCode === currentSemesterCode
  ) {
    currentId = lastStudentID?.slice(6); // 0001
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};
// Faculty ID
export const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne(
    {
      role: 'faculty',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async () => {
  let currentId = (0).toString();
  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `F-${incrementId}`;

  return incrementId;
};

// Admin ID
export const findLastAdminId = async () => {
  const lastAdmin = await User.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `A-${incrementId}`;
  return incrementId;
};
