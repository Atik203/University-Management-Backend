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

const getAllEnrolledCourses = catchAsync(async (req, res) => {
  const result = await enrolledCourseService.getAllEnrolledCoursesFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All Enrolled Courses retrieved successfully',
    data: result,
  });
});

const getSingleEnrolledCourse = catchAsync(async (req, res) => {
  const result = await enrolledCourseService.getSingleEnrolledCourseFromDB(
    req.params.id,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Single Enrolled Course retrieved successfully',
    data: result,
  });
});

export const enrolledCourseController = {
  createEnrolledCourse,
  updateEnrolledCourse,
  getAllEnrolledCourses,
  getSingleEnrolledCourse,
};
