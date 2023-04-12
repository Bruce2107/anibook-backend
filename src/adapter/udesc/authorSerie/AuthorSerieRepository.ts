import { AuthorSerie } from '@domain/udesc/authorSerie';

export interface AuthorSerieRepository {
  _delete(id: string): Promise<boolean>;
  insertOne(idAuthor: string, idSerie: string): Promise<boolean>;
  updateAuthorSerie(id: string, authorSerie: AuthorSerie): Promise<boolean>;
  getAuthorSerie(id: string): Promise<AuthorSerie>;
  alreadyExists(idAuthor: string, idSerie: string): Promise<boolean>;
}
