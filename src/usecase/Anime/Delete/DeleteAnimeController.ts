import { Request, Response } from 'express';
import { DeleteAnimeUseCase } from './DeleteAnimeUseCase';

export class DeleteAnimeController {
  constructor(private deleteAnimeUseCase: DeleteAnimeUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name } = request.params;

      const status = await this.deleteAnimeUseCase.execute(name);
      return response.sendStatus(status);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
