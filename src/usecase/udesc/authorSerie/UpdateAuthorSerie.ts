import { AuthorSerieRepository } from '@adapter/udesc/authorSerie/AuthorSerieRepository';
import { AuthorSerie } from '@domain/udesc/authorSerie';
import { Request, Response } from 'express';

export class UpdateAuthorSerieController {
  constructor(private updateAuthorSerieUseCase: UpdateAuthorSerieUseCase) {}
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const data = new AuthorSerie(request.body);

      const status = await this.updateAuthorSerieUseCase.execute(id, data);

      return response.sendStatus(status ? 204 : 404);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}

export class UpdateAuthorSerieUseCase {
  constructor(private authorSerieRepository: AuthorSerieRepository) {}
  async execute(id: string, data: AuthorSerie) {
    const result = await this.authorSerieRepository.updateAuthorSerie(id, data);
    return result;
  }
}
