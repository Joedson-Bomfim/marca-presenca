import React, { useEffect, useState } from 'react';
import { View, Text, Alert, TouchableOpacity, Platform } from "react-native";
import { useTheme, Button, TextInput } from "react-native-paper";

import TemaPrincipal from "../../assets/styles";
import styles from "./styles";

const SelecionaDisciplinaAula = ( {navigation} ) => {
    const { colors } = useTheme();

    function teste() {
        console.log('teste');
    }

    return(
        <View style={[styles.fundoTela, {backgroundColor: colors.background}]}>
            <Text style={[TemaPrincipal.titulo, {color: colors.text }]}>Marcar Presença</Text>

            <TextInput label="Data" mode="flat" value={''} 
                    onChange={teste} style={[styles.marginBottom, TemaPrincipal.inputPadrao]}
            ></TextInput>

            <TextInput label="Disciplina" mode="flat" value={''} 
                    onChange={teste} style={[styles.marginBottom, TemaPrincipal.inputPadrao]}
            ></TextInput>
       

            <TextInput label="Aula" mode="flat" value={''} 
                    onChange={teste} style={[styles.marginBottom, TemaPrincipal.inputPadrao]}
            ></TextInput>

            <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={() => {navigation.navigate('MarcaPresencaP2');}} style={[styles.marginBottomPrimario, TemaPrincipal.botaoPrincipal]}>
                Procurar Alunos
            </Button>
        </View>
    )
}

export default SelecionaDisciplinaAula;