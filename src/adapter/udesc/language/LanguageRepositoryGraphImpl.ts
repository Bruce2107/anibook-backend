import { Language } from '@domain/udesc/language';
import { LanguageRepository } from './LanguageRepository';
import { neo4j_driver } from 'src/database';
import { Integer, Node } from 'neo4j-driver';

export class LanguageRepositoryGraphImpl implements LanguageRepository {
  async _delete(language: string): Promise<boolean> {
    const session = neo4j_driver.session();
    try {
      const result = await session.run(
        `MATCH (l:Language {language: $id}) DETACH DELETE l`,
        { id: language }
      );
      return !!result.summary.counters.updates().nodesDeleted;
    } finally {
      session.close();
    }
  }
  async insertOne(language: Language): Promise<boolean> {
    const session = neo4j_driver.session();
    try {
      if (await this.alreadyExists(language)) {
        return false;
      }
      const result = await session.run(
        `CREATE (l:Language {language: $name}) RETURN l`,
        { name: language.language }
      );
      return !!result.records.length;
    } finally {
      session.close();
    }
  }
  async updateLanguage(id: string, language: Language): Promise<boolean> {
    const session = neo4j_driver.session();
    try {
      const result = await session.run(
        `MATCH (l:Language {language: $id}) SET l.language = $name RETURN l`,
        { id, name: language.language }
      );
      return !!result.records.length;
    } finally {
      session.close();
    }
  }
  async getLanguageById(_: string): Promise<Language> {
    throw new Error('Method not implemented.');
  }
  async getLanguage(name: string): Promise<Language[]> {
    const session = neo4j_driver.session();
    try {
      const result = await session.run<{ l: Node<Integer, Language> }>(
        `MATCH (l:Language) WHERE l.language =~ '(?i).*${name}.*' RETURN l`
      );
      return result.records.map((record) => record.get('l').properties);
    } finally {
      session.close();
    }
  }
  async alreadyExists(language: Language): Promise<boolean> {
    const session = neo4j_driver.session();
    try {
      const result = await session.run(
        `MATCH (l:Language {language: $name}) RETURN l`,
        { name: language.language }
      );
      return !!result.records.length;
    } finally {
      session.close();
    }
  }
  async getAllLanguages(): Promise<Language[]> {
    const session = neo4j_driver.session();
    try {
      const result = await session.run<{ l: Node<Integer, Language> }>(
        `MATCH (l:Language) RETURN l ORDER BY l.language`
      );
      return result.records.map((record) => record.get('l').properties);
    } finally {
      session.close();
    }
  }
}
