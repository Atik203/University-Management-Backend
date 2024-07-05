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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const sendImageToCloudnary_1 = require("../../utils/sendImageToCloudnary");
const academicDepartment_model_1 = require("../academicDepartment/academicDepartment.model");
const academicSemester_model_1 = require("../academicSemester/academicSemester.model");
const admin_model_1 = require("../admin/admin.model");
const faculty_model_1 = require("../faculty/faculty.model");
const student_model_1 = require("../student/student.model");
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const createStudentIntoDB = (password, student, file) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const admissionSemester = yield academicSemester_model_1.AcademicSemester.findById(student.admissionSemester);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        if (!admissionSemester) {
            throw new AppError_1.default(404, 'Admission semester not found');
        }
        const id = yield (0, user_utils_1.generateStudentID)(admissionSemester);
        const imageName = `${id}-${(_a = student.name) === null || _a === void 0 ? void 0 : _a.firstName}-${(_b = student.name) === null || _b === void 0 ? void 0 : _b.lastName}`;
        const path = file.path;
        const profileImg = yield (0, sendImageToCloudnary_1.sendImageToCloudnary)(imageName, path);
        const user = {
            password: password || config_1.default.default_password,
            role: 'student',
            id,
            email: student.email,
        };
        // transaction 1
        const newUser = yield user_model_1.User.create([user], { session }); // array
        if (!newUser.length) {
            throw new AppError_1.default(500, 'Error creating user');
        }
        student.id = newUser[0].id;
        student.user = newUser[0]._id;
        student.profileImg = profileImg;
        const newStudent = yield student_model_1.Student.create([student], { session });
        if (!newStudent.length) {
            throw new AppError_1.default(500, 'Error creating student');
        }
        yield session.commitTransaction();
        session.endSession();
        return newStudent[0];
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Error creating student');
    }
});
const createFacultyIntoDB = (password, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    // create a user object
    const userData = {};
    //if password is not given , use default password
    userData.password = password || config_1.default.default_password;
    //set student role
    userData.role = 'faculty';
    userData.email = payload.email;
    // find academic department info
    const academicDepartment = yield academicDepartment_model_1.AcademicDepartment.findById(payload.academicDepartment);
    if (!academicDepartment) {
        throw new AppError_1.default(400, 'Academic department not found');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //set  generated id
        const id = yield (0, user_utils_1.generateFacultyId)();
        userData.id = id;
        // create a user (transaction-1)
        const newUser = yield user_model_1.User.create([userData], { session }); // array
        //create a faculty
        if (!newUser.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        // upload image to cloudinary
        const imageName = `${id}-${(_c = payload.name) === null || _c === void 0 ? void 0 : _c.firstName}-${(_d = payload.name) === null || _d === void 0 ? void 0 : _d.lastName}`;
        const path = file.path;
        const profileImg = yield (0, sendImageToCloudnary_1.sendImageToCloudnary)(imageName, path);
        // set id , _id as user
        payload.profileImg = profileImg;
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id
        // create a faculty (transaction-2)
        const newFaculty = yield faculty_model_1.Faculty.create([payload], { session });
        if (!newFaculty.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create faculty');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newFaculty;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, err.message);
    }
});
const createAdminIntoDB = (password, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    // create a user object
    const userData = {};
    //if password is not given , use default password
    userData.password = password || config_1.default.default_password;
    //set student role
    userData.role = 'admin';
    userData.email = payload.email;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //set  generated id
        const id = yield (0, user_utils_1.generateAdminId)();
        userData.id = id;
        // create a user (transaction-1)
        const newUser = yield user_model_1.User.create([userData], { session });
        //create a admin
        if (!newUser.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create admin');
        }
        // upload image to cloudinary
        const imageName = `${id}-${(_e = payload.name) === null || _e === void 0 ? void 0 : _e.firstName}-${(_f = payload.name) === null || _f === void 0 ? void 0 : _f.lastName}`;
        const path = file.path;
        const profileImg = yield (0, sendImageToCloudnary_1.sendImageToCloudnary)(imageName, path);
        // set id , _id as user
        payload.profileImg = profileImg;
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id
        // create a admin (transaction-2)
        const newAdmin = yield admin_model_1.Admin.create([payload], { session });
        if (!newAdmin.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create admin');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newAdmin;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, err.message);
    }
});
const getMeService = (id, role) => __awaiter(void 0, void 0, void 0, function* () {
    let result = null;
    if (role === 'student') {
        result = yield student_model_1.Student.findOne({ id })
            .populate('user')
            .populate('academicSemester')
            .populate('academicDepartment');
    }
    if (role === 'faculty') {
        result = yield faculty_model_1.Faculty.findOne({ id })
            .populate('user')
            .populate('academicDepartment');
    }
    if (role === 'admin') {
        result = yield admin_model_1.Admin.findOne({ id }).populate('user');
    }
    return result;
});
const changeStatusService = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    // user exists or not
    const user = yield user_model_1.User.findOne({ _id: id });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    // check user is deleted or not
    if (user.isDeleted) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'User is already deleted');
    }
    const result = yield user_model_1.User.findOneAndUpdate({ _id: id }, { status }, { new: true });
    return result;
});
exports.userService = {
    createStudentIntoDB,
    createFacultyIntoDB,
    createAdminIntoDB,
    getMeService,
    changeStatusService,
};
