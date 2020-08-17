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

  constructor({ ...props }: Image) {
    Object.assign(this, props);
  }
}
