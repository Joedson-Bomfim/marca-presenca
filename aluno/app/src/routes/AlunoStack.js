import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../pages/Login';

import Home from '../pages/Home';

import AlunoCadastra from "../pages/Aluno/AlunoCadastra";
import AlunoEdita from "../pages/Aluno/AlunoEdita";

import Perfil from '../pages/Perfil';

import Disciplina from '../pages/Disciplina';
import DisciplinaDetalhe from '../pages/Disciplina/DisciplinaDetalhe';

import Teste from "../pages/Teste";

const Stack = createNativeStackNavigator();

const AppStacks = () => {
    return(
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen options={{ headerShown: false }} name="Home" component={Home}/>

            <Stack.Screen options={{ headerShown: false }} name="AlunoCadastra" component={AlunoCadastra}/>
            <Stack.Screen options={{ headerShown: false }} name="AlunoEdita" component={AlunoEdita}/>

            <Stack.Screen options={{ headerShown: false }} name="Perfil" component={Perfil}/>
            
            <Stack.Screen options={{ headerShown: false }} name="Disciplina" component={Disciplina}/>
            <Stack.Screen options={{ headerShown: false }} name="DisciplinaDetalhe" component={DisciplinaDetalhe}/>

            <Stack.Screen options={{ headerShown: false }} name="Teste" component={Teste}/>
        </Stack.Navigator> 
    )
}

export default AppStacks;