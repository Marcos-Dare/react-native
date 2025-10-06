import { UpdateUser } from '../../../domain/use-cases/UpdateUser';
import { RegisterUser } from '../../../domain/use-cases/RegisterUser';
import { MockUserRepository } from '../../../infra/repositories/MockUserRepository';

describe('UpdateUser', () => {
  it('should update a user', async () => {
    const userRepository = new MockUserRepository();
    const registerUser = new RegisterUser(userRepository);
    const updateUser = new UpdateUser(userRepository);

    const user = await registerUser.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      role:"agente"
    });

    const updatedUser = await updateUser.execute({
      id: user.id,
      name: 'John Doe Updated',
    });

    expect(updatedUser.name.value).toBe('John Doe Updated');
  });

  it('should throw an error if the user is not found', async () => {
    const userRepository = new MockUserRepository();
    const updateUser = new UpdateUser(userRepository);

    await expect(
      updateUser.execute({
        id: '1',
        name: 'John Doe Updated',
      })
    ).rejects.toThrow('Usuário não encontrado');
  });

  it('should not update user fields if they are not provided', async () => {
    const userRepository = new MockUserRepository();
    const registerUser = new RegisterUser(userRepository);
    const updateUser = new UpdateUser(userRepository);

    const user = await registerUser.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      role:"agente"
    });

    const updatedUser = await updateUser.execute({
      id: user.id,
    });

    expect(updatedUser.name.value).toBe('John Doe');
    expect(updatedUser.email.value).toBe('john.doe@example.com');
  });

  it('should update only the email', async () => {
    const userRepository = new MockUserRepository();
    const registerUser = new RegisterUser(userRepository);
    const updateUser = new UpdateUser(userRepository);

    const user = await registerUser.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      role:"agente"
    });

    const updatedUser = await updateUser.execute({
      id: user.id,
      email: 'updated.email@example.com',
    });

    expect(updatedUser.name.value).toBe('John Doe');
    expect(updatedUser.email.value).toBe('updated.email@example.com');
  });

  it('should update only the location', async () => {
    const userRepository = new MockUserRepository();
    const registerUser = new RegisterUser(userRepository);
    const updateUser = new UpdateUser(userRepository);

    const user = await registerUser.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      role:"agente"
    });

    const updatedUser = await updateUser.execute({
      id: user.id
    });

    expect(updatedUser.name.value).toBe('John Doe');
    expect(updatedUser.email.value).toBe('john.doe@example.com');
  });
});
