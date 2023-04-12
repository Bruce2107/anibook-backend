import { StreamingRepository } from '@adapter/udesc/streaming/StreamingRepository';
import { Request, Response } from 'express';

export class DeleteStreamingController {
  constructor(private deleteStreamingUseCase: DeleteStreamingUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      return (await this.deleteStreamingUseCase.execute(id))
        ? response.sendStatus(204)
        : response.sendStatus(404);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}

export class DeleteStreamingUseCase {
  constructor(private streamingRepository: StreamingRepository) {}

  async execute(id: string) {
    return this.streamingRepository._delete(id);
  }
}
