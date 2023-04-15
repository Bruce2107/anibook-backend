import { Status } from '@domain/udesc/status';

export interface StatusRepository {
  _delete(id: string): Promise<boolean>;
  insertOne(status: Status): Promise<boolean>;
  updateStatus(id: string, status: Status): Promise<boolean>;
  getStatus(name: string): Promise<Status[]>;
  getStatusById(id: string): Promise<Status>;
  alreadyExists(status: Status): Promise<boolean>;
  getAllStatus(): Promise<Status[]>;
}
