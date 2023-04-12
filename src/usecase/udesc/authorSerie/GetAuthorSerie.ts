import { Request, Response } from 'express';
import { AuthorSerieRepository } from '@adapter/udesc/authorSerie/AuthorSerieRepository';

export class GetAuthorSerieController {
  constructor(private getAuthorSerieUseCase: GetAuthorSerieUseCase) {}
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const authorSerie = await this.getAuthorSerieUseCase.execute(id);

      if (!authorSerie) return response.sendStatus(404);
      return response.status(200).json({ authorSerie });
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class GetAuthorSerieUseCase {
  constructor(private authorSerieRepository: AuthorSerieRepository) {}
  async execute(id: string) {
    return this.authorSerieRepository.getAuthorSerie(id);
  }
}
