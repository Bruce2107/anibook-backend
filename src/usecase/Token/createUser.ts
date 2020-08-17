import { User } from '@domain/user';

export class CreateUser {
  createUser(object: any): User {
    return new User(object);
  }
}
