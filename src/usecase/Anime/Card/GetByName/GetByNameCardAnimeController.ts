import { GetByNameCardAnimeUseCase } from './GetByNameCardAnimeUseCase';
import { Request, Response } from 'express';

export class GetByNameCardAnimeController {
  constructor(private getByNameCardAnimeUseCase: GetByNameCardAnimeUseCase) {}
  async handle(request: Request, response: Response) {
    try {
      const { name } = request.params;
      const result = await this.getByNameCardAnimeUseCase.execute(name);

      return response
        .status(result.status)
        .json({ data: result.data, rows: result.rows });
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
