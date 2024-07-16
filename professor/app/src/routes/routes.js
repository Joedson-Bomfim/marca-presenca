import React, { useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthStack from './AuthStack';
import AlunoStack from './AlunoStack';
import ProfessorStack from './ProfessorDrawer';

import { AuthContext } from "../contexts/Auth";

const Stack = createNativeStackNavigator();

const Routes = () => {
    const { isAuthenticated, tipo } = useContext(AuthContext);
    let rotaContext;
    
    if(isAuthenticated) {
        rotaContext = tipo == 'aluno' ? <AlunoStack></AlunoStack> : <ProfessorStack></ProfessorStack>; 
    }else {
        rotaContext = <AuthStack></AuthStack>;
    }

    return(
        <NavigationContainer>
            {rotaContext}     
        </NavigationContainer>
    )
}

export default Routes;