import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import httpStatus from 'http-status';
import multer from 'multer';
import config from '../config';
import AppError from '../Errors/AppError';

export const sendImageToCloudnary = async (imageName: string, path: string) => {
  cloudinary.config({
    cloud_name: config.cloudinary_cloud_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret,
  });
  // Upload an image
  await cloudinary.uploader
    .upload(path, {
      public_id: imageName,
    })
    .catch((error) => {
      throw new AppError(httpStatus.BAD_REQUEST, error);
    });

  // Transform the image: auto-crop to square aspect_ratio
  const autoCropUrl = cloudinary.url(imageName, {
    crop: 'auto',
    gravity: 'auto',
    width: 400,
    height: 400,
    fetch_format: 'auto',
    quality: 'auto',
  });

  // delete the image from the local storage
  fs.unlink(path, (err) => {
    if (err) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Error deleting image');
    }
  });

  return autoCropUrl;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
