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
exports.StudentServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const sendImageToCloudnary_1 = require("../../utils/sendImageToCloudnary");
const user_model_1 = require("../user/user.model");
const student_constant_1 = require("./student.constant");
const student_model_1 = require("./student.model");
const getAllStudentsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const studentQuery = new QueryBuilder_1.default(student_model_1.Student.find().populate('academicDepartment academicFaculty admissionSemester'), query)
        .search(student_constant_1.searchAbleFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield studentQuery.modelQuery;
    const meta = yield studentQuery.countTotal();
    return {
        meta,
        result,
    };
});
const getSingleStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.findById(id)
        .populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty',
        },
    })
        .populate('admissionSemester');
    return result;
});
const deleteStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield student_model_1.Student.isStudentExists(id);
    if (student === null) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Student not found and failed to delete');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const deletedStudent = yield student_model_1.Student.findByIdAndUpdate(id, { isDeleted: true }, { session, new: true });
        if (!deletedStudent) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Student not found and failed to delete');
        }
        const userId = deletedStudent.user;
        const deletedUser = yield user_model_1.User.findByIdAndUpdate(userId, { isDeleted: true }, { session, new: true });
        if (!deletedUser) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'User not found and failed to delete');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return deletedStudent;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to delete student');
    }
});
const updateStudentInDB = (id, updateData, file) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield student_model_1.Student.isStudentExists(id);
    if (student === null) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Student not found and failed to update');
    }
    const { name, guardian, localGuardian } = updateData, remaining = __rest(updateData, ["name", "guardian", "localGuardian"]);
    const imageName = `${id}-${name === null || name === void 0 ? void 0 : name.firstName}-${name === null || name === void 0 ? void 0 : name.lastName}`;
    const path = file.path;
    const profileImg = yield (0, sendImageToCloudnary_1.sendImageToCloudnary)(imageName, path);
    const modifiedData = Object.assign(Object.assign({}, remaining), { profileImg });
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedData[`name.${key}`] = value;
        }
    }
    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedData[`guardian.${key}`] = value;
        }
    }
    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedData[`localGuardian.${key}`] = value;
        }
    }
    const updatedStudent = yield student_model_1.Student.findByIdAndUpdate(id, modifiedData, {
        new: true,
        runValidators: true,
    });
    return updatedStudent;
});
exports.StudentServices = {
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB,
    updateStudentInDB,
};
