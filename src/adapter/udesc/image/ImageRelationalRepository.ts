import { Image } from '@domain/image';
import { ImageRepository } from '@usecase/port/ImageRepository';

export interface ImageRelationalRepository extends ImageRepository {
  getById(id: string): Promise<Image>;
  __delete(id: string): Promise<boolean>;
  updateImage(id: string, image: Image): Promise<boolean>;
}
