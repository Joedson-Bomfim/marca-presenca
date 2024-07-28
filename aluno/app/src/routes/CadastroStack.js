import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CadastroAluno from "../pages/Aluno";

const Stack = createNativeStackNavigator();

const Routes = () => {
    return(
        <Stack.Navigator initialRouteName="CadastroAluno">
            <Stack.Screen options={{ headerShown: false }} name="CadastroAluno" component={CadastroAluno}/>
        </Stack.Navigator>
    )
}

export default Routes;