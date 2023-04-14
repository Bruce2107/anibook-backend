import { Request, Response } from 'express';
import { AuthorRepository } from '@adapter/udesc/author/AuthorRepository';

export class GetAllAuthorsController {
  constructor(private getAllAuthorsUseCase: GetAllAuthorsUseCase) {}
  async handle(_: Request, response: Response) {
    try {
      const authors = await this.getAllAuthorsUseCase.execute();

      return response.status(200).json({ authors });
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class GetAllAuthorsUseCase {
  constructor(private authorRepository: AuthorRepository) {}
  async execute() {
    return this.authorRepository.getAllAuthors();
  }
}
