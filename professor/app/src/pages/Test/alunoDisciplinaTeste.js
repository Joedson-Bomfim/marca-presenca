import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button, useTheme } from "react-native-paper";
import { addAlunoDisciplina, fetchAlunoDisciplina, cleanUpAlunoDisciplina, removeAlunoDisciplinaById } from '../../Controller/AlunoDisciplinaController';


import Loading from "../../components/LoadingDefaulft";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";
import TemaPrincipal from "../../assets/styles";

const DisciplinaTeste = () => {  
    const { colors } = useTheme();

    const [disciplinas, setDisciplina] = useState([]);
    const [visible, setVisible] = useState(false);
    const [aluno_fk, setAluno_fk] = useState('1');
    const [disciplina_fk, setDisciplina_fk] = useState('1');

    useEffect(() => {
        listaAlunos();
    }, []);

    const listaAlunos = async () => {
        setVisible(true);
        try {
            const listaluno = await fetchAlunoDisciplina();
            setDisciplina(listaluno);
            console.log(listaluno);
        } catch (error) {
            console.log('Não foi possível carregar alunos disciplinas. Verifique se a tabela existe.');
        } finally {
            setVisible(false);
        }
    };

    const apagarAlunoDisciplina = async (id) => {
        setVisible(true);
        try {
            await removeAlunoDisciplinaById(id);
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
            await cleanUpAlunoDisciplina();
            listaAlunos();
        } catch (error) {
            setError('Erro ao apagar');
        } finally {
            setVisible(false);
        }
    };

    const handleAddBook = async () => {
        if (aluno_fk && disciplina_fk) {
            setVisible(true);
            await addAlunoDisciplina(aluno_fk, disciplina_fk);
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
                    onPress: () => apagarAlunoDisciplina(id)
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
            <TextInput label="Aluno Chave estrangeira" mode="flat" 
                       value={aluno_fk}
                       onChangeText={setAluno_fk}
                       //editable={false}
                       style={[styles.marginBottom, TemaPrincipal.inputPadrao]}/>

            <TextInput label="Disciplina Chave estrangeira" mode="flat" 
                       value={disciplina_fk}
                       onChangeText={setDisciplina_fk}
                       //editable={false}
                       style={[styles.marginBottom, TemaPrincipal.inputPadrao]}/>
                       
            <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={handleAddBook} style={[styles.marginBottomPrimario, TemaPrincipal.botaoPrincipal]}>
                Cadastrar
            </Button>

            {disciplinas.map((item) => (
                <View key={item.id} style={styles.bookItem}>
                    <View style={styles.linhaConteudo}>
                        <View>
                            <Text style={styles.id}>{item.id}</Text>
                            <Text style={styles.primeiro}>{item.aluno_fk}</Text>
                            <Text style={styles.complemento}>{item.disciplina_fk}</Text>
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
