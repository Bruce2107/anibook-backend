import { LanguageRepository } from '@adapter/udesc/language/LanguageRepository';
import { Request, Response } from 'express';

export class GetLanguageController {
  constructor(private getLanguageUseCase: GetLanguageUseCase) {}
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const language = await this.getLanguageUseCase.execute(id);

      if (!language) return response.sendStatus(404);
      return response.status(200).json({ language });
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class GetLanguageUseCase {
  constructor(private languageRepository: LanguageRepository) {}
  async execute(id: string) {
    return isNaN(Number(id))
      ? this.languageRepository.getLanguage(id)
      : this.languageRepository.getLanguageById(id);
  }
}
