import { Injectable } from '@nestjs/common';
import { resolve } from 'path';
import { promises } from 'fs';
import uploadConfig from '../../config/upload';

@Injectable()
export class DiskStorageProviderService {
  public async saveFile(file: string): Promise<string> {
    try {
      await promises.rename(
        resolve(uploadConfig.tmpFolder, file),
        resolve(uploadConfig.uploadsFolder, file),
      );

      return file;
    } catch (error) {
      await this.clearTmp(file);
      return error;
    }
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = resolve(uploadConfig.uploadsFolder, file);

    try {
      await promises.stat(filePath);
    } catch (err) {
      return;
    }

    await promises.unlink(filePath);
  }

  public async clearTmp(file: string): Promise<void> {
    const filePath = resolve(uploadConfig.tmpFolder, file);

    try {
      await promises.stat(filePath);
    } catch (err) {
      return;
    }

    await promises.unlink(filePath);
  }
}
