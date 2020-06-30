import ImageRepository from '@usecase/port/ImageRepository';
import MakeAConvertedImage from './MakeAConvertedImage';
import { TypeImage } from 'anibook';

export default async function saveImage(
  folder: string,
  adapter: ImageRepository,
  file?: Express.Multer.File,
  files?: Express.Multer.File[]
) {
  if (file) {
    const image = await MakeAConvertedImage(folder, file);
    if (!(await adapter.insertOne(image))) return false;
  }
  if (files) {
    const images: Array<TypeImage> = [];
    for await (let file of files) {
      const image = await MakeAConvertedImage(folder, file);
      if (!(await adapter.alreadyExists(folder, image.name)))
        images.push(image);
    }
    if (images.length > 0) await adapter.insertMany(images);
  }
  return true;
}
