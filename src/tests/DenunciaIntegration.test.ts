import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from '../context/auth'; // Importe o AuthProvider real
import { DrawerNavigation } from '../navigation/DrawerNavigation'; // Importe seu Drawer
import { MockDenunciaRepository } from '../core/infra/repositories/MockDenunciaRepository';
import { makeDenunciaUseCases } from '../core/factories/makeDenunciaUseCases';

// Mock do useAuth para simular um usuário já logado
jest.mock('../context/auth', () => ({
  ...jest.requireActual('../context/auth'), 
  useAuth: () => ({
    isLogged: true,
    user: { id: 'user-123-test', name: { value: 'Test User' } },
    // As funções podem ser espiãs do Jest se precisarmos verificar se foram chamadas
    handleLogin: jest.fn(),
    handleLogout: jest.fn(),
    handleRegister: jest.fn(),
  }),
}));

// Mock das APIs do Expo
jest.mock('expo-image-picker', () => ({
  requestCameraPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
  launchCameraAsync: jest.fn(() => Promise.resolve({ canceled: false, assets: [{ uri: 'file:///test/mocked-photo.jpg' }] })),
}));
jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
  getCurrentPositionAsync: jest.fn(() => Promise.resolve({ coords: { latitude: -21.55, longitude: -45.43 } })),
}));

describe('Teste de Integração: Fluxo de CRUD de Denúncia', () => {

  beforeEach(() => {
    MockDenunciaRepository.getInstance().denuncias = [];
    jest.clearAllMocks();
  });

  it('deve criar e verificar uma denúncia através da interface', async () => {
    // --- Renderiza o aplicativo A PARTIR DA NAVEGAÇÃO PRINCIPAL ---
    const { getByText, getByPlaceholderText } = render(
      <AuthProvider>
        <NavigationContainer>
          <DrawerNavigation />
        </NavigationContainer>
      </AuthProvider>
    );

    // --- CRIAR ---
    // A tela inicial já será a HomeScreen ("Adicionar Lixo") pois estamos logados.
    await waitFor(() => getByText('Reportar Entulho'));

    // Preenche o formulário
    fireEvent.press(getByText('Fotografar Entulho'));
    fireEvent.press(getByText('Obter localização atual'));
    fireEvent.changeText(getByPlaceholderText('Descreva o entulho, tipo de lixo...'), 'Teste de denúncia via UI');
    
    // Espiona o Alert para verificar a mensagem de sucesso
    const alertSpy = jest.spyOn(Alert, 'alert');
    fireEvent.press(getByText('Enviar Denúncia'));
    
    // Espera o Alerta de sucesso aparecer
    await waitFor(() => 
      expect(alertSpy).toHaveBeenCalledWith('Relatório enviado!', 'Seu relatório foi criado com sucesso.')
    );

    // --- VERIFICAR ---
    // A forma mais segura de verificar é checar diretamente no nosso "banco de dados" de mentira.
    const denunciaRepo = MockDenunciaRepository.getInstance();
    const denuncias = denunciaRepo.denuncias;
    
    expect(denuncias).toHaveLength(1);
    expect(denuncias[0].descricao).toBe('Teste de denúncia via UI');
    expect(denuncias[0].userId).toBe('user-123-test');

    alertSpy.mockRestore();
  });
});