import { UserRepository } from '@usecase/port/UserRepository';
import { User } from 'anibook';
import { CreateUser } from '@usecase/Token/createUser';

export class InMemoryTokenRepository implements UserRepository {
  constructor(private users: User[]) {}

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
  async _delete(value: string): Promise<boolean> {
    for (let user of this.users)
      if (user.email === value || user.nickname === value) {
        this.users.splice(this.users.indexOf(user), 1);
        return true;
      }
    return false;
  }
}
