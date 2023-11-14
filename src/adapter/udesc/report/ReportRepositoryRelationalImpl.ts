import { QueryResult } from 'pg';
import { pool } from '../../../database';
import { ReportRepository } from './ReportRepository';
import { StreamingSerie, StudioSerie } from '@domain/udesc/report';
import { Serie } from '@domain/udesc/serie';

export class ReportRepositoryRelationalImpl implements ReportRepository {
  getHome(): Promise<Serie[]> {
    throw new Error('Method not implemented.');
  }
  async getStreamingsWithSeriesThatAtLeastTwoAuthor(): Promise<
    StreamingSerie[]
  > {
    const result: QueryResult<StreamingSerie> = await pool.query(
      `SELECT s."name" AS "streaming",s2."name" AS "serie" FROM streaming s 
    JOIN serie_streaming ss ON s.id =ss.idstreaming 
    JOIN serie s2 ON ss.idserie = s2.id 
    JOIN author_serie as2 ON s2.id = as2.idserie 
    GROUP BY s.id, s2.id HAVING COUNT(s2.id) >=2;`,
      []
    );

    return result.rows;
  }
  async getSeriesWithLanguageMusics(
    languageName: string
  ): Promise<Pick<Serie, 'name'>[]> {
    const result: QueryResult<Serie> = await pool.query(
      `SELECT distinct se."name" AS "name" FROM serie se 
    JOIN music m ON se.id = m.idserie 
    JOIN "language" l ON l.id = m.idlanguage 
    AND l."language" = $1;`,
      [languageName]
    );

    return result.rows;
  }
  async getStudioWithAtLeastOneSerieInThreeStreaming(): Promise<StudioSerie[]> {
    const result: QueryResult<StudioSerie> = await pool.query(
      `SELECT stu."name" AS "studio", se."name" AS "serie" FROM Studio stu
    JOIN Serie se ON stu.id = se.idStudio
    JOIN Serie_Streaming sestr ON se.id = sestr.idSerie
    GROUP BY stu.id, se.id HAVING COUNT(*) >=3  ORDER BY se."name";`,
      []
    );

    return result.rows;
  }
}
