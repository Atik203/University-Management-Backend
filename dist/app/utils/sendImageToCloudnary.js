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
exports.upload = exports.sendImageToCloudnary = void 0;
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
const http_status_1 = __importDefault(require("http-status"));
const multer_1 = __importDefault(require("multer"));
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../Errors/AppError"));
const sendImageToCloudnary = (imageName, path) => __awaiter(void 0, void 0, void 0, function* () {
    cloudinary_1.v2.config({
        cloud_name: config_1.default.cloudinary_cloud_name,
        api_key: config_1.default.cloudinary_api_key,
        api_secret: config_1.default.cloudinary_api_secret,
    });
    // Upload an image
    yield cloudinary_1.v2.uploader
        .upload(path, {
        public_id: imageName,
    })
        .catch((error) => {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, error);
    });
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary_1.v2.url(imageName, {
        crop: 'auto',
        gravity: 'auto',
        width: 400,
        height: 400,
        fetch_format: 'auto',
        quality: 'auto',
    });
    // delete the image from the local storage
    fs_1.default.unlink(path, (err) => {
        if (err) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Error deleting image');
        }
    });
    return autoCropUrl;
});
exports.sendImageToCloudnary = sendImageToCloudnary;
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + '/uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    },
});
exports.upload = (0, multer_1.default)({ storage: storage });
