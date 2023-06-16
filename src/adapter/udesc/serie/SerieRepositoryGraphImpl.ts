import { Serie } from '@domain/udesc/serie';
import { SerieRepository } from './SerieRepository';
import { neo4j_driver } from 'src/database';
import { Integer, Node } from 'neo4j-driver';

export class SerieRepositoryGraphImpl implements SerieRepository {
  async _delete(id: string): Promise<boolean> {
    const session = neo4j_driver.session();
    try {
      const res = await session.executeWrite((tx) =>
        tx.run(`MATCH (s:Serie {name: '${id}'}) DETACH DELETE s`)
      );
      return !!res.summary.counters.updates().nodesDeleted;
    } finally {
      session.close();
    }
  }
  async insertOne(serie: Serie): Promise<boolean> {
    const session = neo4j_driver.session();
    try {
      if (await this.alreadyExists(serie)) {
        return false;
      }
      const res = await session.run(
        `CREATE (s:Serie {
            name: $name, 
            synopsis: $synopsis, 
            comment: $comment,
            numberOfEpisodes: $numberOfEpisodes,
            createdAt: datetime(),
            updatedAt: datetime()})
            WITH s
            MATCH (st:Studio {name: $studio})
            CREATE (s)-[:PRODUCED_BY]->(st)
            WITH s
            MATCH (sta:Status {value: $status})
            CREATE (s)-[:HAS_STATUS]->(sta)
            WITH s
            MATCH (c:Image {name: $cover})
            CREATE (s)-[:HAS_COVER]->(c)
            WITH s
            UNWIND $authors AS authors
            MATCH (a:Author {name: authors})
            CREATE (s)-[:HAS_AUTHOR]->(a)
            WITH s
            UNWIND $streaming as streamings
            MATCH (st:Streaming {name: streamings})
            CREATE (s)-[:AVAILABLE_ON]->(st)
            WITH s
            UNWIND $gallery as images
            MATCH (g:Image {name: images})
            CREATE (s)-[:HAS_GALLERY]->(g)
          RETURN s;`,
        {
          name: serie.name,
          synopsis: serie.synopsis,
          comment: serie.comment,
          numberOfEpisodes: serie.numberOfEpisodes,
          studio: serie.idStudio,
          cover: serie.cover,
          status: serie.status,
          authors: serie.authors,
          streaming: serie.streaming,
          gallery: serie.gallery,
        }
      );
      return !!res.summary.counters.updates().nodesCreated;
    } finally {
      session.close();
    }
  }
  async updateSerie(id: string, serie: Serie): Promise<boolean> {
    const session = neo4j_driver.session();
    const setProperties = `
      SET s.updatedAt = datetime()
      ${serie.synopsis ? ', s.synopsis = $synopsis' : ''}
      ${serie.comment ? ', s.comment = $comment' : ''}
      ${
        serie.numberOfEpisodes ? ', s.numberOfEpisodes = $numberOfEpisodes' : ''
      }
      ${serie.name ? ', s.name = $name' : ''}
    `;
    const authors = serie.authors
      ? `
      WITH s
      UNWIND $authors AS authors
      MATCH (a:Author {name: authors})
      WHERE NOT (s)-[:HAS_AUTHOR]->(a)
        CREATE (s)-[ra:HAS_AUTHOR]->(a)
    `
      : '';
    const streaming = serie.streaming
      ? `
      WITH s
      UNWIND $streaming as streamings
      MATCH (st:Streaming {name: streamings})
      WHERE NOT (s)-[:AVAILABLE_ON]->(st)
        CREATE (s)-[rst:AVAILABLE_ON]->(st)
    `
      : '';
    const gallery = serie.gallery
      ? `
      WITH s
      UNWIND $gallery as images
      MATCH (g:Image {name: images})
      WHERE NOT (s)-[:HAS_GALLERY]->(g)
        CREATE (s)-[rg:HAS_GALLERY]->(g)
    `
      : '';
    const QUERY = `MATCH (s:Serie {name: $id})-[r:PRODUCED_BY]->(:Studio),
      (s)-[r2:HAS_STATUS]->(:Status),
      (s)-[r3:HAS_COVER]->(:Image),
      (newSt:Studio {name: $studio}),
      (newSta:Status {value: $status}),
      (newC:Image {name: $cover})
      ${setProperties}
      CREATE (s)-[:PRODUCED_BY]->(newSt),
      (s)-[:HAS_STATUS]->(newSta),
      (s)-[:HAS_COVER]->(newC)
      DELETE r, r2, r3
      ${authors}
      ${streaming}
      ${gallery}
    RETURN s;`;

    try {
      const result = await session.run(QUERY, {
        id,
        studio: serie.idStudio,
        ...serie,
      });
      return !!result.summary.counters.updates().propertiesSet;
    } finally {
      session.close();
    }
  }
  async getSerie(name: string): Promise<Serie[]> {
    const session = neo4j_driver.session();
    try {
      const res = await session.executeRead((tx) =>
        tx.run<{ s: Node<Integer, Serie> }>(
          `MATCH (s:Serie) WHERE s.name =~ '(?i).*${name}.*' RETURN s`
        )
      );

      return res.records.map((record) => record.get('s').properties);
    } finally {
      session.close();
    }
  }
  getSerieById(_: string): Promise<Serie> {
    throw new Error('Method not implemented.');
  }
  async alreadyExists(serie: Serie): Promise<boolean> {
    const session = neo4j_driver.session();
    try {
      const res = await session.executeRead((tx) =>
        tx.run<{ s: Node<Integer, Serie> }>(
          `MATCH (s:Serie) WHERE s.name = '${serie.name}' RETURN s`
        )
      );
      return !!res.records.length;
    } finally {
      session.close();
    }
  }
  async getAllSeries(): Promise<Serie[]> {
    const session = neo4j_driver.session();
    try {
      const res = await session.executeRead((tx) =>
        tx.run<{ s: Node<Integer, Serie> }>(
          `MATCH (s:Serie) RETURN s ORDER BY s.name`
        )
      );
      return res.records.map((record) => record.get('s').properties);
    } finally {
      session.close();
    }
  }
}
