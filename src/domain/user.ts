import { User as IUser } from 'anibook';

/**
 * @property `string` email
 * @property `string` nickname
 */
export default class User implements IUser {
  email: string;
  nickname: string;

  constructor({ email, nickname }: IUser) {
    this.email = email;
    this.nickname = nickname;
  }
}
