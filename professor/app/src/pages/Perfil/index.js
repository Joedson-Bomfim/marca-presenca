import React, { useContext, useEffect, useState } from "react";
import { Text, ScrollView, Alert } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
import { useIsFocused } from '@react-navigation/native';
import { editProfessor } from '../../Controller/ProfessorController';
import { Context } from '../../contexts/Context';
import Input from "../../components/Input";

import styles from "./styles";
import TemaPrincipal from "../../assets/styles";

const Perfil = ({ navigation }) => {
    const { colors } = useTheme();

    const { professorId, nomeCompleto, setNomeCompleto, numero_registro, setNumeroRegistro } = useContext(Context);
    
    const [nomeForm, setNomeForm] = useState('');
    const [ErrorNome, setErrorNome] = useState('');
    const [numero_registroForm, setNumeroRegistroFom] = useState('');
    const [ErrorNumeroRegistro, setErrorNumeroRegistro] = useState('');

    const isFocused = useIsFocused(); 
    
    useEffect(() => {
        setErrorNome('');
        setErrorNumeroRegistro('');
        setNomeForm(nomeCompleto);
        setNumeroRegistroFom(numero_registro);
    }, [isFocused]);

    const confirmarAtualizacao = async () => {
        const trimmedNomeCompleto = nomeForm.trim();
        const trimmedNumeroRegistro = numero_registroForm.trim();
        
        const result = await editProfessor(professorId, trimmedNomeCompleto, trimmedNumeroRegistro);
        if (result.success) {
            setNomeCompleto(trimmedNomeCompleto);
            setNumeroRegistro(trimmedNumeroRegistro);
            Alert.alert(
                "Sucesso", "Professor(a) atualizado(a) com sucesso");
        } else {
            Alert.alert('Atenção', 'Houve um erro ao tentar atualizar os seus dados');
        }
    };   
    
    function atualizarPerfil() {
        if (!nomeForm || !numero_registroForm) {
            if(!nomeForm) {
                setErrorNome('Por favor, preencha o seu Nome Completo!');
            }

            if(!numero_registroForm) {
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

            <Input 
                label="Nome Completo" 
                value={nomeForm} 
                error={ErrorNome} 
                setError={setErrorNome}
                onChangeText={(text) => { setNomeForm(text); if (ErrorNome) { setErrorNome(''); }}} 
                containerStyle={TemaPrincipal.marginBottomPadrao} 
                style={TemaPrincipal.inputPadrao}/>

            <Input 
                label="Número Registro" 
                value={numero_registroForm} 
                error={ErrorNumeroRegistro} 
                setError={setErrorNumeroRegistro}
                onChangeText={(text) => { setNumeroRegistroFom(text); if (ErrorNumeroRegistro) { setErrorNumeroRegistro(''); }}} 
                containerStyle={TemaPrincipal.marginBottomPadrao} 
                style={TemaPrincipal.inputPadrao}/>

            <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={atualizarPerfil} style={[TemaPrincipal.botaoCadastro, TemaPrincipal.botaoPrincipal]}>
                Editar
            </Button>  
        </ScrollView>
    )
}

export default Perfil;