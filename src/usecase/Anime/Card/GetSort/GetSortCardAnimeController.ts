import { GetSortCardAnimeUseCase } from './GetSortCardAnimeUseCase';
import { Request, Response } from 'express';

export class GetSortCardAnimeController {
  constructor(private getRandomCardAnimeUseCase: GetSortCardAnimeUseCase) {}
  async handle(request: Request, response: Response) {
    try {
      const { limit } = request.query;
      const { order } = request.params;
      const result = await this.getRandomCardAnimeUseCase.execute(
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
