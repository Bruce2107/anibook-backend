import { GetSortCardMangaUseCase } from './GetSortCardMangaUseCase';
import { Request, Response } from 'express';

export class GetSortCardMangaController {
  constructor(private getSortCardMangaUseCase: GetSortCardMangaUseCase) {}
  async handle(request: Request, response: Response) {
    try {
      const { limit } = request.query;
      const { order } = request.params;
      const result = await this.getSortCardMangaUseCase.execute(
        limit as string,
        order
      );

      return response
        .status(result.status)
        .json({ data: result.data, rows: result.rows });
    } catch (error) {
      return response.sendStatus(400).send({ error: error.stack });
    }
  }
}
