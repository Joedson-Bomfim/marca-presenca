import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { ScrollView, View, Text, Alert } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { addAluno, editAluno, removeAlunoById } from "../../Controller/AlunoController";
import { CheckBluetoothAndLocation } from "../../services/CheckBluetoothAndLocation";
import useBeaconService from "../../services/BeaconService";
import AdicionaAluno from "../../components/AdicionaAluno";
import Input from "../../components/Input";

import { formatUUID } from '../../services/formatacao';
import styles from "./styles";
import TemaPrincipal from "../../assets/styles";

const AlunoForm = ( {navigation} ) => {
    const { colors } = useTheme();
    const route = useRoute();

    const { isEdit, id, professor_fk, nome, matricula, beacon_id  } = route.params;
    const { uuidList, estadoBeacon, startBeaconRanging, stopBeaconRanging } = useBeaconService();

    const [tipoForm, setTipoForm] = useState('');
    const [nomeForm, setNomeForm] = useState('');
    const [ErrorNomeForm, setErrorNomeForm] = useState('');
    const [matriculaForm, setMatriculaForm] = useState('');
    const [ErrorMatriculaForm, setErrorMatriculaForm] = useState('');
    const [beaconIdForm, setBeaconIdForm] = useState('');
    const [ErrorBeaconaForm, setErrorMBeaconForm] = useState('');

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
        const trimmedNome = nomeForm ? nomeForm.trim() : '';
        const trimmedMatricula = matriculaForm ? matriculaForm.trim() : '';
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
            if(result.message.includes('Esta matr')) { //Foi colocado a frase assim por conta da acentuação de matrícula, eu não coloquei pra n correr riscos de resultar em erros 
                setErrorMatriculaForm(result.message);
            }else if(result.message.includes('Beacon')) {
                setErrorMBeaconForm(result.message);
            }else {
                Alert.alert('Atenção!',result.message);
            }
        }
    }; 
    
    const atualizarAluno = async () => {
        const trimmedNome = nomeForm ? nomeForm.trim() : '';
        const trimmedMatricula = matriculaForm ? matriculaForm.trim() : '';
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
            if(result.message.includes('Esta matr')) {
                setErrorMatriculaForm(result.message);
            }else if(result.message.includes('Beacon')) {
                setErrorMBeaconForm(result.message);
            }else {
                Alert.alert('Atenção!',result.message);
            }
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
            if(result.message.includes('FOREIGN KEY')) {
                Alert.alert('Não foi possível apagar','Este(a) aluno(a) está registrado em pelo menos uma disciplina, aula e/ou registro de presença');
                return    
            }

            Alert.alert('Houve um erro','Não foi possível apagar este(a) aluno(a), tente novamente mais tarde');
        }
    }; 

    const opcoesDisciplinas = uuidList.map(uuid => ({
        id: uuid,
        name: formatUUID(uuid) 
    }));

    function adicionarAlunoADisciplina(beaconId) {
        setErrorMBeaconForm('');
        console.log(beaconId);
        setBeaconIdForm(beaconId);
    }

    function removerBeacon() {
        Alert.alert(
            "Confirmação",
            "Você tem certeza que deseja remover o beacon ID do aluno?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Remover",
                    onPress: () => setBeaconIdForm('')
                }
            ]
        );
    }

    async function procurar() {
        const isBluetoothAndLocationEnabled = await CheckBluetoothAndLocation();

        if (!isBluetoothAndLocationEnabled) {
            return;
        }
        
        startBeaconRanging();
    }

    function pararProcura() {
        stopBeaconRanging();
    }

    return(
        <ScrollView style={[styles.fundoTela, {backgroundColor: colors.background}]}>
            <Text style={[styles.tituloCadastro, {color: colors.text }]}>{tipoForm} Aluno</Text>

            <Input 
                label="Nome Completo" 
                value={nomeForm}
                 error={ErrorNomeForm} 
                setError={setErrorNomeForm}
                onChangeText={(text) => { setNomeForm(text); if (ErrorNomeForm) { setErrorNomeForm(''); }}} 
                containerStyle={TemaPrincipal.marginBottomPadrao} 
                style={TemaPrincipal.inputPadrao}/>

            <Input 
                label="Matrícula" 
                value={matriculaForm} 
                error={ErrorMatriculaForm} 
                setError={setErrorMatriculaForm}
                onChangeText={(text) => { setMatriculaForm(text); if (ErrorMatriculaForm) { setErrorMatriculaForm(''); }}} 
                containerStyle={TemaPrincipal.marginBottomPadrao} 
                style={TemaPrincipal.inputPadrao}/>

            {estadoBeacon ?
            <View>
                <Button 
                    mode="contained" 
                    labelStyle={{ fontSize: 20 }} 
                    onPress={pararProcura} 
                    style={[TemaPrincipal.botaoPrincipal, { backgroundColor: '#6346F5', marginBottom: 10 }]}>
                    Parar de Procurar
                </Button>
                <AdicionaAluno 
                    nome_disciplina={''} 
                    tipo={'beacon'} 
                    fontSize={15} 
                    icon={'lighthouse-on'}
                    backgroundColor={true} 
                    options={opcoesDisciplinas} 
                    onSelect={adicionarAlunoADisciplina}
                    contentStyle={{ paddingTop: 5, paddingBottom: 5 }} 
                    placeholder="Clique aqui e selecione um ID" />  
            </View> :
            <Button 
                mode="contained" 
                labelStyle={{ fontSize: 18 }} 
                onPress={procurar} 
                style={[ {marginBottom: 10, backgroundColor: colors.secundary}]}>
                Procurar ID Beacon
            </Button>}        

            {beaconIdForm ?
                <View>
                    <Input 
                        label="Beacon ID (somente leitura)" 
                        value={formatUUID(beaconIdForm)} 
                        editable={false}
                        error={ErrorBeaconaForm} 
                        setError={setErrorMBeaconForm}
                        onChangeText={(text) => { setBeaconIdForm(text); if (ErrorBeaconaForm) { setErrorMBeaconForm(''); }}} 
                        containerStyle={TemaPrincipal.marginBottomPadrao} 
                        style={TemaPrincipal.inputPadrao}/>

                    <Button 
                        mode="contained" 
                        labelStyle={{ fontSize: 18 }} 
                        onPress={removerBeacon} 
                        style={[ TemaPrincipal.marginBottomPadrao, {backgroundColor: colors.tertiary}]}>
                        Remover ID Beacon
                    </Button> 
                </View>
                : ''
            }

            {!isEdit ?
            <Button 
                mode="contained" 
                onPress={cadastrarAluno} 
                style={[TemaPrincipal.inputPadrao, TemaPrincipal.marginBottomPadrao]}>
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