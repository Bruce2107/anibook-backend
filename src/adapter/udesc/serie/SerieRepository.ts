import { Serie } from '@domain/udesc/serie';

export interface SerieRepository {
  _delete(id: string): Promise<boolean>;
  insertOne(serie: Serie): Promise<boolean>;
  updateSerie(id: string, serie: Serie): Promise<boolean>;
  getSerie(name: string): Promise<Serie[]>;
  getSerieById(id: string): Promise<Serie>;
  alreadyExists(serie: Serie): Promise<boolean>;
  getAllSeries(): Promise<Serie[]>;
  getAllSeriesByUser(userName: string): Promise<Serie[]>;
}
