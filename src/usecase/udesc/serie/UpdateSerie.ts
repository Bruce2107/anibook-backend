import { SerieRepository } from '@adapter/udesc/serie/SerieRepository';
import { Serie } from '@domain/udesc/serie';
import { Request, Response } from 'express';

export class UpdateSerieController {
  constructor(private updateSerieUseCase: UpdateSerieUseCase) {}
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const data = new Serie(request.body);

      const status = await this.updateSerieUseCase.execute(id, data);

      return response.sendStatus(status ? 204 : 404);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}

export class UpdateSerieUseCase {
  constructor(private serieRepository: SerieRepository) {}
  async execute(id: string, data: Serie) {
    const result = await this.serieRepository.updateSerie(id, data);
    return result;
  }
}
