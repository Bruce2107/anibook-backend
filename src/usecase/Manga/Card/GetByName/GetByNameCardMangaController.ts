import { GetByNameCardMangaUseCase } from './GetByNameCardMangaUseCase';
import { Request, Response } from 'express';

export class GetByNameCardMangaController {
  constructor(private getByNameCardMangaUseCase: GetByNameCardMangaUseCase) {}
  async handle(request: Request, response: Response) {
    try {
      const { name } = request.params;
      const result = await this.getByNameCardMangaUseCase.execute(name);

      return response
        .status(result.status)
        .json({ data: result.data, rows: result.rows });
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
