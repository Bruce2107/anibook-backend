import { TypeImage, createImageObject as createImage } from 'anibook';
import { mongoConnection } from '../database';

const saveImages = async (
  folder: string,
  file?: Express.Multer.File,
  files?: Express.Multer.File[]
) => {
  const connection = await mongoConnection('anibook');
  if (file) {
    const image = createImage(folder, file);
    const result = await connection
      .collection<TypeImage>('images')
      .insertOne(image);
    if (!result.insertedCount) return false;
  }
  if (files) {
    const images: Array<TypeImage> = [];
    files.forEach(async (file) => {
      images.push(createImage(folder, file));
    });
    const result = await connection
      .collection<TypeImage>('images')
      .insertMany(images);
    if (!result.insertedCount) return false;
  }
  return true;
};

export default saveImages;
