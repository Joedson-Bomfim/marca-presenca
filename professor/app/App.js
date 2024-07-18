import 'react-native-gesture-handler';
import React from 'react';
import {DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'react-native';

import Routes from './src/routes/routes';
import AuthProvider from './src/contexts/Context';

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