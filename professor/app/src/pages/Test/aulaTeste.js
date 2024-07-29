import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button, useTheme } from "react-native-paper";
import { addAula, fetchAula, cleanUpAula, removeDisciplinaById } from '../../Controller/AulaController';


import Loading from "../../components/LoadingDefaulft";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";
import TemaPrincipal from "../../assets/styles";

const DisciplinaTeste = () => {  
    const { colors } = useTheme();

    const [disciplinas, setDisciplina] = useState([]);
    const [visible, setVisible] = useState(false);
    const [disciplina_fk, setDisciplina_fk] = useState('1');
    const [dia_semana, setDiaSemana] = useState('Terça');
    const [local, setLocal] = useState('Pavilhao 2 - Sala 4');
    const [quantidade_aulas, setQuantidade_aulas] = useState('1');
    const [horario_inicio_aula, setHorario_inicio_aula] = useState('08:00:00');
    const [horario_fim_aula, setHorario_fim_aula] = useState('9:00:00');

    useEffect(() => {
        listaAlunos();
    }, []);

    const listaAlunos = async () => {
        setVisible(true);
        try {
            const listaluno = await fetchAula();
            setDisciplina(listaluno);
            console.log(listaluno);
        } catch (error) {
            console.log('Não foi possível carregar as aulas. Verifique se a tabela existe.');
        } finally {
            setVisible(false);
        }
    };

    const apagarDisciplina = async (id) => {
        setVisible(true);
        try {
            await removeDisciplinaById(id);
            listaAlunos();
        } catch (error) {
            setError('Erro ao apagar');
        } finally {
            setVisible(false);
        }
    };

    const apagarTudo = async () => {
        setVisible(true);
        try {
            await cleanUpAula();
            listaAlunos();
        } catch (error) {
            setError('Erro ao apagar');
        } finally {
            setVisible(false);
        }
    };

    const handleAddBook = async () => {
        if (disciplina_fk && dia_semana && local && quantidade_aulas && horario_inicio_aula && horario_fim_aula) {
            setVisible(true);
            await addAula(disciplina_fk, dia_semana, local, quantidade_aulas, horario_inicio_aula, horario_fim_aula);
            listaAlunos();
        }else{
            Alert.alert('Atenção','Por favor preencha todos os campos');
        }
    };

    function apagaDisciplina(id) {
        Alert.alert(
            "Confirmação",
            "Tem certeza que deseja excluir esse aula?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Apagar",
                    onPress: () => apagarDisciplina(id)
                }
            ]
        );
    }

    function botaoApagarTudo() {
        Alert.alert(
            "Confirmação",
            "Tem certeza que deseja apagar todos as aulas?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Apagar",
                    onPress: () => apagarTudo()
                }
            ]
        );
    }

    return (
        <ScrollView style={[styles.fundoTela, {backgroundColor: colors.background}]}>
            <Loading visible={visible}/>
            <TextInput label="Disciplina Chave Estrangeira" mode="flat" 
                       value={disciplina_fk}
                       onChangeText={setDisciplina_fk}
                       style={[styles.marginBottom, TemaPrincipal.inputPadrao]}/>

            <TextInput label="Dia da semana da Aula" mode="flat" 
                       value={dia_semana}
                       onChangeText={setDiaSemana}
                       style={[styles.marginBottom, TemaPrincipal.inputPadrao]}/>

            <TextInput label="Local" mode="flat" 
                       value={local}
                       onChangeText={setLocal}
                       style={[styles.marginBottom, TemaPrincipal.inputPadrao]}/>

            <TextInput label="Quantidade Aulas" mode="flat" 
                        value={quantidade_aulas}
                        onChangeText={setQuantidade_aulas}
                        style={[styles.marginBottom, TemaPrincipal.inputPadrao]}/>

            <TextInput label="Horário Início Aula" mode="flat" 
                        value={horario_inicio_aula}
                        onChangeText={setHorario_inicio_aula}
                        style={[styles.marginBottom, TemaPrincipal.inputPadrao]}/>

            <TextInput label="Horário Fim Aula" mode="flat" 
                        value={horario_fim_aula}
                        onChangeText={setHorario_fim_aula}
                        style={[styles.marginBottom, TemaPrincipal.inputPadrao]}/>
                       
            <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={handleAddBook} style={[styles.marginBottomPrimario, TemaPrincipal.botaoPrincipal]}>
                Cadastrar
            </Button>

            {disciplinas.map((item) => (
                <View key={item.id} style={styles.bookItem}>
                    <View style={styles.linhaConteudo}>
                        <View>
                            <Text style={styles.id}>{item.id}</Text>
                            <Text style={styles.primeiro}>{item.disciplina_fk}</Text>
                            <Text style={styles.complemento}>{item.dia_semana}</Text>
                            <Text style={styles.complemento}>{item.local}</Text>
                            <Text style={styles.complemento}>{item.quantidade_aulas}</Text>
                            <Text style={styles.complemento}>{item.horario_inicio_aula}</Text>
                            <Text style={styles.complemento}>{item.horario_fim_aula}</Text>
                            <Text style={styles.complemento}>{item.criado_em}</Text>
                        </View>
                        <TouchableOpacity onPress={() => apagaDisciplina(item.id.toString())}>
                            <Icon name="trash-can" color="#fff" size={40} />
                        </TouchableOpacity>
                    </View>
                    <Button mode="contained" onPress={botaoApagarTudo} style={[styles.botaoApagaTudo, TemaPrincipal.buttonCadastraEdita]}>
                        Apagar Tudo
                    </Button>
                </View>
            ))}
        </ScrollView>
    );
};

export default DisciplinaTeste;
