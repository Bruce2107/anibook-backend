import { Request, Response } from 'express';
import { StreamingLanguageRepository } from '@adapter/udesc/streamingLanguage/StreamingLanguageRepository';
import { StreamingLanguage } from '@domain/udesc/streamingLanguage';

export class CreateStreamingLanguageController {
  constructor(
    private createStreamingLanguageUseCase: CreateStreamingLanguageUseCase
  ) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { idStreaming, idLanguage } = request.body as StreamingLanguage;

      if (!idStreaming || !idLanguage) return response.sendStatus(422);

      const result = await this.createStreamingLanguageUseCase.execute(
        idStreaming.toString(),
        idLanguage.toString()
      );
      return response.sendStatus(result ? 201 : 409);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class CreateStreamingLanguageUseCase {
  constructor(
    private streamingLanguageRepository: StreamingLanguageRepository
  ) {}
  async execute(idStreaming: string, idLanguage: string) {
    return await this.streamingLanguageRepository.insertOne(
      new StreamingLanguage({ idStreaming, idLanguage })
    );
  }
}
