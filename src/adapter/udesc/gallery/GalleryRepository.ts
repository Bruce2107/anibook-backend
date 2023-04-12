import { Image } from '@domain/image';
import { Gallery } from '@domain/udesc/gallery';

export interface GalleryRepository {
  _delete(id: string): Promise<boolean>;
  insertOne(gallery: Gallery): Promise<boolean>;
  updateGallery(id: string, gallery: Gallery): Promise<boolean>;
  getGallery(idSerie: string): Promise<Image[]>;
  alreadyExists(gallery: Gallery): Promise<boolean>;
}
