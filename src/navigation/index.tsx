import { NavigationContainer } from "@react-navigation/native";
import { DrawerNavigation } from "./DrawerNavigation";
import { StackLoginNavigation } from "./StackLoginNavigation";


export function Navigation() {
    const login = false
    return (
        <NavigationContainer>
            {login ? <DrawerNavigation /> : <StackLoginNavigation />}
        </NavigationContainer>
    )
}