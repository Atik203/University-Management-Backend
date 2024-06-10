import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import handleZodError from '../Errors/handleZodError';
import { TErrorSource } from '../interface/error';

/* eslint-disable @typescript-eslint/no-unused-vars */

export const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next,
) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal Server Error';
  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'Internal Server Error',
    },
  ];

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? error.stack : null,
  });
};
