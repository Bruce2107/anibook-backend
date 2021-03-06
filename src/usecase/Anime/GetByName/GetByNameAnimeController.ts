import { Request, Response } from 'express';
import { GetByNameAnimeUseCase } from './GetByNameAnimeUseCase';

export class GetByNameAnimeController {
  constructor(private getByNameAnimeUseCase: GetByNameAnimeUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name } = request.params;
      const result = await this.getByNameAnimeUseCase.execute(name);

      return response
        .status(result.status)
        .json({ data: result.data, rows: result.rows });
    } catch (error) {
      return response.sendStatus(400).send({ error: error.stack });
    }
  }
}
