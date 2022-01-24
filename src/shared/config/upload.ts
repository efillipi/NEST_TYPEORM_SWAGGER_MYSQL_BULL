import { resolve } from 'path';
import { randomBytes } from 'crypto';
import { StorageEngine, diskStorage } from 'multer';

const tmpFolder = resolve(__dirname, '..', '..', '..', 'tmp');

type IUploadConfig = {
  driver: 'disk';
  tmpFolder: string;
  uploadsFolder: string;

  storage: StorageEngine;
};

export default {
  driver: process.env.STORAGE_DRIVER,

  tmpFolder,
  uploadsFolder: resolve(tmpFolder, 'uploads'),

  storage: diskStorage({
    destination: tmpFolder,
    filename: (_request, file, callback) => {
      const fileHash = randomBytes(10).toString('hex');
      const fileName = `${fileHash}_${file.originalname}`;

      return callback(null, fileName);
    },
  }),
} as IUploadConfig;
