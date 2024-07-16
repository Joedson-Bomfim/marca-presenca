import React, { useState } from "react";
import { Text, ScrollView } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";

import styles from "./styles";
import TemaPrincipal from "../../style/styles";

const AlunoEdita = ( {navigation} ) => {
    const { colors } = useTheme();

    const [credenciais, setCredenciais] = useState({
        nomeCompleto: '',
        matricula: '',
        usuario: '',
        senha: '',
        confirmarSenha: ''
    })

    return(
        <ScrollView style={[styles.fundoTela, {backgroundColor: colors.background}]}>
            <Text style={[styles.tituloCadastro, {color: colors.text }]}>Editar Aluno</Text>

            <TextInput label="Nome Completo" mode="flat" value={credenciais.nomeCompleto} 
                    onChange={(text) => setCredenciais({...credenciais, nomeCompleto: text})} style={[styles.marginBottom, TemaPrincipal.inputPadrao]}
            ></TextInput>

            <TextInput label="Matrícula" mode="flat" value={credenciais.matricula} 
                    onChange={(text) => setCredenciais({...credenciais, matricula: text})} style={[styles.marginBottom, TemaPrincipal.inputPadrao]}
            ></TextInput>

            <TextInput label="Usuário" mode="flat" value={credenciais.usuario} 
                    onChange={(text) => setCredenciais({...credenciais, usuario: text})} style={[styles.marginBottom, TemaPrincipal.inputPadrao]}
            ></TextInput>

            <TextInput label="Senha" mode="flat" secureTextEntry value={credenciais.senha} 
                    onChange={(text) => setCredenciais({...credenciais, senha: text})} style={[styles.marginBottom, TemaPrincipal.inputPadrao]}
            ></TextInput>

            <TextInput label="Confirmar Senha" mode="flat" secureTextEntry value={credenciais.confirmarSenha} 
                    onChange={(text) => setCredenciais({...credenciais, confirmarSenha: text})} style={[styles.marginBottom, TemaPrincipal.inputPadrao]}
            ></TextInput>

            <Button mode="contained" onPress={() => {navigation.navigate('Disciplina');}} style={TemaPrincipal.inputPadrao}>
                EDITAR
            </Button>
        </ScrollView>
    )
}

export default AlunoEdita;