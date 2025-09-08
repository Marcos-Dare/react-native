import { createDrawerNavigator } from '@react-navigation/drawer'
import { HomeScreen } from '../screens/Home'


const Drawer = createDrawerNavigator({
    initialRouteName: 'Home',
    screens: {
        Home: HomeScreen,

    }
})

export function DrawerNavigation() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen component={HomeScreen} name='Home' />

        </Drawer.Navigator>
    )
}