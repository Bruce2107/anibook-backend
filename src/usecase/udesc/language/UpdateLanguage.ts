import { LanguageRepository } from '@adapter/udesc/language/LanguageRepository';
import { Language } from '@domain/udesc/language';
import { Request, Response } from 'express';

export class UpdateLanguageController {
  constructor(private updateLanguageUseCase: UpdateLanguageUseCase) {}
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const data = new Language(request.body);

      const status = await this.updateLanguageUseCase.execute(id, data);

      return response.sendStatus(status ? 204 : 404);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}

export class UpdateLanguageUseCase {
  constructor(private languageRepository: LanguageRepository) {}
  async execute(id: string, data: Language) {
    const result = await this.languageRepository.updateLanguage(id, data);
    return result;
  }
}
