import React from 'react';
import { View } from "react-native";
import { Button, useTheme } from "react-native-paper";

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
        </View>
    )
}

export default Home;