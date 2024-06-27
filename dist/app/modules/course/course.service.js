"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const course_constant_1 = require("./course.constant");
const course_model_1 = require("./course.model");
const createCourseIntoDB = (course) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.create(course);
    return result;
});
const getAllCoursesFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new QueryBuilder_1.default(course_model_1.Course.find().populate('preRequisiteCourses.course'), query)
        .filter()
        .sort()
        .paginate()
        .fields()
        .search(course_constant_1.CourseSearchAbleFields);
    const result = yield courseQuery.modelQuery;
    return result;
});
const getSingleCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.findById(id).populate('preRequisiteCourses.course');
    return result;
});
const updateCourseIntoDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const { preRequisiteCourses } = data, remainingCourseData = __rest(data, ["preRequisiteCourses"]);
    const session = yield course_model_1.Course.startSession();
    try {
        session.startTransaction();
        // basic course info update
        const updateBasicCourseInfo = yield course_model_1.Course.findByIdAndUpdate(id, remainingCourseData, {
            new: true,
            runValidators: true,
            session,
        });
        if (!updateBasicCourseInfo) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Course not found');
        }
        // pre requisite courses update
        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            const deletedPreRequisiteCoursesID = preRequisiteCourses
                .filter((element) => element.isDeleted && element.course)
                .map((element) => element.course);
            const deletedPreRequisiteCourses = yield course_model_1.Course.findByIdAndUpdate(id, {
                $pull: {
                    preRequisiteCourses: {
                        course: {
                            $in: deletedPreRequisiteCoursesID,
                        },
                    },
                },
            }, { session, new: true, runValidators: true });
            if (!deletedPreRequisiteCourses) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Pre requisite course not found');
            }
            const newPreRequisiteCourses = preRequisiteCourses.filter((element) => !element.isDeleted && element.course);
            const updatedPreRequisiteCourses = yield course_model_1.Course.findByIdAndUpdate(id, {
                $addToSet: {
                    preRequisiteCourses: {
                        $each: newPreRequisiteCourses,
                    },
                },
            }, {
                session,
                new: true,
                runValidators: true,
            });
            if (!updatedPreRequisiteCourses) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Pre requisite course not found');
            }
        }
        session.commitTransaction();
        session.endSession();
        const result = yield course_model_1.Course.findById(id).populate('preRequisiteCourses.course');
        return result;
    }
    catch (error) {
        session.abortTransaction();
        session.endSession();
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, error === null || error === void 0 ? void 0 : error.message);
    }
});
const deleteCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
const assignFacultiesToCourse = (courseId, faculties) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.CourseFaculty.findByIdAndUpdate(courseId, { course: courseId, $addToSet: { faculties: { $each: faculties } } }, { new: true, upsert: true });
    return result;
});
const removeFacultiesFromCourse = (courseId, faculties) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.CourseFaculty.findByIdAndUpdate(courseId, { $pull: { faculties: { $in: faculties } } }, { new: true });
    return result;
});
exports.courseService = {
    createCourseIntoDB,
    getSingleCourseFromDB,
    getAllCoursesFromDB,
    updateCourseIntoDB,
    deleteCourseFromDB,
    assignFacultiesToCourse,
    removeFacultiesFromCourse,
};
