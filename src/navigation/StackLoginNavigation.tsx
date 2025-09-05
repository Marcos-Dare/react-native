import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack"
import { LoginScreen } from "../screens/Login"
import { RegisterScreen } from "../screens/Register"
import { StaticParamList } from "@react-navigation/native"

const LoginStack = createStackNavigator({
    screens: {
        Login: LoginScreen,
        Register: RegisterScreen
    }
})
type LoginStackParamList = StaticParamList<typeof LoginStack>
type LoginScreenProp = StackNavigationProp<LoginStackParamList, 'Login'>
export type LoginTypes = {
    navigation: LoginScreenProp
}
export function StackLoginNavigation() {
    return (
        <LoginStack.Navigator>
            <LoginStack.Screen name="Login" component={LoginScreen} />
            <LoginStack.Screen name="Register" component={RegisterScreen} />
        </LoginStack.Navigator>
    )
}