"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRequestBodyData = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../Errors/AppError"));
const parseRequestBodyData = (req, res, next) => {
    try {
        req.body = JSON.parse(req.body.data);
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid JSON format in request body');
    }
    next();
};
exports.parseRequestBodyData = parseRequestBodyData;
