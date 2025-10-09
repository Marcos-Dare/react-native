// Arquivo: src/navigation/types.ts
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Tipos para o "baralho de cartas"
export type HomeStackNavigatorParamList = {
  HomeScreen: undefined;
  MapScreen: { latitude: number; longitude: number };
};

// Tipos para as "gavetas" do menu
export type DrawerParamList = {
  'Adicionar Lixo': undefined;
  'Relatório Gerais': undefined;
  'Meus Relatórios': undefined;
};

// Tipo da prop 'navigation' que a HomeScreen vai receber
export type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackNavigatorParamList, 'HomeScreen'>;