import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { authService } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await authService.loginUserService(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    data: result,
  });
});

export const authController = {
  loginUser,
};
