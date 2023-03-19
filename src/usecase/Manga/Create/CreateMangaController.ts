import { Request, Response } from 'express';
import { CreateMangaUseCase } from './CreateMangaUseCase';
import { CreateManga } from '../createManga';
import { Files } from '@constants/Files';

export class CreateMangaController {
  constructor(private createMangaUseCase: CreateMangaUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const data = new CreateManga().createManga(
        JSON.parse(request.body.dados)
      );
      const files = request.files as Files;
      const folder = request.query.folder as string;

      return response.sendStatus(
        await this.createMangaUseCase.execute(data, files, folder)
      );
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
