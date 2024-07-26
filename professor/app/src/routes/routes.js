import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { fetchPrimeiroProfessor } from '../Controller/ProfessorController';
import { Context } from '../contexts/Context';

import CadastroStack from "./CadastroStack";
import DrawerNavigator from './DrawerNavigator';

import Loading from "../components/loading";

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
        return(
            <Loading/>
        )  
    }

    const rota = professorId ? <DrawerNavigator></DrawerNavigator> : <CadastroStack></CadastroStack>;

     return(
        <NavigationContainer>
            {rota}   
        </NavigationContainer>
    )
}

export default Routes;