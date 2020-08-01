import { Request, Response } from 'express';
import { CreateAnimeUseCase } from './CreateAnimeUseCase';
import { CreateAnime } from '../createAnime';
import { Files } from '@constants/Files';

export class CreateAnimeController {
  constructor(private createAnimeUseCase: CreateAnimeUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const data = new CreateAnime().createAnime(
        JSON.parse(request.body.dados)
      );
      const files = request.files as Files;
      const folder = request.query.folder as string;

      return response.sendStatus(
        await this.createAnimeUseCase.execute(data, files, folder)
      );
    } catch (error) {
      return response.sendStatus(400).send({ error: error.stack });
    }
  }
}
