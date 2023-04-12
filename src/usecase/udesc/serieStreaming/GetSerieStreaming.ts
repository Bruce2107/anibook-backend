import { Request, Response } from 'express';
import { SerieStreamingRepository } from '@adapter/udesc/serieStreaming/SerieStreamingRepository';

export class GetSerieStreamingController {
  constructor(private getSerieStreamingUseCase: GetSerieStreamingUseCase) {}
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const serieStreaming = await this.getSerieStreamingUseCase.execute(id);

      if (!serieStreaming) return response.sendStatus(404);
      return response.status(200).json({ serieStreaming });
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class GetSerieStreamingUseCase {
  constructor(private serieStreamingRepository: SerieStreamingRepository) {}
  async execute(id: string) {
    return this.serieStreamingRepository.getSerieStreaming(id);
  }
}
