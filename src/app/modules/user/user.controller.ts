import httpStatus from 'http-status';
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
export const userController = {
  createStudent,
};
