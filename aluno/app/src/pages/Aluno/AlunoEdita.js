import React, { useContext, useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";
import { Context } from '../../contexts/Context';
import { registroAluno } from '../../services/cadastro';
import RedefinirID from '../../components/RedefinicaoID';
import Input from '../../components/Input';

import styles from "./styles";
import TemaPrincipal from "../../assets/styles";

const AlunoEdita = ( {navigation} ) => {
    const { colors } = useTheme();

    const { nome, setNome, uuid, setUuid, senha } = useContext(Context);

    const [nomeForm, setNomeForm] = useState(nome);
    const [errorNome, setErrorNome] = useState('');

    const { fetchAluno, updateAluno, updateUUID } = registroAluno();

    const AtualizarAluno = async () => {
        const trimmedNome = nomeForm.trim();
        setNomeForm(trimmedNome);

        if (!trimmedNome) {
            setErrorNome('Por favor, preencha o campo Nome!');
            return;
        }

        const result = await updateAluno(trimmedNome, uuid, senha);
        if(result.success) {
            console.log('atualizado com sucesso');
            
            const dadosArmazenados = await fetchAluno();
            if (dadosArmazenados.success) {
                console.log('Nome: '+dadosArmazenados.nome+' | beacon UUID: '+dadosArmazenados.uuid+' | beacon UUID: '+dadosArmazenados.senha);
                setNome(trimmedNome);
                navigation.navigate('Home', { replace: true });
            } else {
                console.log('Nada foi armazenado nos registros')
            }
        }else {
            console.log(result.message);
        }
    }; 

    const confirmarRedefinicaoID = async () => {
        const result = await updateUUID(nomeForm, senha);
        if(result.success) {
            const dadosArmazenados = await fetchAluno();
            if (dadosArmazenados.success) {
                console.log('ID redefinido com sucesso');
                console.log('Nome: '+dadosArmazenados.nome+' | beacon UUID: '+dadosArmazenados.uuid+' | beacon UUID: '+dadosArmazenados.senha);
                setUuid(dadosArmazenados.uuid);
                Alert.alert('ID redefinido com sucesso');
                navigation.navigate('Home', { replace: true });
            } else {
                console.log('Nada foi armazenado nos registros')
            }
        }else {
            console.log(result.message);
        }
    };

    return(
        <View style={[styles.fundoTela, {backgroundColor: colors.background}]}>
             <View style={styles.container}>
                <View>
                    <Text style={[TemaPrincipal.titulo, {color: colors.text }]}>Perfil</Text>

                    <Text style={[TemaPrincipal.informativo, {color: colors.text }]}>Gostaria de alterar seu nome?</Text>

                    <Input label="Nome" value={nomeForm} error={errorNome} setError={setErrorNome} maxLength={30}
                    onChangeText={(text) => { setNomeForm(text); if (errorNome) { setErrorNome(''); }}}/>

                    <Button mode="contained" onPress={AtualizarAluno} labelStyle={{ fontSize: 20 }} style={[TemaPrincipal.botaoCadastro]}>
                        Atualizar
                    </Button>
                </View>

                <RedefinirID redefinirID={confirmarRedefinicaoID} senhaContext={senha}/>
             </View>
        </View>
    )
}

export default AlunoEdita;