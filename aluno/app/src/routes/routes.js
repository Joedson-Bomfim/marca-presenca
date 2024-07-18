import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/Home';

import Teste from "../pages/Teste";

const Stack = createNativeStackNavigator();

const Routes = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen options={{ headerShown: false }} name="Home" component={Home}/>
                
                <Stack.Screen options={{ headerShown: false }} name="Teste" component={Teste}/>
            </Stack.Navigator>     
        </NavigationContainer>
    )
}

export default Routes;