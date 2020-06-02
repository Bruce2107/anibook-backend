import webp from 'webp-converter';
import { imageFormats } from '../constants/Image';

export function x2Webp(file: Express.Multer.File) {
  const extension = file.mimetype.split('/')[1];
  let fileStatus = 101;
  if (imageFormats.includes(extension) && extension !== 'gif') {
    webp.cwebp(file.path, `${file.path.split('.')[0]}.webp`, '-q 80', function (
      status: number,
      _: Error
    ) {
      fileStatus = status;
    });
  }
  return fileStatus;
}
