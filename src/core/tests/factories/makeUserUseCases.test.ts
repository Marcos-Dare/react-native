import { makeUserUseCases } from '../../factories/makeUserUseCases';
import { RegisterUser } from '../../domain/use-cases/RegisterUser';
import { DeleteUser } from '../../domain/use-cases/DeleteUser';
import { UpdateUser } from '../../domain/use-cases/UpdateUser';
import { FindUser } from '../../domain/use-cases/FindUser';
import { LoginUser } from '../../domain/use-cases/LoginUser';
import { LogoutUser } from '../../domain/use-cases/LogoutUser';
import { MockUserRepository } from '../../infra/repositories/MockUserRepository';

describe('Factory: makeUserUseCases', () => {

  it('deve retornar um objeto com todas as instâncias dos casos de uso de usuário', () => {
    // Act
    const useCases = makeUserUseCases();

    // Assert
    expect(useCases).toBeDefined();
    expect(useCases.registerUser).toBeInstanceOf(RegisterUser);
    expect(useCases.loginUser).toBeInstanceOf(LoginUser);
    expect(useCases.logoutUser).toBeInstanceOf(LogoutUser);
    expect(useCases.updateUser).toBeInstanceOf(UpdateUser);
    expect(useCases.deleteUser).toBeInstanceOf(DeleteUser);
    expect(useCases.findUser).toBeInstanceOf(FindUser);
  });

  it('deve injetar a mesma instância do repositório nos casos de uso', () => {
    // Act
    const useCases = makeUserUseCases();

    // Assert
    // Acessamos a propriedade 'privada' do repositório para o teste
    const repoFromRegister = (useCases.registerUser as any).userRepository;
    const repoFromLogin = (useCases.loginUser as any).userRepository;
    const repoFromUpdate = (useCases.updateUser as any).userRepository;
    const repoFromDelete = (useCases.deleteUser as any).userRepository;
    const repoFromFind = (useCases.findUser as any).userRepository;

    // O logoutUser não tem repositório, então não o verificamos
    expect(useCases.logoutUser).not.toHaveProperty('userRepository');

    // Verifica se a instância do repositório é a mesma em todos
    expect(repoFromRegister).toBeInstanceOf(MockUserRepository);
    expect(repoFromRegister).toBe(repoFromLogin);
    expect(repoFromLogin).toBe(repoFromUpdate);
    expect(repoFromUpdate).toBe(repoFromDelete);
    expect(repoFromDelete).toBe(repoFromFind);
  });
});