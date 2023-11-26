import { StudioSerie, StreamingSerie } from '@domain/udesc/report';
import { Serie, SerieNeo4j } from '@domain/udesc/serie';
import { Image } from '@domain/image';
import { ReportRepository } from './ReportRepository';
import { neo4j_driver } from 'src/database';
import { Integer, Node, QueryResult } from 'neo4j-driver';
import { Studio } from '@domain/udesc/studio';
import { RemoveObjectProperties } from '@utils/RemoveObjectProperties';
import { AvailableStatus, UserStatus } from '@domain/udesc/relationships';
import { Counter } from '@utils/Counter';
import { User } from '@domain/udesc/user';

export class ReportRepositoryGraphImpl implements ReportRepository {
  async userLogin(user: User): Promise<boolean> {
    const session = neo4j_driver.session();
    try {
      const res = await session.executeRead((tx) =>
        tx.run<{ u: Node<Integer, User> }>(
          `MATCH (u:User {name: '${user.name}'}) RETURN u`
        )
      );
      if (res.records.length === 0) return false;
      return res.records[0].get('u').properties.password === user.password;
    } finally {
      session.close();
    }
  }
  async getDetails(name: string, user?: string): Promise<Serie[]> {
    const session = neo4j_driver.session();
    const quoteCase = name.replace('<>', "'");
    const withUser = user
      ? [
          `OPTIONAL MATCH (u:User)-[r:USER_STATUS]->(s)
            WHERE u.name =~ "(?i).*${user}.*"`,
          ',collect(r) as us',
          ',us',
        ]
      : ['', '', ''];
    try {
      const serie = await session.executeRead((tx) =>
        tx.run<SerieNeo4j>(
          `MATCH (s:Serie {name: "${quoteCase}"})
            OPTIONAL MATCH (s)-[:HAS_MUSIC]->(m:Music)
            OPTIONAL MATCH (s)-[:HAS_STATUS]->(st:Status)
            OPTIONAL MATCH (s)-[:PRODUCED_BY]->(std:Studio)
            OPTIONAL MATCH (s)-[:HAS_AUTHOR]->(a:Author)
            OPTIONAL MATCH (s)-[:AVAILABLE_ON]->(str:Streaming)
            OPTIONAL MATCH (s)-[:HAS_COVER]->(i:Image)
            ${withUser[0]}
          WITH s, collect(m) as m, st,std,collect(a) as a, collect(str) as str,i${withUser[1]}
          RETURN s,m,st,std,a,str,i${withUser[2]} ORDER BY s.name`
        )
      );

      const res = await session.executeRead((tx) =>
        tx.run<{ dc: UserStatus[] }>(
          `MATCH (s:Serie {name: "${quoteCase}"})
            MATCH (:User)-[r:USER_STATUS]->(s)
            WITH collect(r) as dc
          RETURN dc`
        )
      );
      if (res.records.length > 0) {
        const record = res.records[0];
        const normalizedStatus = RemoveObjectProperties<{
          properties: { type: AvailableStatus };
        }>(record.get('dc'), ['properties']);
        const statusList = normalizedStatus.map((i) => i.properties.type);
        const count: { [key in AvailableStatus]: number } = {
          watched: 0,
          watching: 0,
          dropped: 0,
          plan_to_watch: 0,
        };
        const counter = Counter(statusList, count);
        return this._getResponse(serie, counter, !!user);
      } else return [];
    } finally {
      session.close();
    }
  }
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
        cover:
          record.get('i')?.properties?.link ||
          record.get('i')?.properties?.name,
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

  _getResponse(
    data: QueryResult<SerieNeo4j>,
    counter: { [key in AvailableStatus]: number },
    withUser: boolean = false
  ) {
    return data.records.map((record) => ({
      ...record.get('s').properties,
      musics: [
        ...new Set(record.get('m')?.map((music) => music.properties.name)),
      ],
      cover:
        record.get('i')?.properties?.link || record.get('i')?.properties?.name,
      status: record.get('st')?.properties?.value,
      idStudio: record.get('std')?.properties?.name,
      authors: [
        ...new Set(record.get('a')?.map((author) => author.properties.name)),
      ],
      streaming: [
        ...new Set(
          record.get('str')?.map((streaming) => streaming.properties.name)
        ),
      ],
      userStatus: withUser ? record.get('us')?.[0]?.properties.type : 'null',
      detailsCounter: counter,
    }));
  }
}
