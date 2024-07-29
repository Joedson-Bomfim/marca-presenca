import React, { useState, useEffect } from "react";
import { ScrollView, View,Text, Alert } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { useRoute } from '@react-navigation/native';
import { addDisciplina, editDisciplina, removeDisciplinaById } from '../../Controller/DisciplinaController';
import Input from "../../components/Input";
import InputOptional from "../../components/InputOptional";

import styles from "./styles";
import TemaPrincipal from "../../assets/styles";

const DisciplinaForm = ( {navigation} ) => {
    const { colors } = useTheme();
    const route = useRoute();

    const { isEdit, id, professor_fk, nome, codigo, curso, complemento  } = route.params;

    const [tipoForm, setTipoForm] = useState('');
    const [nomeForm, setNomeForm] = useState('');
    const [ErrorNomeForm, setErrorNomeForm] = useState('');
    const [codigoForm, setCodigoForm] = useState('');
    const [ErrorCodigoForm, setErrorCodigoForm] = useState('');
    const [cursoForm, setCursoForm] = useState('');
    const [complementoForm, setComplementoForm] = useState('');

    useEffect(() => {
        if(isEdit) {
            setTipoForm('Editar');
            setNomeForm(nome);
            setCodigoForm(codigo);
            setCursoForm(curso);
            setComplementoForm(complemento);
        }else {
            setTipoForm('Cadastrar');
        }
    }, []);

    const cadastrarDisciplina = async () => {
        const trimmedNome = nomeForm.trim();
        const trimmedCodigo = codigoForm.trim();
        const trimmedCurso = cursoForm.trim();
        const trimmedComplemento = complementoForm.trim();
        setNomeForm(trimmedNome);
        setCodigoForm(trimmedCodigo);
        setCursoForm(trimmedCurso);
        setComplementoForm(trimmedComplemento);

        if (!trimmedNome || !trimmedCodigo) {
            if(!trimmedNome) {
                setErrorNomeForm('Por favor, preencha o campo Nome!');
            }

            if(!trimmedCodigo) {
                setErrorCodigoForm('Por favor, informe o código da disciplina!');
            }

            return;
        }

        const result = await addDisciplina(professor_fk, trimmedNome, trimmedCodigo, trimmedCurso, trimmedComplemento);
        
        if(result.success) {
            Alert.alert(
                "Sucesso", "Disciplina cadastrada com sucesso",
                [{ text: "OK", onPress: () => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'DisciplinaStack' }], 
                    });
                    navigation.navigate('DisciplinaDetalhe', { replace: true });
                }}]
            );
        }else {         
            Alert.alert('Atenção', 'Houve um erro ao tentar cadastrar a disciplina');  
        }
    }; 
    
    const atualizarDisciplina = async () => {
        const trimmedNome = nomeForm.trim();
        const trimmedCodigo = codigoForm.trim();
        const trimmedCurso = cursoForm.trim();
        const trimmedComplemento = complementoForm.trim();
        setNomeForm(trimmedNome);
        setCodigoForm(trimmedCodigo);
        setCursoForm(trimmedCurso);
        setComplementoForm(trimmedComplemento);

        if (!trimmedNome || !trimmedCodigo) {
            if(!trimmedNome) {
                setErrorNomeForm('Por favor, preencha o campo Nome!');
            }

            if(!trimmedCodigo) {
                setErrorCodigoForm('Por favor, informe o código da disciplina!');
            }

            return;
        }

        const result = await editDisciplina(id, professor_fk, trimmedNome, trimmedCodigo, trimmedCurso, trimmedComplemento);
        if (result.success) {
            Alert.alert(
                "Sucesso", "Disciplina atualizada com sucesso",
                [{ text: "OK", onPress: () => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'DisciplinaStack' }], 
                    });
                }}]
            );
        } else {      
            Alert.alert('Atenção', 'Houve um erro ao tentar atualizar a disciplina');  
        }
    };    
    
    function apagarDisciplina() {
        Alert.alert(
            "Confirmação",
            "Tem certeza que deseja apagar a disciplina "+nome+"?",
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
        const result = await removeDisciplinaById(id);
        if (result.success) {
            Alert.alert(
                "Sucesso", "Disciplina apagado com sucesso",
                [{ text: "OK", onPress: () => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'DisciplinaStack' }], 
                    });
                }}]
            );
        } else {
            Alert.alert('Não foi possível apagar a disciplina, tente novamente mais tarde');
        }
    };  

    return(
        <ScrollView style={[styles.fundoTela, {backgroundColor: colors.background}]}>
            <Text style={[TemaPrincipal.titulo, {color: colors.text }]}>{tipoForm} Disciplina</Text>

            <Input label="Nome da Disciplina" value={nomeForm} error={ErrorNomeForm} setError={setErrorNomeForm}
            onChangeText={(text) => { setNomeForm(text); if (ErrorNomeForm) { setErrorNomeForm(''); }}} 
            containerStyle={TemaPrincipal.marginBottomPadrao} style={TemaPrincipal.inputPadrao}/>

            <Input label="Código da Disciplina" value={codigoForm} error={ErrorCodigoForm} setError={setErrorCodigoForm}
            onChangeText={(text) => { setCodigoForm(text); if (ErrorCodigoForm) { setErrorCodigoForm(''); }}} 
            containerStyle={TemaPrincipal.marginBottomPadrao} style={TemaPrincipal.inputPadrao}/>

            <InputOptional label="Curso" value={cursoForm} onChangeText={setCursoForm}
            containerStyle={TemaPrincipal.marginBottomPadrao} style={TemaPrincipal.inputPadrao}/>

            <InputOptional label="Complemento (semestre/turma...)" value={complementoForm} onChangeText={setComplementoForm}
            containerStyle={TemaPrincipal.marginBottomPadrao} style={TemaPrincipal.inputPadrao}/>

            {!isEdit ?
            <Button mode="contained" onPress={cadastrarDisciplina} style={TemaPrincipal.inputPadrao}>
                CADASTRAR
            </Button> :
            <View style={TemaPrincipal.botoesEditRegistro}>
                <Button mode="contained" onPress={apagarDisciplina} style={[styles.button, { backgroundColor: '#CF4D4F' }]}>
                    APAGAR
                </Button>

                <Button mode="contained" onPress={atualizarDisciplina}>
                    ATUALIZAR
                </Button>
            </View>}
            
        </ScrollView>
    )
}

export default DisciplinaForm;