import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../pages/Login';

import Cadastro from '../pages/Cadastro';

import AlunoCadastra from "../pages/Aluno/AlunoCadastra";

import ProfessorCadastra from "../pages/Professor/ProfessorCadastra";

import Teste from "../pages/Teste";

const Stack = createNativeStackNavigator();

const AppStacks = () => {
    return(
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen options={{ headerShown: false }} name="Login" component={Login}/>

            <Stack.Screen options={{ headerShown: false }} name="Cadastro" component={Cadastro}/>

            <Stack.Screen options={{ headerShown: false }} name="AlunoCadastra" component={AlunoCadastra}/>
            
            <Stack.Screen options={{ headerShown: false }} name="ProfessorCadastra" component={ProfessorCadastra}/>
            
            <Stack.Screen options={{ headerShown: false }} name="Teste" component={Teste}/>
        </Stack.Navigator> 
    )
}

export default AppStacks;