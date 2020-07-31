import { TypeImage } from 'anibook';

/**
 * @property `string` contentType
 * @property `string` folder
 * @property `Buffer` image
 * @property `string` name
 */
export class Image implements TypeImage {
  contentType: string;
  folder: string;
  image: Buffer;
  name: string;

  constructor({ contentType, folder, image, name }: TypeImage) {
    this.contentType = contentType;
    this.folder = folder;
    this.image = image;
    this.name = name;
  }
}
