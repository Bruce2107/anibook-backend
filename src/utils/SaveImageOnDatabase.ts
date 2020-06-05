import { TypeImage, createImageObject as createImage } from 'anibook';
import { mongoConnection } from '../database';
import { x2Webp } from './ConverteImage';

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
const saveImages = async (
  folder: string,
  file?: Express.Multer.File,
  files?: Express.Multer.File[]
) => {
  const connection = await mongoConnection('anibook');
  if (file) {
    await x2Webp(file);
    await sleep(100);
    const image = createImage(
      `${file.mimetype.split('/')[0]}/webp`,
      folder,
      `${file.originalname.split('.')[0]}.webp`,
      `${file.path.split('.')[0]}.webp`
    );
    const result = await connection
      .collection<TypeImage>('images')
      .insertOne(image);
    if (!result.insertedCount) return false;
  }
  if (files) {
    const images: Array<TypeImage> = [];
    for await (let file of files) {
      await x2Webp(file);
      await sleep(100);
      images.push(
        createImage(
          `${file.mimetype.split('/')[0]}/webp`,
          folder,
          `${file.originalname.split('.')[0]}.webp`,
          `${file.path.split('.')[0]}.webp`
        )
      );
    }
    const result = await connection
      .collection<TypeImage>('images')
      .insertMany(images);
    if (!result.insertedCount) return false;
  }
  return true;
};

export default saveImages;
