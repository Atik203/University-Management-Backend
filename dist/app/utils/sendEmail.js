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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
const sendEmail = (to, html) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: config_1.default.NODE_ENV === 'production', // Use `true` for port 465, `false` for all other ports
        auth: {
            user: config_1.default.nodemailer_auth_user_email,
            pass: config_1.default.nodemailer_auth_user_password,
        },
    });
    yield transporter.sendMail({
        from: config_1.default.nodemailer_auth_user_email, // sender address
        to,
        subject: 'Reset Your Password Within 1hours', // Subject line
        text: 'Reset Your Password Within 1hours', // plain text body
        html,
    });
});
exports.sendEmail = sendEmail;
