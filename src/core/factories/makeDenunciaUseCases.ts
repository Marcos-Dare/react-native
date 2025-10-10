// ARQUIVO: src/core/factories/makeDenunciaUseCases.ts

import { IDenunciaRepository } from '../domain/repositories/IDenuncia';
import { MockDenunciaRepository } from '../infra/repositories/MockDenunciaRepository';
import { RegisterDenuncia } from '../domain/use-cases/RegisterDenuncia';
import { DeleteDenuncia } from '../domain/use-cases/DeleteDenuncia';
import { UpdateDenuncia } from '../domain/use-cases/UpdateDenuncia';
import { FindDenuncia } from '../domain/use-cases/FindDenuncia';

export function makeDenunciaUseCases() {
  // Pega a instância única do repositório
  const denunciaRepository: IDenunciaRepository = MockDenunciaRepository.getInstance();

  // Cria todos os casos de uso, injetando o mesmo repositório em todos
  const registerDenuncia = new RegisterDenuncia(denunciaRepository);
  const deleteDenuncia = new DeleteDenuncia(denunciaRepository);
  const updateDenuncia = new UpdateDenuncia(denunciaRepository);
  const findDenuncia = new FindDenuncia(denunciaRepository);

  // Retorna um objeto com todos os casos de uso prontos
  return {
    registerDenuncia,
    deleteDenuncia,
    updateDenuncia,
    findDenuncia,
  };
}