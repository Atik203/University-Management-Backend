import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../Errors/AppError';
import { CourseSearchAbleFields } from './course.constant';
import { TCourse, TCourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';

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
  const { preRequisiteCourses, ...remainingCourseData } = data;

  const session = await Course.startSession();

  try {
    session.startTransaction();

    // basic course info update

    const updateBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      remainingCourseData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updateBasicCourseInfo) {
      throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
    }

    // pre requisite courses update

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletedPreRequisiteCoursesID = preRequisiteCourses
        .filter((element) => element.isDeleted && element.course)
        .map((element) => element.course);

      const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: {
              course: {
                $in: deletedPreRequisiteCoursesID,
              },
            },
          },
        },
        { session, new: true, runValidators: true },
      );

      if (!deletedPreRequisiteCourses) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          'Pre requisite course not found',
        );
      }

      const newPreRequisiteCourses = preRequisiteCourses.filter(
        (element) => !element.isDeleted && element.course,
      );

      const updatedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            preRequisiteCourses: {
              $each: newPreRequisiteCourses,
            },
          },
        },
        {
          session,
          new: true,
          runValidators: true,
        },
      );

      if (!updatedPreRequisiteCourses) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          'Pre requisite course not found',
        );
      }
    }
    session.commitTransaction();
    session.endSession();
    const result = await Course.findById(id).populate(
      'preRequisiteCourses.course',
    );

    return result;
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, (error as Error)?.message);
  }
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const assignFacultiesToCourse = async (
  courseId: string,
  faculties: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    courseId,
    { course: courseId, $addToSet: { faculties: { $each: faculties } } },
    { new: true, upsert: true },
  );

  return result;
};

const removeFacultiesFromCourse = async (
  courseId: string,
  faculties: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    courseId,
    { $pull: { faculties: { $in: faculties } } },
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
  assignFacultiesToCourse,
  removeFacultiesFromCourse,
};
