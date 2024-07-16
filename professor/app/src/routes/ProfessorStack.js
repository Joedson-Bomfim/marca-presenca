import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../pages/Login';

import HomeProfessor from '../pages/HomeProfessor';

import ProfessorCadastra from "../pages/Professor/ProfessorCadastra";
import ProfessorEdita from "../pages/Professor/ProfessorEdita";

import Perfil from '../pages/Perfil';

import Disciplina from '../pages/Disciplina';
import DisciplinaDetalhe from '../pages/Disciplina/DisciplinaDetalhe';
import DisciplinaCadastra from "../pages/Disciplina/DisciplinaCadastra";
import DisciplinaEdita from "../pages/Disciplina/DisciplinaEdita";

import Teste from "../pages/Teste";

const Stack = createNativeStackNavigator();

const AppStacks = () => {
    return(
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeProfessor}/>

            <Stack.Screen options={{ headerShown: false }} name="ProfessorCadastra" component={ProfessorCadastra}/>
            <Stack.Screen options={{ headerShown: false }} name="ProfessorEdita" component={ProfessorEdita}/>

            <Stack.Screen options={{ headerShown: false }} name="Perfil" component={Perfil}/>
            
            <Stack.Screen options={{ headerShown: false }} name="Disciplina" component={Disciplina}/>
            <Stack.Screen options={{ headerShown: false }} name="DisciplinaCadastra" component={DisciplinaCadastra}/>
            <Stack.Screen options={{ headerShown: false }} name="DisciplinaEdita" component={DisciplinaEdita}/>
            <Stack.Screen options={{ headerShown: false }} name="DisciplinaDetalhe" component={DisciplinaDetalhe}/>

            <Stack.Screen options={{ headerShown: false }} name="Teste" component={Teste}/>
        </Stack.Navigator> 
    )
}

export default AppStacks;