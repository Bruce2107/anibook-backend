import { Author } from '@domain/udesc/author';

export interface AuthorRepository {
  _delete(id: string): Promise<boolean>;
  insertOne(name: string): Promise<boolean>;
  updateAuthor(id: string, data: Author): Promise<boolean>;
  getAuthor(name: string): Promise<Author>;
  alreadyExists(name: string): Promise<boolean>;
  getAllAuthors(): Promise<Author[]>;
}
