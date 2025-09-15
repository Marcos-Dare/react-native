import React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Alert } from 'react-native';

export function CustomDrawerContent(props: any) {
  const { setIsLogged } = props;

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
                  onPress: () => {
                    setIsLogged(false);
                    props.navigation.reset({
                      index: 0,
                      routes: [{ name: 'Login' }],
                    });
                  },
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