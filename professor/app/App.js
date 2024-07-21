import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar, AppState } from 'react-native';
import {DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import Routes from './src/routes/routes';
import AuthProvider from './src/contexts/Context';

import { closeDatabase} from './src/database/database';
import { initializeDatabase } from './src/Controller/DatabaseController';

const App = () => {
    const theme = {
        ... DefaultTheme,
        colors: {
            ... DefaultTheme.colors,
            primary: '#3838FF',
            secundary: '#2E2E9C',
            background: '#557CE1',
            text: '#fff',
            icone: '#fff'
        }
    }

    useEffect(() => {
        const estadoDoAplicativo = (nextAppState) => {
            console.log(nextAppState);
            if (nextAppState === 'background' || nextAppState === 'inactive') {
                closeDatabase();
            } 
        };
        
        AppState.addEventListener('change', estadoDoAplicativo);
        
        const criarTabelas = async () => {
            try {
                await initializeDatabase();
            } catch (error) {
                console.error('Erro ao inicializar banco de dados:', error);
            }
        };
        //Lembrar de ativar esse daqui quando eu criar novas tabelas
        //criarTabelas();
    }, []);

    return(
        <PaperProvider theme={theme}>
            <StatusBar backgroundColor={"#2E2E9C"}></StatusBar>
            <AuthProvider>
                <Routes></Routes>
            </AuthProvider>
        </PaperProvider>
    )
}

export default App;