import { Music } from '@domain/udesc/music';

export interface MusicRepository {
  _delete(id: string): Promise<boolean>;
  insertOne(language: Music): Promise<boolean>;
  updateMusic(id: string, language: Music): Promise<boolean>;
  getMusic(id: string): Promise<Music>;
  alreadyExists(language: Music): Promise<boolean>;
}
