"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../../Errors/AppError"));
// create token with try catch
const createToken = (jwtPayload, secret, expiresIn) => {
    try {
        return jsonwebtoken_1.default.sign(jwtPayload, secret, { expiresIn });
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Internal server error');
    }
};
exports.createToken = createToken;
// verify token with try catch
const verifyToken = (token, secret) => {
    try {
        return jsonwebtoken_1.default.verify(token, secret);
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
    }
};
exports.verifyToken = verifyToken;
