import { AuthorRepository } from '@adapter/udesc/author/AuthorRepository';
import { Author } from '@domain/udesc/author';
import { Request, Response } from 'express';

export class UpdateAuthorController {
  constructor(private updateAuthorUseCase: UpdateAuthorUseCase) {}
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const data = new Author(request.body);

      const status = await this.updateAuthorUseCase.execute(id, data);

      return response.sendStatus(status ? 204 : 404);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}

export class UpdateAuthorUseCase {
  constructor(private authorRepository: AuthorRepository) {}
  async execute(id: string, data: Author) {
    const result = await this.authorRepository.updateAuthor(id, data);
    return result;
  }
}
