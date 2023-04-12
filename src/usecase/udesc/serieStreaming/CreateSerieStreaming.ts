import { Request, Response } from 'express';
import { SerieStreamingRepository } from '@adapter/udesc/serieStreaming/SerieStreamingRepository';
import { SerieStreaming } from '@domain/udesc/serieStreaming';

export class CreateSerieStreamingController {
  constructor(
    private createSerieStreamingUseCase: CreateSerieStreamingUseCase
  ) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { idStreaming, idSerie } = request.body as SerieStreaming;

      if (!idStreaming || !idSerie) return response.sendStatus(422);

      const result = await this.createSerieStreamingUseCase.execute(
        idStreaming.toString(),
        idSerie.toString()
      );
      return response.sendStatus(result ? 201 : 409);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class CreateSerieStreamingUseCase {
  constructor(private serieStreamingRepository: SerieStreamingRepository) {}
  async execute(idStreaming: string, idSerie: string) {
    return await this.serieStreamingRepository.insertOne(
      new SerieStreaming({ idStreaming, idSerie })
    );
  }
}
