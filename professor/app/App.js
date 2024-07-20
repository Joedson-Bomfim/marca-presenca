import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'react-native';

import Routes from './src/routes/routes';
import AuthProvider from './src/contexts/Context';

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
        const init = async () => {
            try {
                await initializeDatabase();
            } catch (error) {
                console.error('Erro ao inicializar banco de dados:', error);
            }
        };
        init();
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