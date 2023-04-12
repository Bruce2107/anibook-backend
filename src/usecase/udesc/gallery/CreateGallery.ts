import { GalleryRepository } from '@adapter/udesc/gallery/GalleryRepository';
import { Gallery } from '@domain/udesc/gallery';
import { Request, Response } from 'express';

export class CreateGalleryController {
  constructor(private createGalleryUseCase: CreateGalleryUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { idImage, idSerie } = request.body as Gallery;

      if (!idImage || !idSerie) return response.sendStatus(422);

      const result = await this.createGalleryUseCase.execute(
        idImage.toString(),
        idSerie.toString()
      );
      return response.sendStatus(result ? 201 : 409);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class CreateGalleryUseCase {
  constructor(private galleryRepository: GalleryRepository) {}
  async execute(idImage: string, idSerie: string) {
    return await this.galleryRepository.insertOne(
      new Gallery({ idImage, idSerie })
    );
  }
}
