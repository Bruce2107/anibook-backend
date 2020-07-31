import DatabaseToken from './DatabaseToken';

describe('Database Token', () => {
  let databaseToken: DatabaseToken;
  beforeEach(() => {
    databaseToken = new DatabaseToken();
  });
  describe('Already exists', () => {
    it('should return true when user already exists', async () => {
      const result = await databaseToken.alreadyExists('qa', 'qa');
      expect(result).toBe(true);
    });
    it('should return true when nickname or email already exists', async () => {
      const result = await databaseToken.alreadyExists('test', 'qa');
      expect(result).toBe(true);
    });
    it('should return false when user already exists', async () => {
      const result = await databaseToken.alreadyExists('test', 'test');
      expect(result).toBe(false);
    });
  });

  describe('Get User', () => {
    it('should return an user by nickname', async () => {
      const result = await databaseToken.getOne('qa');
      expect(result).toBeDefined();
    });
    it('should return an user by email', async () => {
      const result = await databaseToken.getOne('qa');
      expect(result).toBeDefined();
    });
    it('should not return an user', async () => {
      const result = await databaseToken.getOne('notfound');
      expect(result).toBeUndefined();
    });
  });

  describe('Insert User', () => {
    it('should insert a new user', async () => {
      const result = await databaseToken.insertOne(
        'newUser@newUser.newUser',
        'newUser'
      );
      expect(result).toBe(true);
    });
    it('should not insert a new user when nickname or email already existis', async () => {
      const result = await databaseToken.insertOne(
        'newUser@newUser.newUser',
        'newUser2'
      );
      expect(result).toBe(false);
    });
  });

  describe('Delete User', () => {
    it('should remove an user', async () => {
      const result = await databaseToken._delete('newUser@newUser.newUser');
      expect(result).toBe(true);
    });
    it('should return false when user not found', async () => {
      const result = await databaseToken._delete('newUser@newUser.newUser');
      expect(result).toBe(false);
    });
  });
});
