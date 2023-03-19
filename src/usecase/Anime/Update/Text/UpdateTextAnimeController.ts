import { UpdateTextAnimeUseCase } from './UpdateTextAnimeUseCase';
import { Request, Response } from 'express';
import { CreateAnime } from '@usecase/Anime/createAnime';

export class UpdateTextAnimeController {
  constructor(private updateTextAnimeUseCase: UpdateTextAnimeUseCase) {}
  async handle(request: Request, response: Response) {
    try {
      const { name } = request.params;
      const data = new CreateAnime().createAnime(request.body.dados);

      const status = await this.updateTextAnimeUseCase.execute(name, data);

      return response.sendStatus(status);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
