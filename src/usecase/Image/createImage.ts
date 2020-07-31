import { Image } from '@domain/image';

export class CreateImage {
  createImage(object: any): Image {
    return new Image(object);
  }
}
