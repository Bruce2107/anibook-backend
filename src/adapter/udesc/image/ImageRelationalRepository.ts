import { Image } from '@domain/image';
import { ImageRepository } from '@usecase/port/ImageRepository';

export interface ImageRelationalRepository extends ImageRepository {
  getById(id: string): Promise<Image>;
  _delete(id: string): Promise<boolean>;
}
