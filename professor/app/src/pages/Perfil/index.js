import React, { useState, useContext } from "react";
import { Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Button, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { AuthContext } from "../../contexts/Auth";

import styles from "./styles";
import TemaPrincipal from "../../style/styles";
import Loading from "../../components/loading";

const Perfil = ({ navigation }) => {
    const { colors } = useTheme();
    const { setIsAuthenticated, tipo, usuario, nome, matricula, numero_registro } = useContext(AuthContext);
    const [visible, setVisible] = useState(false);
    const registro_tipo = tipo == 'aluno' ? 'Matrícula' : 'Número de Registro';
    const registro = tipo == 'aluno' ? matricula : numero_registro;

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

    let rotaEdita = tipo == 'aluno' ? 'AlunoEdita' : 'ProfessorEdita';

    return (
        <ScrollView style={[styles.fundoTela, { backgroundColor: colors.background }]}>
            <Loading visible={visible}/>
            <View style={styles.cabecalho}>
                <Text style={[styles.tituloDadosPessoais, { color: colors.text }]}>Dados Pessoais</Text>

                <TouchableOpacity onPress={() => { navigation.navigate(rotaEdita) }}>
                    <Icon name="square-edit-outline" color="#fff" size={40} />
                </TouchableOpacity>
            </View>
            <View style={{alignSelf: 'center'}}>
                <Icon name="account-circle" color={colors.icone} size={100}/>
            </View>

            <View style={styles.linhaConteudo}>
                <Text style={[styles.conteudo, { color: colors.text }]}>Nome: </Text>
                <Text style={[styles.conteudo, { color: colors.text, flexWrap: 'wrap', width: '80%'  }]} >{nome}</Text>
            </View>
            <View style={styles.linhaConteudo}>
                <Text style={[styles.conteudo, { color: colors.text }]}>{registro_tipo}: </Text>
                <Text style={[styles.conteudo, { color: colors.text }]}>{registro}</Text>
            </View>
            <View style={styles.linhaConteudo}>
                <Text style={[styles.conteudo, { color: colors.text }]}>Usuário: </Text>
                <Text style={[styles.conteudo, { color: colors.text }]}>{usuario}</Text>
            </View>

            <Text style={[styles.tituloDisciplinas, { color: colors.text }]}>Disciplinas</Text>

            <Text style={[styles.conteudo, { color: colors.text }]}>Física</Text>
            <Text style={[styles.conteudo, { color: colors.text }]}>Química</Text>

            <Button mode="contained" onPress={confirmarSaida} style={[styles.botaoSair, TemaPrincipal.buttonCadastraEdita]}>
                SAIR
            </Button>
        </ScrollView>
    )
}

export default Perfil;