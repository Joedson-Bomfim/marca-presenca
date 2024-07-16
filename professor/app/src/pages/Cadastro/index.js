import React from "react";
import { Text, View } from "react-native";
import { Button, useTheme } from "react-native-paper";

import styles from "./styles";
import TemaPrincipal from "../../style/styles";

const Cadastro = ( {navigation} ) => {
    const { colors } = useTheme();

    return(
        <View style={[styles.fundoTela, {backgroundColor: colors.background}]}>
            <Text style={[styles.titulo, {color: colors.text }]}>Cadastrar</Text>

            <Button mode="contained" onPress={() => {navigation.navigate('AlunoCadastra');}} style={[styles.marginBottom, TemaPrincipal.inputPadrao]}>
                ALUNO
            </Button>

            <Button mode="contained" onPress={() => {navigation.navigate('ProfessorCadastra');}} style={TemaPrincipal.inputPadrao}>
                PROFESSOR
            </Button>
        </View>
    )
}

export default Cadastro;