import { SerieRepository } from '@adapter/udesc/serie/SerieRepository';
import { Request, Response } from 'express';

export class GetAllSeriesController {
  constructor(private getAllSeriesUseCase: GetAllSeriesUseCase) {}
  async handle(_: Request, response: Response) {
    try {
      const series = await this.getAllSeriesUseCase.execute();
      return response.status(200).json({ series });
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class GetAllSeriesUseCase {
  constructor(private serieRepository: SerieRepository) {}
  async execute() {
    return this.serieRepository.getAllSeries();
  }
}
