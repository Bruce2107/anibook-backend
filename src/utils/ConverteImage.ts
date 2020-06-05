import webp from 'webp-converter';
import { imageFormats } from '../constants/Image';

export async function x2Webp(file: Express.Multer.File) {
  const extension = file.mimetype.split('/')[1];
  let fileStatus = 0;
  if (imageFormats.includes(extension) && extension !== 'gif') {
    webp.cwebp(file.path, `${file.path.split('.')[0]}.webp`, '-q 80', function (
      _: number,
      __: Error
    ) {});
    fileStatus = 100;
  }
  return fileStatus;
}
