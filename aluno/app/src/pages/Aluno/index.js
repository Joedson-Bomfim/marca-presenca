import React, { useContext, useEffect, useState } from "react";
import { Text, ScrollView, Alert } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";
import { Context } from '../../contexts/Context';
import { registroAluno } from '../../services/cadastro';
import Input from '../../components/Input';

import styles from "./styles";
import TemaPrincipal from "../../assets/styles";

const AlunoCadastra = ( {navigation} ) => {
    const { colors } = useTheme();
    const { fetchAluno, createAluno } = registroAluno();

    const { nome, setNome, setUuid, setSenha } = useContext(Context);
    const [errorNome, setErrorNome] = useState('');
    const [senhaForm, setSenhaForm] = useState('');
    const [errorSenha, setErrorSenha] = useState('');
    const [confirmaSenhaForm, setConfirmaSenhaForm] = useState('');


    useEffect(() => {
        carregaDadosAluno();
    }, []);

    const cadastraAluno = async () => {
        const trimmedNome = nome.trim();
        setNome(trimmedNome);

        if(!trimmedNome || !senhaForm) {
            if(!trimmedNome) {
                setErrorNome('Por favor, preencha o campo Nome!');
            }
            
            if(!senhaForm) {
                setErrorSenha('Por favor, preencha a senha!');
            }

            return;
        }

        if (senhaForm.length < 4) {
            setErrorSenha('A senha deve ter pelo menos 4 caracteres.');
        }else {
            if(senhaForm == confirmaSenhaForm) {
                const result = await createAluno(trimmedNome, senhaForm);
                if(result.success) {
                    console.log('Cadastrado com sucesso');
                    const dadosArmazenados = await fetchAluno();
                    if (dadosArmazenados.success) {
                        console.log('Nome: '+dadosArmazenados.nome+' | beacon UUID: '+dadosArmazenados.uuid+' | senha: '+dadosArmazenados.senha);
                        setUuid(dadosArmazenados.uuid);
                        setSenha(senhaForm);
                    } else {
                        console.log('Nada foi armazenado nos registros')
                        Alert.alert('Atenção', 'Não foi possível armazenar os dados, tente novamente mais tarde');
                    }
                }else {
                    console.log(result.message);
                    Alert.alert('Atenção', 'Houve um erro ao tentar salvar seus dados');
                }
            }else {
                setErrorSenha('A senha está diferente da confirmação da senha!');
            }
        }
    };   

    async function carregaDadosAluno() {
        const storedData = await fetchAluno();
        if (storedData && storedData.success) {
            console.log('Nome: '+storedData.nome+' | beacon UUID: '+storedData.uuid);
        } else {
            console.log('Nada foi armazenado nos registros')
        }
    }

    return(
        <ScrollView style={[styles.fundoTelaCadastro, {backgroundColor: colors.background}]}>
            <Text style={[TemaPrincipal.titulo, {color: colors.text }]}>Bem Vindo!</Text>

            <Text style={[TemaPrincipal.informativo, {color: colors.text }]}>Como você gostaria de ser chamado?</Text>

            <Input label="Nome" value={nome} error={errorNome} setError={setErrorNome}  autoCapitalize={'sentences'}
            onChangeText={(text) => { setNome(text); if (errorNome) { setErrorNome(''); }}}/>

            <Text style={[styles.informativoSobreSenha, {color: colors.text }]}>A senha é para caso seja necessário redefinir o seu ID</Text>

            <Input label="Senha" value={senhaForm} secureTextEntry error={errorSenha} setError={setErrorSenha} autoCapitalize={'none'} containerStyle={TemaPrincipal.inputModal}
            onChangeText={(text) => { setSenhaForm(text); if (errorSenha) { setErrorSenha(''); }}}/>

            <TextInput label="Confirmar Senha" mode="flat" value={confirmaSenhaForm} onChangeText={setConfirmaSenhaForm} secureTextEntry 
            style={[styles.marginBottom, TemaPrincipal.inputPadrao]} autoCapitalize="none"/>

            <Button mode="contained" onPress={cadastraAluno} labelStyle={{ fontSize: 20 }} style={[TemaPrincipal.botaoCadastro]}>
                Salvar
            </Button>
        </ScrollView>
    )
}

export default AlunoCadastra;