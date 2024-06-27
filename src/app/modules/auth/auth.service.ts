import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';

const loginUserService = async (payload: TLoginUser) => {
  // Check if the user exists in the database
  const user = await User.findOne({ id: payload.id });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // check if user is deleted

  if (user.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is deleted');
  }

  // check if user is blocked

  if (user.status === 'blocked') {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is blocked');
  }

  // Check if the password is correct

  const isPasswordMatch = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Incorrect password');
  }

  return user;
};

export const authService = {
  loginUserService,
};
