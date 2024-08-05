import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { academicFacultyService } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicFacultyService.createAcademicFacultyIntoDB(
      req.body,
    );
    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'Academic faculty created successfully',
      data: result,
    });
  },
);

const getAcademicFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await academicFacultyService.getAllAcademicFacultyFromDB(
    req.query,
  );
  res.status(httpStatus.OK).json({
    status: 'success',
    message: 'Academic faculty fetched successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getAcademicFacultyById = catchAsync(
  async (req: Request, res: Response) => {
    const result = await academicFacultyService.getAcademicFacultyByIdFromDB(
      req.params.id,
    );
    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'Academic faculty fetched successfully',
      data: result,
    });
  },
);

const updateAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const academicFaculty = req.body;

    const result = await academicFacultyService.updateAcademicFacultyFromDB(
      id,
      academicFaculty,
    );
    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'Academic faculty updated successfully',
      data: result,
    });
  },
);

export const academicFacultyController = {
  createAcademicFaculty,
  getAcademicFaculty,
  getAcademicFacultyById,
  updateAcademicFaculty,
};
