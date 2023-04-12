import { SerieRepository } from '@adapter/udesc/serie/SerieRepository';
import { Request, Response } from 'express';

export class DeleteSerieController {
  constructor(private deleteSerieUseCase: DeleteSerieUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      return (await this.deleteSerieUseCase.execute(id))
        ? response.sendStatus(204)
        : response.sendStatus(404);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}

export class DeleteSerieUseCase {
  constructor(private serieRepository: SerieRepository) {}

  async execute(id: string) {
    return this.serieRepository._delete(id);
  }
}
