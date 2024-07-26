import React, { useState, useContext } from "react";
import { Text, ScrollView, Alert } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";
import { Context } from '../../contexts/Context';
import { addProfessor } from '../../Controller/ProfessorController';

import styles from "./styles";
import TemaPrincipal from "../../assets/styles";

const ProfessorCadastra = ( {navigation} ) => {
    const { colors } = useTheme();

    const { setProfessorId, nomeCompleto, setNomeCompleto, numero_registro, setNumeroRegistro } = useContext(Context);

    const cadastrarProfessor = async () => {
        if (nomeCompleto && numero_registro) {
            const result = await addProfessor(nomeCompleto, numero_registro);
            
            if (result.success) {
                console.log('Cadastrado com sucesso, ID: ' + result.message);
                setProfessorId(result.message)
            } else {         
                Alert.alert('Atenção', result.message);  
            }
        } else {
            Alert.alert('Atenção', 'Por favor preencha todos os campos');
        }
    };    

    return(
        <ScrollView style={[styles.fundoTela, {backgroundColor: colors.background}]}>
            <Text style={[TemaPrincipal.titulo, {color: colors.text }]}>Bem Vindo!</Text>

            <Text style={[TemaPrincipal.informativo, {color: colors.text }]}>Por favor, informe os seus dados</Text>

            <TextInput label="Nome Completo" mode="flat" value={nomeCompleto} 
                    onChangeText={(text)=>setNomeCompleto(text)} style={[styles.marginBottom, TemaPrincipal.inputPadrao]}
            ></TextInput>

            <TextInput label="Número Registro" mode="flat" value={numero_registro} 
                    onChangeText={(text)=>setNumeroRegistro(text)} style={[styles.marginBottom, TemaPrincipal.inputPadrao]}
            ></TextInput>

            <Button mode="contained" onPress={cadastrarProfessor} style={[TemaPrincipal.inputPadrao, TemaPrincipal.buttonCadastraEdita]}>
                CADASTRAR
            </Button>
        </ScrollView>
    )
}

export default ProfessorCadastra;