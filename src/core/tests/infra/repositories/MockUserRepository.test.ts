import { MockUserRepository } from "../../../infra/repositories/MockUserRepository";
import { UserFactory } from "../../../factories/UserFactory";
import { Name } from "../../../domain/value-objects/Name";

describe('Infra: MockUserRepository', () => {
  let repository: MockUserRepository;

  beforeEach(() => {
    repository = new MockUserRepository();
  });

  describe('save()', () => {
    it('deve salvar um usuário no array em memória', async () => {
      const user = UserFactory.create({});
      await repository.save(user);

      expect(repository.users).toHaveLength(1);
      expect(repository.users[0]).toBe(user);
    });
  });

  describe('findById()', () => {
    it('deve encontrar um usuário pelo ID', async () => {
      const user = UserFactory.create({});
      await repository.save(user);

      const found = await repository.findById(user.id);

      expect(found).toBeDefined();
      expect(found?.id).toBe(user.id);
    });
  });

  describe('findByEmail()', () => {
    it('deve encontrar um usuário pelo email', async () => {
      const userEmail = 'test@example.com';
      const user = UserFactory.create({ email: userEmail });
      await repository.save(user);

      await repository.save(UserFactory.create({ email: 'outro@email.com' }));

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
      const userOriginal = UserFactory.create({ name: 'John Doe' });
      await repository.save(userOriginal);

      const updatedName = Name.create('Jane Doe');
      const userAtualizado = userOriginal.updateName(updatedName);
      await repository.update(userAtualizado);

      const found = await repository.findById(userOriginal.id);
      expect(found?.name.value).toBe('Jane Doe');
    });
  });
});