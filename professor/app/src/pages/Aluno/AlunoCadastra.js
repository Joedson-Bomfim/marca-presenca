import React, { useState } from "react";
import { Text, ScrollView, Alert } from "react-native";
import { TextInput, Button, useTheme, Dialog } from "react-native-paper";
import { cadastro } from "../../services/cadastro";

import styles from "./styles";
import TemaPrincipal from "../../style/styles";
import Loading from "../../components/loading";

const AlunoCadastra = ( {navigation} ) => {
    const { colors } = useTheme();
    const [visible, setVisible] = useState(false);

    const [nomeCompleto, setNomeCompleto] = useState(null);
    const [matricula, setMatricula] = useState(null);
    const [email, setEmail] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const [senha, setSenha] = useState(null);
    const [confirmarSenha, setConfirmarSenha] = useState(null);

    //Envia os dados do formulário para o back-end
    async function cadastrarAluno() {
        setVisible(true);
        let caminho = 'usuario/novo';

        const aluno = {
            usuario: usuario,
            senha: senha,
            email: email,
            tipo: "aluno",
            status: 1,
            nome: nomeCompleto,
            matricula: matricula
        };

        const result = await cadastro(aluno, caminho);

        if (!result.success) {
            Alert.alert("Erro", "Houve um problema ao cadastrar: " + result.error);
        } else {
            Alert.alert("Sucesso!", "Cadastro efetuado com sucesso!");
        }

        setVisible(false);
    }

    return(
        <ScrollView style={[styles.fundoTela, {backgroundColor: colors.background}]}>
            <Loading visible={visible}/>
            <Text style={[styles.tituloCadastro, {color: colors.text }]}>Cadastrar Aluno</Text>

            <TextInput label="Nome Completo" mode="flat" onChangeText={(text)=>setNomeCompleto(text)} style={[styles.marginBottom, TemaPrincipal.inputPadrao]}
            ></TextInput>

            <TextInput label="Matrícula" mode="flat" onChangeText={(text)=>setMatricula(text)} style={[styles.marginBottom, TemaPrincipal.inputPadrao]}
            ></TextInput>

            <TextInput label="E-mail" mode="flat" onChangeText={(text)=>setEmail(text)} style={[styles.marginBottom, TemaPrincipal.inputPadrao]}
            ></TextInput>

            <TextInput label="Usuário" mode="flat" onChangeText={(text)=>setUsuario(text)} 
                       style={[styles.marginBottom, TemaPrincipal.inputPadrao]}
            ></TextInput>

            <TextInput label="Senha" mode="flat" secureTextEntry onChangeText={(text)=>setSenha(text)}
                       style={[styles.marginBottom, TemaPrincipal.inputPadrao]}
            ></TextInput>

            <TextInput label="Confirmar Senha" mode="flat" secureTextEntry onChangeText={(text)=>setConfirmarSenha(text)}
                       style={[styles.marginBottom, TemaPrincipal.inputPadrao]}
            ></TextInput>

            <Button mode="contained" onPress={cadastrarAluno} style={[TemaPrincipal.inputPadrao, TemaPrincipal.buttonCadastraEdita]}>
                CADASTRAR
            </Button>
        </ScrollView>
    )
}

export default AlunoCadastra;