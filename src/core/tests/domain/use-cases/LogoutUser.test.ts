import { LogoutUser} from '../../../domain/use-cases/LogoutUser';

describe('Use Case: LogoutUser', () => {
  let logoutUser: LogoutUser;

  beforeEach(() => {
    logoutUser = new LogoutUser();
  });

  it('deve executar sem lançar erros', async () => {
    // Act & Assert: Apenas confirma que a promessa resolve (não quebra)
    await expect(logoutUser.execute({ userId: 'user-123' })).resolves.not.toThrow();
  });

  it('deve chamar o console.log com a mensagem correta', async () => {
    // Arrange: Cria um "espião" para o console.log
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const userId = 'user-123';

    // Act: Executa o caso de uso
    await logoutUser.execute({ userId });

    // Assert: Verifica se nosso espião foi chamado com a mensagem esperada
    expect(consoleLogSpy).toHaveBeenCalledWith(`User ${userId} logged out.`);

    // Limpeza: Restaura a função original do console.log
    consoleLogSpy.mockRestore();
  });
});