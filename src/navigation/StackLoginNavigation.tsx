import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/Login";
import { RegisterScreen } from "../screens/Register";
import { LoginStackParamList } from "./types";
import { HomeScreen } from "../screens/Home";

const Stack = createStackNavigator<LoginStackParamList>();

export function StackLoginNavigation(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name="Home" component={HomeScreen}/>
        </Stack.Navigator>
    )
}