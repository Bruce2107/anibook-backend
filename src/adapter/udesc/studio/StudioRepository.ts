import { Studio } from '@domain/udesc/studio';

export interface StudioRepository {
  _delete(id: string): Promise<boolean>;
  insertOne(studio: Studio): Promise<boolean>;
  updateStudio(id: string, studio: Studio): Promise<boolean>;
  getStudio(name: string): Promise<Studio[]>;
  getStudioById(id: string): Promise<Studio>;
  alreadyExists(studio: Studio): Promise<boolean>;
  getAllStudios(): Promise<Studio[]>;
}
