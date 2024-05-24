import { Request, Response } from 'express';
import { z } from 'zod';
import studentValidationSchema from '../student/student.validation.zod';
import { userService } from './user.service';

const createStudent = async (req: Request, res: Response) => {
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
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: error.errors.map((err) => err.message).join(', '),
      });
    } else if (error instanceof Error) {
      res.status(500).json({ success: false, message: error.message });
    } else {
      res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  }
};

export const userController = {
  createStudent,
};
