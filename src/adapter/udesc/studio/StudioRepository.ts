import { Studio } from '@domain/udesc/studio';

export interface StudioRepository {
  _delete(id: string): Promise<boolean>;
  insertOne(studio: Studio): Promise<boolean>;
  updateStudio(id: string, studio: Studio): Promise<boolean>;
  getStudio(id: string): Promise<Studio>;
  alreadyExists(studio: Studio): Promise<boolean>;
}
