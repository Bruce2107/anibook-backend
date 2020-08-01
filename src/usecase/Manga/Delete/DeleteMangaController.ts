import { Request, Response } from 'express';
import { DeleteMangaUseCase } from './DeleteMangaUseCase';

export class DeleteMangaController {
  constructor(private deleteMangaUseCase: DeleteMangaUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name } = request.params;

      const status = await this.deleteMangaUseCase.execute(name);
      return response.sendStatus(status);
    } catch (error) {
      return response.status(400).send({ error: error.stack });
    }
  }
}
