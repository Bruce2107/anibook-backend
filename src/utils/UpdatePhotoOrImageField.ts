import { Data } from 'anibook';
import saveImages from './SaveImageOnDatabase';

async function updatePhotoOrImageField<T extends Data>(
  files: {
    [fieldname: string]: Express.Multer.File[];
  },
  folder: string,
  data: T
) {
  data.folder = folder;
  if (Object.keys(files).includes('card')) {
    const card: Express.Multer.File = files['card'][0];
    data.photo = card.originalname;
    await saveImages(folder, card, undefined);
  }
  if (Object.keys(files).includes('images')) {
    const images: Express.Multer.File[] = files['images'];

    if (!data.images) data.images = [];
    images.forEach((file) => {
      if (!(data.images.indexOf(file.originalname) >= 0)) {
        data.images.push(file.originalname);
      }
    });
    await saveImages(folder, undefined, images);
  }
  return data;
}

export default updatePhotoOrImageField;
