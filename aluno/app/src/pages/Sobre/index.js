import React from "react";
import { Text, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import styles from "./styles";
import TemaPrincipal from "../../assets/styles";

const Sobre = ({ navigation }) => {
    const { colors } = useTheme();

    return (
        <ScrollView style={[styles.fundoTela, { backgroundColor: colors.background }]}>
            <Text style={[TemaPrincipal.titulo, {color: colors.text }]}>Sobre o Projeto</Text>

            <Text style={[styles.subTitulo, {color: colors.text }]}>Descrição</Text>

            <Text style={[{color: colors.text, textAlign: 'justify', marginBottom: 10 }]}>
                Por objetivo a conclusão do Trabalho de Conclusão de Curso (TCC), foi desenvolvido dois aplicativos para o registro de presença de alunos através 
                da simulação da tecnologia de beacon (iBeacon). O primeiro aplicativo é destinado aos professores, 
                que receberá sinais de beacons enviado pelos alunos que estão cadastrados, desta forma baseado no UUID (ID do beacon), será registrado a presença. 
                O segundo aplicativo é para os alunos, que irá enviar o sinal de beacon, cada um com o seu próprio ID. 
            </Text>

            <Text style={[styles.subTitulo, {color: colors.text }]}>Objetivos</Text>

            <Text style={[{color: colors.text, fontSize: 15, fontWeight: "bold" }]}> Objetivo Geral</Text>

            <Text style={[{color: colors.text, marginBottom: 10 }]}>Automatizar o controle de presença de alunos em ambiente escolar</Text>

            <Text style={[{color: colors.text, fontSize: 15, marginBottom: 10, fontWeight: "bold" }]}> Objetivos Específicos</Text>

            <Text style={[{color: colors.text, padding: 5, marginLeft: 5 }]}>• Automatizar o processo de marcação de presença de alunos</Text>

            <Text style={[{color: colors.text, padding: 5, marginLeft: 5 }]}>• Possibilitar a troca de informações entre sistemas de presença existentes</Text>

            <Text style={[styles.subTitulo, {color: colors.text }]}>Autores</Text>

            <Text style={[{color: colors.text, marginBottom: 10 }]}> 
                <Text style={{fontWeight: "bold"}}>Joedson Lopes Bomfim</Text> - Desenvolvimento da aplicação. 
            </Text>
            
            <Text style={[{color: colors.text, marginBottom: 30 }]}> 
                <Text style={{fontWeight: "bold"}}>Fabio dos Santos Lima</Text> - Orientador do trabalho. Um adendo: o agradecimento a valiosa 
                sugestão primordial para a construção deste projeto. 
            </Text>
        </ScrollView>
    )
}

export default Sobre;