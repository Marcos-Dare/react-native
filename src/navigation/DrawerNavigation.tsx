import { createDrawerNavigator } from '@react-navigation/drawer';
// REMOVA a importação da HomeScreen daqui
import { ReportScreen } from '../screens/ReportScreen';
import { MyPage } from '../screens/Mypage';
import { DrawerParamList } from './types';
import React from 'react';
import { CustomDrawerContent } from './DrawerContent';
import { HomeStackNavigator } from './HomeStackNavigator';

const Drawer = createDrawerNavigator<DrawerParamList>();

export function DrawerNavigation(){
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props } />}
    >
      {/* AQUI ESTÁ A ÚNICA MUDANÇA NECESSÁRIA */}
      <Drawer.Screen name="Adicionar Lixo" component={HomeStackNavigator} />

      <Drawer.Screen name="Relatório Gerais" component={ReportScreen} />
      <Drawer.Screen name="Meus Relatórios" component={MyPage} />
    </Drawer.Navigator>
  );
}