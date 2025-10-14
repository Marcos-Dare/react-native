import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Alert, View } from 'react-native';
import { useAuth } from '../context/auth';

export function CustomDrawerContent(props: any) {
  const { handleLogout } = useAuth();

  return (
    // Usamos o ScrollView como base
    <DrawerContentScrollView {...props}>
      <View style={{ flex: 1 }}>
        {/* Item 1: Adicionar Lixo */}
        <DrawerItem
          label="Adicionar Lixo"
          onPress={() => props.navigation.navigate('Adicionar Lixo')}
          testID="menu-adicionar-lixo" // <-- testID adicionado
        />
        
        {/* Item 2: Relatório Gerais */}
        <DrawerItem
          label="Relatório Gerais"
          onPress={() => props.navigation.navigate('Relatório Gerais')}
          testID="menu-relatorios-gerais" // <-- testID adicionado
        />

        {/* Item 3: Meus Relatórios */}
        <DrawerItem
          label="Meus Relatórios"
          onPress={() => props.navigation.navigate('Meus Relatórios')}
          testID="menu-meus-relatorios" // <-- testID adicionado
        />
      </View>
      
      {/* O seu botão de Sair customizado continua aqui, no final */}
      <DrawerItem
        label="Sair"
        labelStyle={{ color: 'red' }} // Exemplo de estilo
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