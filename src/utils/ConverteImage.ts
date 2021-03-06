import webp from 'webp-converter';
import { imageFormats } from '../constants/Image';

export async function x2Webp(file: Express.Multer.File) {
  const extension = file.mimetype.split('/')[1];
  if (imageFormats.includes(extension)) {
    webp.cwebp(file.path, `${file.path.split('.')[0]}.webp`, '-q 80', function (
      _: number,
      __: Error
    ) {});
  }
  if (extension === 'gif') {
    webp.gwebp(file.path, `${file.path.split('.')[0]}.webp`, '-q 80', function (
      _: number,
      __: Error
    ) {});
  }
}
