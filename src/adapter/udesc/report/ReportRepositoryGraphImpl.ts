import { StudioSerie, StreamingSerie } from '@domain/udesc/report';
import { Serie } from '@domain/udesc/serie';
import { Image } from '@domain/image';
import { ReportRepository } from './ReportRepository';
import { neo4j_driver } from 'src/database';
import { Integer, Node } from 'neo4j-driver';
import { Studio } from '@domain/udesc/studio';

export class ReportRepositoryGraphImpl implements ReportRepository {
  async getHome(): Promise<Serie[]> {
    const session = neo4j_driver.session();
    try {
      const res = await session.executeRead((tx) =>
        tx.run<{ s: Node<Integer, Serie>; i: Node<Integer, Image> }>(
          `MATCH (:User)-[r]-(s:Serie)
            OPTIONAL MATCH (s)-[:HAS_COVER]->(i:Image)
          RETURN s,i, count(r) as t
          ORDER BY t DESC;`
        )
      );
      return res.records.map((record) => ({
        ...record.get('s').properties,
        cover: record.get('i')?.properties?.name,
      }));
    } finally {
      session.close();
    }
  }
  async getStudioWithAtLeastOneSerieInThreeStreaming(): Promise<StudioSerie[]> {
    const session = neo4j_driver.session();
    try {
      const res = await session.executeRead((tx) =>
        tx.run<{ s: Node<Integer, Serie>; std: Node<Integer, Studio> }>(
          `MATCH (s:Serie)-[a:AVAILABLE_ON]->(st:Streaming), (s)-[:PRODUCED_BY]->(std:Studio) 
            WITH s,std, count(a) as n
            WHERE n >=3
            RETURN s,std ORDER BY s.name`
        )
      );
      const studioSerie = res.records.map((record) => ({
        studio: record.get('std').properties.name,
        serie: record.get('s').properties.name,
      }));
      return studioSerie;
    } finally {
      session.close();
    }
  }
  async getSeriesWithLanguageMusics(
    languageName: string
  ): Promise<Pick<Serie, 'name'>[]> {
    const session = neo4j_driver.session();
    try {
      const res = await session.executeRead((tx) =>
        tx.run<{ s: Node<Integer, Serie> }>(
          `MATCH (s:Serie)-[:HAS_MUSIC]->(m:Music),
          (m)-[:HAS_LANGUAGE]->(l:Language{language: $languageName})
          RETURN DISTINCT s`,
          { languageName }
        )
      );
      const series = res.records.map((record) => ({
        name: record.get('s').properties.name,
      }));
      return series;
    } finally {
      session.close();
    }
  }
  async getStreamingsWithSeriesThatAtLeastTwoAuthor(): Promise<
    StreamingSerie[]
  > {
    const session = neo4j_driver.session();
    try {
      const res = await session.executeRead((tx) =>
        tx.run<{ s: Node<Integer, Serie>; st: Node<Integer, Studio> }>(
          `MATCH (s:Serie)-[:AVAILABLE_ON]->(st:Streaming),(s)-[ra:HAS_AUTHOR]->(a:Author)
            WITH st,s, count(ra) as ta
            WHERE ta >= 2
          RETURN st,s`
        )
      );
      const streamingSerie = res.records.map((record) => ({
        streaming: record.get('st').properties.name,
        serie: record.get('s').properties.name,
      }));
      return streamingSerie;
    } finally {
      session.close();
    }
  }
}
