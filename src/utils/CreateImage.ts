import { readFileSync } from 'fs';
import { TypeImage } from '../constants/Image';

const createImage = (folder: string, file: Express.Multer.File): TypeImage => ({
  contentType: file.mimetype,
  folder,
  image: Buffer.from(readFileSync(file.path).toString('base64'), 'base64'),
  name: file.originalname,
});

export default createImage;
