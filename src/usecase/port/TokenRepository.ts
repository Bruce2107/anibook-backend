import { User } from 'anibook';

export default interface TokenRepository {
  /**
   *
   * @param string `email` user email
   * @param string `nickname` user nickname
   */
  alreadyExists(email: string, nickname: string): Promise<boolean>;
  /**
   *
   * @param string `value` user email or nickname
   */
  getOne(value: string): Promise<User>;
  /**
   *
   * @param string `email` user email
   * @param string `nickname` user nickname
   */
  insertOne(email: string, nickname: string): Promise<boolean>;
  /**
   *
   * @param string `value` user email or nickname
   */
  _delete(value: string): Promise<boolean>;
}
