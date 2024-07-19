import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { initializeDatabase, UserStatusController } from '../Controller/ProfessorController';

import CadastroStacks from "./CdastroStack";
import ProfessorDrawer from './ProfessorDrawer';

const Stack = createNativeStackNavigator();

const Routes = () => {
    const [isCadastroConcluido, setIsCadastroConcluido] = useState(false);

    useEffect(() => {
        const init = async () => {
            await initializeDatabase();
        };
        init();
    }, []);

    useEffect(() => {
        const checkUserStatus = async () => {
            try {
                await UserStatusController();
                setIsCadastroConcluido(true);
            } catch (error) {
                setIsCadastroConcluido(false);
                console.log('Não foi possível carregar o status do usuário. Verifique se a tabela existe.');
            }
        };

        checkUserStatus();
    }, []);
    
    return(
        <NavigationContainer>
            {isCadastroConcluido ? (
            <ProfessorDrawer></ProfessorDrawer>
            ) : (
            <CadastroStacks></CadastroStacks>   
            )}
        </NavigationContainer>
    )
}

export default Routes;