import { Request, Response } from 'express';
import { StreamingLanguageRepository } from '@adapter/udesc/streamingLanguage/StreamingLanguageRepository';

export class GetStreamingLanguageController {
  constructor(
    private getStreamingLanguageUseCase: GetStreamingLanguageUseCase
  ) {}
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const streamingLanguage = await this.getStreamingLanguageUseCase.execute(
        id
      );

      if (!streamingLanguage) return response.sendStatus(404);
      return response.status(200).json({ streamingLanguage });
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class GetStreamingLanguageUseCase {
  constructor(
    private streamingLanguageRepository: StreamingLanguageRepository
  ) {}
  async execute(id: string) {
    return this.streamingLanguageRepository.getStreamingLanguage(id);
  }
}
