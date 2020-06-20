import TokenRepository from '@usecase/port/TokenRepository';
import { User } from 'anibook';
import CreateUser from '@usecase/Token/createUser';

export default class InMemoryTokenReposiory implements TokenRepository {
  users: User[] = [];
  constructor(users: User[]) {
    this.users = users;
  }
  async alreadyExists(email: string, nickname: string): Promise<boolean> {
    for (let user of this.users)
      if (user.email === email || user.nickname === nickname) return true;
    return false;
  }

  async getOne(value: string): Promise<User> {
    for (let user of this.users)
      if (user.email === value || user.nickname === value) return user;
    return { email: '', nickname: '' };
  }

  async insertOne(email: string, nickname: string): Promise<boolean> {
    const user = new CreateUser().createUser({ email, nickname });
    if (!(await this.alreadyExists(email, nickname))) {
      this.users.push(user);
      return true;
    } else {
      return false;
    }
  }
}
