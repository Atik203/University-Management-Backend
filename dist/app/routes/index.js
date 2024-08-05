"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const academicDepartment_route_1 = require("../modules/academicDepartment/academicDepartment.route");
const academicFaculty_route_1 = require("../modules/academicFaculty/academicFaculty.route");
const academicSemester_route_1 = require("../modules/academicSemester/academicSemester.route");
const admin_route_1 = require("../modules/admin/admin.route");
const auth_route_1 = require("../modules/auth/auth.route");
const course_route_1 = require("../modules/course/course.route");
const enrolledCourse_route_1 = require("../modules/enrolledCourse/enrolledCourse.route");
const faculty_route_1 = require("../modules/faculty/faculty.route");
const offeredCourse_route_1 = require("../modules/offeredCourse/offeredCourse.route");
const semesterRegistration_route_1 = require("../modules/semesterRegistration/semesterRegistration.route");
const student_route_1 = require("../modules/student/student.route");
const user_route_1 = require("../modules/user/user.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.userRoute,
    },
    {
        path: '/students',
        route: student_route_1.StudentRoutes,
    },
    {
        path: '/semesters',
        route: academicSemester_route_1.academicSemesterRoute,
    },
    {
        path: '/faculty',
        route: academicFaculty_route_1.academicFacultyRoutes,
    },
    {
        path: '/departments',
        route: academicDepartment_route_1.academicDepartmentRoutes,
    },
    {
        path: '/admin',
        route: admin_route_1.AdminRoutes,
    },
    {
        path: '/faculties',
        route: faculty_route_1.FacultyRoutes,
    },
    {
        path: '/courses',
        route: course_route_1.courseRoutes,
    },
    {
        path: '/semester-registration',
        route: semesterRegistration_route_1.semesterRegistrationRoutes,
    },
    {
        path: '/offered-courses',
        route: offeredCourse_route_1.offeredCourseRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.authRoutes,
    },
    {
        path: '/enrolled-courses',
        route: enrolledCourse_route_1.enrolledCourseRoutes,
    },
];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
