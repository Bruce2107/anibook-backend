import { Music } from '@domain/udesc/music';

export interface MusicRepository {
  _delete(id: string): Promise<boolean>;
  insertOne(music: Music): Promise<boolean>;
  updateMusic(id: string, music: Music): Promise<boolean>;
  getMusic(id: string): Promise<Music>;
  alreadyExists(music: Music): Promise<boolean>;
  getAllMusics(): Promise<Music[]>;
}
