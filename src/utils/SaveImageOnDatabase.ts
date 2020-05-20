import { readFileSync } from 'fs';
import { pool } from '../database';
import { FileMulter } from '../constants/types/DataType';

interface FinalImage {
  contentType: string;
  image: string;
}
const saveImages = async (
  folder: string,
  file?: FileMulter,
  files?: FileMulter[]
) => {
  const images: FinalImage[] = [];
  if (file) {
    const image = readFileSync(file.path);
    const encode_image = image.toString('base64');
    const finalImage: FinalImage = {
      contentType: file.mimetype,
      image: encode_image,
    };
    images.push(finalImage);
  }
  if (files) {
    files.forEach((file) => {
      images.push({
        contentType: file.mimetype,
        image: readFileSync(file.path).toString('base64'),
      });
    });
  }
  let query = 'INSERT INTO images (folder,contenttype,image) VALUES ';
  images.forEach((image) =>
    query = query.concat(`(${folder},${image.contentType},${image.image})`)
  );
  // return [query, images]
  await pool.query(query);
};

export default saveImages;
