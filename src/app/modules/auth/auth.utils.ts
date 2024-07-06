import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../../Errors/AppError';

// create token with try catch

export const createToken = (
  jwtPayload: {
    id: string;
    role: string;
  },
  secret: string,
  expiresIn: string,
) => {
  try {
    return jwt.sign(jwtPayload, secret, { expiresIn });
  } catch (error) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Internal server error',
    );
  }
};

// verify token with try catch

export const verifyToken = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }
};
