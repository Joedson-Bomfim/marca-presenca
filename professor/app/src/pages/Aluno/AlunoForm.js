import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, Alert } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";
import { useRoute } from '@react-navigation/native';
import { addAluno, editAluno, removeAlunoById } from '../../Controller/AlunoController';
import Input from "../../components/Input";

import styles from "./styles";
import TemaPrincipal from "../../assets/styles";

const AlunoForm = ( {navigation} ) => {
    const { colors } = useTheme();
    const route = useRoute();

    const { isEdit, id, professor_fk, nome, matricula, beacon_id  } = route.params;

    const [tipoForm, setTipoForm] = useState('');
    const [nomeForm, setNomeForm] = useState('');
    const [ErrorNomeForm, setErrorNomeForm] = useState('');
    const [matriculaForm, setMatriculaForm] = useState('');
    const [ErrorMatriculaForm, setErrorMatriculaForm] = useState('');
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
        const trimmedNome = nomeForm.trim();
        const trimmedMatricula = matriculaForm.trim();
        setNomeForm(trimmedNome);
        setMatriculaForm(trimmedMatricula);

        if (!trimmedNome) {
            setErrorNomeForm('Por favor, preencha o campo Nome!');
            return;
        }
        
        const result = await addAluno(professor_fk, trimmedNome, trimmedMatricula, beaconIdForm);
        
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
            Alert.alert('Atenção', 'Houve um erro ao tentar atualizar os seus dados');  
        }
    }; 
    
    const atualizarAluno = async () => {
        const trimmedNome = nomeForm.trim();
        const trimmedMatricula = matriculaForm.trim();
        setNomeForm(trimmedNome);
        setMatriculaForm(trimmedMatricula);

        if (!trimmedNome) {
            setErrorNomeForm('Por favor, preencha o campo Nome!');
            return;
        }
        
        const result = await editAluno(id, trimmedNome, trimmedMatricula, beaconIdForm);
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
            setErrorMatriculaForm(result.message);
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

            <Input label="Nome Completo" value={nomeForm} error={ErrorNomeForm} setError={setErrorNomeForm}
            onChangeText={(text) => { setNomeForm(text); if (ErrorNomeForm) { setErrorNomeForm(''); }}} 
            containerStyle={TemaPrincipal.marginBottomPadrao} style={TemaPrincipal.inputPadrao}/>

            <Input label="Matrícula" value={matriculaForm} error={ErrorMatriculaForm} setError={setErrorMatriculaForm}
            onChangeText={(text) => { setMatriculaForm(text); if (ErrorMatriculaForm) { setErrorMatriculaForm(''); }}} 
            containerStyle={TemaPrincipal.marginBottomPadrao} style={TemaPrincipal.inputPadrao}/>

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