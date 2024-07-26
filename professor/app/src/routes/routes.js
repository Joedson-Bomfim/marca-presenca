import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { fetchProfessor } from '../Controller/ProfessorController';

import CadastroStack from "./CadastroStack";
import DrawerNavigator from './DrawerNavigator';

import Loading from "../components/loading";

const Stack = createNativeStackNavigator();

const Routes = () => {
    const[loading, setLoading] = useState(true);
    const[professor, setProfessor] = useState([]);

    useEffect(() => {
        listaProfessores();
    }, []);

    const listaProfessores = async () => {
        try {
            const listaProfessor = await fetchProfessor();
            setProfessor(listaProfessor);
        } catch (error) {
            console.log('Não foi possível carregar os professores. Verifique se a tabela existe.');
        } finally {
            setLoading(false);
        }
    };

    if(loading) {
        return(
            <Loading/>
        )  
    }

    const rota = professor.length === 0 ? <CadastroStack></CadastroStack> : <DrawerNavigator></DrawerNavigator>;

     return(
        <NavigationContainer>
            {rota}   
        </NavigationContainer>
    )
}

export default Routes;