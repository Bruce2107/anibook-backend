import { Streaming } from '@domain/udesc/streaming';
import { StreamingRepository } from './StreamingRepository';
import { neo4j_driver } from 'src/database';
import { Integer, Node } from 'neo4j-driver';

export class StreamingRepositoryGraphImpl implements StreamingRepository {
  async _delete(id: string): Promise<boolean> {
    const session = neo4j_driver.session();
    try {
      const result = await session.run(
        `MATCH (s:Streaming {name: $name}) DETACH DELETE s`,
        { name: id }
      );
      return !!result.summary.counters.updates().nodesDeleted;
    } finally {
      session.close();
    }
  }
  async insertOne(streaming: Streaming): Promise<boolean> {
    const session = neo4j_driver.session();
    try {
      if (await this.alreadyExists(streaming)) {
        return false;
      }
      const result = await session.run(
        `CREATE (s:Streaming {name: $name, link: $link})
          WITH s
          UNWIND $languages as languages
          MATCH (l:Language {language: languages})
          CREATE (s)-[:HAS_LANGUAGE]->(l)
        RETURN s`,
        {
          name: streaming.name,
          link: streaming.link,
          languages: streaming.language,
        }
      );
      return !!result.records.length;
    } finally {
      session.close();
    }
  }
  async updateStreaming(id: string, streaming: Streaming): Promise<boolean> {
    const session = neo4j_driver.session();
    try {
      const result = await session.run(
        `MATCH (s: Streaming {name: $id})
          SET s.link = $link, s.name = $name
          WITH s
          UNWIND $languages as languages
          MATCH (l:Language {language: languages})
          WHERE NOT (s)-[:HAS_LANGUAGE]->(l)
            CREATE (s)-[rl:HAS_LANGUAGE]->(l)
        RETURN s`,
        {
          id,
          name: streaming.name,
          link: streaming.link,
          languages: streaming.language || [],
        }
      );
      return !!result.summary.counters.updates().propertiesSet;
    } finally {
      session.close();
    }
  }
  async getStreaming(name: string): Promise<Streaming[]> {
    const session = neo4j_driver.session();
    try {
      const result = await session.run<{ s: Node<Integer, Streaming> }>(
        `MATCH (s:Streaming) WHERE s.name =~ '(?i).*${name}.*' RETURN s`,
        {
          name,
        }
      );
      return result.records.map((record) => record.get('s').properties);
    } finally {
      session.close();
    }
  }
  getStreamingById(_: string): Promise<Streaming> {
    throw new Error('Method not implemented.');
  }
  async alreadyExists(streaming: Streaming): Promise<boolean> {
    const session = neo4j_driver.session();
    try {
      const result = await session.run(
        `MATCH (s:Streaming {name: $name}) RETURN s`,
        {
          name: streaming.name,
        }
      );
      return result.records.length > 0;
    } finally {
      session.close();
    }
  }
  async getAllStreamings(): Promise<Streaming[]> {
    const session = neo4j_driver.session();
    try {
      const result = await session.run<{ s: Node<Integer, Streaming> }>(
        `MATCH (s:Streaming) RETURN s ORDER BY s.name`
      );
      return result.records.map((record) => record.get('s').properties);
    } finally {
      session.close();
    }
  }
}
