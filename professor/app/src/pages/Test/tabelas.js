import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { Button, useTheme } from "react-native-paper";
import { removeProfessorById } from '../../Controller/ProfessorController';
import { fetchTabela, deleteTabela } from '../../Controller/DatabaseController';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import styles from "./styles";
import TemaPrincipal from "../../assets/styles";

const BookScreen = () => {  
    const { colors } = useTheme();

    const [professores, setProfessor] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const init = async () => {
            listaTabelas();
        };
        init();
    }, []);

    const listaTabelas = async () => {
        setLoading(true);
        try {
            const listaProfessor = await fetchTabela();
            setProfessor(listaProfessor);
            console.log(listaProfessor)
        } catch (error) {
            setError('Não foi possível carregar os professores. Verifique se a tabela existe.');
        } finally {
            setLoading(false);
        }
    };

    const apagarProfessor = async (nome) => {
        try {
            await deleteTabela(nome);
            listaTabelas();
        } catch (error) {
            setError('Erro ao apagar');
        } finally {
            setLoading(false);
        }
    };

    const apagarTudo = async () => {
        try {
            await deleteTabela('Professores');
            listaTabelas();
        } catch (error) {
            setError('Erro ao apagar');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    function apagaTabela(id) {
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
                    onPress: () => apagarProfessor(id)
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
        <View style={[styles.fundoTela, {backgroundColor: colors.background}]}>
            <FlatList style={styles.lista}
                data={professores}
                renderItem={({ item }) => (
                    <View style={styles.bookItem}>
                        <View style={styles.linhaConteudo}>
                            <View>
                                <Text style={styles.id}>{item.name}</Text>
                            </View>
                            <TouchableOpacity onPress={() => apagaTabela(item.name)}>
                                <Icon name="trash-can" color="#fff" size={40} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
            <Button mode="contained" onPress={botaoApagarTudo} style={[styles.botaoApagaTudo, TemaPrincipal.buttonCadastraEdita]}>
                Apagar Tudo
            </Button>
        </View>
    );
};

export default BookScreen;
