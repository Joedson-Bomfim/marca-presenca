import 'react-native-gesture-handler';
import React from 'react';
import {DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'react-native';

import Routes from './src/routes/routes';
import AuthProvider from './src/contexts/Auth';

const App = () => {
    const theme = {
        ... DefaultTheme,
        colors: {
            ... DefaultTheme.colors,
            primary: '#2F8E33',
            secundary: '#27A42B',
            background: '#5FCE55',
            text: '#fff',
            icone: '#fff'
        }
    }

    return(
        <PaperProvider theme={theme}>
            <StatusBar backgroundColor={"#2F8E33"}></StatusBar>
            <AuthProvider>
                <Routes></Routes>
            </AuthProvider>
        </PaperProvider>
    )
}

export default App;