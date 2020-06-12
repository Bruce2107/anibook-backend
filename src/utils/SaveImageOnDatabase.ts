import { TypeImage } from 'anibook';

import MakeAConvertedImage from './MakeACovertedImage';
import ImageAdapter from '../adapter/image/repository/DatabaseImage';

const saveImages = async (
  folder: string,
  file?: Express.Multer.File,
  files?: Express.Multer.File[]
) => {
  const imageAdapter = new ImageAdapter();
  if (file) {
    const image = await MakeAConvertedImage(folder, file);
    if (!(await imageAdapter.alreadyExists(folder, image.name)))
      if (!(await imageAdapter.insertOne(image))) return false;
  }
  if (files) {
    const images: Array<TypeImage> = [];
    for await (let file of files) {
      const image = await MakeAConvertedImage(folder, file);
      if (!(await imageAdapter.alreadyExists(folder, image.name)))
        images.push(image);
    }
    if (images.length > 0) await imageAdapter.insertMany(images);
  }
  return true;
};

export default saveImages;
