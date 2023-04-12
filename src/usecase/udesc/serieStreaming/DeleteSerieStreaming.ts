import { SerieStreamingRepository } from '@adapter/udesc/serieStreaming/SerieStreamingRepository';
import { Request, Response } from 'express';

export class DeleteSerieStreamingController {
  constructor(
    private deleteSerieStreamingUseCase: DeleteSerieStreamingUseCase
  ) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      return (await this.deleteSerieStreamingUseCase.execute(id))
        ? response.sendStatus(204)
        : response.sendStatus(404);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}

export class DeleteSerieStreamingUseCase {
  constructor(private serieStreamingRepository: SerieStreamingRepository) {}

  async execute(id: string) {
    return this.serieStreamingRepository._delete(id);
  }
}
