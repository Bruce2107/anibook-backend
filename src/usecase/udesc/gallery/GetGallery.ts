import { GalleryRepository } from '@adapter/udesc/gallery/GalleryRepository';
import { Request, Response } from 'express';

export class GetGalleryController {
  constructor(private getGalleryUseCase: GetGalleryUseCase) {}
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const gallery = await this.getGalleryUseCase.execute(id);

      if (!gallery) return response.sendStatus(404);
      return response.status(200).json({ gallery });
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class GetGalleryUseCase {
  constructor(private galleryRepository: GalleryRepository) {}
  async execute(id: string) {
    return this.galleryRepository.getGallery(id);
  }
}
