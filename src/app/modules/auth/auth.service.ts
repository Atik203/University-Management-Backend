import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import config from '../../config';
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

  const user = await User.isUserPasswordMatched(payload.id, payload.password);

  // create jwt token

  const jwtPayload = {
    id: user.id,
    role: user.role,
  };

  const access_token = jwt.sign(
    jwtPayload,
    config.jwt_access_secret as string,
    {
      expiresIn: '10d',
    },
  );

  return {
    access_token,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

export const authService = {
  loginUserService,
};
