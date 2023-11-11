import { SerieRepository } from '@adapter/udesc/serie/SerieRepository';
import { Request, Response } from 'express';

export class GetAllSeriesByUserController {
  constructor(private getSerieUseCase: GetAllSeriesByUserUseCase) {}
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const series = await this.getSerieUseCase.execute(id);

      return response.status(200).json({ series });
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class GetAllSeriesByUserUseCase {
  constructor(private serieRepository: SerieRepository) {}
  async execute(id: string) {
    return this.serieRepository.getAllSeriesByUser(id);
  }
}
