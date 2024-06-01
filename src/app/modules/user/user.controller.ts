import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import studentValidationSchema from '../student/student.validation.zod';
import { userService } from './user.service';

const createStudent = catchAsync(async (req, res) => {
  const { password, student } = req.body;
  const zodParseStudent = studentValidationSchema.parse(student);
  const result = await userService.createStudentIntoDB(
    password,
    zodParseStudent,
  );
  sendResponse(res, {
    success: true,
    message: 'Student created successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});
export const userController = {
  createStudent,
};
