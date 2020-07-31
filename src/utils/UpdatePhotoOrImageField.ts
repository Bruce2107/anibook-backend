import { Data } from 'anibook';
import { saveImage } from './SaveImage';
import { ImageRepository } from '@usecase/port/ImageRepository';

export async function updatePhotoOrImageField<T extends Data>(
  files: {
    [fieldname: string]: Express.Multer.File[];
  },
  folder: string,
  data: T,
  adapter: ImageRepository
) {
  data.folder = folder;
  /* istanbul ignore else */
  if (Object.keys(files).includes('card')) {
    const card: Express.Multer.File = files['card'][0];
    data.photo = `${card.originalname.split('.')[0]}.webp`;
    await saveImage(folder, adapter, card, undefined);
  }
  if (Object.keys(files).includes('images')) {
    const images: Express.Multer.File[] = files['images'];
    /* istanbul ignore else */
    if (!data.images) data.images = [];
    images.forEach((file) => {
      /* istanbul ignore else */
      if (data.images && !(data.images.indexOf(file.originalname) >= 0)) {
        data.images.push(`${file.originalname.split('.')[0]}.webp`);
      }
    });
    await saveImage(folder, adapter, undefined, images);
  }
  return data;
}
