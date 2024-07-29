import React, { useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { fetchPrimeiroProfessor } from '../Controller/ProfessorController';
import { Context } from '../contexts/Context';

import CadastroStack from "./CadastroStack";
import DrawerNavigator from './DrawerNavigator';

import LoadingScreenDefaulft from '../components/LoadingScreenDefaulft';
import LoadingScreenDots from "../components/LoadingScreenDots";

const Stack = createNativeStackNavigator();

const Routes = () => {
    const { professorId, setProfessorId, setNomeCompleto, setNumeroRegistro } = useContext(Context);

    const[loading, setLoading] = useState(true);

    useEffect(() => {
        listaPrimeiroProfessor();
    }, []);

    const listaPrimeiroProfessor = async () => {
        try {
            const professor = await fetchPrimeiroProfessor();
            setProfessorId(professor.id);
            setNomeCompleto(professor.nome);
            setNumeroRegistro(professor.numero_registro);
            console.log('Dados do professor' +professor);
        } catch (error) {
            console.log('Não foi possível carregar os professores. Verifique se a tabela existe.');
        } finally {
            setLoading(false);
        }
    };

    if(loading) {
        // Animação padrão para celulares abaixo do android 8
        const loading = Platform.Version >= 26 ? <LoadingScreenDots/> : <LoadingScreenDefaulft/>;
        return loading;  
    }

    const rota = professorId ? <DrawerNavigator></DrawerNavigator> : <CadastroStack></CadastroStack>;

     return(
        <NavigationContainer>
            {rota}   
        </NavigationContainer>
    )
}

export default Routes;