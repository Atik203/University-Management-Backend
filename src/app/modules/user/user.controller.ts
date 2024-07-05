import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { userService } from './user.service';

const createStudent = catchAsync(async (req, res) => {
  const { password, student } = req.body;
  const result = await userService.createStudentIntoDB(password, student);
  sendResponse(res, {
    success: true,
    message: 'Student created successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await userService.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created successfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await userService.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created successfully',
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Token not found');
  }

  const result = await userService.getMeService(token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User details',
    data: result,
  });
});

export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
};
