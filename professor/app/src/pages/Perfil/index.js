import React, { useEffect, useState, useContext } from "react";
import { Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
import { editProfessor } from '../../Controller/ProfessorController';
import { Context } from '../../contexts/Context';

import styles from "./styles";
import TemaPrincipal from "../../assets/styles";

const Perfil = ({ navigation }) => {
    const { colors } = useTheme();

    const { professorId, nomeCompleto, setNomeCompleto, numero_registro, setNumeroRegistro } = useContext(Context);

    const confirmarAtualizacao = async () => {
        if (professorId && nomeCompleto && numero_registro) {
            const result = await editProfessor(professorId, nomeCompleto, numero_registro);
            if (result.success) {
                Alert.alert(
                    "Sucesso", "Professor(a) atualizado(a) com sucesso");
            } else {
                Alert.alert('Atenção', result.message);
            }
        } else {
            Alert.alert('Atenção', 'Por favor preencha todos os campos');
        }
    };   
    
    function atualizarPerfil() {
        Alert.alert(
            "Confirmação",
            "Tem certeza que que atualizar o seu perfil?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Atualizar",
                    onPress: () => confirmarAtualizacao()
                }
            ]
        );
    }

    return (
        <ScrollView style={[styles.fundoTela, { backgroundColor: colors.background }]}>
            <Text style={[TemaPrincipal.titulo, {color: colors.text }]}>Perfil</Text>

            <TextInput label="Nome Completo" mode="flat" value={nomeCompleto} 
            onChangeText={(text)=>setNomeCompleto(text)} style={[TemaPrincipal.marginBottomPadrao, TemaPrincipal.inputPadrao]}
            ></TextInput>

            <TextInput label="Número Registro" mode="flat" value={numero_registro} 
            onChangeText={(text)=>setNumeroRegistro(text)} style={[TemaPrincipal.marginBottomPadrao, TemaPrincipal.inputPadrao]}
            ></TextInput>

            <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={atualizarPerfil} style={[TemaPrincipal.botaoCadastro, TemaPrincipal.botaoPrincipal]}>
                Editar
            </Button>  
        </ScrollView>
    )
}

export default Perfil;