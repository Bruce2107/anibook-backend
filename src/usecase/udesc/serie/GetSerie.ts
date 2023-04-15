import { SerieRepository } from '@adapter/udesc/serie/SerieRepository';
import { Request, Response } from 'express';

export class GetSerieController {
  constructor(private getSerieUseCase: GetSerieUseCase) {}
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const serie = await this.getSerieUseCase.execute(id);

      if (!serie) return response.sendStatus(404);
      return response.status(200).json({ serie });
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class GetSerieUseCase {
  constructor(private serieRepository: SerieRepository) {}
  async execute(id: string) {
    return isNaN(Number(id))
      ? this.serieRepository.getSerie(id)
      : this.serieRepository.getSerieById(id);
  }
}
