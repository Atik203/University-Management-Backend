import { TEnrolledCourse } from './enrolledCourse.interface';
import EnrolledCourse from './enrolledCourse.model';

const createEnrolledCourseIntoDB = async (
  id: string,
  payload: TEnrolledCourse,
) => {
  const enrolledCourse = await EnrolledCourse.create(enrolledCourseData);
  return enrolledCourse;
};

export const enrolledCourseService = {
  createEnrolledCourseIntoDB,
};
