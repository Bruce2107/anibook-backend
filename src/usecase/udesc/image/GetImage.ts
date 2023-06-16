import { Request, Response } from 'express';
import { ImageRelationalRepository } from '@adapter/udesc/image/ImageRelationalRepository';

export class GetImageController {
  constructor(private getImageUseCase: GetImageUseCase) {}

  async handle(request: Request, response: Response) {
    try {
      const { folder, name, id } = request.params;
      const result = await this.getImageUseCase.execute(folder, name, id);
      if (result) {
        if (result.contentType && result.image.toString() !== 'null') {
          response.contentType(result.contentType);
          return response.send(result.image);
        }
        return response.status(200).json(result);
      }
      return response.sendStatus(404);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}

export class GetImageUseCase {
  constructor(private imageRepository: ImageRelationalRepository) {}

  async execute(folder?: string, name?: string, id?: string) {
    if (id) return await this.imageRepository.getById(id);
    if (name && folder) return await this.imageRepository.getOne(folder, name);
    return await this.imageRepository.getBackground();
  }
}
