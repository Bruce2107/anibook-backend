import { AuthorSerie } from '@domain/udesc/authorSerie';

export interface AuthorSerieRepository {
  _delete(id: string): Promise<boolean>;
  insertOne(authorSerie: AuthorSerie): Promise<boolean>;
  updateAuthorSerie(id: string, authorSerie: AuthorSerie): Promise<boolean>;
  getAuthorSerie(id: string): Promise<AuthorSerie>;
  alreadyExists(authorSerie: AuthorSerie): Promise<boolean>;
}
