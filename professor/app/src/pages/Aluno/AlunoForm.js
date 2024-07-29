import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, Alert } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";
import { useRoute } from '@react-navigation/native';
import { addAluno, editAluno, removeAlunoById } from '../../Controller/AlunoController';

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
        }else {
            setTipoForm('Cadastrar');
        }
    }, []);

    const cadastrarAluno = async () => {
        if (nomeForm && matriculaForm) {
            const result = await addAluno(nomeForm, matriculaForm, beaconIdForm);
            
            if(result.success) {
                Alert.alert(
                    "Sucesso", "Aluno(a) registrado(a) com sucesso",
                    [{ text: "OK", onPress: () => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'AlunoStack' }], 
                        });
                    }}]
                );
            }else {         
                Alert.alert('Atenção',result.message);  
            }
        }else{
            Alert.alert('Atenção','Por favor preencha todos os campos');
        }
    }; 
    
    const atualizarAluno = async () => {
        if (nomeForm && matriculaForm) {
            console.log('Campos preenchidos. Chamando editAluno...');
            const result = await editAluno(id, nomeForm, matriculaForm, beaconIdForm);
            if (result.success) {
                Alert.alert(
                    "Sucesso", "Aluno(a) atualizado(a) com sucesso",
                    [{ text: "OK", onPress: () => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'AlunoStack' }], 
                        });
                    }}]
                );
            } else {
                Alert.alert('Atenção', result.message);
            }
        } else {
            Alert.alert('Atenção', 'Por favor preencha todos os campos');
        }
    };   
    
    function apagarAluno() {
        Alert.alert(
            "Confirmação",
            "Tem certeza que deseja apagar o aluno "+nomeForm+"?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Apagar",
                    onPress: () => confirmarExclusao()
                }
            ]
        );
    }
    
    const confirmarExclusao = async () => {
        const result = await removeAlunoById(id);
        if (result.success) {
            Alert.alert(
                "Sucesso", "Aluno apagado com sucesso",
                [{ text: "OK", onPress: () => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'AlunoStack' }], 
                    });
                }}]
            );
        } else {
            Alert.alert('Não foi possível apagar esse(a) aluno(a), tente novamente mais tarde');
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
            <View style={TemaPrincipal.botoesEditRegistro}>
                <Button mode="contained" onPress={apagarAluno} style={[styles.button, { backgroundColor: '#CF4D4F' }]}>
                    APAGAR
                </Button>

                <Button mode="contained" onPress={atualizarAluno}>
                    ATUALIZAR
                </Button>
            </View>}
            
        </ScrollView>
    )
}

export default AlunoForm;