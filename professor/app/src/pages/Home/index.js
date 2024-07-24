import React, { useEffect, useState } from 'react';
import { View, Alert, TouchableOpacity, Platform } from "react-native";
import { Button, useTheme } from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import TemaPrincipal from "../../assets/styles";
import styles from "./styles";

const Home = ( {navigation} ) => {
    const { colors } = useTheme();

    return(
        <View style={[styles.fundoTela, {backgroundColor: colors.background}]}>
            <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={() => {navigation.navigate('MarcaPresencaP1');}} style={[styles.marginBottomPrimario, TemaPrincipal.botaoPrincipal]}>
                Marca Presença
            </Button>

            <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={() => {navigation.navigate('PresencaStack');}} style={[styles.marginBottomPrimario, TemaPrincipal.botaoPrincipal]}>
                Aulas Ministradas
            </Button>

            <Button onPress={() => { navigation.navigate('Teste'); }} theme={{ colors: { primary: "#fff" } }}>
                Teste Beacon
            </Button>
            
            <Button onPress={() => { navigation.navigate('TesteMelhorado'); }} theme={{ colors: { primary: "#fff" } }}>
                Teste Beacon 2
            </Button>
        </View>
    )
}

export default Home;