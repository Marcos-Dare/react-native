import { makeDenunciaUseCases } from '../../factories/makeDenunciaUseCases';
import { RegisterDenuncia } from '../../domain/use-cases/RegisterDenuncia';
import { DeleteDenuncia } from '../../domain/use-cases/DeleteDenuncia';
import { UpdateDenuncia } from '../../domain/use-cases/UpdateDenuncia';
import { FindDenuncia } from '../../domain/use-cases/FindDenuncia';
import { MockDenunciaRepository } from '../../infra/repositories/MockDenunciaRepository';

describe('Factory: makeDenunciaUseCases', () => {

  it('deve retornar um objeto com todas as instâncias dos casos de uso', () => {
    // Act: Executa a factory
    const useCases = makeDenunciaUseCases();

    // Assert: Verifica se o objeto retornado e suas propriedades estão corretos
    expect(useCases).toBeDefined();
    expect(useCases.registerDenuncia).toBeInstanceOf(RegisterDenuncia);
    expect(useCases.deleteDenuncia).toBeInstanceOf(DeleteDenuncia);
    expect(useCases.updateDenuncia).toBeInstanceOf(UpdateDenuncia);
    expect(useCases.findDenuncia).toBeInstanceOf(FindDenuncia);
  });

  it('deve injetar a mesma instância do repositório em todos os casos de uso', () => {
    // Act
    const useCases = makeDenunciaUseCases();

    // Assert
    // Acessamos a propriedade 'privada' do repositório para o teste.
    // O 'as any' é um truque do TypeScript para nos permitir acessar para fins de teste.
    const repoFromRegister = (useCases.registerDenuncia as any).denunciaRepository;
    const repoFromDelete = (useCases.deleteDenuncia as any).denunciaRepository;
    const repoFromUpdate = (useCases.updateDenuncia as any).denunciaRepository;
    const repoFromFind = (useCases.findDenuncia as any).denunciaRepository;

    // Verifica se a instância do repositório é a mesma em todos
    expect(repoFromRegister).toBeInstanceOf(MockDenunciaRepository);
    expect(repoFromRegister).toBe(repoFromDelete);
    expect(repoFromDelete).toBe(repoFromUpdate);
    expect(repoFromUpdate).toBe(repoFromFind);
  });
});