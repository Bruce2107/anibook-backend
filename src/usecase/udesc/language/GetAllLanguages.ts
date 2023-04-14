import { LanguageRepository } from '@adapter/udesc/language/LanguageRepository';
import { Request, Response } from 'express';

export class GetAllLanguagesController {
  constructor(private getAllLanguagesUseCase: GetAllLanguagesUseCase) {}
  async handle(_: Request, response: Response) {
    try {
      const languages = await this.getAllLanguagesUseCase.execute();
      return response.status(200).json({ languages });
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class GetAllLanguagesUseCase {
  constructor(private languageRepository: LanguageRepository) {}
  async execute() {
    return this.languageRepository.getAllLanguages();
  }
}
