import React from "react";
import { ScrollView, View, Text } from "react-native";
import { Button, useTheme } from "react-native-paper";

import styles from "./styles";
import TemaPrincipal from "../../assets/styles";

const Teste = ( {navigation} ) => {
    const { colors } = useTheme();

    return(
        //<Icon name="clipboard-text-clock-outline" color={ colors.icone } size={40}/>       
        <ScrollView style={[styles.fundoTela, {backgroundColor: colors.background}]}>
            <Text style={[styles.titulo, {color: colors.text }]}>Testes</Text>
            <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={() => {navigation.navigate('ProfessorTeste');}} style={[styles.marginBottom, styles.marginBottomPrimario, TemaPrincipal.botaoPrincipal]}>
                Professores
            </Button>
            
            <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={() => {navigation.navigate('DisciplinaTeste');}} style={[styles.marginBottom, styles.marginBottomPrimario, TemaPrincipal.botaoPrincipal]}>
                Disciplinas
            </Button> 
            
            <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={() => {navigation.navigate('AlunoTeste');}} style={[styles.marginBottom, styles.marginBottomPrimario, TemaPrincipal.botaoPrincipal]}>
                Alunos
            </Button> 
            
            <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={() => {navigation.navigate('AlunoDisciplinaTeste');}} style={[styles.marginBottom, styles.marginBottomPrimario, TemaPrincipal.botaoPrincipal]}>
                Alunos Disciplinas
            </Button> 
            
            <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={() => {navigation.navigate('AulaTeste');}} style={[styles.marginBottom, styles.marginBottomPrimario, TemaPrincipal.botaoPrincipal]}>
                Aulas
            </Button> 
            
            <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={() => {navigation.navigate('PresencaTeste');}} style={[styles.marginBottom, styles.marginBottomPrimario, TemaPrincipal.botaoPrincipal]}>
                Presenças
            </Button> 
            
            <Button mode="contained" labelStyle={{ fontSize: 20 }} onPress={() => {navigation.navigate('Tabela');}} style={[styles.marginBottom, styles.marginBottomPrimario, TemaPrincipal.botaoPrincipal]}>
                Tabelas
            </Button>   
        </ScrollView>
    )
}

export default Teste;