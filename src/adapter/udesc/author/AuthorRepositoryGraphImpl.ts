import { Author } from '@domain/udesc/author';
import { AuthorRepository } from './AuthorRepository';
import { neo4j_driver } from 'src/database';
import { Integer, Node } from 'neo4j-driver';

export class AuthorRepositoryGraphImpl implements AuthorRepository {
  _delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  insertOne(name: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  updateAuthor(id: string, data: Author): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  async getAuthor(name: string): Promise<Author[]> {
    const session = neo4j_driver.session();
    try {
      const res = await session.executeRead((tx) =>
        tx.run<{ a: Node<Integer, Author> }>(
          `MATCH (a:Author) WHERE a.name contains '${name}' RETURN a`
        )
      );
      const authors = res.records.map((record) => record.get('a').properties);
      console.log(authors[0].name);
      return authors;
    } finally {
      session.close();
    }
  }
  getAuthorById(id: string): Promise<Author> {
    throw new Error('Method not implemented.');
  }
  alreadyExists(name: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  getAllAuthors(): Promise<Author[]> {
    throw new Error('Method not implemented.');
  }
}
