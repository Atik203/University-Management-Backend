import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { enrolledCourseService } from './enrolledCourse.service';

const createEnrolledCourse = catchAsync(async (req, res) => {
  const result = await enrolledCourseService.createEnrolledCourseIntoDB(
    req.user.id,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Enrolled course created successfully',
    data: result,
  });
});

const updateEnrolledCourse = catchAsync(async (req, res) => {
  const result = await enrolledCourseService.updateEnrolledCourseMarksIntoDB(
    req.user.id,
    req.body,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Marks Updated successfully',
    data: result,
  });
});

export const enrolledCourseController = {
  createEnrolledCourse,
  updateEnrolledCourse,
};
