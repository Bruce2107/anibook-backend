import { Request, Response } from 'express';
import { GetSortAnimeUseCase } from './GetSortAnimeUseCase';

export class GetSortAnimeController {
  constructor(private getSortAnimeUseCase: GetSortAnimeUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { limit } = request.query;
      const { order } = request.params;
      const result = await this.getSortAnimeUseCase.execute(
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
