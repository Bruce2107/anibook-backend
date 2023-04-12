import { AuthorSerieRepository } from '@adapter/udesc/authorSerie/AuthorSerieRepository';
import { Request, Response } from 'express';

export class DeleteAuthorSerieController {
  constructor(private deleteAuthorSerieUseCase: DeleteAuthorSerieUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      return (await this.deleteAuthorSerieUseCase.execute(id))
        ? response.sendStatus(204)
        : response.sendStatus(404);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}

export class DeleteAuthorSerieUseCase {
  constructor(private authorSerieRepository: AuthorSerieRepository) {}

  async execute(id: string) {
    return this.authorSerieRepository._delete(id);
  }
}
