import React, { useContext, useState } from "react";
import { Text, ScrollView, Alert } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
import { editProfessor } from '../../Controller/ProfessorController';
import { Context } from '../../contexts/Context';
import Input from "../../components/Input";

import styles from "./styles";
import TemaPrincipal from "../../assets/styles";

const Perfil = ({ navigation }) => {
    const { colors } = useTheme();

    const { professorId, nomeCompleto, setNomeCompleto, numero_registro, setNumeroRegistro } = useContext(Context);
    
    const [ErrorNome, setErrorNome] = useState('');
    const [ErrorNumeroRegistro, setErrorNumeroRegistro] = useState('');

    const confirmarAtualizacao = async () => {
        const trimmedNomeCompleto = nomeCompleto.trim();
        const trimmedNumeroRegistro = numero_registro.trim();
        setNomeCompleto(trimmedNomeCompleto);
        setNumeroRegistro(trimmedNumeroRegistro);

        const result = await editProfessor(professorId, trimmedNomeCompleto, trimmedNumeroRegistro);
        if (result.success) {
            Alert.alert(
                "Sucesso", "Professor(a) atualizado(a) com sucesso");
        } else {
            Alert.alert('Atenção', result.message);
        }
    };   
    
    function atualizarPerfil() {
        if (!nomeCompleto || !numero_registro) {
            if(!nomeCompleto) {
                setErrorNome('Por favor, preencha o seu Nome Completo!');
            }

            if(!numero_registro) {
                setErrorNumeroRegistro('Por favor, informe o seu Número de Reistro!');
            }
            return;
        }

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

            <Input label="Nome Completo" value={nomeCompleto} error={ErrorNome} setError={setErrorNome}
            onChangeText={(text) => { setNomeCompleto(text); if (ErrorNome) { setErrorNome(''); }}} 
            containerStyle={TemaPrincipal.marginBottomPadrao} style={TemaPrincipal.inputPadrao}/>

            <Input label="Número Registro" value={numero_registro} error={ErrorNumeroRegistro} setError={setErrorNumeroRegistro}
            onChangeText={(text) => { setNumeroRegistro(text); if (ErrorNumeroRegistro) { setErrorNumeroRegistro(''); }}} 
            containerStyle={TemaPrincipal.marginBottomPadrao} style={TemaPrincipal.inputPadrao}/>

            <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={atualizarPerfil} style={[TemaPrincipal.botaoCadastro, TemaPrincipal.botaoPrincipal]}>
                Editar
            </Button>  
        </ScrollView>
    )
}

export default Perfil;