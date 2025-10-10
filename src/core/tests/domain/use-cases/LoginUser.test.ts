import { LoginUser } from '../../../domain/use-cases/LoginUser';
import { MockUserRepository } from '../../../infra/repositories/MockUserRepository';
import { User } from '../../../domain/entities/User';
import { Name } from '../../../domain/value-objects/Name';
import { Email } from '../../../domain/value-objects/Email';
import { Password } from '../../../domain/value-objects/Password';
import { v4 as uuidv4 } from 'uuid';

describe('Use Case: LoginUser', () => {
  let repository: MockUserRepository;
  let loginUser: LoginUser;
  let testUser: User;

  beforeEach(async () => {
    // Arrange: Prepara o ambiente antes de cada teste
    repository = MockUserRepository.getInstance();
    (repository as any).users = []; // Limpa o repositório
    loginUser = new LoginUser(repository);

    // Cria um usuário de teste
    // A senha em texto puro é 'password123'
    // O hash salvo será 'hashed_password123' de acordo com a lógica do seu use case
    testUser = User.create({
      id: uuidv4(),
      name: Name.create('Test User'),
      email: Email.create('test@example.com'),
      // A senha salva no "banco" é o hash
      password: Password.create('hashed_password123'), 
      role: 'cidadão',
    });

    await repository.save(testUser);
  });

  it('deve autenticar um usuário com credenciais válidas', async () => {
    // Act: Executa o caso de uso com os dados corretos
    const loggedInUser = await loginUser.execute({
      email: 'test@example.com',
      password: 'password123', // Senha em texto puro
    });

    // Assert: Verifica se o usuário retornado é o correto
    expect(loggedInUser).toBeDefined();
    expect(loggedInUser.id).toBe(testUser.id);
  });

  it('deve lançar um erro para um email que não existe', async () => {
    // Act & Assert: Espera que a execução com um email inválido seja rejeitada
    await expect(
      loginUser.execute({ email: 'wrong@email.com', password: 'password123' })
    ).rejects.toThrow('Invalid credentials');
  });

  it('deve lançar um erro para uma senha incorreta', async () => {
    // Act & Assert: Espera que a execução com uma senha inválida seja rejeitada
    await expect(
      loginUser.execute({ email: 'test@example.com', password: 'wrongpassword' })
    ).rejects.toThrow('Invalid credentials');
  });
});