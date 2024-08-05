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
exports.semesterRegistrationService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const academicSemester_model_1 = require("../academicSemester/academicSemester.model");
const semesterRegistration_constant_1 = require("./semesterRegistration.constant");
const semesterRegistration_model_1 = require("./semesterRegistration.model");
const createSemesterRegistrationIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check if there any registered semester ONGOING or UPCOMING
    const isOngoingOrUpcomingSemester = yield semesterRegistration_model_1.SemesterRegistration.findOne({
        $or: [
            { status: semesterRegistration_constant_1.RegistrationStatus.ONGOING },
            { status: semesterRegistration_constant_1.RegistrationStatus.UPCOMING },
        ],
    });
    if (isOngoingOrUpcomingSemester) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `There is already an ${isOngoingOrUpcomingSemester.status} semester registration`);
    }
    // Check if the semester registration already exists
    const isAlreadyRegistered = yield semesterRegistration_model_1.SemesterRegistration.findById(payload.academicSemester);
    if (isAlreadyRegistered) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Semester Registration already exists');
    }
    const isAcademicSemesterExist = yield academicSemester_model_1.AcademicSemester.findById(payload.academicSemester);
    if (!isAcademicSemesterExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Academic Semester does not exist');
    }
    const result = semesterRegistration_model_1.SemesterRegistration.create(payload);
    return result;
});
const getAllSemesterRegistrationFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const semesterRegistrationQuery = new QueryBuilder_1.default(semesterRegistration_model_1.SemesterRegistration.find().populate('academicSemester'), query)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = semesterRegistrationQuery.modelQuery;
    const meta = semesterRegistrationQuery.countTotal();
    return {
        result,
        meta,
    };
});
const getSingleSemesterRegistrationFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = semesterRegistration_model_1.SemesterRegistration.findById(id);
    return result;
});
const updateSemesterRegistrationIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the semester registration already exists
    const isAcademicSemesterExist = yield semesterRegistration_model_1.SemesterRegistration.findById(payload.academicSemester);
    if (!isAcademicSemesterExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Academic Semester does not exist');
    }
    // check if requested semester registration ENDED
    const currentSemesterStatus = isAcademicSemesterExist === null || isAcademicSemesterExist === void 0 ? void 0 : isAcademicSemesterExist.status;
    if (currentSemesterStatus === semesterRegistration_constant_1.RegistrationStatus.ENDED) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Semester Registration has already ENDED');
    }
    // UPCOMING --> ONGOING --> ENDED
    const requestedSemesterStatus = payload === null || payload === void 0 ? void 0 : payload.status;
    if (currentSemesterStatus === semesterRegistration_constant_1.RegistrationStatus.UPCOMING &&
        requestedSemesterStatus === semesterRegistration_constant_1.RegistrationStatus.ENDED) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Can not change UPCOMING semester to ENDED directly');
    }
    if (currentSemesterStatus === semesterRegistration_constant_1.RegistrationStatus.ONGOING &&
        requestedSemesterStatus === semesterRegistration_constant_1.RegistrationStatus.UPCOMING) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Can not change ONGOING semester to UPCOMING');
    }
    const result = semesterRegistration_model_1.SemesterRegistration.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
exports.semesterRegistrationService = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationFromDB,
    getSingleSemesterRegistrationFromDB,
    updateSemesterRegistrationIntoDB,
};
