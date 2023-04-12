import { StreamingLanguageRepository } from '@adapter/udesc/streamingLanguage/StreamingLanguageRepository';
import { Request, Response } from 'express';

export class DeleteStreamingLanguageController {
  constructor(
    private deleteStreamingLanguageUseCase: DeleteStreamingLanguageUseCase
  ) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      return (await this.deleteStreamingLanguageUseCase.execute(id))
        ? response.sendStatus(204)
        : response.sendStatus(404);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}

export class DeleteStreamingLanguageUseCase {
  constructor(
    private streamingLanguageRepository: StreamingLanguageRepository
  ) {}

  async execute(id: string) {
    return this.streamingLanguageRepository._delete(id);
  }
}
