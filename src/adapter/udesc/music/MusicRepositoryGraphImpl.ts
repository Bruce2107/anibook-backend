import { Music } from '@domain/udesc/music';
import { MusicRepository } from './MusicRepository';
import { neo4j_driver } from 'src/database';
import { Integer, Node } from 'neo4j-driver';

export class MusicRepositoryGraphImpl implements MusicRepository {
  async _delete(id: string): Promise<boolean> {
    const session = neo4j_driver.session();
    try {
      const result = await session.run(
        `MATCH (m:Music {name: $id}) DETACH DELETE m`,
        { id }
      );
      return !!result.summary.counters.updates().nodesDeleted;
    } finally {
      session.close();
    }
  }
  async insertOne(music: Music): Promise<boolean> {
    const session = neo4j_driver.session();
    try {
      if (await this.alreadyExists(music)) {
        return false;
      }
      const result = await session.run(
        `MATCH (l:Language {language: '${music.idLanguage}'}) 
      MATCH (s: Serie {name: '${music.idSerie}'})
      CREATE (m: Music {name: '${music.name}', link: '${music.link}'})-[:HAS_LANGUAGE]->(l),
      (s)-[:HAS_MUSIC]->(m)
      RETURN m`
      );
      return !!result.summary.counters.updates().nodesCreated;
    } finally {
      session.close();
    }
  }
  async updateMusic(id: string, music: Music): Promise<boolean> {
    const session = neo4j_driver.session();
    try {
      const result = await session.run(
        `MATCH (m: Music {name: $id})-[rl:HAS_LANGUAGE]->(l: Language),
        (s:Serie)-[rs:HAS_MUSIC]->(m), (l2:Language {language: $language}),(s2:Serie {name: $serie})
        SET m.name = $name, m.link = $link
        CREATE (m)-[:HAS_LANGUAGE]->(l2),
        (s2)-[:HAS_MUSIC]->(m)
        DELETE rl, rs
        RETURN m;`,
        {
          id,
          name: music.name,
          link: music.link,
          language: music.idLanguage,
          serie: music.idSerie,
        }
      );
      return !!result.summary.counters.updates().propertiesSet;
    } finally {
      session.close();
    }
  }
  async getMusic(name: string): Promise<Music[]> {
    const session = neo4j_driver.session();
    try {
      const result = await session.run<{ m: Node<Integer, Music> }>(
        `MATCH (m:Music) WHERE m.name =~ '(?i).*${name}.*' RETURN m`
      );
      return result.records.map((record) => record.get('m').properties);
    } finally {
      session.close();
    }
  }
  getMusicById(_: string): Promise<Music> {
    throw new Error('Method not implemented.');
  }
  async alreadyExists(music: Music): Promise<boolean> {
    const session = neo4j_driver.session();
    try {
      const result = await session.run(
        `MATCH (m:Music {name: $name}) RETURN m`,
        {
          name: music.name,
        }
      );
      return !!result.records.length;
    } finally {
      session.close();
    }
  }
  async getAllMusics(): Promise<Music[]> {
    const session = neo4j_driver.session();
    try {
      const result = await session.run<{ m: Node<Integer, Music> }>(
        `MATCH (m:Music) RETURN m ORDER BY m.name`
      );
      return result.records.map((record) => record.get('m').properties);
    } finally {
      session.close();
    }
  }
}
