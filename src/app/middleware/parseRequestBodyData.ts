import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import AppError from '../Errors/AppError';

export const parseRequestBodyData: RequestHandler = (req, res, next) => {
  try {
    req.body = JSON.parse(req.body.data);
  } catch (error) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Invalid JSON format in request body',
    );
  }
  next();
};
