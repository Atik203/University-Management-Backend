import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { academicSemesterService } from './academicSemester.service';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicSemesterService.createAcademicSemesterIntoDB(
      req.body,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester created successfully',
      data: result,
    });
  },
);

const getAcademicSemester = catchAsync(async (req: Request, res: Response) => {
  const result = await academicSemesterService.getAcademicSemesterFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester fetched successfully',
    data: result,
  });
});

const getAcademicSemesterById = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicSemesterService.getAcademicSemesterByIdFromDB(
      req.params.id,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester fetched successfully',
      data: result,
    });
  },
);

const updateAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const academicSemester = req.body;

    const result = await academicSemesterService.updateAcademicSemesterFromDB(
      id,
      academicSemester,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester updated successfully',
      data: result,
    });
  },
);

export const academicSemesterController = {
  createAcademicSemester,
  getAcademicSemester,
  getAcademicSemesterById,
  updateAcademicSemester,
};
