import { UserFactory } from '../../factories/UserFactory';

describe('UserFactory', () => {
  it('should create a user with default values', () => {
    const user = UserFactory.create({});
    expect(user).toBeDefined();
    expect(user.name.value).toBe('John Doe');
    expect(user.email.value).toBe('john.doe@example.com');
  });

  it('should create a user with provided values', () => {
    const user = UserFactory.create({
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
    });
    expect(user).toBeDefined();
    expect(user.name.value).toBe('Jane Doe');
    expect(user.email.value).toBe('jane.doe@example.com');
  });
});
