import Image from '../domain/image';

export default class CreateImage {
  createImage(object: any): Image {
    return new Image(object);
  }
}
