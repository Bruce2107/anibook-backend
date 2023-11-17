import { User } from '@domain/udesc/user';

export interface UserRepository {
  _delete(id: string): Promise<boolean>;
  insertOne(user: User): Promise<boolean>;
  updateUser(id: string, data: User): Promise<boolean>;
  getUser(name: string): Promise<User[]>;
  getUserById(id: string): Promise<User>;
  alreadyExists(name: string): Promise<boolean>;
  getAllUsers(): Promise<User[]>;
  changeStatus(name: string, serie: string, value: string): Promise<boolean>;
}
