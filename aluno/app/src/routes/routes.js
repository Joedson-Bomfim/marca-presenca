import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../pages/Login';

import Teste from "../pages/Teste";

const Stack = createNativeStackNavigator();

const Routes = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen options={{ headerShown: false }} name="Login" component={Login}/>
                
                <Stack.Screen options={{ headerShown: false }} name="Teste" component={Teste}/>
            </Stack.Navigator>     
        </NavigationContainer>
    )
}

export default Routes;