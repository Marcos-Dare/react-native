import { MockUserRepository } from "../../../infra/repositories/MockUserRepository";
import { Name } from "../../../domain/value-objects/Name";
import { User } from "../../../domain/entities/User";
import { Email } from "../../../domain/value-objects/Email";
import { Password } from "../../../domain/value-objects/Password";
import { v4 as uuidv4 } from 'uuid';

const MOCK_PASSWORD_HASH = '$2b$12$YgC/D3xr6s30I42F2./AHeDE.21YXB.Y7P4I5fms/Vgl5E5vPDzHS';

describe('Infra: MockUserRepository', () => {
  let repository: MockUserRepository;

  beforeEach(() => {
    repository = MockUserRepository.getInstance();
    // Limpa o array de usuários antes de cada teste para evitar interferência
    (repository as any).users = []; 
  });

  describe('save()', () => {
    it('deve salvar um usuário no array em memória', async () => {
      const user = User.create({
        id: uuidv4(),
        name: Name.create('Test User'),
        email: Email.create('test@example.com'),
        password: Password.create(MOCK_PASSWORD_HASH),
        role: 'cidadão',
      });
      await repository.save(user);

      expect(repository.users).toHaveLength(1);
      expect(repository.users[0]).toBe(user);
    });
  });

  describe('findById()', () => {
    it('deve encontrar um usuário pelo ID', async () => {
      const user = User.create({
        id: uuidv4(),
        name: Name.create('Test User'),
        email: Email.create('test@example.com'),
        password: Password.create(MOCK_PASSWORD_HASH),
        role: 'cidadão',
      });
      await repository.save(user);

      const found = await repository.findById(user.id);

      expect(found).toBeDefined();
      expect(found?.id).toBe(user.id);
    });
  });

  describe('findByEmail()', () => {
    it('deve encontrar um usuário pelo email', async () => {
      const userEmail = 'test@example.com';
      const user = User.create({
        id: uuidv4(),
        name: Name.create('Test User'),
        email: Email.create(userEmail),
        password: Password.create(MOCK_PASSWORD_HASH),
        role: 'cidadão',
      });
      await repository.save(user);

      // CORREÇÃO AQUI: Criando um segundo usuário completo
      await repository.save(User.create({
        id: uuidv4(),
        name: Name.create('Other User'),
        email: Email.create('outro@email.com'),
        password: Password.create(MOCK_PASSWORD_HASH),
        role: 'cidadão',
      }));

      const found = await repository.findByEmail(userEmail);

      expect(found).toBeDefined();
      expect(found?.email.value).toBe(userEmail);
    });

    it('deve retornar null se o email não for encontrado', async () => {
        const found = await repository.findByEmail('email@inexistente.com');
        expect(found).toBeNull();
    });
  });

  describe('update()', () => {
    it('deve atualizar os dados de um usuário existente', async () => {
      // CORREÇÃO AQUI: Criando o usuário original com User.create
      const userOriginal = User.create({
        id: uuidv4(),
        name: Name.create('John Doe'),
        email: Email.create('john@example.com'),
        password: Password.create(MOCK_PASSWORD_HASH),
        role: 'cidadão',
      });
      await repository.save(userOriginal);

      const updatedName = Name.create('Jane Doe');
      const userAtualizado = userOriginal.updateName(updatedName);
      await repository.update(userAtualizado);

      const found = await repository.findById(userOriginal.id);
      expect(found?.name.value).toBe('Jane Doe');
    });
  });
});