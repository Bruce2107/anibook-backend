import { QueryResult } from 'pg';
import { pool } from '../../../database';
import { LanguageRepository } from './LanguageRepository';
import { Language } from '@domain/udesc/language';

export class LanguageRepositoryRelationalImpl implements LanguageRepository {
  async getAllLanguages(): Promise<Language[]> {
    const result = await pool.query(`SELECT * FROM Language`);
    return result.rows;
  }
  async alreadyExists(language: Language): Promise<boolean> {
    const exists = await pool.query(
      `SELECT * FROM Language WHERE language = $1`,
      [language.language]
    );

    return !!exists.rowCount;
  }
  async _delete(id: string): Promise<boolean> {
    const deleted: QueryResult = await pool.query(
      `DELETE FROM Language where id = $1`,
      [id]
    );

    return !!deleted.rowCount;
  }
  async insertOne(language: Language): Promise<boolean> {
    if (!(await this.alreadyExists(language))) {
      const inserted: QueryResult = await pool.query(
        `INSERT INTO Language (language) VALUES ($1)`,
        [language.language]
      );
      return !!inserted.rowCount;
    }
    return false;
  }
  async updateLanguage(id: string, language: Language): Promise<boolean> {
    const result = await pool.query(
      `UPDATE Language SET language = $1 WHERE id = $2`,
      [language.language, id]
    );

    return !!result.rowCount;
  }
  async getLanguageById(id: string): Promise<Language> {
    const result = await pool.query(`select * from Language WHERE id = $1`, [
      id,
    ]);
    return result.rows[0];
  }

  async getLanguage(name: string): Promise<Language[]> {
    const result = await pool.query(
      `SELECT * FROM Language WHERE language ilike '%' || $1 || '%'`,
      [name]
    );
    return result.rows;
  }
}
