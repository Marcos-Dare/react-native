import { createDrawerNavigator } from '@react-navigation/drawer'
import { HomeScreen } from '../screens/Home'
import { BottomTabNavigation } from './BottomTabNavigation'

const Drawer = createDrawerNavigator({
    initialRouteName: 'Home',
    screens: {
        Home: HomeScreen,
        Tab: BottomTabNavigation
    }
})

export function DrawerNavigation() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen component={HomeScreen} name='Home' />
            <Drawer.Screen component={BottomTabNavigation} name='Tab' />
        </Drawer.Navigator>
    )
}