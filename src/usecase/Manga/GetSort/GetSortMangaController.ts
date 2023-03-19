import { Request, Response } from 'express';
import { GetSortMangaUseCase } from './GetSortMangaUseCase';

export class GetSortMangaController {
  constructor(private getSortMangaUseCase: GetSortMangaUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { limit } = request.query;
      const { order } = request.params;
      const result = await this.getSortMangaUseCase.execute(
        limit as string,
        order
      );

      return response
        .status(result.status)
        .json({ data: result.data, rows: result.rows });
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
