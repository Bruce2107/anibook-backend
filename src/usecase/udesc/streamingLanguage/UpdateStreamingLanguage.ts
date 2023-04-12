import { StreamingLanguageRepository } from '@adapter/udesc/streamingLanguage/StreamingLanguageRepository';
import { StreamingLanguage } from '@domain/udesc/streamingLanguage';
import { Request, Response } from 'express';

export class UpdateStreamingLanguageController {
  constructor(
    private updateStreamingLanguageUseCase: UpdateStreamingLanguageUseCase
  ) {}
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const data = new StreamingLanguage(request.body);

      const status = await this.updateStreamingLanguageUseCase.execute(
        id,
        data
      );

      return response.sendStatus(status ? 204 : 404);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}

export class UpdateStreamingLanguageUseCase {
  constructor(
    private streamingLanguageRepository: StreamingLanguageRepository
  ) {}
  async execute(id: string, data: StreamingLanguage) {
    const result = await this.streamingLanguageRepository.updateStreamingLanguage(
      id,
      data
    );
    return result;
  }
}
