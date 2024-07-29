import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button, useTheme } from "react-native-paper";
import { addAluno, fetchAluno, cleanUpAluno, removeAlunoById } from '../../Controller/AlunoController';


import Loading from "../../components/LoadingDefaulft";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";
import TemaPrincipal from "../../assets/styles";

const DisciplinaTeste = () => {  
    const { colors } = useTheme();

    const [disciplinas, setDisciplina] = useState([]);
    const [visible, setVisible] = useState(false);
    const [professor_fk, setProfessor_fk] = useState('1');
    const [nome, setNome] = useState('');
    const [matricula, setMatricula] = useState('');
    const [beacon_id, setBeacon_id] = useState('38709793-01a6-4020-8a7a-30c880605f7d');
    //38709793-01a6-4020-8a7a-30c880605f7d
    //325c4ae8-b519-44e8-ba2b-a9ed295059f1

    useEffect(() => {
        listaAlunos();
    }, []);

    const listaAlunos = async () => {
        setVisible(true);
        try {
            const listaluno = await fetchAluno();
            setDisciplina(listaluno);
            console.log(listaluno);
        } catch (error) {
            console.log('Não foi possível carregar os alunos. Verifique se a tabela existe.');
        } finally {
            setVisible(false);
        }
    };

    const apagarDisciplina = async (id) => {
        setVisible(true);
        try {
            await removeAlunoById(id);
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
            await cleanUpAluno();
            listaAlunos();
        } catch (error) {
            setError('Erro ao apagar');
        } finally {
            setVisible(false);
        }
    };

    const handleAddBook = async () => {
        if (nome && matricula && beacon_id) {
            setVisible(true);
            await addAluno(professor_fk, nome, matricula, beacon_id);
            setNome('');
            setMatricula('');
            setBeacon_id('');
            listaAlunos();
        }else{
            Alert.alert('Atenção','Por favor preencha todos os campos');
        }
    };

    function apagaDisciplina(id) {
        Alert.alert(
            "Confirmação",
            "Tem certeza que deseja excluir esse aluno?",
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
            "Tem certeza que deseja apagar todos os alunos?",
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
            <TextInput label="Professor ID" mode="flat" 
                       value={professor_fk}
                       onChangeText={setProfessor_fk}
                       style={[styles.marginBottom, TemaPrincipal.inputPadrao]}/>

            <TextInput label="Nome" mode="flat" 
                       value={nome}
                       onChangeText={setNome}
                       style={[styles.marginBottom, TemaPrincipal.inputPadrao]}/>

            <TextInput label="Matrícula" mode="flat" 
                       value={matricula}
                       onChangeText={setMatricula}
                       style={[styles.marginBottom, TemaPrincipal.inputPadrao]}/>

            <TextInput label="Beacon ID" mode="flat" 
                        value={beacon_id}
                        onChangeText={setBeacon_id}
                        style={[styles.marginBottom, TemaPrincipal.inputPadrao]}/>
                       
            <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={handleAddBook} style={[styles.marginBottomPrimario, TemaPrincipal.botaoPrincipal]}>
                Cadastrar
            </Button>

            {disciplinas.map((item) => (
                <View key={item.id} style={styles.bookItem}>
                    <View style={styles.linhaConteudo}>
                        <View>
                            <Text style={styles.id}>{item.id}</Text>
                            <Text style={styles.primeiro}>Professor ID {item.professor_fk}</Text>
                            <Text style={styles.primeiro}>{item.nome}</Text>
                            <Text style={styles.complemento}>{item.matricula}</Text>
                            <Text style={styles.complemento}>{item.beacon_id}</Text>
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
