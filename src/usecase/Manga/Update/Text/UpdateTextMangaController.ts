import { UpdateTextMangaUseCase } from './UpdateTextMangaUseCase';
import { Request, Response } from 'express';
import { CreateManga } from '@usecase/Manga/createManga';

export class UpdateTextMangaController {
  constructor(private updateTextMangaUseCase: UpdateTextMangaUseCase) {}
  async handle(request: Request, response: Response) {
    try {
      const { name } = request.params;
      const data = new CreateManga().createManga(request.body.dados);

      const status = await this.updateTextMangaUseCase.execute(name, data);

      return response.sendStatus(status);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
