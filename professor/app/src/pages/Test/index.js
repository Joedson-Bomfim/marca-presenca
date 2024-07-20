import React from "react";
import { Text, View } from "react-native";
import { Button, useTheme } from "react-native-paper";

import styles from "./styles";
import TemaPrincipal from "../../assets/styles";

const Teste = ( {navigation} ) => {
    const { colors } = useTheme();

    return(
        //<Icon name="clipboard-text-clock-outline" color={ colors.icone } size={40}/>       
        <View style={[styles.fundoTela, {backgroundColor: colors.background}]}>
            <Text style={[styles.titulo, {color: colors.text }]}>Testes</Text>
            <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={() => {navigation.navigate('ProfessorTeste');}} style={[styles.marginBottom, styles.marginBottomPrimario, TemaPrincipal.botaoPrincipal]}>
                Professores
            </Button> 
            <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={() => {navigation.navigate('Tabela');}} style={[styles.marginBottom, styles.marginBottomPrimario, TemaPrincipal.botaoPrincipal]}>
                Tabelas
            </Button>   
        </View>
    )
}

export default Teste;