import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../Errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';
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

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expiration as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expiration as string,
  );

  return {
    accessToken,
    needsPasswordChange: user?.needsPasswordChange,
    refreshToken,
  };
};

const changePasswordService = async (
  userData: JwtPayload,
  payload: {
    oldPassword: string;
    newPassword: string;
  },
) => {
  // Check if the user exists in the database
  if (!(await User.isUserExistByCustomId(userData.id))) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // check if user is deleted

  if (await User.isUserDeleted(userData.id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is deleted');
  }

  // check if user is blocked

  if (await User.isUserBlocked(userData.id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is blocked');
  }

  // Check if the password is correct

  const user = await User.isUserPasswordMatched(
    userData.id,
    payload.oldPassword,
  );

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Old password is incorrect');
  }

  // hash the new password
  const newPassword = await bcrypt.hashSync(
    payload.newPassword,
    Number(config.bcrypt_salt),
  );

  // update the user password

  await User.findOneAndUpdate(
    {
      id: userData.id,
      role: userData.role,
    },
    {
      password: newPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
    {
      new: true,
    },
  );

  return null;
};

export const authService = {
  loginUserService,
  changePasswordService,
};
