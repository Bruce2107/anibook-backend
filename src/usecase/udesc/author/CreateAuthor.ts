import { Request, Response } from 'express';
import { Author } from '@domain/udesc/author';
import { AuthorRepository } from '@adapter/udesc/author/AuthorRepository';

export class CreateAuthorController {
  constructor(private createAuthorUseCase: CreateAuthorUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name } = request.body as Author;
      console.log(request.body);

      if (!name) return response.sendStatus(422);

      const result = await this.createAuthorUseCase.execute(name);
      return response.sendStatus(result ? 201 : 409);
    } catch (error) {
      return response.status(400).json({ error: error.stack });
    }
  }
}
export class CreateAuthorUseCase {
  constructor(private authorRepository: AuthorRepository) {}
  async execute(name: string) {
    return await this.authorRepository.insertOne(name);
  }
}
