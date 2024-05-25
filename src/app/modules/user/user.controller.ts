import { NextFunction, Request, Response } from 'express';
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

    if (result) {
      res.status(201).json({
        success: true,
        message: 'Student Created Successfully',
        data: result,
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: 'Failed to create student' });
    }
  } catch (error) {
    next(error);
  }
};

export const userController = {
  createStudent,
};
