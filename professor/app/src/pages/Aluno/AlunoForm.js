import React, { useState, useEffect } from "react";
import { Text, ScrollView, Alert } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";
import { useRoute } from '@react-navigation/native';
import { addAluno, editAluno } from '../../Controller/AlunoController';

import styles from "./styles";
import TemaPrincipal from "../../assets/styles";

const AlunoForm = ( {navigation} ) => {
    const { colors } = useTheme();
    const route = useRoute();

    const { isEdit, id, nome, matricula, beacon_id  } = route.params;

    const [tipoForm, setTipoForm] = useState('');
    const [nomeForm, setNomeForm] = useState('');
    const [matriculaForm, setMatriculaForm] = useState('');
    const [beaconIdForm, setBeaconIdForm] = useState('');

    useEffect(() => {
        if(isEdit) {
            setTipoForm('Editar');
            setNomeForm(nome);
            setMatriculaForm(matricula);
            setBeaconIdForm(beacon_id);
            console.log('editar')
        }else {
            setTipoForm('Cadastrar')
            console.log('cadastrar');
        }
    }, []);

    const cadastrarAluno = async () => {
        if (nomeForm && matriculaForm) {
            await addAluno(nomeForm, matriculaForm, beaconIdForm);
            Alert.alert(
                "Sucesso", "Lista de chamada registrada com sucesso",
                [{ text: "OK", onPress: () => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'AlunoStack' }], 
                    });
                }}]
            );
        }else{
            Alert.alert('Atenção','Por favor preencha todos os campos');
        }
    };

    const atualizarAluno = async () => {
        if (nomeForm && matriculaForm) {
            await editAluno('3', nomeForm, matriculaForm, beaconIdForm);
            Alert.alert(
                "Sucesso", "Lista de chamada atualizada com sucesso",
                [{ text: "OK", onPress: () => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'AlunoStack' }], 
                    });
                }}]
            );
        }else{
            Alert.alert('Atenção','Por favor preencha todos os campos');
        }
    };

    return(
        <ScrollView style={[styles.fundoTela, {backgroundColor: colors.background}]}>
            <Text style={[styles.tituloCadastro, {color: colors.text }]}>{tipoForm} Aluno</Text>

            <TextInput label="Nome" mode="flat" value={nomeForm} 
                    onChangeText={setNomeForm} style={[TemaPrincipal.marginBottomPadrao, TemaPrincipal.inputPadrao]}
            ></TextInput>

            <TextInput label="Matrícula" mode="flat" value={matriculaForm} 
                    onChangeText={setMatriculaForm} style={[TemaPrincipal.marginBottomPadrao, TemaPrincipal.inputPadrao]}
            ></TextInput>

            <TextInput label="Beacon ID" mode="flat" value={beaconIdForm} 
                    onChangeText={setBeaconIdForm} style={[TemaPrincipal.marginBottomPadrao, TemaPrincipal.inputPadrao]}
            ></TextInput>

            {!isEdit ?
            <Button mode="contained" onPress={cadastrarAluno} style={TemaPrincipal.inputPadrao}>
                CADASTRAR
            </Button> :
            <Button mode="contained" onPress={atualizarAluno} style={TemaPrincipal.inputPadrao}>
                ATUALIZAR
            </Button>}
            
        </ScrollView>
    )
}

export default AlunoForm;