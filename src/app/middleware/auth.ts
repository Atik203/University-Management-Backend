import { NextFunction, Request, Response } from 'express';

import httpStatus from 'http-status';
import AppError from '../Errors/AppError';
import { catchAsync } from '../utils/catchAsync';

export const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // if error, it will throw an exception

    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    next();
  });
};
