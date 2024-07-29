import React, { useState, useEffect, useContext } from "react";
import { ScrollView, View, Text, Alert, TouchableOpacity , StyleSheet } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";
import { useRoute } from '@react-navigation/native';
import { addAula, editAula, removeAulaById } from '../../Controller/AulaController';
import InputArrow from "../../components/InputArrow";

import styles from "./styles";
import TemaPrincipal from "../../assets/styles";

const DisciplinaForm = ( {navigation} ) => {
    const { colors } = useTheme();
    const route = useRoute();

    const { isEdit, id, disciplina_fk, nome_disciplina, dia_semana, local, 
            quantidade_aulas, horario_inicio_aula, horario_fim_aula  } = route.params;

    const [tipoForm, setTipoForm] = useState('');
    const [dia_semanaForm, setDiaSemanaForm] = useState(!dia_semana ? 'Seg' : dia_semana);
    const [localForm, setLocalForm] = useState('');
    const [quantidade_aulasForm, setQuantidadeAulas] = useState('');
    const [horario_inicio_aulaForm, setHoarioInicioAulaForm] = useState('');
    const [horario_fim_aulaForm, setHoarioFimAulaForm] = useState('');

    const diasDaSemana = [
        'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'
    ];

    const indiceAtual = diasDaSemana.indexOf(dia_semanaForm);

    const proximoDia = () => {
        const proximoIndice = (indiceAtual + 1) % diasDaSemana.length;
        setDiaSemanaForm(diasDaSemana[proximoIndice]);
    };

    const diaAnterior = () => {
        const indiceAnterior = (indiceAtual - 1 + diasDaSemana.length) % diasDaSemana.length;
        setDiaSemanaForm(diasDaSemana[indiceAnterior]);
    };

    useEffect(() => {
        if(isEdit) {
            setTipoForm('Editar');
            setDiaSemanaForm(dia_semana);
            setLocalForm(local);
            setQuantidadeAulas(quantidade_aulas.toString());
            setHoarioInicioAulaForm(horario_inicio_aula);
            setHoarioFimAulaForm(horario_fim_aula);
        }else {
            setTipoForm('Cadastrar');
        }
    }, []);

    const cadastrarAula = async () => {
        if (dia_semanaForm && quantidade_aulasForm && horario_inicio_aulaForm && horario_fim_aulaForm) {
            const result = await addAula(disciplina_fk, dia_semanaForm, localForm, quantidade_aulasForm, horario_inicio_aulaForm, horario_fim_aulaForm);
            
            if(result.success) {
                Alert.alert(
                    "Sucesso", "Aula cadastrada com sucesso da disciplina "+ nome_disciplina+"",
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
    
    const atualizarAula = async () => {
        if (dia_semanaForm && quantidade_aulasForm && horario_inicio_aulaForm && horario_fim_aulaForm) {
            const result = await editAula(id, dia_semanaForm, localForm, quantidade_aulasForm, horario_inicio_aulaForm, horario_fim_aulaForm);
            if (result.success) {
                Alert.alert(
                    "Sucesso", "Aula atualizada com sucesso da disciplina "+ nome_disciplina+"",
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

    function apagarDisciplina() {
        Alert.alert(
            "Confirmação",
            "Tem certeza que deseja apagar a aula "+dia_semanaForm+"  da disciplina "+nome_disciplina+"?",
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
        const result = await removeAulaById(id);
        if (result.success) {
            Alert.alert(
                "Sucesso", "Aula apagada com sucesso da disciplina "+ nome_disciplina+"",
                [{ text: "OK", onPress: () => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'DisciplinaStack' }], 
                    });
                }}]
            );
        } else {
            Alert.alert('Não foi possível apagar essa aula, tente novamente mais tarde');
        }
    }; 

    return(
        <ScrollView style={[styles.fundoTela, {backgroundColor: colors.background}]}>
            <Text style={[TemaPrincipal.titulo, {color: colors.text }]}>{tipoForm} Aula</Text>

            <InputArrow titulo={'Dia da Semana'} conteudoForm={dia_semanaForm} 
            setaAnterior={diaAnterior} setSeguinte={proximoDia} color={colors.text}/>

            <TextInput label="Local (Ex: Pavilhão 2 - Sala 6)" mode="flat" value={localForm} 
                    onChangeText={setLocalForm} style={[TemaPrincipal.marginBottomPadrao, TemaPrincipal.inputPadrao]}
            ></TextInput>

            <TextInput label="Quantidade Aulas" mode="flat" value={quantidade_aulasForm} 
                    onChangeText={setQuantidadeAulas} style={[TemaPrincipal.marginBottomPadrao, TemaPrincipal.inputPadrao]}
            ></TextInput>

            <TextInput label="Horário Início Aula" mode="flat" value={horario_inicio_aulaForm} 
                    onChangeText={setHoarioInicioAulaForm} style={[TemaPrincipal.marginBottomPadrao, TemaPrincipal.inputPadrao]}
            ></TextInput>

            <TextInput label="Horário Fim Aula" mode="flat" value={horario_fim_aulaForm} 
                    onChangeText={setHoarioFimAulaForm} style={[TemaPrincipal.marginBottomPadrao, TemaPrincipal.inputPadrao]}
            ></TextInput>

            {!isEdit ?
            <Button mode="contained" onPress={cadastrarAula} style={[TemaPrincipal.inputPadrao, TemaPrincipal.marginBottomPadrao]}>
                CADASTRAR
            </Button> :
            <View style={TemaPrincipal.botoesEditRegistro}>
                <Button mode="contained" onPress={apagarDisciplina} style={[styles.button, TemaPrincipal.marginBottomPadrao, { backgroundColor: '#CF4D4F' }]}>
                    APAGAR
                </Button>

                <Button mode="contained" onPress={atualizarAula} style={[TemaPrincipal.marginBottomPadrao]}>
                    ATUALIZAR
                </Button>
            </View> 
            }
            
        </ScrollView>
    )
}

export default DisciplinaForm;