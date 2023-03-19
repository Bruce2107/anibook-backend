import { Request, Response } from 'express';
import { GetByNameMangaUseCase } from './GetByNameMangaUseCase';

export class GetByNameMangaController {
  constructor(private getByNameMangaUseCase: GetByNameMangaUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name } = request.params;
      const result = await this.getByNameMangaUseCase.execute(name);

      return response
        .status(result.status)
        .json({ data: result.data, rows: result.rows });
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
