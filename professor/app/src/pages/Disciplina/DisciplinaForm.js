import React, { useState, useEffect, useContext } from "react";
import { Text, ScrollView, Alert } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";
import { useRoute } from '@react-navigation/native';
import { addDisciplina, editDisciplina } from '../../Controller/DisciplinaController';

import styles from "./styles";
import TemaPrincipal from "../../assets/styles";

const DisciplinaForm = ( {navigation} ) => {
    const { colors } = useTheme();
    const route = useRoute();

    const { isEdit, id, professor_fk, nome, codigo, curso, complemento  } = route.params;

    const [tipoForm, setTipoForm] = useState('');
    const [nomeForm, setNomeForm] = useState('');
    const [codigoForm, setCodigoForm] = useState('');
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
        if (nomeForm && codigoForm) {
            const result = await addDisciplina(professor_fk, nomeForm, codigoForm, cursoForm, complementoForm);
            
            if(result.success) {
                Alert.alert(
                    "Sucesso", "Disciplina cadastrada com sucesso",
                    [{ text: "OK", onPress: () => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'DisciplinaStack' }], 
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
    
    const atualizarDisciplina = async () => {
        if (nomeForm && codigoForm) {
            const result = await editDisciplina(id, professor_fk, nomeForm, codigoForm, cursoForm, complementoForm);
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
                Alert.alert('Atenção', result.message);
            }
        } else {
            Alert.alert('Atenção', 'Por favor preencha todos os campos');
        }
    };               

    return(
        <ScrollView style={[styles.fundoTela, {backgroundColor: colors.background}]}>
            <Text style={[styles.tituloCadastro, {color: colors.text }]}>{tipoForm} Disciplina</Text>

            <TextInput label="Nome" mode="flat" value={nomeForm} 
                    onChangeText={setNomeForm} style={[TemaPrincipal.marginBottomPadrao, TemaPrincipal.inputPadrao]}
            ></TextInput>

            <TextInput label="Código" mode="flat" value={codigoForm} 
                    onChangeText={setCodigoForm} style={[TemaPrincipal.marginBottomPadrao, TemaPrincipal.inputPadrao]}
            ></TextInput>

            <TextInput label="Curso" mode="flat" value={cursoForm} 
                    onChangeText={setCursoForm} style={[TemaPrincipal.marginBottomPadrao, TemaPrincipal.inputPadrao]}
            ></TextInput>

            <TextInput label="Complemento (semestre/turma...)" mode="flat" value={complementoForm} 
                    onChangeText={setComplementoForm} style={[TemaPrincipal.marginBottomPadrao, TemaPrincipal.inputPadrao]}
            ></TextInput>

            {!isEdit ?
            <Button mode="contained" onPress={cadastrarDisciplina} style={TemaPrincipal.inputPadrao}>
                CADASTRAR
            </Button> :
            <Button mode="contained" onPress={atualizarDisciplina} style={TemaPrincipal.inputPadrao}>
                ATUALIZAR
            </Button>}
            
        </ScrollView>
    )
}

export default DisciplinaForm;