import React, { useEffect, useState } from "react";
import { Text, ScrollView, View, Alert } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { useRoute } from '@react-navigation/native';
import { fetchAlunoDisciplinaMarcaPresenca, addAlunoDisciplina, removeAlunoDisciplinaById } from '../../Controller/AlunoDisciplinaController';
import { fetchAluno } from '../../Controller/AlunoController';
import InputSearch from "../../components/InputSearch";
import AdicionaAluno from '../../components/AdicionaAluno';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Loading from "../../components/LoadingDefaulft";
import styles from "./styles";
import TemaPrincipal from "../../assets/styles";

const Aluno = ({ navigation }) => {
    const { colors } = useTheme();
    const route = useRoute();

    const { disciplina_id, nome_disciplina } = route.params;
    
    const [alunos, setAlunos] = useState([]);
    const [alunosOpcoes, setAlunosOpcoes] = useState([]);
    const [visible, setVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        listaAlunos();
        listaAlunosOpcoes();
    }, []);

    const listaAlunos = async () => {
        setVisible(true);
        try {
            const listaluno = await fetchAlunoDisciplinaMarcaPresenca(disciplina_id);
            setAlunos(listaluno);
        } catch (error) {
            console.log('Não foi possível carregar os alunos. Verifique se a tabela existe.', error);
        } finally {
            setVisible(false);
        }
    };

    const listaAlunosOpcoes = async () => {
        setVisible(true);
        try {
            const listalunoOpcoes = await fetchAluno();
            setAlunosOpcoes(listalunoOpcoes);
        } catch (error) {
            console.log('Não foi possível carregar as opções dos alunos.', error);
        } finally {
            setVisible(false);
        }
    };

    const filteredAlunos = alunos.filter(aula =>
        aula.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const alunosDisponiveis = alunosOpcoes.filter(
        (opcao) => !alunos.some((aluno) => aluno.alunoId === opcao.id)
    );

    const opcoesAlunos = alunosDisponiveis.map(option => ({
        id: option.id,
        name: option.nome
    }));

    const adicionarAlunoADisciplina = async (aluno_id) => {
        setVisible(true);
        try {
            const result = await addAlunoDisciplina(aluno_id, disciplina_id);
            if (result.success) {
                Alert.alert('Sucesso!','Aluno(a) adicionado(a) com sucesso!');
                await listaAlunos();
                await listaAlunosOpcoes();
            } else {
                Alert.alert('Infelizmente ocorreu um erro ao tentar adicionar o(a) aluno(a).');
            }
        } catch (error) {
            console.log('Não foi possível adicionar o aluno à disciplina.', error);
        } finally {
            setVisible(false);
        }
    };

    const removerAlunoADisciplina = async (aluno_disciplina_id, nome) => {
        Alert.alert(
            "Confirmação",
            "Tem certeza que deseja remover " + nome + " da disciplina?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Apagar",
                    onPress: () => {
                        confirmaRemoverAlunoADisciplina(aluno_disciplina_id);
                    }
                }
            ]
        );
    };

    const confirmaRemoverAlunoADisciplina = async (aluno_disciplina_id) => {
        setVisible(true);
        
        try {
            const result = await removeAlunoDisciplinaById(aluno_disciplina_id);
            if (result.success) {
                Alert.alert('Aluno(a) removido(a) da disciplina com sucesso!');
                await listaAlunos();
                await listaAlunosOpcoes();
            } else {
                Alert.alert('Infelizmente ocorreu um erro ao tentar remover o(a) aluno(a)');
            }
        } catch (error) {
            console.log('Não foi possível adicionar o aluno à disciplina.', error);
            Alert.alert('Infelizmente ocorreu um erro ao tentar remover o(a) aluno(a)');
        } finally {
            setVisible(false);
        }
            
    };

    return (
        <View style={[styles.fundoTela, { backgroundColor: colors.background }]}>
            <Text style={[styles.tituloDois, { color: colors.text }]}>{nome_disciplina}</Text>
            <Text style={[styles.subTitulo, { color: colors.text }]}>Lista de Alunos</Text>

            <InputSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <ScrollView>
                <Loading visible={visible} />
                {filteredAlunos.map((item) => (
                    <View key={item.id} style={styles.bookItem}>
                        <Button mode="contained" labelStyle={{ fontSize: 18 }} style={[TemaPrincipal.listaTabela, { backgroundColor: colors.secundary, alignItems: 'flex-start', width: '100%' }]}
                        icon={() => <Icon name={'account-minus'} size={30} color="#ffffff" />} onPress={() => removerAlunoADisciplina(item.id, item.nome)}>
                            {item.nome}
                        </Button>
                    </View>
                ))}
            </ScrollView>

            <AdicionaAluno nome_disciplina={nome_disciplina} options={opcoesAlunos} onSelect={adicionarAlunoADisciplina} placeholder="Adicionar Aluno" /> 
        </View>
    );
};

export default Aluno;
