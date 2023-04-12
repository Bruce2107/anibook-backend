import { GalleryRepository } from '@adapter/udesc/gallery/GalleryRepository';
import { Request, Response } from 'express';

export class DeleteGalleryController {
  constructor(private deleteGalleryUseCase: DeleteGalleryUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      return (await this.deleteGalleryUseCase.execute(id))
        ? response.sendStatus(204)
        : response.sendStatus(404);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}

export class DeleteGalleryUseCase {
  constructor(private galleryRepository: GalleryRepository) {}

  async execute(id: string) {
    return this.galleryRepository._delete(id);
  }
}
