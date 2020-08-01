import { UpdateImageAnimeUseCase } from './UpdateImageAnimeUseCase';
import { Request, Response } from 'express';
import { Files } from '@constants/Files';

export class UpdateImageAnimeController {
  constructor(private updateImageAnimeUseCase: UpdateImageAnimeUseCase) {}
  async handle(request: Request, response: Response) {
    try {
      const { name } = request.params;
      const { folder } = request.query;
      const files = request.files as Files;

      const status = await this.updateImageAnimeUseCase.execute(
        name,
        folder as string,
        files
      );

      return response.sendStatus(status);
    } catch (error) {
      return response.status(400).send({ error: error.stack });
    }
  }
}
