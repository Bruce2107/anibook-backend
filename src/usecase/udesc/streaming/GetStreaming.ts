import { StreamingRepository } from '@adapter/udesc/streaming/StreamingRepository';
import { Request, Response } from 'express';

export class GetStreamingController {
  constructor(private getStreamingUseCase: GetStreamingUseCase) {}
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const streaming = await this.getStreamingUseCase.execute(id);

      if (!streaming) return response.sendStatus(404);
      return response.status(200).json({ streaming });
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class GetStreamingUseCase {
  constructor(private streamingRepository: StreamingRepository) {}
  async execute(id: string) {
    return isNaN(Number(id))
      ? this.streamingRepository.getStreaming(id)
      : this.streamingRepository.getStreamingById(id);
  }
}
