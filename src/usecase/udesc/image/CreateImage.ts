import { Request, Response } from 'express';
import { Files } from '@constants/Files';
import { ImageRelationalRepository } from '@adapter/udesc/image/ImageRelationalRepository';
import { saveImage } from '@utils/SaveImage';

export class CreateImageController {
  constructor(private createImageUseCase: CreateImageUseCase) {}

  async handle(request: Request, response: Response) {
    try {
      const queryFolder = request.query.folder as string;
      const files = request.files as Files;

      if (!files) return response.sendStatus(422);

      const folder = queryFolder ? queryFolder : 'background';

      return (await this.createImageUseCase.execute(folder, files))
        ? response.sendStatus(201)
        : response.sendStatus(400);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}

export class CreateImageUseCase {
  constructor(private imageRepository: ImageRelationalRepository) {}

  async execute(folder: string, files: Files) {
    return await saveImage(
      folder,
      this.imageRepository,
      undefined,
      files['images']
    );
  }
}
