import { MockDenunciaRepository } from "../../infra/repositories/MockDenunciaRepository";
import { DenunciaFactory } from '../../factories/DenunciaFactory';

describe('Infra: MockDenunciaRepository', () => {
  let repository: MockDenunciaRepository;

  beforeEach(() => {
    repository = new MockDenunciaRepository();
  });

  describe('save()', () => {
    it('deve salvar uma denúncia no array em memória', async () => {
      const denuncia = DenunciaFactory.create({});
      await repository.save(denuncia);

      expect(repository.denuncias).toHaveLength(1);
      expect(repository.denuncias[0]).toBe(denuncia);
    });
  });

  describe('findById()', () => {
    it('deve encontrar uma denúncia pelo ID', async () => {
      const denuncia = DenunciaFactory.create({});
      await repository.save(denuncia);

      const found = await repository.findById(denuncia.id);

      expect(found).toBeDefined();
      expect(found?.id).toBe(denuncia.id);
    });

    it('deve retornar null se a denúncia não for encontrada', async () => {
      const found = await repository.findById('id-inexistente');
      expect(found).toBeNull();
    });
  });

  describe('update()', () => {
    it('deve atualizar os dados de uma denúncia existente', async () => {
      const denunciaOriginal = DenunciaFactory.create({});
      await repository.save(denunciaOriginal);

      const denunciaAtualizada = denunciaOriginal.updateDescricao('Nova descrição');
      await repository.update(denunciaAtualizada);

      const found = await repository.findById(denunciaOriginal.id);
      expect(found?.descricao).toBe('Nova descrição');
    });
  });

  describe('delete()', () => {
    it('deve remover uma denúncia do array', async () => {
      const denuncia = DenunciaFactory.create({});
      await repository.save(denuncia);

      expect(repository.denuncias).toHaveLength(1); 

      await repository.delete(denuncia.id);

      expect(repository.denuncias).toHaveLength(0); 
    });
  });

});