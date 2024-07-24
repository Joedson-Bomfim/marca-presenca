import React, { useEffect, useState, useContext } from "react";
import { Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { fetchProfessorById } from '../../Controller/ProfessorController';
import { Context } from '../../contexts/Context';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";
import TemaPrincipal from "../../assets/styles";
import Loading from "../../components/loading";

const Perfil = ({ navigation }) => {
    const { colors } = useTheme();
    //const { setIsAuthenticated, tipo, usuario, matricula, numero_registro } = useContext(Context);
    const [visible, setVisible] = useState(false);
    const[nome, setNome] = useState('');
    const[numero_registro, setNumeroRegistro] = useState('');

    const { professorId, setProfessorId } = useContext(Context);

    useEffect(() => {
        const init = async () => {
            carregarDadosProfessor();
        };
        init();
    }, []);

    const carregarDadosProfessor = async () => {
        try {
            const professor = await fetchProfessorById(1);
            setNome(professor.nome);
            setNumeroRegistro(professor.numero_registro);
        } catch (error) {
            console.log('Falha ao carregar professor');
        }
    };

    const confirmarSaida = () => {
        Alert.alert(
            "Confirmação",
            "Tem certeza que deseja sair?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Sair",
                    onPress: () => sair()
                }
            ]
        );
    };

    function sair() {
        setVisible(true);
        setIsAuthenticated(false);
        setVisible(false);
    }

    return (
        <ScrollView style={[styles.fundoTela, { backgroundColor: colors.background }]}>
            <Loading visible={visible}/>
            <View style={styles.cabecalho}>
                <Text style={[styles.tituloDadosPessoais, { color: colors.text }]}>Perfil</Text>

                <TouchableOpacity onPress={() => { navigation.navigate(rotaEdita) }}>
                    <Icon name="square-edit-outline" color="#fff" size={40} />
                </TouchableOpacity>
            </View>

            <View>
                <Text style={[styles.conteudo, { color: colors.text, flexWrap: 'wrap', width: '80%'  }]} >{nome}</Text>
            </View>
            <View>
                <Text style={[styles.conteudo, { color: colors.text }]}>Número de Registro: </Text>
                <Text style={[styles.conteudo, { color: colors.text }]}>{numero_registro}</Text>
            </View>
            <Text>{professorId}</Text>

            <Button mode="contained" onPress={confirmarSaida} style={[styles.botaoSair, TemaPrincipal.buttonCadastraEdita]}>
                SAIR
            </Button>
        </ScrollView>
    )
}

export default Perfil;