import React, { useState, useEffect, useContext } from "react";
import { ScrollView, View, Text, Alert, TouchableOpacity , StyleSheet } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";
import { useRoute } from '@react-navigation/native';
import { addAula, editAula, removeAulaById } from '../../Controller/AulaController';
import InputTime from "../../components/InputTime";
import InputArrow from "../../components/InputArrow";
import Input from "../../components/Input";
import InputOptional from "../../components/InputOptional";

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
    const [ErrorLocalForm, setErrorLocalForm] = useState('');
    const [quantidade_aulasForm, setQuantidadeAulas] = useState('');
    const [ErrorQuantidadeAulasForm, setErrorQuantidadeAulasForm] = useState('');
    const [horario_inicio_aulaForm, setHoararioInicioAulaForm] = useState('');
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
            setHoararioInicioAulaForm(horario_inicio_aula);
            setHoarioFimAulaForm(horario_fim_aula);
        }else {
            setTipoForm('Cadastrar');
        }
    }, [isEdit, dia_semana, local, quantidade_aulas, horario_inicio_aula, horario_fim_aula]);

    const cadastrarAula = async () => {
        const trimmedLocal = localForm.trim();
        setLocalForm(trimmedLocal);
        
        if (!trimmedLocal || !quantidade_aulasForm) {
            if(!trimmedLocal) {
                setErrorLocalForm('Por favor, informe um local!');
            }
            
            if(!quantidade_aulasForm) {
                setErrorQuantidadeAulasForm('informe a quantidade de aulas');
            }
            
            return;
        }

        const quantidade_aulas_formatada = quantidade_aulasForm.replace(/[^0-9]/g, '');

        if (horario_inicio_aulaForm && horario_fim_aulaForm) {

            const result = await addAula(disciplina_fk, dia_semanaForm, trimmedLocal, quantidade_aulas_formatada, horario_inicio_aulaForm, horario_fim_aulaForm);
            
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
            Alert.alert('Atenção','Por favor escolha o Horário de Início e Fim da(s) aula(s)');
        }
    }; 
    
    const atualizarAula = async () => {
        const trimmedLocal = localForm.trim();
        setLocalForm(trimmedLocal);
        
        if (!trimmedLocal || !quantidade_aulasForm) {
            if(!trimmedLocal) {
                setErrorLocalForm('Por favor, informe um local!');
            }
            
            if(!quantidade_aulasForm) {
                setErrorQuantidadeAulasForm('informe a quantidade de aulas');
            }
            
            return;
        }

        const quantidade_aulas_formatada = quantidade_aulasForm.replace(/[^0-9]/g, '');
        
        if (horario_inicio_aulaForm && horario_fim_aulaForm) {
            const result = await editAula(id, dia_semanaForm, trimmedLocal, quantidade_aulas_formatada, horario_inicio_aulaForm, horario_fim_aulaForm);
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

    let horario_inicio = horario_inicio_aula;
    let horario_fim = horario_fim_aula;

    return(
        <ScrollView style={[styles.fundoTela, {backgroundColor: colors.background}]}>
            <Text style={[TemaPrincipal.titulo, {color: colors.text }]}>{tipoForm} Aula</Text>

            <InputArrow titulo={'Dia da Semana'} conteudoForm={dia_semanaForm} 
            setaAnterior={diaAnterior} setSeguinte={proximoDia} color={colors.text}/>

            <Input label="Local (Ex: Pavilhão 2 - Sala 6)" value={localForm} error={ErrorLocalForm} setError={setErrorLocalForm}
            onChangeText={(text) => { setLocalForm(text); if (ErrorLocalForm) { setErrorLocalForm(''); }}} 
            containerStyle={TemaPrincipal.marginBottomPadrao} style={TemaPrincipal.inputPadrao}/>

            <Input label="Quantidade Aulas" value={quantidade_aulasForm} error={ErrorQuantidadeAulasForm} setError={setErrorQuantidadeAulasForm} keyboardType="numeric"
            onChangeText={(text) => { setQuantidadeAulas(text); if (ErrorQuantidadeAulasForm) { setErrorQuantidadeAulasForm(''); }}} 
            containerStyle={TemaPrincipal.marginBottomPadrao} style={TemaPrincipal.inputPadrao}/>

            <InputTime titulo={'Selecione Horário Início Aula'} icon={'clock-time-eight'} initialTime={horario_inicio} onTimeSelected={(horarInicioSelecionada) => setHoararioInicioAulaForm(horarInicioSelecionada)}/>
            
            <InputTime titulo={'Selecione Horário Fim Aula'} icon={'clock-time-ten'} initialTime={horario_fim} onTimeSelected={(horaFimSelecionada) => setHoarioFimAulaForm(horaFimSelecionada)}/>

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