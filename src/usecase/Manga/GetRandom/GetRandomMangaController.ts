import { Request, Response } from 'express';
import { GetRandomMangaUseCase } from './GetRandomMangaUseCase';

export class GetRandomMangaController {
  constructor(private getRandomMangaUseCase: GetRandomMangaUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { limit } = request.query;

      const result = await this.getRandomMangaUseCase.execute(limit as string);

      return response
        .status(result.status)
        .json({ data: result.data, rows: result.rows });
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
