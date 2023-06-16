import { ImageRelationalRepository } from '@adapter/udesc/image/ImageRelationalRepository';
import { Request, Response } from 'express';

export class DeleteImageController {
  constructor(private deleteImageUseCase: DeleteImageUseCase) {}

  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;

      return (await this.deleteImageUseCase.execute(id))
        ? response.sendStatus(204)
        : response.sendStatus(404);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}

export class DeleteImageUseCase {
  constructor(private imageRepository: ImageRelationalRepository) {}

  async execute(id: string) {
    return this.imageRepository.__delete(id);
  }
}

export class DeleteImageGraphController {
  constructor(private deleteImageUseCase: DeleteImageGraphUseCase) {}

  async handle(request: Request, response: Response) {
    try {
      const { folder, name } = request.params;

      return (await this.deleteImageUseCase.execute(folder, name))
        ? response.sendStatus(204)
        : response.sendStatus(404);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}

export class DeleteImageGraphUseCase {
  constructor(private imageRepository: ImageRelationalRepository) {}

  async execute(id: string, name: string) {
    return this.imageRepository._delete(id, name);
  }
}
