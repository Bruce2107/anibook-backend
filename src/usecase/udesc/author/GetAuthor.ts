import { Request, Response } from 'express';
import { AuthorRepository } from '@adapter/udesc/author/AuthorRepository';

export class GetAuthorController {
  constructor(private getAuthorUseCase: GetAuthorUseCase) {}
  async handle(request: Request, response: Response) {
    try {
      const { name } = request.params;

      const author = await this.getAuthorUseCase.execute(name);

      if (!author) return response.sendStatus(404);
      return response.status(200).json({ author });
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class GetAuthorUseCase {
  constructor(private authorRepository: AuthorRepository) {}
  async execute(name: string) {
    return this.authorRepository.getAuthor(name);
  }
}
