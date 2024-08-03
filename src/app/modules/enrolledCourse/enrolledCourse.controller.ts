import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { enrolledCourseService } from './enrolledCourse.service';

const createEnrolledCourse = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const result = await enrolledCourseService.createEnrolledCourseIntoDB(
    userId,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Enrolled course created successfully',
    data: result,
  });
});

export const enrolledCourseController = {
  createEnrolledCourse,
};
