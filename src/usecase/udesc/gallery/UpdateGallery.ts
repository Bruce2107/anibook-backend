import { GalleryRepository } from '@adapter/udesc/gallery/GalleryRepository';
import { Gallery } from '@domain/udesc/gallery';
import { Request, Response } from 'express';

export class UpdateGalleryController {
  constructor(private updateGalleryUseCase: UpdateGalleryUseCase) {}
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const data = new Gallery(request.body);

      const status = await this.updateGalleryUseCase.execute(id, data);

      return response.sendStatus(status ? 204 : 404);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}

export class UpdateGalleryUseCase {
  constructor(private galleryRepository: GalleryRepository) {}
  async execute(id: string, data: Gallery) {
    const result = await this.galleryRepository.updateGallery(id, data);
    return result;
  }
}
