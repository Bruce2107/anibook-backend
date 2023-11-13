import { SerieRepository } from '@adapter/udesc/serie/SerieRepository';
import { Request, Response } from 'express';

export class GetAllSeriesByAnyController {
  constructor(private getSerieUseCase: GetAllSeriesByAnyUseCase) {}
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { filter } = request.query;

      const series = await this.getSerieUseCase.execute(filter?.toString(), id);
      return response.status(200).json({ series, rows: series.length });
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class GetAllSeriesByAnyUseCase {
  constructor(private serieRepository: SerieRepository) {}
  async execute(filter: string, id: string) {
    return this.serieRepository.getAllSeriesByAny(filter, id);
  }
}
