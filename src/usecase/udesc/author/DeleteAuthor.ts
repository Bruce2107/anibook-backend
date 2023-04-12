import { AuthorRepository } from '@adapter/udesc/author/AuthorRepository';
import { Request, Response } from 'express';

export class DeleteAuthorController {
  constructor(private deleteAuthorUseCase: DeleteAuthorUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      return (await this.deleteAuthorUseCase.execute(id))
        ? response.sendStatus(204)
        : response.sendStatus(404);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}

export class DeleteAuthorUseCase {
  constructor(private authorRepository: AuthorRepository) {}

  async execute(id: string) {
    return this.authorRepository._delete(id);
  }
}
