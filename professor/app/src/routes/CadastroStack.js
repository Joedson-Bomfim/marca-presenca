import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfessorCadastro from '../pages/Professor/ProfessorCadastra';

const Stack = createNativeStackNavigator();

const CadastroStack = () => {
    return(
        <Stack.Navigator initialRouteName="ProfessorCadastro">
            <Stack.Screen options={{ headerShown: false }} name="ProfessorCadastro" component={ProfessorCadastro}/>
        </Stack.Navigator> 
    )
}

export default CadastroStack;