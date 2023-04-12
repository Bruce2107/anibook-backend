import { LanguageRepository } from '@adapter/udesc/language/LanguageRepository';
import { Request, Response } from 'express';

export class DeleteLanguageController {
  constructor(private deleteLanguageUseCase: DeleteLanguageUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      return (await this.deleteLanguageUseCase.execute(id))
        ? response.sendStatus(204)
        : response.sendStatus(404);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}

export class DeleteLanguageUseCase {
  constructor(private languageRepository: LanguageRepository) {}

  async execute(id: string) {
    return this.languageRepository._delete(id);
  }
}
