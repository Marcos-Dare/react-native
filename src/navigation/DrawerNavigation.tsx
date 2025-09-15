import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeScreen } from '../screens/Home';
import { ReportScreen } from '../screens/ReportScreen';
import { MyPage } from '../screens/Mypage';
import { DrawerParamList } from './types';
import React from 'react';
import { CustomDrawerContent } from './DrawerContent';

const Drawer = createDrawerNavigator<DrawerParamList>();

export function DrawerNavigation({ setIsLogged }: { setIsLogged: (value: boolean) => void }) {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} setIsLogged={setIsLogged} />}
    >
      <Drawer.Screen name="Adicionar Lixo" component={HomeScreen} />
      <Drawer.Screen name="Relatório Gerais" component={ReportScreen} />
      <Drawer.Screen name="Meus Relatórios" component={MyPage} />
    </Drawer.Navigator>
  );
}