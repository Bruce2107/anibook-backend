import { Request, Response } from 'express';
import { AuthorSerieRepository } from '@adapter/udesc/authorSerie/AuthorSerieRepository';
import { AuthorSerie } from '@domain/udesc/authorSerie';

export class CreateAuthorSerieController {
  constructor(private createAuthorSerieUseCase: CreateAuthorSerieUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { idAuthor, idSerie } = request.body as AuthorSerie;

      if (!idAuthor || !idSerie) return response.sendStatus(422);

      const result = await this.createAuthorSerieUseCase.execute(
        idAuthor.toString(),
        idSerie.toString()
      );
      return response.sendStatus(result ? 201 : 409);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class CreateAuthorSerieUseCase {
  constructor(private authorSerieRepository: AuthorSerieRepository) {}
  async execute(idAuthor: string, idSerie: string) {
    return await this.authorSerieRepository.insertOne(
      new AuthorSerie({ idAuthor, idSerie })
    );
  }
}
