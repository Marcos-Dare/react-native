import React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Alert } from 'react-native';
import { useAuth } from '../context/auth'; // 1. IMPORTE O HOOK

export function CustomDrawerContent(props: any) {
  // O componente NÃO precisa mais de 'setIsLogged'
  // 2. PEGUE A FUNÇÃO DE LOGOUT DO CONTEXTO
  const { handleLogout } = useAuth();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Sair"
        onPress={() => {
          props.navigation.closeDrawer();
          setTimeout(() => {
            Alert.alert(
              'Sair',
              'Deseja realmente sair da conta?',
              [
                { text: 'Cancelar', style: 'cancel' },
                {
                  text: 'Sair',
                  style: 'destructive',
                  // 3. CHAME A FUNÇÃO DO CONTEXTO
                  onPress: handleLogout,
                },
              ],
              { cancelable: true }
            );
          }, 300);
        }}
      />
    </DrawerContentScrollView>
  );
}