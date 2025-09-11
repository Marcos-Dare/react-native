import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackLoginNavigation } from "./StackLoginNavigation";
import { DrawerNavigation } from "./DrawerNavigation";

export function Navigation(){
    const [isLogged, setIsLogged] = useState(false);

    return(
        <NavigationContainer>
            {isLogged ? (
                <DrawerNavigation/>
            ) : (
                <StackLoginNavigation setIsLogged={setIsLogged}/>
            )}
        </NavigationContainer>
    )
}