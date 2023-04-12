import { StreamingRepository } from '@adapter/udesc/streaming/StreamingRepository';
import { Streaming } from '@domain/udesc/streaming';
import { Request, Response } from 'express';

export class UpdateStreamingController {
  constructor(private updateStreamingUseCase: UpdateStreamingUseCase) {}
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const data = new Streaming(request.body);

      const streaming = await this.updateStreamingUseCase.execute(id, data);

      return response.sendStatus(streaming ? 204 : 404);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}

export class UpdateStreamingUseCase {
  constructor(private streamingRepository: StreamingRepository) {}
  async execute(id: string, data: Streaming) {
    const result = await this.streamingRepository.updateStreaming(id, data);
    return result;
  }
}
