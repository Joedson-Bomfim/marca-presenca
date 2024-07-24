import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button, useTheme } from "react-native-paper";
import { addPresenca, fetchPresenca, cleanUpPresenca, removePresencaById } from '../../Controller/PresencaController';


import Loading from "../../components/loading";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";
import TemaPrincipal from "../../assets/styles";

const DisciplinaTeste = () => {  
    const { colors } = useTheme();

    const [disciplinas, setDisciplina] = useState([]);
    const [visible, setVisible] = useState(false);
    const [aluno_fk, setAluno_fk] = useState('1');
    const [aula_fk, setAula_fk] = useState('1');
    const [data, setData] = useState('2024-07-21');
    const [quantidade_aulas_assistidas, setQuantidade_aulas_assistidas] = useState('4');
    const [observacao, setObservacao] = useState('');
    const [situacao, setSituacao] = useState('Presente');

    useEffect(() => {
        listaAlunos();
    }, []);

    const listaAlunos = async () => {
        setVisible(true);
        try {
            const listaluno = await fetchPresenca();
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
            await removePresencaById(id);
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
            await cleanUpPresenca();
            listaAlunos();
        } catch (error) {
            setError('Erro ao apagar');
        } finally {
            setVisible(false);
        }
    };

    const handleAddBook = async () => {
        if (aluno_fk && aula_fk && aula_fk && data && quantidade_aulas_assistidas && situacao) {
            setVisible(true);
            await addPresenca(aluno_fk, aula_fk, data, quantidade_aulas_assistidas, observacao, situacao);
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
            <TextInput label="Aluno Chave Estrangeira" mode="flat" 
                       value={aluno_fk}
                       onChangeText={setAluno_fk}
                       style={[styles.marginBottom, TemaPrincipal.inputPadrao]}/>

            <TextInput label="Aula Chave Estrangeira" mode="flat" 
                       value={aula_fk}
                       onChangeText={setAula_fk}
                       style={[styles.marginBottom, TemaPrincipal.inputPadrao]}/>

            <TextInput label="Data" mode="flat" 
                        value={data}
                        onChangeText={setData}
                        style={[styles.marginBottom, TemaPrincipal.inputPadrao]}/>

            <TextInput label="Aulas Assistidas" mode="flat" 
                        value={quantidade_aulas_assistidas}
                        onChangeText={setQuantidade_aulas_assistidas}
                        style={[styles.marginBottom, TemaPrincipal.inputPadrao]}/>

            <TextInput label="Observação" mode="flat" 
                        value={observacao}
                        onChangeText={setObservacao}
                        style={[styles.marginBottom, TemaPrincipal.inputPadrao]}/>

            <TextInput label="Situação" mode="flat" 
                        value={situacao}
                        onChangeText={setSituacao}
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
                            <Text style={styles.complemento}>{item.aula_fk}</Text>
                            <Text style={styles.complemento}>{item.data}</Text>
                            <Text style={styles.complemento}>{item.quantidade_aulas_assistidas}</Text>
                            <Text style={styles.complemento}>{item.situacao}</Text>
                            <Text style={styles.complemento}>{item.observacao}</Text>
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
