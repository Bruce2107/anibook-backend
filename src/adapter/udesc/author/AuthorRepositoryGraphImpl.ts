import { Author } from '@domain/udesc/author';
import { AuthorRepository } from './AuthorRepository';
import { neo4j_driver } from 'src/database';
import { Integer, Node } from 'neo4j-driver';

export class AuthorRepositoryGraphImpl implements AuthorRepository {
  async _delete(name: string): Promise<boolean> {
    const session = neo4j_driver.session();
    try {
      const res = await session.executeWrite((tx) =>
        tx.run(`MATCH (a: Author {name: '${name}'}) DETACH DELETE a`)
      );
      return !!res.summary.counters.updates().nodesDeleted;
    } finally {
      session.close();
    }
  }
  async insertOne(name: string): Promise<boolean> {
    const session = neo4j_driver.session();
    try {
      if (await this.alreadyExists(name)) {
        return false;
      }
      const res = await session.executeWrite((tx) =>
        tx.run(`CREATE (a: Author {name: '${name}'})`)
      );
      let result = res.summary.counters.updates().nodesCreated;
      return !!result;
    } finally {
      session.close();
    }
  }
  async updateAuthor(name: string, data: Author): Promise<boolean> {
    const session = neo4j_driver.session();
    try {
      const res = await session.executeWrite((tx) =>
        tx.run(
          `MATCH (a: Author {name: '${name}'}) SET a.name = '${data.name}'`
        )
      );
      return !!res.summary.counters.updates().propertiesSet;
    } finally {
      session.close();
    }
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
      return authors;
    } finally {
      session.close();
    }
  }
  getAuthorById(_: string): Promise<Author> {
    throw new Error('Method not implemented.');
  }
  async alreadyExists(name: string): Promise<boolean> {
    const session = neo4j_driver.session();
    try {
      const res = await session.executeRead((tx) =>
        tx.run<{ a: Node<Integer, Author> }>(
          `MATCH (a:Author) WHERE a.name = '${name}' RETURN a`
        )
      );
      return !!res.records.length;
    } finally {
      session.close();
    }
  }
  async getAllAuthors(): Promise<Author[]> {
    const session = neo4j_driver.session();
    try {
      const res = await session.executeRead((tx) =>
        tx.run<{ a: Node<Integer, Author> }>(
          `MATCH (a:Author) RETURN a ORDER BY a.name`
        )
      );
      const authors = res.records.map((record) => record.get('a').properties);
      return authors;
    } finally {
      session.close();
    }
  }
}
