import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSearchAbleFields } from './course.constant';
import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDB = async (course: TCourse) => {
  const result = await Course.create(course);

  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields()
    .search(CourseSearchAbleFields);

  const result = await courseQuery.modelQuery;

  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const updateCourseIntoDB = async (id: string, data: Partial<TCourse>) => {
  const result = await Course.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const courseService = {
  createCourseIntoDB,
  getSingleCourseFromDB,
  getAllCoursesFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
};
