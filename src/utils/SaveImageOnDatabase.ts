import { TypeImage } from 'anibook';
import { mongoConnection } from '../database';
import MakeAConvertedImage from './MakeACovertedImage';

const saveImages = async (
  folder: string,
  file?: Express.Multer.File,
  files?: Express.Multer.File[]
) => {
  const connection = await mongoConnection('anibook');
  if (file) {
    const image = await MakeAConvertedImage(folder, file);
    const result = await connection
      .collection<TypeImage>('images')
      .insertOne(image);
    if (!result.insertedCount) return false;
  }
  if (files) {
    const images: Array<TypeImage> = [];
    for await (let file of files) {
      const image = await MakeAConvertedImage(folder, file);
      images.push(image);
    }
    const result = await connection
      .collection<TypeImage>('images')
      .insertMany(images);
    if (!result.insertedCount) return false;
  }
  return true;
};

export default saveImages;
