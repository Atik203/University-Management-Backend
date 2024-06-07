import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { academicDepartmentService } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await academicDepartmentService.createAcademicDepartmentIntoDB(req.body);
    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'Academic Department created successfully',
      data: result,
    });
  },
);

const getAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await academicDepartmentService.getAllAcademicDepartmentFromDB();
    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'Academic Department fetched successfully',
      data: result,
    });
  },
);

const getAcademicDepartmentById = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await academicDepartmentService.getAcademicDepartmentByIdFromDB(
        req.params.id,
      );
    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'Academic Department fetched successfully',
      data: result,
    });
  },
);

const updateAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const academicDepartment = req.body;

    const result =
      await academicDepartmentService.updateAcademicDepartmentFromDB(
        id,
        academicDepartment,
      );
    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'Academic Department updated successfully',
      data: result,
    });
  },
);

export const academicDepartmentController = {
  createAcademicDepartment,
  getAcademicDepartment,
  getAcademicDepartmentById,
  updateAcademicDepartment,
};
