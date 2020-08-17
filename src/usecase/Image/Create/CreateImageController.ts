import { Request, Response } from 'express';
import { Files } from '@constants/Files';
import { CreateImageUseCase } from './CreateImageUseCase';

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
      return response.status(400).send({ error: error.stack });
    }
  }
}
