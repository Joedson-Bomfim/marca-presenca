import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/Home';
import AlunoEdita from '../pages/Aluno/AlunoEdita';

import Teste from "../pages/Teste";

const Stack = createNativeStackNavigator();

const Routes = () => {
    return(
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen options={{ headerShown: false }} name="Home" component={Home}/>
            <Stack.Screen options={{ headerShown: false }} name="AlunoEdita" component={AlunoEdita}/>
            
            <Stack.Screen options={{ headerShown: false }} name="Teste" component={Teste}/>
        </Stack.Navigator>
    )
}

export default Routes;