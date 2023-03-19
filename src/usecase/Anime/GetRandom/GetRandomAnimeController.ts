import { Request, Response } from 'express';
import { GetRandomAnimeUseCase } from './GetRandomAnimeUseCase';

export class GetRandomAnimeController {
  constructor(private getRandomAnimeUseCase: GetRandomAnimeUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { limit } = request.query;

      const result = await this.getRandomAnimeUseCase.execute(limit as string);

      return response
        .status(result.status)
        .json({ data: result.data, rows: result.rows });
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
