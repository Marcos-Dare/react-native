import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/Login";
import { RegisterScreen } from "../screens/Register";
import { LoginStackParamList } from "./types";

const Stack = createStackNavigator<LoginStackParamList>();
type StackLoginNavigationProps = {
  setIsLogged: (value: boolean) => void;
};

export function StackLoginNavigation({ setIsLogged }: StackLoginNavigationProps){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Login">
                {props => <LoginScreen {...props} setIsLogged={setIsLogged} />}
            </Stack.Screen>
            <Stack.Screen name="Register" component={RegisterScreen}/>
        </Stack.Navigator>
    )
}