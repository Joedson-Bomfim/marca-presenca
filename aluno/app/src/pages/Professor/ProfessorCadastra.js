import React, { useState } from "react";
import { Text, ScrollView } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";

import styles from "./styles";
import TemaPrincipal from "../../style/styles";

const ProfessorCadastra = ( {navigation} ) => {
    const { colors } = useTheme();

    const [nomeCompleto, setNomeCompleto] = useState(null);
    const [numeroRegistro, setNumeroRegistro] = useState(null);
    const [email, setEmail] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const [senha, setSenha] = useState(null);
    const [confirmarSenha, setConfirmarSenha] = useState(null);

    const logar = () => {
        console.log(nomeCompleto);
    };


    return(
        <ScrollView style={[styles.fundoTela, {backgroundColor: colors.background}]}>
            <Text style={[styles.tituloCadastro, {color: colors.text }]}>Cadastrar Professor</Text>

            <TextInput label="Nome Completo" mode="flat" value={nomeCompleto} 
                    onChangeText={(text)=>setNomeCompleto(text)} style={[styles.marginBottom, TemaPrincipal.inputPadrao]}
            ></TextInput>

            <TextInput label="Número Registro" mode="flat" value={numeroRegistro} 
                    onChangeText={(text)=>setNumeroRegistro(text)} style={[styles.marginBottom, TemaPrincipal.inputPadrao]}
            ></TextInput>

            <TextInput label="E-mail" mode="flat" onChangeText={(text)=>setEmail(text)} style={[styles.marginBottom, TemaPrincipal.inputPadrao]}
            ></TextInput>

            <TextInput label="Usuário" mode="flat" value={usuario} 
                    onChangeText={(text)=>setUsuario(text)} style={[styles.marginBottom, TemaPrincipal.inputPadrao]}
            ></TextInput>

            <TextInput label="Senha" mode="flat" secureTextEntry value={senha} 
                    onChangeText={(text)=>setSenha(text)} style={[styles.marginBottom, TemaPrincipal.inputPadrao]}
            ></TextInput>

            <TextInput label="Confirmar Senha" mode="flat" secureTextEntry value={confirmarSenha} 
                    onChangeText={(text)=>setConfirmarSenha(text)} style={[styles.marginBottom, TemaPrincipal.inputPadrao]}
            ></TextInput>

            <Button mode="contained" onPress={logar} style={[TemaPrincipal.inputPadrao, TemaPrincipal.buttonCadastraEdita]}>
                CADASTRAR
            </Button>
        </ScrollView>
    )
}

export default ProfessorCadastra;