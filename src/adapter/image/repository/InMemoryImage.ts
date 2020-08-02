import { ImageRepository } from '@usecase/port/ImageRepository';
import { Image } from '@domain/image';

export class InMemoryImageRepository implements ImageRepository {
  constructor(private images: Image[]) {}

  async _delete(folder: string, name: string): Promise<boolean> {
    if (await this.alreadyExists(folder, name)) {
      this.images = this.images.filter(
        (image) => image.folder !== folder && image.name !== name
      );
      return true;
    }
    return false;
  }
  async alreadyExists(folder: string, name: string): Promise<boolean> {
    for (let image of this.images)
      if (image.folder === folder && image.name === name) return true;
    return false;
  }
  async getBackground(): Promise<Pick<Image, 'contentType' | 'image'>> {
    const backgroundArray = this.images.filter(
      (image) => image.folder === 'background'
    );
    const number = Math.floor(Math.random() * backgroundArray.length);
    return backgroundArray[number];
  }
  async getOne(
    folder: string,
    name: string
  ): Promise<Pick<Image, 'contentType' | 'image'> | null> {
    if (!(await this.alreadyExists(folder, name))) return null;
    const image = this.images.filter(
      (image) => image.folder === folder && image.name === name
    )[0];
    return image;
  }
  async insertMany(images: Image[]): Promise<[boolean, number]> {
    if (images.length <= 0) return [false, 0];
    let number = 0;
    images.forEach(async (image) => {
      if (!(await this.alreadyExists(image.folder, image.name))) {
        number++;
        this.images.push(image);
      }
    });
    return [true, number];
  }
  async insertOne(image: Image): Promise<boolean> {
    if (!(await this.alreadyExists(image.folder, image.name))) {
      this.images.push(image);
      return true;
    }
    return false;
  }
}
