import React, { useState } from "react";
import { Text, ScrollView } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";

import styles from "./styles";
import TemaPrincipal from "../../assets/styles";

const DisciplinaEdita = ( {navigation} ) => {
    const { colors } = useTheme();

    const [credenciais, setCredenciais] = useState({
        nomeDisciplina: '',
        quantidadeAulas: '',
        curso: '',
        periodo: '',
        ano: ''
    })

    return(
        <ScrollView style={[styles.fundoTela, {backgroundColor: colors.background}]}>
            <Text style={[styles.tituloCadastro, {color: colors.text }]}>Editar Disciplina</Text>

            <TextInput label="Nome da disciplina" mode="flat" value={credenciais.nomeDisciplina} 
                    onChange={(text) => setCredenciais({...credenciais, nomeDisciplina: text})} style={[styles.marginBottom, TemaPrincipal.inputPadrao]}
            ></TextInput>

            <TextInput label="Quantidade de Aulas Total" mode="flat" value={credenciais.quantidadeAulas} 
                    onChange={(text) => setCredenciais({...credenciais, quantidadeAulas: text})} style={[styles.marginBottom, TemaPrincipal.inputPadrao]}
            ></TextInput>

            <TextInput label="Curso" mode="flat" value={credenciais.curso} 
                    onChange={(text) => setCredenciais({...credenciais, curso: text})} style={[styles.marginBottom, TemaPrincipal.inputPadrao]}
            ></TextInput>

            <TextInput label="Período" mode="flat" value={credenciais.periodo} 
                    onChange={(text) => setCredenciais({...credenciais, periodo: text})} style={[styles.marginBottom, TemaPrincipal.inputPadrao]}
            ></TextInput>

            <TextInput label="Ano" mode="flat" value={credenciais.ano} 
                    onChange={(text) => setCredenciais({...credenciais, ano: text})} style={[styles.marginBottom, TemaPrincipal.inputPadrao]}
            ></TextInput>

            <Button mode="contained" onPress={() => {navigation.navigate('Disciplina');}} style={TemaPrincipal.inputPadrao}>
                EDITAR
            </Button>
        </ScrollView>
    )
}

export default DisciplinaEdita;