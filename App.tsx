import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './src/screens/Login';
import { RegisterScreen } from './src/screens/Register';
import { DrawerNavigation } from './src/navigation/DrawerNavigation';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLogged, setIsLogged] = useState(false);
  console.log('isLogged:', isLogged);

  return (
    <NavigationContainer>
      {isLogged ? (
        <DrawerNavigation setIsLogged={setIsLogged} />
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login">
            {(props) => <Login {...props} setIsLogged={setIsLogged} />}
          </Stack.Screen>
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}