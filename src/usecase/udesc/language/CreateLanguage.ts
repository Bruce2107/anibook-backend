import { LanguageRepository } from '@adapter/udesc/language/LanguageRepository';
import { Language } from '@domain/udesc/language';
import { Request, Response } from 'express';

export class CreateLanguageController {
  constructor(private createLanguageUseCase: CreateLanguageUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { language } = request.body as Language;

      if (!language) return response.sendStatus(422);

      const result = await this.createLanguageUseCase.execute(language);
      return response.sendStatus(result ? 201 : 409);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class CreateLanguageUseCase {
  constructor(private languageRepository: LanguageRepository) {}
  async execute(language: string) {
    return await this.languageRepository.insertOne(new Language({ language }));
  }
}
