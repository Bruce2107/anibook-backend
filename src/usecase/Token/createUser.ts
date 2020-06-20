import User from '@domain/user';

export default class CreateUser {
  createUser(object: any): User {
    return new User(object);
  }
}
