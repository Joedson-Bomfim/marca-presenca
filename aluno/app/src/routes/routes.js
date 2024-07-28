import React, { useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Context } from '../contexts/Context';
import { registroAluno } from '../services/cadastro';

import CadastroStack from "./CadastroStack";
import HomeStack from "./HomeStack";

import LoadingScreenDefaulft from '../components/LoadingScreenDefaulft';
import LoadingScreenDots from '../components/LoadingScreenDots';

const Stack = createNativeStackNavigator();

const Routes = () => {
    const { fetchAluno } = registroAluno();
    
    const { uuid, setNome, setUuid, setSenha } = useContext(Context);

    const[loading, setLoading] = useState(true);

    useEffect(() => {
        carregaDadosAluno();
    }, []);

    async function carregaDadosAluno() {
        try {
            const storedData = await fetchAluno();
            if (storedData && storedData.success) {
                console.log('Nome: '+storedData.nome+' | beacon UUID: '+storedData.uuid+' | beacon UUID: '+storedData.senha);
                setNome(storedData.nome);
                setUuid(storedData.uuid);
                setSenha(storedData.senha);
            } else {
                console.log('Nada foi armazenado nos registros')
            }
        } catch (error) {
            console.log('Não foi possível acessar os dados do aluno.');
        } finally {
            setLoading(false);
        }
    }

    if(loading) {
        // Animação padrão para celulares abaixo do android 8
        const loading = Platform.Version >= 26 ? <LoadingScreenDots/> : <LoadingScreenDefaulft/>;
        return loading;  
    }

    const rota = uuid ? <HomeStack/> : <CadastroStack/>;

    return(
        <NavigationContainer>
            {rota}  
        </NavigationContainer>
    )
}

export default Routes;