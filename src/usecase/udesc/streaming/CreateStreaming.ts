import { StreamingRepository } from '@adapter/udesc/streaming/StreamingRepository';
import { Streaming } from '@domain/udesc/streaming';
import { Request, Response } from 'express';

export class CreateStreamingController {
  constructor(private createStreamingUseCase: CreateStreamingUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { link, name, language } = request.body as Streaming;

      if (!link || !name) return response.sendStatus(422);

      const result = await this.createStreamingUseCase.execute(
        link,
        name,
        language
      );
      return response.sendStatus(result ? 201 : 409);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class CreateStreamingUseCase {
  constructor(private streamingRepository: StreamingRepository) {}
  async execute(link: string, name: string, language?: string[]) {
    return await this.streamingRepository.insertOne(
      new Streaming({ link, name, language: language || [] })
    );
  }
}
