import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../screens/Login";
import { RegisterScreen } from "../screens/Register";
import { LoginStackParamList } from "./types";
import { MapScreen } from "../screens/MapScreen";

const Stack = createNativeStackNavigator<LoginStackParamList>();
type StackLoginNavigationProps = {
  setIsLogged: (value: boolean) => void;
};

export function StackLoginNavigation({ setIsLogged }: StackLoginNavigationProps){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Login">
                {props => <Login {...props} setIsLogged={setIsLogged} />}
            </Stack.Screen>
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name="MapScreen" component={MapScreen}/>
        </Stack.Navigator>
    )
}