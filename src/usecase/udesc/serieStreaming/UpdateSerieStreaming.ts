import { SerieStreamingRepository } from '@adapter/udesc/serieStreaming/SerieStreamingRepository';
import { SerieStreaming } from '@domain/udesc/serieStreaming';
import { Request, Response } from 'express';

export class UpdateSerieStreamingController {
  constructor(
    private updateSerieStreamingUseCase: UpdateSerieStreamingUseCase
  ) {}
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const data = new SerieStreaming(request.body);

      const status = await this.updateSerieStreamingUseCase.execute(id, data);

      return response.sendStatus(status ? 204 : 404);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}

export class UpdateSerieStreamingUseCase {
  constructor(private serieStreamingRepository: SerieStreamingRepository) {}
  async execute(id: string, data: SerieStreaming) {
    const result = await this.serieStreamingRepository.updateSerieStreaming(
      id,
      data
    );
    return result;
  }
}
