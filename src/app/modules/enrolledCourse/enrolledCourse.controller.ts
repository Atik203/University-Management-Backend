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
  const result = await enrolledCourseService.getAllEnrolledCoursesFromDB(
    req.query,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All Enrolled Courses retrieved successfully',
    meta: result.meta,
    data: result.result,
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

const getMyEnrolledCourses = catchAsync(async (req, res) => {
  const result = await enrolledCourseService.getMyEnrolledCoursesFromDB(
    req.user.id,
    req.query,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'My Enrolled Courses retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

export const enrolledCourseController = {
  createEnrolledCourse,
  updateEnrolledCourse,
  getAllEnrolledCourses,
  getSingleEnrolledCourse,
  getMyEnrolledCourses,
};
