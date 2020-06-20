import { User } from 'anibook';
import InMemoryToken from './InMemoryToken';

describe('InMemoryToken', () => {
  let users: User[] = [];
  let inMemoryToken: InMemoryToken;
  beforeEach(() => {
    users = [];
    users.push(
      { email: 'test1@test.test', nickname: 'test1' },
      { email: 'test2@test.test', nickname: 'test2' },
      { email: 'test3@test.test', nickname: 'test3' }
    );
    inMemoryToken = new InMemoryToken(users);
  });

  test('should return true when user already exists', async () => {
    const result1 = await inMemoryToken.alreadyExists(
      'test1@test.test',
      'test12'
    );
    const result2 = await inMemoryToken.alreadyExists(
      'test@test.test',
      'test1'
    );
    expect(result1).toBe(true);
    expect(result2).toBe(true);
  });

  test('should return false when user not exists', async () => {
    const result = await inMemoryToken.alreadyExists(
      'test@test.test',
      'test12'
    );
    expect(result).toBe(false);
  });

  test('should get an user by email or nickname', async () => {
    const result1 = await inMemoryToken.getOne('test1');
    const result2 = await inMemoryToken.getOne('test1@test.test');

    expect(result1.email).toBe('test1@test.test');
    expect(result2.nickname).toBe('test1');
  });

  test('should get an empty user', async () => {
    const result1 = await inMemoryToken.getOne('test12');

    expect(result1.email).toBe('');
  });

  test('should add an user to list', async () => {
    const result = await inMemoryToken.insertOne('test@test.test', 'test');
    expect(result).toBe(true);
  });

  test('should not add an user to list', async () => {
    const result = await inMemoryToken.insertOne('test1@test.test', 'test');
    expect(result).toBe(false);
  });
});
