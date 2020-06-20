import User from './user';
describe('User', () => {
  test('should create an user', () => {
    const object = {
      email: 'test@test.test',
      nickname: 'tester',
    };

    const user = new User(object);

    expect(user.email).toBe('test@test.test');
  });
});
