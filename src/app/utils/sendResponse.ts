import { Response } from 'express';

type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

type TResponse<T> = {
  success: boolean;
  message?: string;
  statusCode: number;
  meta?: TMeta;
  data: T;
};

export const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data.success,
    message: data.message,
    meta: data.meta,
    data: data.data,
  });
};
