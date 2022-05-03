import { v2 as cloudinary } from 'cloudinary';
import getConfig from 'config';

const { NODE_ENV } = process.env;

const { imageCloud } = getConfig();

cloudinary.config({
  cloud_name: imageCloud.cloud_name,
  api_key: imageCloud.api_key,
  api_secret: imageCloud.api_secret,
});

export const uploadFile = async (filePath) => cloudinary.uploader.upload(filePath, {
  folder: NODE_ENV === 'test' ? 'test' : 'logos',
});

export const deleteFile = async (publicId) => cloudinary.uploader.destroy(publicId);
