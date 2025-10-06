import { FindUser } from '../../../domain/use-cases/FindUser';
import { RegisterUser } from '../../../domain/use-cases/RegisterUser';
import { MockUserRepository } from '../../../infra/repositories/MockUserRepository';

describe('FindUser', () => {
  it('should find a user by id', async () => {
    const userRepository = new MockUserRepository();
    const registerUser = new RegisterUser(userRepository);
    const findUser = new FindUser(userRepository);

    const user = await registerUser.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      role: 'agente'
    });

    const foundUser = await findUser.execute({ id: user.id });

    expect(foundUser).toBe(user);
  });

  it('should return null if the user is not found', async () => {
    const userRepository = new MockUserRepository();
    const findUser = new FindUser(userRepository);

    const foundUser = await findUser.execute({ id: '1' });

    expect(foundUser).toBeNull();
  });
});
