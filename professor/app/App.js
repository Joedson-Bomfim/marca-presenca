import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar, AppState } from 'react-native';
import {DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import Routes from './src/routes/routes';
import AuthProvider from './src/contexts/Context';

import { closeDatabase } from './src/database/database';
import { incicializarBancoDeDados } from './src/Controller/DatabaseController';

const App = () => {
    const theme = {
        ... DefaultTheme,
        colors: {
            ... DefaultTheme.colors,
            primary: '#3838FF',
            secundary: '#2E2E9C',
            tertiary: '#2C50D0',
            onTertiaryContainer: '#a0a0a0',
            background: '#557CE1',
            text: '#fff',
            icone: '#fff'
        }
    }

    useEffect(() => {
        const estadoDoAplicativo = (nextAppState) => {
            if (nextAppState === 'background' || nextAppState === 'inactive') {
                closeDatabase();
            } 
        };
        
        AppState.addEventListener('change', estadoDoAplicativo);
        
        incicializarBancoDeDados();
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