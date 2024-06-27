import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';

const loginUserService = async (payload: TLoginUser) => {
  // Check if the user exists in the database
  if (!(await User.isUserExistByCustomId(payload.id))) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // check if user is deleted

  if (await User.isUserDeleted(payload.id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is deleted');
  }

  // check if user is blocked

  if (await User.isUserBlocked(payload.id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is blocked');
  }

  // Check if the password is correct
  if ((await User.isPassWordMatched(payload.id, payload.password)) === false) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Incorrect password');
  }

  const user = await User.findOne({ id: payload.id });

  return user;
};

export const authService = {
  loginUserService,
};
