import { User as IUser } from 'anibook';

/**
 * @property `string` email
 * @property `string` nickname
 */
export class User implements IUser {
  email: string;
  nickname: string;

  constructor({ ...props }: User) {
    Object.assign(this, props);
  }
}
