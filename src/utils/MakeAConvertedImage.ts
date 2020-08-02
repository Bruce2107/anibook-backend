import { createImageObject, TypeImage } from 'anibook';
import { x2Webp } from './ConverteImage';
import { sleep } from './Sleep';

export async function MakeAConvertedImage(
  folder: string,
  file: Express.Multer.File
): Promise<TypeImage> {
  await x2Webp(file);
  await sleep(500);
  return createImageObject(
    `${file.mimetype.split('/')[0]}/webp`,
    folder,
    `${file.originalname.split('.')[0]}.webp`,
    `${file.path.split('.')[0]}.webp`
  );
}
