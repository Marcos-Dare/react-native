// Arquivo: src/navigation/AddGarbageStackNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/Home'; // Ajuste o caminho se seu Home.tsx tiver outro nome
import { MapScreen } from '../screens/MapScreen';
import { HomeStackNavigatorParamList } from './types';

const Stack = createNativeStackNavigator<HomeStackNavigatorParamList>();

export function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen} 
        options={{ headerShown: false }} // O cabeçalho será o do Drawer
      />
      <Stack.Screen 
        name="MapScreen" 
        component={MapScreen} 
        options={{ title: 'Localização no Mapa' }} 
      />
    </Stack.Navigator>
  );
}