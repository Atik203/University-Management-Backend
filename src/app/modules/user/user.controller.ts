import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { sendResponse } from '../../utils/sendResponse';
import studentValidationSchema from '../student/student.validation.zod';
import { userService } from './user.service';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student } = req.body;

    const zodParseStudent = studentValidationSchema.parse(student);

    const result = await userService.createStudentIntoDB(
      password,
      zodParseStudent,
    );

    sendResponse(res, {
      success: true,
      message: 'Student created successfully',
      statusCode: httpStatus.OK,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const userController = {
  createStudent,
};
