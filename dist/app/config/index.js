"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    bcrypt_salt: process.env.BCRYPT_SALT,
    default_password: process.env.DEFAULT_PASS,
    NODE_ENV: process.env.NODE_ENV,
    base_url: process.env.BASE_URL,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_access_expiration: process.env.JWT_ACCESS_EXPIRATION,
    jwt_refresh_expiration: process.env.JWT_REFRESH_EXPIRATION,
    reset_password_url: process.env.RESET_PASSWORD_URL,
    nodemailer_auth_user_email: process.env.NODEMAILER_AUTH_USER_EMAIL,
    nodemailer_auth_user_password: process.env.NODEMAILER_AUTH_USER_PASSWORD,
    cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
    super_admin_password: process.env.SUPER_ADMIN_PASSWORD,
};
