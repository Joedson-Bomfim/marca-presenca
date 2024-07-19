import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button, useTheme } from "react-native-paper";
import { initializeDatabase, enableForeignKeys, addProfessor, fetchProfessor, cleanUpProfessor, removeProfessorById } from '../../Controller/ProfessorController';
import { dataHora, formataDataHoraPadraoAmericano } from '../../services/formatacao';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import styles from "./styles";
import TemaPrincipal from "../../assets/styles";

const BookScreen = () => {  
    const { colors } = useTheme();

    const now = dataHora();
    const formattedDate = formataDataHoraPadraoAmericano(now);

    const [professores, setProfessor] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nome, setNome] = useState('');
    const [numero_registro, setNumeroRegistro] = useState('');
    const [criado_em, setCriadoEm] = useState(formattedDate);

    useEffect(() => {
        const init = async () => {
            await initializeDatabase();
            await enableForeignKeys();
            listaProfessores();
            setCriadoEm(formattedDate);
        };
        init();
    }, []);

    const listaProfessores = async () => {
        setLoading(true);
        try {
            const listaProfessor = await fetchProfessor();
            setProfessor(listaProfessor);
        } catch (error) {
            setError('Não foi possível carregar os professores. Verifique se a tabela existe.');
        } finally {
            setLoading(false);
        }
    };

    const apagarProfessor = async (id) => {
        try {
            await removeProfessorById(id);
            listaProfessores();
        } catch (error) {
            setError('Erro ao apagar');
        } finally {
            setLoading(false);
        }
    };

    const apagarTudo = async () => {
        try {
            await cleanUpProfessor();
            listaProfessores();
        } catch (error) {
            setError('Erro ao apagar');
        } finally {
            setLoading(false);
        }
    };

    const handleAddBook = async () => {
        if (nome && numero_registro && criado_em) {
            await addProfessor(nome, numero_registro, criado_em);
            setNome('');
            setNumeroRegistro('');
            setCriadoEm('');
            listaProfessores();
            setCriadoEm(formattedDate);
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

    function teste(id) {
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
            <TextInput label="Nome" mode="flat" 
                       value={nome}
                       onChangeText={setNome}
                       style={[styles.marginBottom, TemaPrincipal.inputPadrao]}/>

            <TextInput label="Número de Registro" mode="flat" 
                       value={numero_registro}
                       onChangeText={setNumeroRegistro}
                       style={[styles.marginBottom, TemaPrincipal.inputPadrao]}/>

            <TextInput label="Criado em" mode="flat" 
                       value={criado_em}
                       onChangeText={setCriadoEm}
                       editable={false}
                       style={[styles.marginBottom, TemaPrincipal.inputPadrao]}/>
                       
            <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={handleAddBook} style={[styles.marginBottomPrimario, TemaPrincipal.botaoPrincipal]}>
                Cadastrar
            </Button>

            <FlatList style={styles.lista}
                data={professores}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.bookItem}>
                        <View style={styles.linhaConteudo}>
                            <View>
                                <Text style={styles.id}>{item.id}</Text>
                                <Text style={styles.primeiro}>{item.nome}</Text>
                                <Text style={styles.complemento}>{item.numero_registro}</Text>
                                <Text style={styles.complemento}>{item.criado_em}</Text>
                            </View>
                            <TouchableOpacity onPress={() => teste(item.id.toString())}>
                                <Icon name="trash-can" color="#fff" size={40} />
                            </TouchableOpacity>
                        </View>
                        <Button mode="contained" onPress={botaoApagarTudo} style={[styles.botaoApagaTudo, TemaPrincipal.buttonCadastraEdita]}>
                            Apagar Tudo
                        </Button>
                    </View>
                )}
            />
        </View>
    );
};

export default BookScreen;
