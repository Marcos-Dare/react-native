import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeScreen } from '../screens/Home';
import { DrawerParamList } from './types';
import React from 'react';

const Drawer = createDrawerNavigator<DrawerParamList>();

export function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Drawer.Screen name="HomeStack" component={HomeScreen} />
      {/* Você pode adicionar outras telas aqui */}
    </Drawer.Navigator>
  );
}
