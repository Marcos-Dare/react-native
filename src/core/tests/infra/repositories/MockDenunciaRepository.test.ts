import { MockDenunciaRepository } from "../../../infra/repositories/MockDenunciaRepository";
import { Denuncia } from "../../../domain/entities/Denuncia";
import { Photo } from "../../../domain/value-objects/Photo";
import { GeoCoordinates } from "../../../domain/value-objects/GeoCoordinates";
import { v4 as uuidv4 } from 'uuid';

describe('Infra: MockDenunciaRepository', () => {
  let repository: MockDenunciaRepository;

  beforeEach(() => {
    // Usamos o Singleton, mas limpamos os dados antes de cada teste
    repository = MockDenunciaRepository.getInstance();
    (repository as any).denuncias = [];
  });

  // Função auxiliar para criar uma denúncia de teste
  const createTestDenuncia = () => {
    return Denuncia.create({
      id: uuidv4(),
      userId: uuidv4(),
      foto: Photo.create('file:///test/foto.jpg'),
      localizacao: GeoCoordinates.create(-23.5613, -46.6565),
      descricao: 'Teste de denúncia',
    });
  };

  describe('save()', () => {
    it('deve salvar uma denúncia no array em memória', async () => {
      const denuncia = createTestDenuncia();
      await repository.save(denuncia);

      expect(repository.denuncias).toHaveLength(1);
      expect(repository.denuncias[0]).toBe(denuncia);
    });
  });

  describe('findById()', () => {
    it('deve encontrar uma denúncia pelo ID', async () => {
      const denuncia = createTestDenuncia();
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
      const denunciaOriginal = createTestDenuncia();
      await repository.save(denunciaOriginal);

      const denunciaAtualizada = denunciaOriginal.updateDescricao('Nova descrição');
      await repository.update(denunciaAtualizada);

      const found = await repository.findById(denunciaOriginal.id);
      expect(found?.descricao).toBe('Nova descrição');
    });
  });

  describe('delete()', () => {
    it('deve remover uma denúncia do array', async () => {
      const denuncia = createTestDenuncia();
      await repository.save(denuncia);

      expect(repository.denuncias).toHaveLength(1);

      await repository.delete(denuncia.id);

      expect(repository.denuncias).toHaveLength(0);
    });
  });
});