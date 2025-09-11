import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackLoginNavigation } from "./StackLoginNavigation";

export function Navigation(){
    const login = false;

    return(
        <NavigationContainer>
            <StackLoginNavigation/>
        </NavigationContainer>
    )
}