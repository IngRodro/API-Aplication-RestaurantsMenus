import { v2 as cloudinary } from 'cloudinary';

import getConfig from 'config';

const { imageCloud } = getConfig();

cloudinary.config({
  cloud_name: imageCloud.cloud_name,
  api_key: imageCloud.api_key,
  api_secret: imageCloud.api_secret,
});

export async function uploadFile(filePath) {
  return cloudinary.uploader.upload(filePath, {
    folder: 'logos',
  });
}
