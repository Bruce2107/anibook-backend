import { readFileSync } from 'fs';
import { mongoConnection } from '../database';
import { TypeImage } from '../constants/types/ImageType';

const saveImages = async (
  folder: string,
  file?: Express.Multer.File,
  files?: Express.Multer.File[]
) => {
  const connection = await mongoConnection('anibook');
  if (file) {
    const image: TypeImage = {
      contentType: file.mimetype,
      folder,
      image: Buffer.from(readFileSync(file.path).toString('base64'), 'base64'),
      name: file.originalname,
    };
    const result = await connection
      .collection<TypeImage>('images')
      .insertOne(image);
    if (!result.insertedCount) return false;
  }
  if (files) {
    const images: Array<TypeImage> = [];
    files.forEach(async (file) => {
      images.push({
        folder,
        name: file.originalname,
        contentType: file.mimetype,
        image: Buffer.from(
          readFileSync(file.path).toString('base64'),
          'base64'
        ),
      });
    });
    const result = await connection
      .collection<TypeImage>('images')
      .insertMany(images);
    if (!result.insertedCount) return false;
  }
  return true;
};

export default saveImages;
