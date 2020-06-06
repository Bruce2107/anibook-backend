import { TypeImage } from 'anibook';

import MakeAConvertedImage from './MakeACovertedImage';
import { insertOne, alreadyExists, insertMany } from '../database/image';

const saveImages = async (
  folder: string,
  file?: Express.Multer.File,
  files?: Express.Multer.File[]
) => {
  if (file) {
    const image = await MakeAConvertedImage(folder, file);
    if (!(await alreadyExists(folder, image.name)))
      if (!(await insertOne(image))) return false;
  }
  if (files) {
    const images: Array<TypeImage> = [];
    for await (let file of files) {
      const image = await MakeAConvertedImage(folder, file);
      if (!(await alreadyExists(folder, image.name))) images.push(image);
    }
    if (images.length > 0) await insertMany(images);
  }
  return true;
};

export default saveImages;
