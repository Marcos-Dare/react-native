// ESTA DEVE SER A PRIMEIRA LINHA DO ARQUIVO
import 'react-native-get-random-values';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './src/screens/Login';
import { RegisterScreen } from './src/screens/Register';
import { DrawerNavigation } from './src/navigation/DrawerNavigation';
import { AuthProvider, useAuth } from './src/context/auth';
import { LoginStackParamList } from './src/navigation/types';

const Stack = createNativeStackNavigator<LoginStackParamList>();

function RootNavigator() {
  const { isLogged } = useAuth();

  return (
    <NavigationContainer>
      {isLogged ? (
        <DrawerNavigation /> 
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} /> 
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}