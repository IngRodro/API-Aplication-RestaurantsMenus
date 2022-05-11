import { v2 as cloudinary } from 'cloudinary';

import getConfig from 'config';

const { imageCloud } = getConfig();

cloudinary.config({
  cloud_name: imageCloud.cloud_name,
  api_key: imageCloud.api_key,
  api_secret: imageCloud.api_secret,
});

export const uploadFile = async (filePath, folder) =>
  cloudinary.uploader.upload(filePath, {
    folder: `images/${folder}`,
  });

export const deleteFile = async (publicId) =>
  cloudinary.uploader.destroy(publicId);
