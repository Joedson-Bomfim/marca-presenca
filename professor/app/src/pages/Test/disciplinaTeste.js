import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button, useTheme } from "react-native-paper";
import { addDisciplina, fetchDisciplina, cleanUpDisciplina, removeDisciplinaById } from '../../Controller/DisciplinaController';
import { dataHora, formataDataHoraPadraoAmericano } from '../../services/formatacao';


import Loading from "../../components/LoadingDefaulft";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";
import TemaPrincipal from "../../assets/styles";

const DisciplinaTeste = () => {  
    const { colors } = useTheme();

    const now = dataHora();
    const formattedDate = formataDataHoraPadraoAmericano(now);

    const [disciplinas, setDisciplina] = useState([]);
    const [visible, setVisible] = useState(false);
    const [professor_fk, setProfessor_fk] = useState("1");
    const [nome, setNome] = useState('');
    const [codigo, setCodigo] = useState('');
    const [curso, setCurso] = useState('');
    const [complemento, setComplemento] = useState('');
    const [criado_em, setCriadoEm] = useState(formattedDate);

    useEffect(() => {
        listaDisciplinas();
    }, []);

    const listaDisciplinas = async () => {
        setVisible(true);
        try {
            const listaProfessor = await fetchDisciplina();
            setDisciplina(listaProfessor);
            console.log(listaProfessor);
        } catch (error) {
            console.log('Não foi possível carregar os professores. Verifique se a tabela existe.');
        } finally {
            setVisible(false);
        }
    };

    const apagarDisciplina = async (id) => {
        setVisible(true);
        try {
            await removeDisciplinaById(id);
            listaDisciplinas();
        } catch (error) {
            setError('Erro ao apagar');
        } finally {
            setVisible(false);
        }
    };

    const apagarTudo = async () => {
        setVisible(true);
        try {
            await cleanUpDisciplina();
            listaDisciplinas();
        } catch (error) {
            setError('Erro ao apagar');
        } finally {
            setVisible(false);
        }
    };

    const handleAddBook = async () => {
        if (professor_fk && nome && codigo && curso && complemento && criado_em) {
            setVisible(true);
            await addDisciplina(professor_fk, nome, codigo, curso, complemento);
            setNome('');
            setCodigo('');
            setCurso('');
            setComplemento('');
            listaDisciplinas();
        }else{
            Alert.alert('Atenção','Por favor preencha todos os campos');
        }
    };

    function apagaDisciplina(id) {
        Alert.alert(
            "Confirmação",
            "Tem certeza que deseja excluir esse professor?",
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
            "Tem certeza que deseja apagar todos os professores?",
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
            <TextInput label="Chave Estrangeira Professor" mode="flat" 
                       value={professor_fk}
                       onChangeText={setProfessor_fk}
                       //editable={false}
                       style={[styles.marginBottom, TemaPrincipal.inputPadrao]}/>

            <TextInput label="Nome" mode="flat" 
                       value={nome}
                       onChangeText={setNome}
                       style={[styles.marginBottom, TemaPrincipal.inputPadrao]}/>

            <TextInput label="Código" mode="flat" 
                       value={codigo}
                       onChangeText={setCodigo}
                       style={[styles.marginBottom, TemaPrincipal.inputPadrao]}/>

            <TextInput label="Curso" mode="flat" 
                        value={curso}
                        onChangeText={setCurso}
                        style={[styles.marginBottom, TemaPrincipal.inputPadrao]}/>

            <TextInput label="Semestre/Classe/Turma" mode="flat" 
                        value={complemento}
                        onChangeText={setComplemento}
                        style={[styles.marginBottom, TemaPrincipal.inputPadrao]}/>

            <TextInput label="Criado em" mode="flat" 
                       value={criado_em}
                       onChangeText={setCriadoEm}
                       editable={false}
                       style={[styles.marginBottom, TemaPrincipal.inputPadrao]}/>
                       
            <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={handleAddBook} style={[styles.marginBottomPrimario, TemaPrincipal.botaoPrincipal]}>
                Cadastrar
            </Button>

            {disciplinas.map((item) => (
                <View key={item.id} style={styles.bookItem}>
                    <View style={styles.linhaConteudo}>
                        <View>
                            <Text style={styles.id}>{item.id}</Text>
                            <Text style={styles.primeiro}>{item.nome}</Text>
                            <Text style={styles.complemento}>Professor FK: {item.professor_fk}</Text>
                            <Text style={styles.complemento}>{item.codigo}</Text>
                            <Text style={styles.complemento}>{item.curso}</Text>
                            <Text style={styles.complemento}>{item.complemento}</Text>
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
